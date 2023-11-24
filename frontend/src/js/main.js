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
        row[j] = Math.random();
    }
    mockSimData[i] = row;
}


function onClickHeatmap(data) {
    console.log(data.points.length);
    if (data.points.length === 1) {
        if (data.points[0].z) {
            let row = data.points[0].x;
            let col = data.points[0].y;
            itemLoader.changeRowItem(daoItems.getItemById(row));
            itemLoader.changeColItem(daoItems.getItemById(col));
            itemLoader._createHandlebars(daoItems.getItemById(col));
        }
    }
}

window.addEventListener("load", (event) => { 
    let heatmapContainer = document.getElementById('heatmap');
    let theHeatmap = new Heatmap(itemIds, mockSimData, heatmapContainer, onClickHeatmap);

    let heatmapFilterBtn = document.getElementById('heatmap-filter');
    heatmapFilterBtn.addEventListener('click', (event) => {
        theHeatmap.filterById('634f19096c70ef5cf152f237');
    });

    document.getElementById('heatmap-reset').addEventListener('click', (event) => {
        theHeatmap.reset();
    });

    window.addEventListener("resize", (event) => {
        theHeatmap.refresh();
    });
});


