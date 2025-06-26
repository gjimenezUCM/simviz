
import { theController } from "../controller";
import { Popover } from "bootstrap";
import nanoMarkdown from 'nano-markdown';
import { SimConfigurator } from "./simConfigurator";
import { theSimilarityDAO } from "../DAO/similarityDAO";
import { CasebaseDAO } from "../DAO/casebaseDAO";
import { SimilarityConfiguration } from "../types/simvizTypes";

/**
 * Max size in pixels of the bar that visually represents a weight
 */
const MAX_WEIGHTBAR_SIZE_PX = 50;

/**
 * Class component in charge of the similarity panel in the UI
 */
export class SimilarityPanel {
  /**
   * The panel for configuring new similarity functions
   */
  private simConf: SimConfigurator;

  /**
   * A DAO that stores casebases
   */
  //private casebaseDAO: CasebaseDAO;

  /**
   * The button for activating the panel for configuring new similarity functions
   */
  private configSimilarityButton: HTMLButtonElement | null;

  /**
   * The dropdown employed to select a similarity function
   */
  private similarityFunctionMenu: HTMLSelectElement | null;

  /**
   * Constructor
   */
  constructor() {
    this.simConf = new SimConfigurator(this);
    this.configSimilarityButton = document.getElementById(
      "btn-show-configurator"
    ) as HTMLButtonElement;
  }

  /**
   * Initialize the similarity panel using the DAOs already loaded
   */
  init() {
    const simFiles = theSimilarityDAO.getFiles();
    this.similarityFunctionMenu = document.getElementById(
      "similarity-select"
    ) as HTMLSelectElement;
    if (this.similarityFunctionMenu) {
      this.similarityFunctionMenu.innerHTML =
        "<option selected>Choose similarity function...</option>";
      for (let file of simFiles) {
        this.addSimilarityFunctionToDropdown(file);
      }
      this.similarityFunctionMenu.addEventListener("change", () => {
        if (
          this.similarityFunctionMenu &&
          this.similarityFunctionMenu.selectedIndex !== 0
        ) {
          this.loadSimilarityFunction(this.similarityFunctionMenu.value);
        }
      });
      this.similarityFunctionMenu.selectedIndex = 0;
      this.updateSimilarityDescription("", null);
    }

    if (this.configSimilarityButton) {
      this.configSimilarityButton.classList.add("visually-hidden");
    }
  }

  updatePanelTitle(newTitle: string) {
    let theTitle = document.querySelector("#info-panel .panel-header");
    if (theTitle) {
      newTitle = newTitle.length === 0 ? "Dataset metadata" : newTitle;
      theTitle.innerHTML = newTitle;
    }
  }

  /**
   * Load a similarity function
   * @param similarityFunctionName Name of the similarity function that should be loaded
   */
  private async loadSimilarityFunction(similarityFunctionName: string) {
    // This is a time consuming task so show the spin loader
    theController.showLoadingOverlay();
    let simData = await theSimilarityDAO.getSimilarityDataByName(
      similarityFunctionName
    );
    if (simData) {
      // We need to use a setTimeout to show the spin while loading
      setTimeout(() => {
        theController.onSimilaritySelected(simData);
        this.updateSimilarityDescription(
          similarityFunctionName,
          simData.similarityConfiguration
        );
        this.simConf.init(simData);
        // Show the configuration button
        if (this.configSimilarityButton) {
          this.configSimilarityButton.classList.remove("visually-hidden");
        }
        // Hide the spin loader
        theController.hideLoadingOverlay();
      }, 0);
    } else {
      // Hide the spin loader
      theController.hideLoadingOverlay();
    }
  }

  updateCasebaseDescription(casebaseName: string, casebaseDescription:string, numcCases: number) {
    let datasetDescription = document.getElementById("dataset-desc");
    if (datasetDescription) {
        datasetDescription.innerHTML = `<h4>Description</h4>
        ${nanoMarkdown(casebaseDescription)}
        <h4>Number of instances</h4>
        <p>${numcCases}</p>`;
    }
    this.updatePanelTitle(casebaseName);
  };


  /**
   * Add a new similarity function to the dropdown element of the similarity panel.
   * By default, the similarity function is added but the function is not selected.
   * However, it can be automatically selected using the "andSelect" parameter
   * @param simFunctionName Name of the similarity function added
   * @param andSelect If true, it changes the dropdown to the added similarity function (and loads it)
   */
  addSimilarityFunctionToDropdown(
    simFunctionName: string,
    andSelect: boolean = false
  ) {
    let item = document.createElement("template");
    item.innerHTML = `<option class="dropdown-item" data-sim-name="${simFunctionName}">${simFunctionName}</option>`;
    if (this.similarityFunctionMenu) {
      this.similarityFunctionMenu.appendChild(item.content.children[0]);
      if (andSelect) {
        this.similarityFunctionMenu.selectedIndex =
          this.similarityFunctionMenu.childElementCount - 1;
        this.similarityFunctionMenu.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }
    }
  }

  /**
   * Update the information about the selected similarity function
   * @param simDescription Description of the similarity function that should be updated.
   * If null, it removes the previous information displayed by the panel
   */
  private updateSimilarityDescription(
    similarityFunctionName: string,
    simDescription: SimilarityConfiguration | null
  ): void {
    let parent = document.getElementById("sim-desc");
    if (parent) {
      // If the paremeter is null, remove the current information
      if (simDescription === null) {
        parent.innerHTML = "";
        return;
      }
      parent.innerHTML = `
            <h3>${similarityFunctionName}</h3>
            <h4>Global function</h4>
            <p id="global-sim-desc">${simDescription.globalSim.name}</p>
            <h4>Local functions</h4>
            <div class="table-responsive">
            <table id="local-sim-desc"class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Weight</th>
                        <th>Function</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            </div>`;

      let tableParent = parent.querySelector("tbody");
      if (tableParent) {
        // Populate the table with local similarity functions
        for (let [attName, localDesc] of Object.entries(
          simDescription.localSim
        )) {
          let aRow = document.createElement("tr");
          aRow.innerHTML = `
                        <td style="width: 25%" class="dt-att-name">${attName}</td>
                        <td style="width: 10%">
                            <div class="att-weight align-self-center" data-weight="${
                              localDesc.weight
                            }"></div>
                        </td>
                        <td class="sim-function-name">${
                          localDesc.description
                            ? '<button class="btn btn-sm btn-function"><img src="./images/function-white.png" alt="similarity function icon"></button>'
                            : ""
                        }<span>${localDesc.name}</span></td>`;
          tableParent.appendChild(aRow);
          if (localDesc.description) {
            let helpIcon = aRow.querySelector("button");
            if (helpIcon) {
              const popover = new Popover(helpIcon, {
                content: localDesc.description
                  ? nanoMarkdown(localDesc.description)
                  : "",
                placement: "bottom",
                html: true,
                trigger: "focus",
              });
              helpIcon.addEventListener("inserted.bs.popover", () => {
                let links = document.querySelectorAll(".popover-body a");
                if (links) {
                  for (let aLink of links) {
                    aLink.setAttribute("target", "_blank");
                  }
                }
              });
            }
          }
        }
      }
    }
    this.populateWeights();
  }

  /**
   * Create the bars for the weights
   */
  private populateWeights() {
    let weights = document.querySelectorAll(
      "#info-panel .att-weight"
    );
    for (let w of weights) {
      let weightString = w.getAttribute("data-weight");
      let wValue = weightString ? parseFloat(weightString) : 0.0;
      let frameBar = document.createElement("div");
      frameBar.style.width = `${MAX_WEIGHTBAR_SIZE_PX + 2}px`;
      w.appendChild(frameBar);
      let weightBar = document.createElement("div");
      weightBar.classList.add("att-weight-bar");
      weightBar.innerHTML = `${(wValue * 100).toFixed(2)}%`;
      weightBar.style.width = `${MAX_WEIGHTBAR_SIZE_PX * wValue}px`;
      frameBar.appendChild(weightBar);
    }
  }
}
