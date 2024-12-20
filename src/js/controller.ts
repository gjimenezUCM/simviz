
import { Heatmap } from './Components/heatmap';
import { Histogram } from "./Components/histogram";
import { CaseComparator } from './Components/caseComparator';
import { CasebaseDAO } from './DAO/casebaseDAO';
import SimilarityData from './DAO/similarityData';
import { SimilarityPanel } from './Components/similarityPanel';
import vis, { Network } from 'vis-network';
import { TaxonomyViewer } from './Components/taxonomyViewer';

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
        this.resetButton = document.getElementById('reset-filter-btn') as HTMLButtonElement;
        this.heatmapSelect = document.getElementById('heatmap-filter-select') as HTMLSelectElement;
        this.histogramContainer = document.getElementById('histogram');
        this.heatmapContainer = document.getElementById('heatmap');
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
        this.tableComponent = new CaseComparator(allAttributes, simData.similarityDescription, attId);
        this.tableComponent.resetTable();
        // create the histogram and the heatmap with the similarity data loaded (if exists)

        let simDescription = simData ? simData.similarityDescription : null;
        this.similarityData = simData;
        this.theHistogram = this.similarityData.similarityMatrix ? new Histogram(this.caseIds, this.similarityData.similarityMatrix, this.histogramContainer) : null;
        if (this.theHistogram) {
            // Suscribe to events when clicking on the histogram
            this.theHistogram.on((source, data) => {
                this.updateCaseInfo(data.id1, data.id2, data.color);
                this.updateSelectedCase(data.id1);
            });
        }

        this.theHeatmap = this.similarityData.similarityMatrix ? new Heatmap(this.caseIds, this.similarityData.similarityMatrix, this.heatmapContainer) : null;
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
                    if (this.heatmapSelect.value !== '*') {
                        this.filterByCaseId(this.heatmapSelect.value);
                    }
                }
            });
        }

        if (this.resetButton) {
            // Suscribe to events when clicking on reset button
            this.resetButton.addEventListener('click', (event) => {
                if (this.theHeatmap)
                    this.theHeatmap.reset();
                if (this.heatmapSelect)
                    this.heatmapSelect.selectedIndex = 0;
                this.tableComponent.resetTable();
                if (this.resetButton)
                    this.resetButton.classList.add("visually-hidden");
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
    onDatasetSelected(casebaseDAO: CasebaseDAO) {
        this.histogramContainer ? this.histogramContainer.innerHTML = "" : null;
        this.heatmapContainer ? this.heatmapContainer.innerHTML = "" : null;
        this.heatmapSelect ? this.heatmapSelect.selectedIndex = 0 : null;
        if (this.tableComponent) {
            this.tableComponent.resetTable();
        }
        this.casebaseDAO = casebaseDAO;
        this.caseIds = casebaseDAO.getIds();
        this.similarityPanel.init();

        this.resetButton ? this.resetButton.classList.add("visually-hidden") : null;
        let allAttributes = this.casebaseDAO.getAttributes();
        let attId: string = this.casebaseDAO.getAttId();
        this.tableComponent = new CaseComparator(allAttributes, null, attId);
        this.tableComponent.resetTable();
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
    updateCaseInfo(rowCaseId: string, colCaseId: string, color: string) {
        let rowCase, colCase = null;
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
                let newSimilarityValue = this.similarityData.getSimilarity(rowCaseId, colCaseId);
                this.tableComponent.updateSimilarityValue(newSimilarityValue, color);
            }
        } else {
            this.tableComponent.resetColItem();
            this.tableComponent.updateSimilarityValue(null, null);
        }

        // HACKHACK (for demo)
        if (rowCase && colCase){
            if (("manufacturer" in rowCase) && ("manufacturer" in colCase) &&
                ("id" in rowCase) && ("id" in colCase)){
                let newSimilarityValue = this.similarityData.getSimilarity(rowCaseId, colCaseId);
                this.taxonomyViewer.updateSubTree(rowCase["manufacturer"] as string, rowCase["id"] as string, colCase["manufacturer"] as string, colCase["id"] as string, newSimilarityValue?.by_attribute["manufacturer"]);
            }
        }
        // HACKHACK (for demo)
    }

    /**
    * Update the selector with the case id of the case that is currently displayed on the 
    * case comparator (WIP)
    * @param caseId Id of the case
    */
    updateSelectedCase(caseId: string) {
        this.heatmapSelect ? this.heatmapSelect.selectedIndex = this.caseIds.indexOf(caseId) + 1 : null;
    }


    /**
    * Fuction called whe the user resizes the interface
    */
    onResize() {
        this.theHeatmap ? this.theHeatmap.refresh() : null;
        this.theHistogram ? this.theHistogram.refresh() : null;
    }


    /**
    * Populate the selector (WIP)
    */
    private populateCaseIdSelect() {
        if (this.heatmapSelect) {
            this.heatmapSelect.replaceChildren();
            let emptyOption = document.createElement("option");
            emptyOption.innerHTML = '*';
            emptyOption.setAttribute("value", '*');
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
            if (this.heatmapSelect.value !== '*') {
                this.theHeatmap.filterById(this.heatmapSelect.value, true);
                this.resetButton.classList.remove("visually-hidden");
            } else {
                this.theHeatmap.reset();
            }
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
            this.tableComponent.updateRowCase(caseId, this.casebaseDAO.getCaseById(caseId));
            this.tableComponent.resetColItem();
            this.updateSelectedCase(caseId);
        }
    }

    /**
    * Show the spin loading panel
    */
    showLoadingOverlay() {
        this.loadingOverlay ? this.loadingOverlay.classList.remove("visually-hidden") : null;
    }

    /**
    * Hide the spin loading panel
    */
    hideLoadingOverlay() {
        this.loadingOverlay ? this.loadingOverlay.classList.add("visually-hidden") : null;
    }

}

/**
* A singleton-like instance of the Controller
*/
const theController = new Controller();
export { theController };