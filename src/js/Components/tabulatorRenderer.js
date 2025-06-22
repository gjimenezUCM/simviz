
import { theController } from "../controller";
import { Popover } from "bootstrap";
import nanoMarkdown from "nano-markdown";

import {
  Tabulator,  
  FormatModule,
  DataTreeModule,
  CellComponent,
  FormatterParams,
  EmptyCallback,
} from "tabulator-tables";

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

export class TabulatorRenderer {
  /**
   * Constructor
   * @param allAtts
   * @param simDescription
   * @param attId
   */
  constructor(allAtts, simDescription, attId) {
    console.log(Tabulator);
    Tabulator.registerModule([DataTreeModule, FormatModule]);
    this.initTable(allAtts, simDescription, attId);
    
  }

  initTable(allAtts, simDescription, attId) {
    this.remainingAtts = {};
    this.simAtts = {};
    this.attId = attId;

    // If the table is configured for a similarity function then we will start with the attributes
    // employed by the similarity function
    if (simDescription) {
      let listAttsInSim = Object.keys(simDescription.localSim);
      for (let attName of listAttsInSim) {
        // Ignore attribute id because it appear in the table header
        if (attName === attId) continue;
        this.simAtts[attName] = {
          attribute: {
            name: attName,
            type: allAtts[attName],
            similarityConfiguration: simDescription.localSim[attName],
          },
          leftCase: "",
          rightCase: "",
          value: 0.0,
        };
        this.simAtts[attName]["attribute"]["similarityConfiguration"][
          "weight"
        ] =
          this.simAtts[attName]["attribute"]["similarityConfiguration"][
            "weight"
          ] *100;
      }
    }

    // Now add the attributes that are not part of the similarity function
    for (let attName of Object.keys(allAtts)) {
      // Ignore attribute id because it appear in the table header
      if (attName === attId) continue;
      // Ignore attribute because it was previously added to the table
      if (this.simAtts && attName in this.simAtts) continue;
      this.remainingAtts[attName] = {
        attribute: {
          name: attName,
          type: allAtts[attName],
          similarityConfiguration: null,
        },
        leftCase: "",
        rightCase: "",
        value: 0.0,
      };
    }

    let data = Object.values(this.simAtts);
    data.push(...Object.values(this.remainingAtts));
    console.log(data)

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
          title: "",
          field: "attribute.similarityConfiguration.weight",
          width: "10%",
          formatter: "progress",
          formatterParams: {
            color: "#dda8f8",
            legendColor: "#000000",
            legendAlign: "justify",
            legend: RenderUtils.renderWeight,
          },
          cssClass: "dt-att-weight",
          vertAlign: "bottom",
        },
        {
          title: "",
          field: "attribute.similarityConfiguration",
          width: "5%",
          formatter: RenderUtils.renderSimilarityFunction,
        },
        {
          title: "Case Id",
          field: "leftCase",
          hozAlign: "right",
          formatter: this.formatByType,
          cssClass: "dt-left-case",
          headerHozAlign: "right",
        },
        {
          title: "Similarity",
          field: "value",
          width: "10%",
          hozAlign: "center",
          cssClass: "dt-att-value",
          headerHozAlign: "center",
          formatter: RenderUtils.renderNumber,
          formatterParams:{ renderNull: false }
        },
        {
          title: "caseId",
          field: "rightCase",
          formatter: this.formatByType,
          cssClass: "dt-right-case",
        },
      ],
    });

    table.on("dataLoaded", function (data) {
      console.log("data loaded");
      let el = document.querySelector(
        ".tabulator-col[role='columnheader'].dt-left-case .tabulator-col-title"
      );
      if (el) {
        el.innerHTML = "Case Id";
      }

      el = document.querySelector(
        ".tabulator-col[role='columnheader'].dt-right-case .tabulator-col-title"
      );
      if (el) {
        el.innerHTML = "Case Id";
      }
      el = document.querySelector(
        ".tabulator-col[role='columnheader'].dt-att-value .tabulator-col-title"
      );
      if (el) {
        el.innerHTML = "Similarity";
      }
    });
  }

  /**
   * Modify the case  on left column of the table
   * @param id Case unique id
   * @param item Case content
   */
  updateLeftColCase(id, item) {}

  /**
   * Modify the case  on left column of the table
   * @param id Case unique id
   * @param item Case content
   */
  updateRightColCase(id, item) {}

  /**
   * Update the similarity value between two cases. It changes the global similarity value
   * on the header and the local similarity values
   * @param newSimValue An object that contains the similarity value (with global and local similarity values)
   * @param color The color employed for the global similarity value
   */
  updateSimilarityValue(newSimValue, color) {}


  formatByType(cell, formatterParams, onRendered) {
    let data = cell.getData();
    if ("type" in data.attribute) {
      switch (data.attribute["type"]) {
        case "number":
          return RenderUtils.renderNumber(cell, { renderNull: true });
          break;
        case "Image":
          return RenderUtils.renderImage(cell, formatterParams);
          break;
        case "Color":
          return RenderUtils.renderColor(cell, formatterParams);
          break;
        case "ColorRGBList":
          return RenderUtils.renderColor(cell, formatterParams);
          break;
        case "Taxonomy":
          return RenderUtils.renderTaxonomyLabel(cell, formatterParams);
          break;
        case "nested":
          return "&nbsp;";
        default:
          return RenderUtils.renderDefault(cell);
      }
    } else {
      return RenderUtils.renderDefault(cell);
    }
  }
};

class RenderUtils {
  static renderDefault(cell) {
    if (cell.getValue()) {
      cell.getElement().style.whiteSpace = "pre-wrap";
      return cell.getValue();
    } else {
      return `<span class="badge text-bg-danger">EMPTY</span>`;
    }
  }

  static renderNumber(cell, formatterParams) {
    if (cell.getValue()) {
      let precision = formatterParams.precision ? formatterParams.precision : 0;
      return Number(cell.getValue()).toFixed(precision);
    } else {
      if (formatterParams && formatterParams["renderNull"]) {
        return `<span class="badge text-bg-danger">EMPTY</span>`;
      }
      else {
        return ""
      }
    }
  }

  static renderWeight(value) {
    return Number(value).toFixed(2) + "%";
  }
  static renderImage(cell, formatterParams, onRendered) {
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

  static renderColor(cell, formatterParams, onRendered) {
    let data = cell.getData();
    let template = document.createElement("template");
    if (data && data[cell.getField()]) {
      let value = data[cell.getField()];
      if (typeof value === "string") {
        template.innerHTML = `<div class="box" aria-labelledby="color-label" title=${value} style="background-color: ${value};"></div>`;
      }
      if (Array.isArray(value) && typeof value[0] === "number") {
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

  static renderTaxonomyLabel(cell, formatterParams, onRendered) {
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
      if (event.currentTarget) {
        let label = event.currentTarget.getAttribute("data-label");
        if (label) {
          /// TODO
          console.log(label);
        }
      }
    });
    return link;
  }

  static renderSimilarityFunction(cell, formatterParams, onRendered) {
    let data = cell.getValue();
    if (data && data.name) {
      const template = document.createElement("template");
      template.innerHTML = `<button class="btn btn-dark btn-sm btn-function"><img src="./images/function-white.png" alt="similarity function icon" width="14"></button>`;
      let button = template.content.firstChild;
      const popover = new Popover(button, {
        title: data.name,
        content: nanoMarkdown(data.description),
        placement: "bottom",
        html: true,
        trigger: "focus",
      });
      button.addEventListener("inserted.bs.popover", () => {
        let links = document.querySelectorAll(".popover-body a");
        if (links) {
          for (let aLink of links) {
            aLink.setAttribute("target", "_blank");
          }
        }
      });
      return button;
    } else {
      return "&nbsp;";
    }
  }

  static renderWeight(value) {
    if (value == 0) {
      return "";
    } else {
      return Number(value).toFixed(2) + "%";
    }
  }
}

