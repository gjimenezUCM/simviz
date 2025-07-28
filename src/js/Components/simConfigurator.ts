import { SimilarityComputing } from "../utils/similarityComputing";
import { theController } from "../controller";
import { SimilarityPanel } from "./similarityPanel";
import SimilarityData from "../DAO/similarityData";
import { theSimilarityDAO } from "../DAO/similarityDAO";
import TemplateManager from "../utils/templateManager";
import { SimilarityConfiguration } from "../types/simvizTypes";
import {
  getWeightInSimilarityConfiguration,
  setWeightInSimilarityConfiguration,
} from "../utils/caseUtils";

const formAttributeRow = `
        <div class="col-4 text-end"><label for="input-att-{{attName}}" class="form-label">{{attName}}</label></div>
        <div class="col-3"><input class="form-control" id="input-att-{{attName}}" value={{weightValue}} aria-describedby="att-{{attName}}-weight"></div>
        <div class="col-3"><input type="range" class="form-range" min="0" max="1" step="0.05" value={{weightValue}} id="range-att-{{attName}}"></div>`;

/**
 * This class represents the panel employed to configurate a new similarity measure based
 * on a previous one. The panel displays a slider for each attribute employed in a previous
 * similarity function. After modifying the weight attributes and closing the panel, it computes
 * new similarity scores using {@link SimilarityComputing}.
 */
export class SimConfigurator {
  /**
   * The similarity panel where the similarity configurator is created
   */
  similarityPanel: SimilarityPanel;

  /**
   * Input elements for visualizing attribute weights
   */
  attInputElements: Array<HTMLInputElement>;

  /**
   * Sliders for modifying attribute weights
   */
  attRangeElements: Array<HTMLInputElement>;

  /**
   * True if the similarity values must be recalculated
   */
  recalculated: boolean;

  /**
   * True if the Similarity configuration panel is activated
   */
  started: boolean;

  /**
   * A similarity DAO
   */
  //simDAO: SimilarityDAO;

  /**
   * The similarity data that might be modified using this panel
   */
  oldSimData: SimilarityData;

  /**
   * Constructor
   * @param parentSimilarityPanel Similarity panel that will contain this SimConfigurator
   */
  constructor(parentSimilarityPanel: SimilarityPanel) {
    this.similarityPanel = parentSimilarityPanel;
    this.attInputElements = [];
    this.attRangeElements = [];
    let configPanel = document.getElementById("similarity-configuration");
    this.recalculated = false;
    if (configPanel) {
      configPanel.addEventListener("hidden.bs.modal", (e) => {
        // HACK: Bootstrap fires hide.bs.modal twice
        // This way we avoid to recalculate everything twice
        if (!this.recalculated) {
          this.recalculateSimilarity();
          this.recalculated = true;
        }
      });
      configPanel.addEventListener("show.bs.modal", (e) => {
        this.recalculated = false;
      });
    }
    this.started = false;
  }

  /**
   * Initializes the Similarity Configuration panel
   * @param simData The similarity data that might be modified
   */
  init(simData: SimilarityData): void {
    this.attInputElements = [];
    this.attRangeElements = [];
    this.oldSimData = simData;
    let oldSimDescription = simData.similarityConfiguration;
    let theForm = document.getElementById("similarity-configuration-form");
    if (theForm) {
      theForm.innerHTML = "";
      // Create a row for each attribute
      for (let [attName, simFunction] of Object.entries(
        oldSimDescription.localSim
      )) {
        this.createRowsForAtt(theForm, attName, oldSimDescription, attName);
      }
      this.started = true;
    }
  }

  /**
   * Creates form rows for an attribute and its nested attributes. Each row contains
   * the attribute name, a slider and the current weight value.
   *
   * @param theForm - The HTML form element to add rows to
   * @param attName - The name of the attribute to create rows for
   * @param similarityDescription - The similarity configuration object containing attribute weights and nested configurations
   * @param displayedAttName - The display name for the attribute shown in the UI
   *
   * @remarks
   * This method recursively processes nested similarity configurations, creating form rows
   * for each attribute at every level of nesting. Nested attribute names are concatenated
   * with dots as separators.
   */
  private createRowsForAtt(
    theForm: HTMLElement,
    attName: string,
    similarityDescription: SimilarityConfiguration,
    displayedAttName: string
  ) {
    let attWeight = getWeightInSimilarityConfiguration(
      similarityDescription,
      attName
    );
    this.createRow(theForm, displayedAttName, attWeight);
    let nestedDescription =
      similarityDescription.localSim[attName].nestedSimilarityConfiguration;
    if (nestedDescription) {
      attName += ".";
      for (let innerAttName of Object.keys(nestedDescription.localSim)) {
        let tempAttName = attName + innerAttName;
        this.createRowsForAtt(
          theForm,
          innerAttName,
          nestedDescription,
          tempAttName
        );
      }
    }
  }

  /**
   * Creates a form row with input and range controls for attribute weight configuration.
   *
   * @param theForm - The HTML form element to append the row to
   * @param attName - The name of the attribute to create controls for
   * @param attWeight - The initial weight value for the attribute (0-1)
   *
   */
  private createRow(theForm: HTMLElement, attName: string, attWeight: number) {
    let aRow = document.createElement("div");
    aRow.classList.add("row", "align-items-center");
    let attRowElement = TemplateManager.generate(formAttributeRow, {
      attName: attName,
      weightValue: attWeight,
    });
    aRow.innerHTML = attRowElement;
    theForm.appendChild(aRow);
    let inputWeightValue = document.getElementById(
      `input-att-${attName}`
    ) as HTMLInputElement;
    if (inputWeightValue) {
      inputWeightValue.value = attWeight.toFixed(2);
      inputWeightValue.addEventListener("input", (event) => {
        let wValue = Math.min(
          Math.max(parseFloat(inputWeightValue.value), 0),
          1
        );
        inputWeightValue.value = wValue.toFixed(2);
        rangeWeightValue.value = inputWeightValue.value;
      });
    }
    let rangeWeightValue = document.getElementById(
      `range-att-${attName}`
    ) as HTMLInputElement;
    if (rangeWeightValue) {
      rangeWeightValue.addEventListener("input", (event) => {
        let wValue = Math.min(
          Math.max(parseFloat(rangeWeightValue.value), 0),
          1
        );
        rangeWeightValue.value = wValue.toFixed(2);
        inputWeightValue.value = rangeWeightValue.value;
      });
    }
    this.attInputElements.push(inputWeightValue);
    this.attRangeElements.push(rangeWeightValue);
  }

  /**
   * Recalculate the similarity data using the weights modified by the user
   */
  recalculateSimilarity() {
    // Avoid multiple calls
    if (this.started) {
      let newSimilarityName = "";
      let oldSimDescription = this.oldSimData.similarityConfiguration;
      let newDescription = JSON.parse(JSON.stringify(oldSimDescription));
      let modified = false;
      let i = 0;
      for (let weightInput of this.attInputElements) {
        let attName = weightInput.id;
        if (attName.startsWith("input-att-")) {
          attName = attName.replace("input-att-", "");
        }
        let newWeight = parseFloat(weightInput.value);
        if (newWeight > 0) {
          let oldWeight = getWeightInSimilarityConfiguration(
            oldSimDescription,
            attName
          );
          newSimilarityName += attName + (newWeight * 100).toFixed(0);
          if (
            oldWeight !== newWeight &&
            setWeightInSimilarityConfiguration(
              newDescription,
              attName,
              newWeight
            )
          ) {
            modified = true;
          }
        } else {
          setWeightInSimilarityConfiguration(newDescription, attName, 0.0);
          modified = true;
        }
      }

      // Only recalculate if any weight has been modified
      if (newSimilarityName !== "" && modified) {
        theController.showLoadingOverlay();
        // launch using setTimeout to display the overlay
        setTimeout(() => {
          let newSimData: SimilarityData = SimilarityComputing.run(
            this.oldSimData.similarityScores,
            newDescription
          );
          theSimilarityDAO.addSimilarityData(newSimilarityName, newSimData);
          this.similarityPanel.addSimilarityFunctionToDropdown(
            newSimilarityName,
            true
          );
          theController.hideLoadingOverlay();
        }, 100);
      }
    }
  }
}
