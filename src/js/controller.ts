
import { Heatmap } from './Components/heatmap';
import { Histogram } from "./Components/histogram";
import { TableComparator } from './Components/tableComparator';
import { CasebaseDAO } from './DAO/casebaseDAO';
import SimilarityData from './DAO/similarityData';

class Controller {

    private tableComponent: TableComparator;
    private casebaseDAO: CasebaseDAO;
    private caseIds: Array<string>;
    private similarityData: SimilarityData;

    private loadingOverlay: HTMLElement | null;

    private theHistogram: Histogram | null;
    private histogramContainer: HTMLElement | null;

    private theHeatmap: Heatmap | null;
    private heatmapContainer: HTMLElement | null;
    private heatmapSelect: HTMLSelectElement | null;
    private resetButton: HTMLButtonElement | null;


    constructor(){
        this.loadingOverlay = document.getElementById("loading-overlay");
        this.resetButton = document.getElementById('reset-filter-btn') as HTMLButtonElement;
        this.heatmapSelect = document.getElementById('heatmap-filter-select') as HTMLSelectElement;
        this.histogramContainer = document.getElementById('histogram');
        this.heatmapContainer = document.getElementById('heatmap');
    }
    
    init(itemDAO:CasebaseDAO, simData: SimilarityData) {
        let allAttributes = itemDAO.getAttributes();
        let simDescription = simData ? simData.similarityDescription : null;
        this.tableComponent = new TableComparator(allAttributes, simDescription, itemDAO.getAttId());
        this.tableComponent.resetTable();
        this.casebaseDAO = itemDAO;
        this.caseIds = itemDAO.getIds();
        if (simData){
            this.similarityData = simData;
            this.theHistogram = this.similarityData.similarityMatrix ? new Histogram(this.caseIds, this.similarityData.similarityMatrix, this.histogramContainer): null;
            if (this.theHistogram){
                this.theHistogram.on((source, data)=>{
                    this.updateItemsInfo(data.id1, data.id2, data.color);
                    this.updateSelectedItem(data.id1);
                });
            }
            
            this.theHeatmap = this.similarityData.similarityMatrix ? new Heatmap(this.caseIds, this.similarityData.similarityMatrix, this.heatmapContainer): null;
            if (this.theHeatmap) {
                this.theHeatmap.on((source, data) => {
                    this.updateItemsInfo(data.id1, data.id2, data.color);
                    this.updateSelectedItem(data.id1);
                });
            }

            this._populateItemIdSelect();
            if (this.heatmapSelect) {
                this.heatmapSelect.addEventListener("change", (event) => {
                    if (this.heatmapSelect){
                        if (this.heatmapSelect.value !== '*') {
                            this.filterByItemId(this.heatmapSelect.value);
                        }
                    }
                });
            }
            
            if (this.resetButton){
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
    }

    onDatasetSelected() {
        this.histogramContainer ? this.histogramContainer.innerHTML = "" : null;
        this.heatmapContainer ? this.heatmapContainer.innerHTML = "": null;
        this.heatmapSelect ? this.heatmapSelect.selectedIndex = 0: null;
        if (this.tableComponent){
            this.tableComponent.resetTable();
        }
        this.resetButton ? this.resetButton.classList.add("visually-hidden") : null;
    }

    updateItemsInfo(rowItemId:string, colItemId:string, color:string) {
        if (rowItemId) {
            this.tableComponent.updateRowCase(rowItemId, this.casebaseDAO.getCaseById(rowItemId));
        } else {
            this.tableComponent.resetRowItem();
        }

        if (colItemId) {
            this.tableComponent.updateColCase(colItemId, this.casebaseDAO.getCaseById(colItemId));
            if (this.similarityData) {
                let newSimilarityValue = this.similarityData.getSimilarity(rowItemId, colItemId);
                this.tableComponent.updateSimilarityValue(newSimilarityValue, color);
            }
        } else {
            this.tableComponent.resetColItem();
            this.tableComponent.updateSimilarityValue(null, null);
        }
    }

    updateSelectedItem(itemId:string ) {
        this.heatmapSelect ? this.heatmapSelect.selectedIndex = this.caseIds.indexOf(itemId) + 1: null;
    }

    onResize(){
        this.theHeatmap ? this.theHeatmap.refresh() : null;
        this.theHistogram ?this.theHistogram.refresh(): null;
    }

    _populateItemIdSelect() {
        if (this.heatmapSelect){
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

    filterBySelectedItem() {
        if (this.heatmapSelect && this.theHeatmap && this.resetButton ){
            if (this.heatmapSelect.value !== '*') {
                this.theHeatmap.filterById(this.heatmapSelect.value, true);
                this.resetButton.classList.remove("visually-hidden");
            } else {
                this.theHeatmap.reset();
            }
        }
    }

    filterByItemId(itemId: string) {
        if (this.theHeatmap && this.resetButton) {
            this.theHeatmap.filterById(itemId, true);
            this.resetButton.classList.remove("visually-hidden");
            this.tableComponent.updateRowCase(itemId, this.casebaseDAO.getCaseById(itemId));
            this.tableComponent.resetColItem();
            this.updateSelectedItem(itemId);
        } 
    }

    showLoadingOverlay() {
        this.loadingOverlay ? this.loadingOverlay.classList.remove("visually-hidden"): null;
    }

    hideLoadingOverlay() {
        this.loadingOverlay ? this.loadingOverlay.classList.add("visually-hidden"): null ;
    }

}

const theController = new Controller();
export { theController };