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
import { Histogram } from "./histogram";
import { Controller } from "./controller";
import { mockSimData } from './mockSimMatrix';

let itemIds = daoItems.getIds();

// let mockSimData = [];
// let itemSize = itemIds.length;


// for (let i = 0; i<itemSize; i++) {
//     let row =[];
//     for (let j = i; j < itemSize; j++) {
//         row[j] = 1;
//     }
//     mockSimData[i] = row;
// }

// for (let i = 0; i < itemSize; i++) {
//     for (let j = i+1; j < itemSize; j++) {
//         let simValue = Math.random();
//         mockSimData[i][j] = simValue;
//         mockSimData[j][i] = simValue;
//     }
// }




function populateIdSelect(selectNode, ids) {
    for (let id of ids) {
        let newOption = document.createElement("option");
        newOption.innerHTML = id;
        newOption.setAttribute("value", id);
        selectNode.appendChild(newOption);
    }
}

window.addEventListener("load", (event) => { 

    let theController = new Controller(itemIds, mockSimData);

    let heatmapFilterBtn = document.getElementById('heatmap-filter-btn');
    // console.log(heatmapFilterBtn)
    // heatmapFilterBtn.addEventListener('click', (event) => {
    //     console.log("Click filter");
    //     theController.filterBySelectedItem();
    // });
    //     if (heatmapSelect.value !== '*') {
    //         theHeatmap.filterById(heatmapSelect.value, false);
    //     } else {
    //         theHeatmap.reset();
    //     }
    // });
    // let heatmapSortedFilterBtn = document.getElementById('heatmap-sorted-filter-btn');
    // heatmapSortedFilterBtn.addEventListener('click', (event) => {
    //     if (heatmapSelect.value !== '*') {
    //         theHeatmap.filterById(heatmapSelect.value, true);
    //     } else {
    //         theHeatmap.reset();
    //     }
    // });

    // document.getElementById('heatmap-reset-btn').addEventListener('click', (event) => {
    //     theHeatmap.reset();
    //     heatmapSelect.selectedIndex = 0;
    //     itemLoader.resetItems()
    // });



    window.addEventListener("resize", (event) => {
        theController.onResize();
        //theHeatmap.refresh();
        //theHistogram.refresh();
    });
});