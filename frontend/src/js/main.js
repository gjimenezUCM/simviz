/*
* CSS imports
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/simviz.style.css';

/*
* JS imports
*/
import {  itemLoader } from './item-loader';
import { daoItems } from './mockdata';
import { Heatmap } from './heatmap';

let itemIds = daoItems.getIds();

let mockSimData = [];
let itemSize = itemIds.length;


for (let i = 0; i<itemSize; i++) {
    let row =[];
    for (let j = 0; j < itemSize; j++) {
        row[j] = 1;
    }
    mockSimData[i] = row;
}

for (let i = 0; i < itemSize; i++) {
    for (let j = i+1; j < itemSize; j++) {
        let simValue = Math.random();
        mockSimData[i][j] = simValue;
        mockSimData[j][i] = simValue;
    }
}




function populateIdSelect(selectNode, ids) {
    for (let id of ids) {
        let newOption = document.createElement("option");
        newOption.innerHTML = id;
        newOption.setAttribute("value", id);
        selectNode.appendChild(newOption);
    }
}

window.addEventListener("load", (event) => { 
    function onClickHeatmap(data) {
        if (data.points.length === 1) {
            if (data.points[0].z) {
                let col = data.points[0].x;
                let row = data.points[0].y;
                itemLoader.changeRowItem(daoItems.getItemById(row));
                itemLoader.changeColItem(daoItems.getItemById(col));
                heatmapSelect.selectedIndex = itemIds.indexOf(row)+1;
            }
        }
    }
    let heatmapContainer = document.getElementById('heatmap');
    let theHeatmap = new Heatmap(itemIds, mockSimData, heatmapContainer, onClickHeatmap);
    let heatmapSelect = document.getElementById('heatmap-filter-select');
    populateIdSelect(heatmapSelect, itemIds);
    itemLoader.resetItems();
    let heatmapFilterBtn = document.getElementById('heatmap-filter-btn');
    heatmapFilterBtn.addEventListener('click', (event) => {
        if (heatmapSelect.value !== '*') {
            theHeatmap.filterById(heatmapSelect.value, false);
        } else {
            theHeatmap.reset();
        }
    });
    let heatmapSortedFilterBtn = document.getElementById('heatmap-sorted-filter-btn');
    heatmapSortedFilterBtn.addEventListener('click', (event) => {
        if (heatmapSelect.value !== '*') {
            theHeatmap.filterById(heatmapSelect.value, true);
        } else {
            theHeatmap.reset();
        }
    });

    document.getElementById('heatmap-reset-btn').addEventListener('click', (event) => {
        theHeatmap.reset();
        heatmapSelect.selectedIndex = 0;
        itemLoader.resetItems()
    });

    heatmapSelect.addEventListener("change", (event) => { 
        if (heatmapSelect.value !== '*') {
            itemLoader.changeRowItem(daoItems.getItemById(heatmapSelect.value));
            itemLoader.resetColItem();
        } 
    });

    window.addEventListener("resize", (event) => {
        theHeatmap.refresh();
    });
});


