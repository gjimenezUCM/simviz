import { theController } from "../controller";
import nanoMarkdown from "nano-markdown";
import { SimConfigurator } from "./simConfigurator";
import { theSimilarityDAO } from "../DAO/similarityDAO";
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

  /**
   * Updates the panel title displayed on the top of the panel
   * @param newTitle The new title displayed in the panel
   */
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

  /**
   * Updates the case base description
   * @param newTitle The new case base description displayed in the panel
   */
  updateCasebaseDescription(
    casebaseName: string,
    casebaseDescription: string,
    numcCases: number
  ) {
    let datasetDescription = document.getElementById("dataset-desc");
    if (datasetDescription) {
      datasetDescription.innerHTML = `<h4>Description</h4>
        ${nanoMarkdown(casebaseDescription)}
        <h4>Number of instances</h4>
        <p>${numcCases}</p>`;
    }
    this.updatePanelTitle(casebaseName);
  }

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
            </div>`;
    }
  }
}
