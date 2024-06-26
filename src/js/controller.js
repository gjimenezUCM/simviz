
import { Heatmap } from './heatmap';
import { Histogram } from "./histogram";
import { TableComparator } from './Components/tableComparator';
import { getSimilarityInData } from './DAO/similarityDAO'
class Controller {
    constructor(){
        this.loadingOverlay = document.getElementById("loading-overlay");
        this.resetButton = document.getElementById('reset-filter-btn');
        this.heatmapSelect = document.getElementById('heatmap-filter-select');
        this.histogramContainer = document.getElementById('histogram');
        this.heatmapContainer = document.getElementById('heatmap');
    }
    init(itemDAO, simData) {
        let allAttributes = itemDAO.getAttributes();
        let simDescription = simData ? simData.similarityDescription : null;
        this.tableComponent = new TableComparator(allAttributes, simDescription, itemDAO.getAttId());
        this.tableComponent.resetItems();
        this.itemDAO = itemDAO;
        this.itemIds = itemDAO.getIds();
        if (simData){
            this.simData = simData;
            
            this.theHistogram = new Histogram(this.itemIds, this.simData.similarityMatrix, this.histogramContainer);

            
            this.theHeatmap = new Heatmap(this.itemIds, this.simData.similarityMatrix, this.heatmapContainer);

            
            this._populateItemIdSelect();
            this.heatmapSelect.addEventListener("change", (event) => {
                if (this.heatmapSelect.value !== '*') {
                    this.filterByItemId(this.heatmapSelect.value);
                }
            });
            
            
            this.resetButton.addEventListener('click', (event) => {
                this.theHeatmap.reset();
                this.heatmapSelect.selectedIndex = 0;
                this.tableComponent.resetItems();
                this.resetButton.classList.add("visually-hidden");
            });
        }        
    }

    onDatasetSelected() {
        this.histogramContainer.innerHTML = "";
        this.heatmapContainer.innerHTML = "";
        this.heatmapSelect.selectedIndex = 0;
        if (this.tableComponent){
            this.tableComponent.resetItems();
        }
        this.resetButton.classList.add("visually-hidden");
    }

    updateItemsInfo(rowItemId, colItemId, similarityValue, color) {
        if (rowItemId) {
            this.tableComponent.changeRowItem(rowItemId, this.itemDAO.getItemById(rowItemId));
        } else {
            this.tableComponent.resetRowItem();
        }

        if (colItemId) {
            this.tableComponent.changeColItem(colItemId, this.itemDAO.getItemById(colItemId));
            if (this.simData) {
                similarityValue = getSimilarityInData(this.simData, rowItemId, colItemId);
            }
            this.tableComponent.updateSimilarityValue(similarityValue, color);
        } else {
            this.tableComponent.resetColItem();
            this.tableComponent.updateSimilarityValue(null, null);
        }
    }

    updateSelectedItem(itemId) {
        this.heatmapSelect.selectedIndex = this.itemIds.indexOf(itemId) + 1;
    }

    onResize(){
        this.theHeatmap.refresh();
        this.theHistogram.refresh();
    }

    _populateItemIdSelect() {
        this.heatmapSelect.replaceChildren();
        let emptyOption = document.createElement("option");
        emptyOption.innerHTML = '*';
        emptyOption.setAttribute("value", '*');
        this.heatmapSelect.appendChild(emptyOption);       
        for (let id of this.itemIds) {
            let newOption = document.createElement("option");
            newOption.innerHTML = id;
            newOption.setAttribute("value", id);
            this.heatmapSelect.appendChild(newOption);
        }
        this.heatmapSelect.selectedIndex = 0;
    }

    filterBySelectedItem() {
        if (this.heatmapSelect.value !== '*') {
            this.theHeatmap.filterById(this.heatmapSelect.value, true);
            this.resetButton.classList.remove("visually-hidden");
        } else {
            this.theHeatmap.reset();
        }
    }

    filterByItemId(itemId) {
        this.theHeatmap.filterById(itemId, true);
        this.resetButton.classList.remove("visually-hidden");
        this.tableComponent.changeRowItem(itemId, this.itemDAO.getItemById(itemId));
        this.tableComponent.resetColItem();
        this.updateSelectedItem(itemId);
    }

    showLoadingOverlay() {
        this.loadingOverlay.classList.remove("visually-hidden");
    }

    hideLoadingOverlay() {
        this.loadingOverlay.classList.add("visually-hidden");
    }

}

// export function showLoadingOverlay(){
//     document.getElementById("loading-overlay").classList.remove("visually-hidden");
// }
// export function hideLoadingOverlay() {
//     document.getElementById("loading-overlay").classList.add("visually-hidden");
// }

const theController = new Controller();
export { theController };