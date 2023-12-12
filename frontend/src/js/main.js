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
import { FileLoader } from "./fileLoader";

let itemIds = daoItems.getIds();

function populateIdSelect(selectNode, ids) {
    for (let id of ids) {
        let newOption = document.createElement("option");
        newOption.innerHTML = id;
        newOption.setAttribute("value", id);
        selectNode.appendChild(newOption);
    }
}

window.addEventListener("load", initApp);

async function initApp() {
    let fileLoader = new FileLoader();
    const simFiles = fileLoader.getFiles();
    let simMenu = document.getElementById("similarity-dropdown-menu");
    let i=0;
    for (let file of simFiles) { 
        let item = document.createElement('li');
        item.innerHTML = '<a class="dropdown-item">'+file+'</a>';
        simMenu.appendChild(item);
        let index =i;
        item.addEventListener("click", ()=>loadSimilarityFunction(fileLoader,index));
        i++;
    }


    //let heatmapFilterBtn = document.getElementById('heatmap-filter-btn');
}

async function loadSimilarityFunction(fileLoader, index){
    let fileData = await fileLoader.getDataFileByIndex(index);
    if (fileData !== null){
        let theController = new Controller(itemIds, fileData);
        window.addEventListener("resize", (event) => {
            theController.onResize();
        }); 
        let simMenu = document.querySelectorAll("#similarity-dropdown-menu .dropdown-item")
        for (let elem of simMenu) {
            elem.classList.remove("active");
        } 
        simMenu[index].classList.add("active")
    }
}