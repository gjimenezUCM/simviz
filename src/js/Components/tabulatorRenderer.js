/*
 * CSS imports
 */
import "tabulator-tables/dist/css/tabulator_bootstrap5.min.css";

/*
 * JS/TS imports
 */
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
    SimilarityConfiguration,
    SimilarityValue,
    StringStringObject,
  } from "../types/simvizTypes";
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
  constructor(
    allAtts,
    simDescription,
    attId
  ) {
    console.log(Tabulator);
    
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
            legend: this.formatWeight,
          },
          cssClass: "dt-att-weight",
          vertAlign: "bottom",
        },
        {
          title: "",
          field: "attribute.similarityConfiguration",
          width: "5%",
          formatter: this.renderSimilarityFunction,
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
      let el= document.querySelector(
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
  updateSimilarityValue(
    newSimValue,
    color
  ) {}

  formatWeight(value) {
    return Number(value).toFixed(2) + "%";
  }

  renderSimilarityFunction(
    cell,
    formatterParams,
    onRendered
  ) {
    let data = cell.getValue();
    const template = document.createElement("template");
    template.innerHTML = `<button class="btn btn-dark btn-sm btn-function"><img src="./images/function-white.png" alt="similarity function icon" width="14"></button>`;
    let button= template.content.firstChild ;
    const popover = new Popover(button, {
      title: data.simFunction,
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
  }

  formatByType(
    cell,
    formatterParams,
    onRendered
  ){
    return "";
  }
};

