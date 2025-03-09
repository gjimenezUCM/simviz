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

const data =[ {
    attribute: {
        name: "year",
        type: "number",
        similarityConfiguration: {
            "simFunction": "RangeSimilarity",
            "weight": 0.5*100,
            "description": "Similarity normalized in range (1950,2021)"
        },
    },
    leftCase: 2016,
    rightCase: 2018,
    value: 0.972,
},
    {
        attribute: {
            name: "make",
            type: "nested",
            similarityConfiguration: {
                "simFunction": "Nested similarity",
                "weight": 0.5*100,
                "description": "Weighted similarity of the nested attributes"
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
                        "simFunction": "Levensthein",
                        "weight": 0.3*100,
                        "description": "String similarity using Levensthein"
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
                        "simFunction": "Levensthein",
                        "weight": 0.7*100,
                        "description": "String similarity using Levensthein"
                    },
                },
                leftCase: "chevrolet",
                rightCase: "mitsubishi",
                value: 0.27,
            }              
        ]
    }
]
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
            legendAlign: "center",
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
          columns: [
            {
              field: "leftCase",
              hozAlign: "right",
              formatter: formatByType,
            },
            {
              field: "value",
              width: "10%",
              hozAlign: "center",
              cssClass: "dt-att-value",
            },
            { field: "rightCase",formatter: formatByType },
          ],
        },
      ],
    });


});     

function formatByType(cell, formatterParams) {
    let data = cell.getData();
    if ("type" in data.attribute) {
        switch(data.attribute["type"]) {
            case "number":
                return formatNumber(cell, formatterParams);
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

function formatDefault(cell) {
    if (cell.getValue()) {
        cell.getElement().style.whiteSpace = "pre-wrap";
        return cell.getValue();
    } else {
        return `<span class="badge text-bg-danger">NULL</span>`;
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





