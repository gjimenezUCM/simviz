/*
* CSS imports
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/simviz.style.css';

/*
* JS imports
*/
import Plotly from 'plotly.js-dist-min';
import {  itemLoader } from './item-loader';
import { daoItems } from './mockdata';

let itemIds = daoItems.getIds();

let mockSimData = [];
let itemSize = itemIds.length;

for (let i = 0; i<itemSize; i++) {
    let row =[];
    for (let j = i+1; j < itemSize; j++) {
        row[j] = Math.random();
    }
    mockSimData[i] = row;
}



window.addEventListener("load", (event) => {
    let heatmapContainer = document.getElementById('heatmap');
    initHeatmap(heatmapContainer);

    heatmapContainer.on('plotly_click', function (data) {
        if (data.points.length === 1) {
            if (data.points[0].z){
                let row = data.points[0].x;
                let col = data.points[0].y;
                itemLoader.changeRowItem(daoItems.getItemById(row));
                itemLoader.changeColItem(daoItems.getItemById(col));
                itemLoader._createHandlebars(daoItems.getItemById(col));
            }
        }
    });
});

window.addEventListener("resize", (event) => {
    let heatmapContainer = document.getElementById('heatmap');
    initHeatmap(heatmapContainer);    
});



function initHeatmap(containerNode){

    let containerWidth = containerNode.offsetWidth;
    let containerHeight = containerNode.parentNode.offsetHeight;

    const colorscaleValue = [
        [0, '#3D9970'],
        [1, '#001f3f']
    ];


    let data = [{
        x: itemIds,
        y: itemIds,
        z: mockSimData,
        type: 'heatmap',
        colorscale: 'YlOrRd',
        showscale: true
    }];


    let layout = {
        paper_bgcolor: 'transparent',
        margin: {
            l: 10,
            r: 10,
            b: 10,
            t: 20,
        },
        xaxis: {
            // No tick labels
            showticklabels: false,
            // No ticks
            tickmode: 'array',
            tickvals: []
        },
        yaxis: {
            // No tick labels
            showticklabels: false,
            // No ticks
            tickmode: 'array',
            tickvals: []
        },
        height: containerHeight,
        width: containerWidth
    };

    Plotly.newPlot(containerNode, data, layout);
}
