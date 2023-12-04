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
    }

    updateItemInfo(rowItemId, colItemId) {
        if (rowItemId) {
            this.itemLoader.changeRowItemById(rowItemId);
        } else {
            this.itemLoader.resetRowItem();
        }

        if (colItemId) {
            this.itemLoader.changeColItemById(colItemId);
        } else {
            this.itemLoader.resetColItem();
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
            this.theHeatmap.filterById(this.heatmapSelect.value, false);
        } else {
            this.theHeatmap.reset();
        }
    }
}