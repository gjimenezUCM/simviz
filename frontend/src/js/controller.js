import { itemLoader } from './item-loader';
import { Heatmap } from './heatmap';
import { Histogram } from "./histogram";
export class Controller {
    constructor(itemIds, simData) {
        this.itemLoader = itemLoader;
        this.itemLoader.resetItems();

        this.histogramContainer = document.getElementById('histogram');
        this.theHistogram = new Histogram(this, itemIds, simData, this.histogramContainer);

        this.heatmapContainer = document.getElementById('heatmap');
        this.theHeatmap = new Heatmap(this, itemIds, simData, this.heatmapContainer);

        this.itemIds = itemIds;
        this.simData = simData;
        this.heatmapSelect = document.getElementById('heatmap-filter-select');
        this._populateItemIdSelect();
        this.heatmapSelect.addEventListener("change", (event) => {
            if (this.heatmapSelect.value !== '*') {
                this.itemLoader.changeRowItemById(this.heatmapSelect.value);
                this.itemLoader.resetColItem();
            }
        });
        itemLoader.setController(this);
        this.resetButton = document.getElementById('reset-filter-btn');
        this.resetButton.addEventListener('click', (event) => {
            this.theHeatmap.reset();
            this.heatmapSelect.selectedIndex = 0;
            itemLoader.resetItems();
            this.resetButton.classList.add("visually-hidden");
        });
    }

    updateItemsInfo(rowItemId, colItemId, similarityValue, color) {
        if (rowItemId) {
            this.itemLoader.changeRowItemById(rowItemId);
        } else {
            this.itemLoader.resetRowItem();
        }

        if (colItemId) {
            this.itemLoader.changeColItemById(colItemId);
            this.itemLoader.updateSimilarityValue(similarityValue, color);
        } else {
            this.itemLoader.resetColItem();
            this.itemLoader.updateSimilarityValue(null, null);
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
        for (let id of this.itemIds) {
            let newOption = document.createElement("option");
            newOption.innerHTML = id;
            newOption.setAttribute("value", id);
            this.heatmapSelect.appendChild(newOption);
        }
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
        itemLoader.changeRowItemById(itemId);
        itemLoader.resetColItem();
    }
}