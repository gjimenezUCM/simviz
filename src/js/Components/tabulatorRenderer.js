import { theController } from "../controller";
import { Popover } from "bootstrap";
import nanoMarkdown from "nano-markdown";

import { Tabulator, FormatModule, DataTreeModule } from "tabulator-tables";

const TABLE_ELEMENT_ID = "case-comparison-table";
/**
 * A table renderer to display the case comparator.
 * It uses {@link http://https://tabulator.info/|Tabulator library},
 * which supports nested rows and custom renderers for different types of data attributes
 */
export class TabulatorRenderer {
  /**
   * Constructor
   * @param allAtts
   * @param simDescription
   * @param attId
   */
  constructor(allAtts, simDescription, attId) {
    Tabulator.registerModule([DataTreeModule, FormatModule]);
    this.initTable(allAtts, simDescription, attId);
  }

  /**
   * Initializes the table with attributes data and similarity configuration.
   * Sets up the data structure for displaying attributes in a tabulator table,
   * separating attributes used in similarity functions from remaining attributes.
   *
   * @param {Object} allAtts - Object containing all attributes with their types
   * @param {Object} simDescription - Similarity description object
   * @param {string} attId - The attribute ID to be used as case identifier
   */
  initTable(allAtts, simDescription, attId) {
    this.remainingAtts = {};
    this.simAtts = {};
    this.attId = attId;
    this.data = [];
    this.leftCaseId = null;
    this.rightCaseId = null;
    this.similarity = null;
    this.similarityColor = null;
    this.table = null;

    // If the table is configured for a similarity function then we will start with the attributes
    // employed by the similarity function
    if (simDescription) {
      let listAttsInSim = Object.keys(simDescription.localSim);
      for (let attName of listAttsInSim) {
        // Ignore attribute id because it appear in the table header
        if (attName === attId) continue;

        let rowData = this.createRowData(attName, allAtts, simDescription);
        this.simAtts[attName] = rowData;
      }
    }

    // Now add the attributes that are not part of the similarity function
    for (let attName of Object.keys(allAtts)) {
      // Ignore attribute id because it appear in the table header
      if (attName === attId) continue;
      // Ignore attribute because it was previously added to the table
      if (this.simAtts && attName in this.simAtts) continue;
      this.remainingAtts[attName] = this.createRowData(attName, allAtts, null);
    }

    this.data = Object.values(this.simAtts);
    this.data.push(...Object.values(this.remainingAtts));

    this.createTable(this.data);
  }

  /**
   * Creates a row data structure in the table for a case attribute using a similarity configuration.
   * If the attribute contains nested data, this function can create several nested rows.
   * @param {string} attName - The attribute name to create row data for
   * @param {Object} allAtts - Object containing all attributes and their types
   * @param {Object} simDescription - Similarity description object (can be null)
   * @returns {Object} Row data object with attribute info, cases, value and optional children for nested attributes
   */
  createRowData(attName, allAtts, simDescription) {
    // Check if simDescription!=== null (an attribute employed in the similarity fuction)
    if (simDescription) {
      //
      if (
        simDescription.localSim[attName].nestedSimilarityConfiguration !== null
      ) {
        let rowData = {
          attribute: {
            name: attName,
            type: "object",
            similarityConfiguration: JSON.parse(
              JSON.stringify(simDescription.localSim[attName])
            ),
          },
          leftCase: null,
          rightCase: null,
          value: null,
          _children: [],
        };
        rowData["attribute"]["similarityConfiguration"]["weight"] =
          rowData["attribute"]["similarityConfiguration"]["weight"] * 100;
        let listAttsInSim = Object.keys(
          simDescription.localSim[attName].nestedSimilarityConfiguration
            .localSim
        );
        for (let localAttName of listAttsInSim) {
          let subRowData = this.createRowData(
            localAttName,
            allAtts[attName],
            simDescription.localSim[attName].nestedSimilarityConfiguration
          );
          rowData._children.push(subRowData);
        }
        return rowData;
      } else {
        let rowData = {
          attribute: {
            name: attName,
            type: allAtts[attName],
            similarityConfiguration: JSON.parse(
              JSON.stringify(simDescription.localSim[attName])
            ),
          },
          leftCase: null,
          rightCase: null,
          value: null,
        };
        rowData["attribute"]["similarityConfiguration"]["weight"] =
          rowData["attribute"]["similarityConfiguration"]["weight"] * 100;

        return rowData;
      }
    } else {
      // A "Remaining attribute": the row does not contain a similarity function
      return {
        attribute: {
          name: attName,
          type: allAtts[attName],
          similarityConfiguration: null,
        },
        leftCase: null,
        rightCase: null,
        value: null,
      };
    }
  }

  /**
   * Updates rows in the table by setting values for a specific column.
   * Handles both primitive values and nested objects by recursively updating child attributes.
   *
   * @param {Object} item - The source object containing the data to update with
   * @param {Object} atts - The attributes object mapping keys to their corresponding rows
   * @param {string} columnName - The name of the column to update in the target rows
   *
   */
  updateRows(item, atts, columnName) {
    for (const [key, value] of Object.entries(atts)) {
      if (
        item[key] &&
        typeof item[key] === "object" &&
        !Array.isArray(item[key])
      ) {
        let subAtts = Object.keys(item[key]);
        let children = value._children;
        for (let subAtt of subAtts) {
          for (let child of children) {
            if (child["attribute"]["name"] === subAtt) {
              child[columnName] = item[key][subAtt];
            }
          }
        }
      } else {
        value[columnName] = item[key];
      }
    }
  }

  /**
   * Modify the case  on left column of the table
   * @param id Case unique id
   * @param item Case content
   */
  updateLeftColCase(id, item) {
    if (item) {
      this.updateRows(item, this.simAtts, "leftCase");
      this.updateRows(item, this.remainingAtts, "leftCase");
    } else {
      this.resetValues(true);
    }
    this.updateLeftCaseHeader(id);
    //this.table.setData(this.data);
  }

  /**
   * Modify the case  on left column of the table
   * @param id Case unique id
   * @param item Case content
   */
  updateRightColCase(id, item) {
    if (item) {
      this.updateRows(item, this.simAtts, "rightCase");
      this.updateRows(item, this.remainingAtts, "rightCase");
    } else {
      this.resetValues(false);
    }
    this.updateRightCaseHeader(id);
    //this.table.setData(this.data);
  }

  /**
   * Resets the case values for either left or right case in the table.
   * Clears the specified case data and updates the corresponding header
   *
   * @param {boolean} leftCase - If true, resets left case values; if false, resets right case values
   */
  resetValues(leftCase) {
    if (leftCase) {
      this.resetAttributeValues(this.simAtts, "leftCase");
      this.resetAttributeValues(this.remainingAtts, "leftCase");
      this.updateLeftCaseHeader(null);
    } else {
      this.resetAttributeValues(this.simAtts, "rightCase");
      this.resetAttributeValues(this.remainingAtts, "rightCase");
      this.updateRightCaseHeader(null);
    }
    //this.table.setData(this.data);
  }

  resetAttributeValues(attList, columnName) {
    Object.values(attList).forEach((att) => {
      if ("_children" in att) {
        this.resetAttributeValues(att._children, columnName);
      }
      att[columnName] = null;
    });
  }

  /**
   * Updates the header information with case IDs and similarity value. If a value is null,
   * it resets to empty values.
   * @param {string|null} [leftCaseId=null] - The ID of the left case to display in the header
   * @param {string|null} [rightCaseId=null] - The ID of the right case to display in the header
   * @param {number|null} [similarity=null] - The similarity value between the two cases
   */
  updateHeader(leftCaseId = null, rightCaseId = null, similarity = null) {
    this.leftCaseId = leftCaseId;
    this.rightCaseId = rightCaseId;
    this.similarity = similarity;
  }

  /**
   * Updates the left case header with the specified ID.
   * @param {string|number} id - The ID to set for the left case header
   */
  updateLeftCaseHeader(id) {
    this.leftCaseId = id;
  }

  /**
   * Updates the right case header with the specified ID.
   * @param {string|number} id - The ID to set for the left case header
   */
  updateRightCaseHeader(id) {
    this.rightCaseId = id;
  }

  /**
   * Updates the similarity header with a new value and tints the cell background using the
   * corresponding color.
   * @param {number|string} value - The similarity value to display in the header
   * @param {string} color - The color to apply to the similarity header
   */
  updateSimilarityHeader(value, color) {
    this.similarity = value;
    this.similarityColor = color;
  }

  /**
   * Update the similarity value between two cases. It changes the global similarity value
   * on the header and the local similarity values
   * @param newSimValue An object that contains the similarity value (with global and local similarity values)
   * @param color The color employed for the global similarity value
   */
  updateSimilarityValue(newSimValue, color) {
    if (newSimValue !== null) {
      this.updateSimilarityHeader(newSimValue.value.toFixed(3), color);
    } else {
      this.updateSimilarityHeader(null);
    }
    this.updateValue(newSimValue, this.simAtts);
  }

  /**
   * Updates similarity values in an attribute list using a {@linkcode SimilarityValue} object. If this object
   * is null, then it removes similarity values. This function is used recursively
   * to processes nested attributes.
   *
   * @param {Object|null} newSimValue The similarity value (can be null)
   * @param {Object} attList The list of attributes that will be updated
   */
  updateValue(newSimValue, attList) {
    if (newSimValue) {
      Object.values(attList).forEach((att) => {
        if ("_children" in att) {
          this.updateValue(
            newSimValue.attributes[att.attribute.name],
            att._children
          );
          att["value"] = newSimValue["value"];
        } else {
          att["value"] = newSimValue.attributes[att.attribute.name];
        }
      });
    } else {
      Object.values(attList).forEach((att) => {
        if ("_children" in att) {
          this.updateValue(null, att._children);
        }
        att["value"] = null;
      });
    }
  }

  /**
   * Creates and initializes a table in the case comparisonpanel.
   *
   * This method destroys any existing table, creates a new Tabulator instance with
   * predefined columns for attribute comparison, and sets up event handlers for
   * interactive elements like taxonomy links and pin buttons.
   *
   * @param {Array} theData - The data array to populate the table with.
   *
   */
  createTable(theData) {
    let root = document.getElementById(TABLE_ELEMENT_ID);
    if (root) {
      root.innerHTML = "";
    }
    if (this.table) {
      this.table.destroy();
    }
    this.table = new Tabulator(`#${TABLE_ELEMENT_ID}`, {
      data: theData,
      dataTree: true,
      dataTreeStartExpanded: true,
      dataTreeExpandElement:
        "<i class='bi bi-caret-right-square tabulator-data-tree-control-expand'> </i>",
      dataTreeCollapseElement:
        "<i class='bi bi-caret-down-square tabulator-data-tree-control-collapse'> </i>",
      dataTreeBranchElement: false,
      layout: "fitColumns",
      height: "100%",
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
          formatter: RenderUtils.renderWeightAsProgressBar,
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
          formatter: RenderUtils.renderByType,
          cssClass: "dt-left-case",
          headerHozAlign: "right",
          variableHeight: true,
        },
        {
          title: "Similarity",
          field: "value",
          width: "10%",
          hozAlign: "center",
          cssClass: "dt-att-value",
          headerHozAlign: "center",
          formatter: RenderUtils.renderNumber,
          formatterParams: { renderNull: false, precision: 3 },
        },
        {
          title: "caseId",
          field: "rightCase",
          formatter: RenderUtils.renderByType,
          cssClass: "dt-right-case",
          variableHeight: true,
        },
      ],
    });

    let that = this;
    this.table.on("dataLoaded", function (data) {
      // 1. Update headers
      let el = document.querySelector(
        ".tabulator-col[role='columnheader'].dt-left-case .tabulator-col-title"
      );
      if (el) {
        if (that.leftCaseId) {
          // 1.1 Add pin button on the left case header
          el.innerHTML = `<button class="btn btn-sm btn-primary" data-item-id="${that.leftCaseId}">
          <i class="bi-pin"></i>
          </button>
          <span class="item-id-value">${that.leftCaseId}</span>`;
        } else {
          el.innerHTML = "Case Id";
        }
      }

      el = document.querySelector(
        ".tabulator-col[role='columnheader'].dt-right-case .tabulator-col-title"
      );
      if (el) {
        if (that.rightCaseId) {
          // 1.2 Add pin button on the right case header
          el.innerHTML = `<span class="item-id-value">${that.rightCaseId}</span>
          <button class="btn btn-sm btn-primary" data-item-id="${that.rightCaseId}">
          <i class="bi-pin"></i>
          </button>`;
        } else {
          el.innerHTML = "Case Id";
        }
      }
      el = document.querySelector(
        ".tabulator-col[role='columnheader'].dt-att-value .tabulator-col-title"
      );
      if (el) {
        // 1.3 Update similarity header
        if (that.similarityColor) {
          el.parentElement.parentElement.style.backgroundColor =
            that.similarityColor;
        } else {
          el.parentElement.parentElement.style.backgroundColor = "transparent";
        }
        el.innerHTML = that.similarity
          ? `<span>${that.similarity}</span>`
          : `<span>Similarity</span>`;
      }

      // 2. Update taxonomy links for taxonomy atributes
      let taxonomyLinks = document.querySelectorAll(
        "#case-comparison-panel a.taxonomy-label"
      );
      // 2.1 Suscribe to click events on links to taxonomyLabels
      for (let link of taxonomyLinks) {
        link.addEventListener("click", (event) => {
          if (event.currentTarget) {
            let label = event.currentTarget.getAttribute("data-label");
            if (label) {
              theController.focusOnTaxonomyNode(label);
            }
          }
        });
      }

      // 3. Update pin link buttons
      let pinButtons = document.querySelectorAll(
        "#case-comparison-table button[data-item-id]"
      );
      // Suscribe to click events on pin buttons
      for (let btn of pinButtons) {
        btn.addEventListener("click", (event) => {
          if (event.currentTarget) {
            let itemId = event.currentTarget.getAttribute("data-item-id");
            if (itemId) {
              theController.filterByCaseId(itemId);
            }
          }
        });
      }
    });
  }

  /**
   * Repaint the table with the current stored data
   */
  repaint() {
    this.table.setData(this.data);
  }
}

/**
 * A utility class containing the functions to render specific SimViz datatypes
 */
class RenderUtils {
  /**
   * Formats cell content based on the attribute type specified in the cell data.
   *
   * @param {Object} cell - The Tabulator cell object containing the data to be formatted
   * @param {Object} formatterParams - Additional parameters for the formatter
   * @param {Function} onRendered - Callback function to be executed when rendering is complete
   * @returns {string} The formatted HTML string representation of the cell content
   */
  static renderByType(cell, formatterParams, onRendered) {
    let data = cell.getData();
    if ("type" in data.attribute) {
      if (typeof data.attribute["type"] === "object") {
        return "&nbsp;";
      }
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
        case "object":
          return "&nbsp;";
        default:
          return RenderUtils.renderDefault(cell);
      }
    } else {
      return RenderUtils.renderDefault(cell);
    }
  }
  /**
   * Default renderer. It displays an empty badge if the cell is empty
   * @param {Object} cell - The Tabulator cell object containing the data to be formatted
   * @returns {string} The formatted HTML string representation of the cell content
   */
  static renderDefault(cell) {
    if (cell.getValue()) {
      cell.getElement().style.whiteSpace = "pre-wrap";
      return cell.getValue();
    } else {
      return `<span class="badge text-bg-danger">EMPTY</span>`;
    }
  }

  /**
   * Number renderer. It displays an empty badge if the cell is empty and
   * it displays a float with a predefined number of decimals (0 by default)
   * @param {Object} cell - The Tabulator cell object containing the data to be formatted
   * @returns {string} The formatted HTML string representation of the cell content
   */
  static renderNumber(cell, formatterParams) {
    if (cell.getValue() !== null) {
      let precision = formatterParams.precision ? formatterParams.precision : 0;
      return Number(cell.getValue()).toFixed(precision);
    } else {
      if (formatterParams && formatterParams["renderNull"]) {
        return `<span class="badge text-bg-danger">EMPTY</span>`;
      } else {
        return "";
      }
    }
  }

  /**
   * Image renderer. It displays an image that fits inside the cell
   * @param {Object} cell - The Tabulator cell object containing the data to be formatted
   * @returns {string} The formatted HTML string representation of the cell content
   */
  static renderImage(cell, formatterParams, onRendered) {
    let data = cell.getData();
    let template = document.createElement("template");
    if (data && data[cell.getField()]) {
      let value = data[cell.getField()];
      template.innerHTML = `<img class="img-fluid" height="15vh" src="${value}"/>`;
      template.content.firstChild.addEventListener("load", function () {
        cell.getRow().normalizeHeight();
      });
    } else {
      template.innerHTML = `<span class="badge text-bg-danger">EMPTY</span>`;
    }
    return template.content.firstChild;
  }

  /**
   * Color renderer. It displays one or several boxes in a specific color. This color
   * can be provided as a RGB or a X11 string color.
   * @param {Object} cell - The Tabulator cell object containing the data to be formatted
   * @returns {string} The formatted HTML string representation of the cell content
   */
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
        template.innerHTML = `<div>${colorBoxes.join("")}</div>`;
      }
    } else {
      template.innerHTML = `<span class="badge text-bg-danger">EMPTY</span>`;
    }
    return template.content.firstChild;
  }

  /**
   * Taxonomy laber renderer. It displays a label from a taxonomy node. This label is
   * interactive and clicking on it selects the corresponding node in the taxonomy viewer.
   * @param {Object} cell - The Tabulator cell object containing the data to be formatted
   * @returns {string} The formatted HTML string representation of the cell content
   */
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
          theController.focusOnTaxonomyNode(label);
        }
      }
    });
    return link;
  }

  /**
   * Similarity function renderer. It displays a function button. When clicked, it
   * displays a textual description of the similarity function employed in this row.
   * @param {Object} cell - The Tabulator cell object containing the data to be formatted
   * @returns {string} The formatted HTML string representation of the cell content
   */
  static renderSimilarityFunction(cell, formatterParams, onRendered) {
    let data = cell.getValue();
    //return "&nbsp;";
    if (data && data.name) {
      const template = document.createElement("template");
      template.innerHTML = `<button class="btn btn-sm btn-function"><img src="./images/function-white.png" alt="similarity function icon" width="14"></button>`;
      let button = template.content.firstChild;
      const popover = new Popover(button, {
        title: data.name,
        content: data.description ? nanoMarkdown(data.description) : "",
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
  // /**
  //  * Weight renderer. It returns the value tahat will be displayed inside the progress bar
  //  * @returns {string} The formatted HTML string representation of the corresponding weight
  //  */
  // static renderWeight(value) {
  //   if (value == 0) {
  //     return "";
  //   } else {
  //     return Number(value).toFixed(2) + "%";
  //   }
  // }

  /**
   * Custom progress bar. It is rendered only if the cell contains a value
   * @param {Object} cell - The Tabulator cell object containing the data to be formatted
   * @returns {string} The formatted HTML string representation of the cell content
   */
  static renderWeightAsProgressBar(cell, formatterParams, onRendered) {
    let value = cell.getValue();
    if (value !== null || value > 0) {
      formatterParams = {
        color: "#dda8f8",
        legendColor: "#000000",
        legendAlign: "justify",
        legend: Number(value).toFixed(2) + "%",
      };
      return FormatModule.formatters.progress.call(
        FormatModule.prototype,
        cell,
        formatterParams,
        onRendered
      );
    } else {
      return "";
    }
  }
}
