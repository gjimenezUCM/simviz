import { Heatmap } from "./Components/heatmap";
import { Histogram } from "./Components/histogram";
import { CaseComparator } from "./Components/caseComparator";
import { CasebaseDAO } from "./DAO/casebaseDAO";
import SimilarityData from "./DAO/similarityData";
import { SimilarityPanel } from "./Components/similarityPanel";
import { TaxonomyViewer } from "./Components/taxonomyViewer";
import {
  findValueInCase,
  findValueInSimilarityValue,
  findTaxonomyAttribute,
} from "./utils/caseUtils";

/**
 * This class acts as a mediator between different objects and panels in SimViz
 */
export class Controller {
  /**
   * Case comparator panel
   */
  private tableComponent: CaseComparator;

  /**
   * Similarity panel
   */
  private similarityPanel: SimilarityPanel;

  /**
   * Taxonomy viewer panel
   */
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
   * HTML ID for reset button
   */
  private readonly RESET_BUTTON_ID = "reset-filter-btn";

  /**
   * Constructor
   */
  constructor() {
    this.loadingOverlay = document.getElementById("loading-overlay");
    this.resetButton = document.getElementById(
      this.RESET_BUTTON_ID
    ) as HTMLButtonElement;
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
      });
    }

    if (this.resetButton) {
      // Suscribe to events when clicking on reset button
      this.resetButton.addEventListener("click", (event) => {
        if (this.theHeatmap) {
          this.theHeatmap.reset();
        }
        this.tableComponent.resetTable();
        this.tableComponent.repaint();

        if (this.taxonomyViewer) {
          this.taxonomyViewer.resetTaxonomyGraph();
          this.taxonomyViewer.removeSubtree();
        }

        if (this.resetButton) {
          this.resetButton.classList.add("visually-hidden");
        }
      });
    }

    if (this.taxonomyViewer) {
      this.taxonomyViewer.resetTaxonomyGraph();
      this.taxonomyViewer.removeSubtree();
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

    this.tableComponent.repaint();

    // Update taxonomy:
    // 1. Find if the current case base has a taxonomy attribute (choose the first one)
    let attributes = this.casebaseDAO.getAttributes();
    let taxAttribute: keyof Object | null = findTaxonomyAttribute(
      attributes
    ) as keyof Object;

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

  /**
   * Focuses the taxonomy viewer on the node with the specified taxonomic label.
   *
   * @param taxonomyLabel - The label of the taxonomy node to focus on.
   */
  focusOnTaxonomyNode(taxonomyLabel: string) {
    if (this.taxonomyViewer) {
      this.taxonomyViewer.focusOnNode(taxonomyLabel);
    }
  }

  /**
   * Selects a random case from the casebase that matches the specified taxonomy label.
   * If a matching case is found, filters the view by the selected case ID.
   *
   * @param label - The taxonomy label used to find a matching case.
   * @returns `true` if a case was found and selected; otherwise, `false`.
   */
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
   * Updates the taxonomy viewer with information about two selected cases and their similarity.
   * This method is called when users interact with the heatmap or histogram to compare cases
   * that have taxonomic attributes.
   *
   * @param leftCaseLabel - The taxonomic label of the first case being compared
   * @param leftCaseId - The unique identifier of the first case
   * @param rightCaseLabel - The taxonomic label of the second case being compared
   * @param rightCaseId - The unique identifier of the second case
   * @param similarityValue - The computed similarity value between the two cases for the taxonomic attribute, or null if not available
   */
  private updateTaxonomyViewer(
    leftCaseLabel: string,
    leftCaseId: string,
    rightCaseLabel: string,
    rightCaseId: string,
    similarityValue: number | null
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
      this.tableComponent.repaint();
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
   * Fuction called whe the user resizes the interface
   */
  onResize() {
    this.theHeatmap ? this.theHeatmap.refresh() : null;
    this.theHistogram ? this.theHistogram.refresh() : null;
  }
}

/**
 * A singleton-like instance of the {@linkcode Controller}
 */
const theController = new Controller();
export { theController };
