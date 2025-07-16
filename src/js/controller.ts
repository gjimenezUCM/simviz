import { Heatmap } from "./Components/heatmap";
import { Histogram } from "./Components/histogram";
import { CaseComparator } from "./Components/caseComparator";
import { CasebaseDAO } from "./DAO/casebaseDAO";
import SimilarityData from "./DAO/similarityData";
import { SimilarityPanel } from "./Components/similarityPanel";
import vis, { Network } from "vis-network";
import { TaxonomyViewer } from "./Components/taxonomyViewer";
import { StringStringObject } from "./types/simvizTypes";
import { findValueInCase, findValueInSimilarityValue } from "./utils/caseUtils";

/**
 * This class acts as a mediator between different objects and panels in SimViz
 */
class Controller {
  /**
   * Case comparator panel
   */
  private tableComponent: CaseComparator;

  /**
   * Similarity panel
   */
  private similarityPanel: SimilarityPanel;

  private taxonomyViewer: TaxonomyViewer;

  /**
   * Overlay with a spin to represent that something is loading
   */
  private loadingOverlay: HTMLElement | null;

  /**
   * Histogram panel
   */
  private theHistogram: Histogram | null;

  /**
   * Container for the histogram panel
   */
  private histogramContainer: HTMLElement | null;

  /**
   * Heatmap panel
   */
  private theHeatmap: Heatmap | null;

  /**
   * Container for the heatmap panel
   */
  private heatmapContainer: HTMLElement | null;

  /**
   * Reset button over the heatmap. It is employed to reset
   * the stripechart and transform it into the heatmap
   */
  private resetButton: HTMLButtonElement | null;

  /**
   * A casebase DAO
   */
  private casebaseDAO: CasebaseDAO;

  /**
   * Ids of the case base currently loaded
   */
  private caseIds: Array<string>;

  /**
   * Similarity data currently loaded
   */
  private similarityData: SimilarityData;

  /**
   * Case selector (WIP)
   */
  private heatmapSelect: HTMLSelectElement | null;

  /**
   * Constructor
   */
  constructor() {
    this.loadingOverlay = document.getElementById("loading-overlay");
    this.resetButton = document.getElementById(
      "reset-filter-btn"
    ) as HTMLButtonElement;
    this.heatmapSelect = document.getElementById(
      "heatmap-filter-select"
    ) as HTMLSelectElement;
    this.histogramContainer = document.getElementById("histogram");
    this.heatmapContainer = document.getElementById("heatmap");
    this.similarityPanel = new SimilarityPanel();
    this.taxonomyViewer = new TaxonomyViewer();
  }

  /**
   * Reset and update the interface with the similarity data currently loaded
   * @param simData The similarity data currently selected and loaded
   */
  onSimilaritySelected(simData: SimilarityData) {
    let allAttributes = this.casebaseDAO.getAttributes();
    let attId: string = this.casebaseDAO.getAttId();
    this.tableComponent = new CaseComparator(
      allAttributes,
      simData.similarityConfiguration,
      attId
    );
    //this.tableComponent.resetTable();
    // create the histogram and the heatmap with the similarity data loaded (if exists)

    let simDescription = simData ? simData.similarityConfiguration : null;
    this.similarityData = simData;
    this.theHistogram = this.similarityData.similarityMatrix
      ? new Histogram(
          this.caseIds,
          this.similarityData.similarityMatrix,
          this.histogramContainer
        )
      : null;
    if (this.theHistogram) {
      // Suscribe to events when clicking on the histogram
      this.theHistogram.on((source, data) => {
        this.updateCaseInfo(data.id1, data.id2, data.color);
        this.updateSelectedCase(data.id1);
      });
    }

    this.theHeatmap = this.similarityData.similarityMatrix
      ? new Heatmap(
          this.caseIds,
          this.similarityData.similarityMatrix,
          this.heatmapContainer
        )
      : null;
    if (this.theHeatmap) {
      // Suscribe to events when clicking on the heatmap
      this.theHeatmap.on((source, data) => {
        this.updateCaseInfo(data.id1, data.id2, data.color);
        this.updateSelectedCase(data.id1);
      });
    }

    this.populateCaseIdSelect();
    if (this.heatmapSelect) {
      // Suscribe to events when clicking on the selector (WIP)
      this.heatmapSelect.addEventListener("change", (event) => {
        if (this.heatmapSelect) {
          if (this.heatmapSelect.value !== "*") {
            this.filterByCaseId(this.heatmapSelect.value);
          }
        }
      });
    }

    if (this.resetButton) {
      // Suscribe to events when clicking on reset button
      this.resetButton.addEventListener("click", (event) => {
        if (this.theHeatmap) this.theHeatmap.reset();
        if (this.heatmapSelect) this.heatmapSelect.selectedIndex = 0;
        this.tableComponent.resetTable();
        if (this.resetButton) this.resetButton.classList.add("visually-hidden");
      });
    }

    window.addEventListener("resize", (event) => {
      this.onResize();
    });
  }

  /**
   * Reset the interface because the user has selected a new dataset/casebase
   * @param casebaseDAO The DAO for the dataset/casebase selected
   */
  onDatasetSelected(casebaseName: string, casebaseDAO: CasebaseDAO) {
    this.histogramContainer ? (this.histogramContainer.innerHTML = "") : null;
    this.heatmapContainer ? (this.heatmapContainer.innerHTML = "") : null;
    this.heatmapSelect ? (this.heatmapSelect.selectedIndex = 0) : null;
    // FIX: add for VanillaRenderer
    // if (this.tableComponent) {
    //     this.tableComponent.resetTable();
    // }
    this.casebaseDAO = casebaseDAO;
    this.caseIds = casebaseDAO.getIds();
    this.similarityPanel.init();
    this.similarityPanel.updateCasebaseDescription(
      casebaseName,
      casebaseDAO.getDescription(),
      casebaseDAO.getNumCases()
    );
    this.resetButton ? this.resetButton.classList.add("visually-hidden") : null;
    let allAttributes = this.casebaseDAO.getAttributes();
    let attId: string = this.casebaseDAO.getAttId();
    this.tableComponent = new CaseComparator(allAttributes, null, attId);
    // FIX: add for VanillaRenderer
    //this.tableComponent.resetTable();
    this.taxonomyViewer.clearTaxonomyViewer();
    let tax = casebaseDAO.getTaxonomy();
    if (tax) {
      this.taxonomyViewer.init(tax);
    }
  }

  /**
   * This function is called when the Case comparator must be updated (because the user clicked
   * on the histogram, on the heatmap or selected a new dataset)
   * @param rowCaseId Id of the first case (row on the heatmap)
   * @param colCaseId Id of the second case (column on the heatmap)
   * @param color Color of the similarity value
   */
  private updateCaseInfo(rowCaseId: string, colCaseId: string, color: string) {
    let rowCase: Object | null = null;
    let colCase: Object | null = null;
    if (rowCaseId) {
      rowCase = this.casebaseDAO.getCaseById(rowCaseId);
      this.tableComponent.updateRowCase(rowCaseId, rowCase);
    } else {
      this.tableComponent.resetRowItem();
    }

    if (colCaseId) {
      colCase = this.casebaseDAO.getCaseById(colCaseId);
      this.tableComponent.updateColCase(colCaseId, colCase);
      if (this.similarityData) {
        let newSimilarityValue = this.similarityData.getSimilarity(
          rowCaseId,
          colCaseId
        );
        this.tableComponent.updateSimilarityValue(newSimilarityValue, color);
      }
    } else {
      this.tableComponent.resetColItem();
      this.tableComponent.updateSimilarityValue(null, null);
    }

    // Update taxonomy:
    // 1. Find if the current case base has a taxonomy attribute (choose the first one)
    let attributes = this.casebaseDAO.getAttributes();
    let taxAttribute: keyof Object | null = null;
    taxAttribute = this.findTaxonomyAttribute(attributes) as keyof Object;

    // for (const [key, value] of Object.entries(attributes)) {
    //   if (value === "Taxonomy") {
    //     taxAttribute = key as keyof Object;
    //     break;
    //   }
    // }
    // 2. If found, update the taxonomy viewer
    if (rowCase && colCase && taxAttribute) {
      if ("id" in rowCase && "id" in colCase) {
        let newSimilarityValue = this.similarityData.getSimilarity(
          rowCaseId,
          colCaseId
        );
        let simValue = findValueInSimilarityValue(
          newSimilarityValue?.attributes,
          taxAttribute
        );
        this.updateTaxonomyViewer(
          findValueInCase(rowCase, taxAttribute),
          rowCase["id"] as string,
          findValueInCase(colCase, taxAttribute),
          colCase["id"] as string,
          simValue
        );
      }
    }
  }

  private findTaxonomyAttribute(attributes: StringStringObject): string {
    let attribute = "";
    for (const [key, value] of Object.entries(attributes)) {
      if (value === "Taxonomy") {
        attribute = key;
        return attribute;
      } else {
        if (typeof value === "object") {
          let suffix = this.findTaxonomyAttribute(value);
          if (suffix !== "") {
            return `${key}.${suffix}`;
          }
        }
      }
    }
    return attribute;
  }

  /**
   * Update the selector with the case id of the case that is currently displayed on the
   * case comparator (WIP)
   * @param caseId Id of the case
   */
  updateSelectedCase(caseId: string) {
    this.heatmapSelect
      ? (this.heatmapSelect.selectedIndex = this.caseIds.indexOf(caseId) + 1)
      : null;
  }

  focusOnTaxonomyNode(taxonomyLabel: string) {
    if (this.taxonomyViewer) {
      this.taxonomyViewer.focusOnNode(taxonomyLabel);
    }
  }

  selectCaseByTaxonomyLabel(label: string): boolean {
    let caseId: string | null =
      this.casebaseDAO.getRandomCaseByTaxonomyLabel(label);
    if (caseId) {
      this.filterByCaseId(caseId);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Fuction called whe the user resizes the interface
   */
  onResize() {
    this.theHeatmap ? this.theHeatmap.refresh() : null;
    this.theHistogram ? this.theHistogram.refresh() : null;
  }

  private updateTaxonomyViewer(
    leftCaseLabel: string,
    leftCaseId: string,
    rightCaseLabel: string,
    rightCaseId: string,
    similarityValue: number
  ) {
    if (this.taxonomyViewer) {
      this.taxonomyViewer.updateSubTree(
        leftCaseLabel,
        leftCaseId,
        rightCaseLabel,
        rightCaseId,
        similarityValue
      );
    }
  }

  /**
   * Function called when the user clicks on the pin icon and freezes a case,
   * changing the heatmap into a stripechart
   * @param caseId Id of the case selected
   */
  filterByCaseId(caseId: string) {
    if (this.theHeatmap && this.resetButton) {
      this.theHeatmap.filterById(caseId, true);
      this.resetButton.classList.remove("visually-hidden");
      this.tableComponent.updateRowCase(
        caseId,
        this.casebaseDAO.getCaseById(caseId)
      );
      this.tableComponent.resetColItem();
      this.updateSelectedCase(caseId);
    }
  }

  /**
   * Show the spin loading panel
   */
  showLoadingOverlay() {
    this.loadingOverlay
      ? this.loadingOverlay.classList.remove("visually-hidden")
      : null;
  }

  /**
   * Hide the spin loading panel
   */
  hideLoadingOverlay() {
    this.loadingOverlay
      ? this.loadingOverlay.classList.add("visually-hidden")
      : null;
  }

  /**
   * Populate the selector (WIP)
   */
  private populateCaseIdSelect() {
    if (this.heatmapSelect) {
      this.heatmapSelect.replaceChildren();
      let emptyOption = document.createElement("option");
      emptyOption.innerHTML = "*";
      emptyOption.setAttribute("value", "*");
      this.heatmapSelect.appendChild(emptyOption);
      for (let id of this.caseIds) {
        let newOption = document.createElement("option");
        newOption.innerHTML = id;
        newOption.setAttribute("value", id);
        this.heatmapSelect.appendChild(newOption);
      }
      this.heatmapSelect.selectedIndex = 0;
    }
  }

  /**
   * Function called when the user selects a case using the selector (WIP)
   */
  filterBySelectedCase() {
    if (this.heatmapSelect && this.theHeatmap && this.resetButton) {
      if (this.heatmapSelect.value !== "*") {
        this.theHeatmap.filterById(this.heatmapSelect.value, true);
        this.resetButton.classList.remove("visually-hidden");
      } else {
        this.theHeatmap.reset();
      }
    }
  }
}

/**
 * A singleton-like instance of the Controller
 */
const theController = new Controller();
export { theController };
