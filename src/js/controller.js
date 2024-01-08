
import { Heatmap } from './heatmap';
import { Histogram } from "./histogram";
import { TableComparator } from './Components/tableComparator';
export class Controller {
    constructor(itemDAO, allAttributes, simData, simAttributes) {
        this.tableComponent = new TableComparator(allAttributes, simAttributes);
        this.tableComponent.resetItems();
        this.itemDAO = itemDAO;
        this.itemIds = itemDAO.getIds();
        if (simData){
            this.histogramContainer = document.getElementById('histogram');
            this.theHistogram = new Histogram(this, this.itemIds, simData, this.histogramContainer);

            this.heatmapContainer = document.getElementById('heatmap');
            this.theHeatmap = new Heatmap(this, this.itemIds, simData, this.heatmapContainer);

            
            this.simData = simData;
            this.heatmapSelect = document.getElementById('heatmap-filter-select');
            this._populateItemIdSelect();
            this.heatmapSelect.addEventListener("change", (event) => {
                if (this.heatmapSelect.value !== '*') {
                    this.filterByItemId(this.heatmapSelect.value);
                    this.tableComponent.changeRowItem(this.heatmapSelect.value, this.itemDAO.getItemById(this.heatmapSelect.value));
                    this.tableComponent.resetColItem();
                }
            });
            this.tableComponent.setController(this);
            this.resetButton = document.getElementById('reset-filter-btn');
            this.resetButton.addEventListener('click', (event) => {
                this.theHeatmap.reset();
                this.heatmapSelect.selectedIndex = 0;
                this.tableComponent.resetItems();
                this.resetButton.classList.add("visually-hidden");
            });
        }

        
    }

    updateItemsInfo(rowItemId, colItemId, similarityValue, color) {
        if (rowItemId) {
            this.tableComponent.changeRowItem(rowItemId, this.itemDAO.getItemById(rowItemId));
        } else {
            this.tableComponent.resetRowItem();
        }

        if (colItemId) {
            this.tableComponent.changeColItem(colItemId, this.itemDAO.getItemById(colItemId));
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
    }
}