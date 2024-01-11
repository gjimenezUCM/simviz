/*
* CSS imports
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/simviz.style.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 

/*
* JS imports
*/
import {  itemLoader } from './item-loader';
import { daoItems } from './mockdata';
import { Heatmap } from './heatmap';
import { Histogram } from "./histogram";
import { Controller } from "./controller";
import SimilarityDAO from './DAO/similarityDAO';
import { loadJSONData } from "./fileLoader";
import { ItemDAO } from './DAO/itemDAO';

import { populateWeights } from './compare';

let itemIds = daoItems.getIds();


function populateIdSelect(selectNode, ids) {
    for (let id of ids) {
        let newOption = document.createElement("option");
        newOption.innerHTML = id;
        newOption.setAttribute("value", id);
        selectNode.appendChild(newOption);
    }
}

window.addEventListener("load", (event)=>  { initApp() });

async function initApp() {
    let itemData = await loadJSONData("data/blood-alcohol-domain.json");//"data/items.json");
    let itemDAO = new ItemDAO(itemData)
    let simDAO = new SimilarityDAO(itemDAO.getIds());
    populateWeights();
    const simFiles = simDAO.getFiles();
    let simMenu = document.getElementById("similarity-select");
    for (let file of simFiles) { 
        let item = document.createElement('template');
        item.innerHTML = `<option class="dropdown-item" data-sim-name="${file}">${file}</option>`;
        simMenu.appendChild(item.content.children[0]);
    }
    simMenu.addEventListener("change", () =>  {
        if (simMenu.selectedIndex!==0) {
            loadSimilarityFunction(simDAO, itemDAO, simMenu.value);
        }        
    });
    let theController = new Controller(itemDAO, null);
}

async function loadSimilarityFunction(simDAO, itemDAO, file){
     let simData = await simDAO.getSimilarityDataByName(file);
    if (simData){
        let theController = new Controller(itemDAO, simData);
        window.addEventListener("resize", (event) => {
            theController.onResize();
        }); 
    }
}

//initApp();  