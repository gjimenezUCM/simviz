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
    let itemData = await loadJSONData("data/items.json");
    let itemDAO = new ItemDAO(itemData)
    let simDAO = new SimilarityDAO(itemDAO.getIds());
    populateWeights();
    const simFiles = simDAO.getFiles();
    let simMenu = document.getElementById("similarity-dropdown-menu");
    for (let file of simFiles) { 
        let item = document.createElement('li');
        item.innerHTML = `<a class="dropdown-item" data-sim-name="${file}">${file}</a>`;
        item.setAttribute("data-sim-name", file);
        simMenu.appendChild(item);
        item.addEventListener("click", () => loadSimilarityFunction(simDAO, itemDAO, file));
    }
    let theController = new Controller(itemDAO, itemDAO.getAttributes(), null, null);


    //let heatmapFilterBtn = document.getElementById('heatmap-filter-btn');
}

async function loadSimilarityFunction(simDAO, itemDAO, file){
    let activeItem = document.querySelector("#similarity-dropdown-menu .dropdown-item.active");
    if (activeItem && activeItem.getAttribute("data-sim-name") === file){
        return;
    }

    let simMatrix = await simDAO.getSimilarityMatrixByName(file);
    if (simMatrix){
        let allAttributes = itemDAO.getAttributes()
        let simAttributes = simDAO.getListSimilarityAtts(file);
        let theController = new Controller(itemDAO, allAttributes, simMatrix, simAttributes);
        window.addEventListener("resize", (event) => {
            theController.onResize();
        }); 
        let simMenu = document.querySelectorAll("#similarity-dropdown-menu .dropdown-item");
        for (let elem of simMenu) {
            elem.classList.remove("active");
            if (elem.getAttribute("data-sim-name")=== file){
                elem.classList.add("active")
            }
        } 
    }
}

//initApp();  