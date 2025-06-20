/*
* CSS imports
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'tabulator-tables/dist/css/tabulator_bootstrap5.min.css'
import '../css/simviz.style.css';

/*
* JS/TS imports
*/
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Popover } from "bootstrap";
import nanoMarkdown from 'nano-markdown';

import { FormatModule, DataTreeModule, Tabulator } from 'tabulator-tables';

const data = [
  {
    attribute: {
      name: "year",
      type: "number",
      similarityConfiguration: {
        simFunction: "RangeSimilarity",
        weight: 0.5 * 100,
        description: "Similarity normalized in range (1950,2021)",
      },
    },
    leftCase: 2016,
    rightCase: 2018,
    value: 0.972,
  },
  {
    attribute: {
      name: "image",
      type: "Image",
      similarityConfiguration: {
        simFunction: "lorem ipsum",
        weight: 0.1 * 100,
        description: "lorem ipsum",
      },
    },
    leftCase: "https://i.postimg.cc/Zqn1M35m/44171.png",
    rightCase: "",
    value: 0.05,
  },

  {
    attribute: {
      name: "paint_color",
      type: "Color",
      similarityConfiguration: {
        simFunction: "lorem ipsum",
        weight: 0.1 * 100,
        description: "lorem ipsum",
      },
    },
    leftCase: [0, 0, 255],
    rightCase: "white",
    value: 0.05,
  },
  {
    attribute: {
      name: "manufacturer2",
      type: "Taxonomy",
      similarityConfiguration: {
        simFunction: "lorem ipsum",
        weight: 0.1 * 100,
        description: "lorem ipsum",
      },
    },
    leftCase: "ford",
    rightCase: "subaru",
    value: 0.05,
  },
  {
    attribute: {
      name: "make",
      type: "nested",
      similarityConfiguration: {
        simFunction: "Nested similarity",
        weight: 0.5 * 100,
        description: "Weighted similarity of the nested attributes",
      },
    },
    leftCase: "",
    rightCase: "",
    value: 0.12,
    _children: [
      {
        attribute: {
          name: "model",
          type: "string",
          similarityConfiguration: {
            simFunction: "Levensthein",
            weight: 0.3 * 100,
            description: "String similarity using Levensthein",
          },
        },
        leftCase: "silverado 2500 ltz",
        rightCase: "outlander se",
        value: 0.1,
      },
      {
        attribute: {
          name: "manufacturer",
          type: "string",
          similarityConfiguration: {
            simFunction: "Levensthein",
            weight: 0.7 * 100,
            description: "String similarity using Levensthein",
          },
        },
        leftCase: "chevrolet dsjkajdslakjdsla kjdlskaj dslkaj sdlkj ",
        rightCase: "mitsubishi",
        value: 0.27,
      },
    ],
  },
];
window.addEventListener("load", (event) => { 
    Tabulator.registerModule([DataTreeModule, FormatModule]);
    let table = new Tabulator("#case-comparison-table", {
      data: data,
      dataTree: true,
      dataTreeBranchElement: false,
      layout: "fitColumns",
      columns: [
        {
          field: "attribute.name",
          title: "Attribute",
          formatter: "textarea",
          cssClass: "dt-att-name",
        },
        {
          field: "attribute.similarityConfiguration.weight",
          width: "10%",
          formatter: "progress",
          formatterParams: {
            color: "#dda8f8",
            legendColor: "#000000",
            legendAlign: "justify",
            legend: formatWeight,
          },
          cssClass: "dt-att-weight",
          vertAlign: "bottom",
        },
        {
          field: "attribute.similarityConfiguration",
          width: "5%",
          formatter: renderSimilarityFunction,
        },
        {
          field: "leftCase",
          hozAlign: "right",
          formatter: formatByType,
          cssClass: "dt-left-case",
          headerHozAlign: "right",
        },
        {
          field: "value",
          width: "10%",
          hozAlign: "center",
          cssClass: "dt-att-value",
          headerHozAlign: "center",
        },
        {
          field: "rightCase",
          formatter: formatByType,
          cssClass: "dt-right-case",
        },
      ],
    });

    table.on("dataLoaded", function (data) {
      console.log("data loaded");
      let el = document.querySelector(".tabulator-col[role='columnheader'].dt-left-case .tabulator-col-title");
      el.innerHTML = "Case Id";
      el = document.querySelector(".tabulator-col[role='columnheader'].dt-right-case .tabulator-col-title");
      el.innerHTML = "Case Id";
      el = document.querySelector(
        ".tabulator-col[role='columnheader'].dt-att-value .tabulator-col-title"
      );
      el.innerHTML = "Similarity";
      
    });


});     

function formatByType(cell, formatterParams) {
    let data = cell.getData();
    if ("type" in data.attribute) {
        switch (data.attribute["type"]) {
          case "number":
            return formatNumber(cell, formatterParams);
            break;
          case "Image":
            return renderImage(cell, formatterParams);
            break;
          case "Color":
            return renderColor(cell, formatterParams);
            break;
          case "ColorRGBList":
            return renderColor(cell, formatterParams);
            break;
          case "Taxonomy":
            return renderTaxonomyLabel(cell, formatterParams);
            break;
          case "nested":
            return "&nbsp;";
          default:
            return formatDefault(cell);
        }
    } else {
        return formatDefault(cell);
    }
}


function renderImage(cell, formatterParams, onRendered) {
    let data = cell.getData();
    let template = document.createElement("template");
    if (data && data[cell.getField()]) {
      let value = data[cell.getField()];
      template.innerHTML = `<img class="img-fluid" src="${value}"/>`;
    } else {
      template.innerHTML = `<span class="badge text-bg-danger">EMPTY</span>`;
    }
    return template.content.firstChild;    
}

function renderColor(cell, formatterParams, onRendered) {
  let data = cell.getData();
  let template = document.createElement("template");
  if (data && data[cell.getField()]) {
    let value = data[cell.getField()];
    if (typeof(value) === "string") {
        template.innerHTML = `<div class="box" aria-labelledby="color-label" title=${value} style="background-color: ${value};"></div>`;
    } 
    if (Array.isArray(value) && typeof(value[0]) === "number")  {
        template.innerHTML = `<div class="box" aria-labelledby="color-label" title=rgb(${value}) style="background-color: rgb(${value});"></div>`;
    }
    if (Array.isArray(value) && Array.isArray(value[0])) {
        let colorBoxes = value.map(
            (value) =>
            `<div class="box" aria-labelledby="color-label" title=rgb(${value}) style="background-color: rgb(${value});"></div>`
        );
        console.log(colorBoxes.join(""));
        //template.innerHTML = `<div>colorBoxes.join("");
        template.innerHTML = `<div>${colorBoxes.join("")}</div>`;
    }
  } else {
    template.innerHTML = `<span class="badge text-bg-danger">EMPTY</span>`;
  }
  return template.content.firstChild;
}

function renderTaxonomyLabel(cell, formatterParams, onRendered) {
  let data = cell.getData();
  let template = document.createElement("template");
  if (data && data[cell.getField()]) {
    let value = data[cell.getField()];
    template.innerHTML = `<a class="taxonomy-label" href="#" data-label="${value}">${value}</a>`;
  } else {
    template.innerHTML = `<span class="badge text-bg-danger">EMPTY</span>`;
  }
  let link = template.content.firstChild;
  link.addEventListener("click", (event) => {
        if (event.currentTarget){
            let label = (event.currentTarget).getAttribute("data-label");
            if (label) {
                /// TODO
                console.log(label)
            }
        }
    })
  return link ;
}


function formatDefault(cell) {
    if (cell.getValue()) {
        cell.getElement().style.whiteSpace = "pre-wrap";
        return cell.getValue();
    } else {
        return `<span class="badge text-bg-danger">EMPTY</span>`;
    }
}

function formatNumber(cell, formatterParams) {
    let precision = formatterParams.precision ? formatterParams.precision: 0;
    return Number(cell.getValue()).toFixed(precision);
}


function formatWeight(value) {
    return Number(value).toFixed(2) + "%"
}

function renderSimilarityFunction(cell, formatterParams, onRendered) {
    let data = cell.getValue();
    const template = document.createElement('template');
    template.innerHTML = `<button class="btn btn-dark btn-sm btn-function"><img src="./images/function-white.png" alt="similarity function icon" width="14"></button>`;
    let button = template.content.firstChild;
    const popover = new Popover(button, {
        title: data.simFunction,
        content: nanoMarkdown(data.description),
        placement: "bottom",
        html: true,
        trigger: 'focus'
    })
    button.addEventListener('inserted.bs.popover', () => {
        let links = document.querySelectorAll(".popover-body a");
        if (links) {
            for (let aLink of links) {
                aLink.setAttribute("target", "_blank");
            }
        }
    });   
    return button;
}





