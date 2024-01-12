/*
* CSS imports
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/simviz.style.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 

/*
* JS imports
*/
import { daoItems } from './mockdata';
import { Controller } from "./controller";
import SimilarityDAO from './DAO/similarityDAO';
import { DatasetLoader } from './datasetLoader';
import { populateWeights } from './compare';
import { updateSimilarityDescription } from './Components/simDescriptor';

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
    let datasetLoader = new DatasetLoader();
    if (await datasetLoader.init("data/datasets.json")){
        let datasetMenu = document.getElementById("dataset-select");
        datasetMenu.innerHTML = "<option selected>Choose dataset...</option>";
        for (let dsName of datasetLoader.getDatasetNames()) {
            let item = document.createElement('template');
            item.innerHTML = `<option class="dropdown-item" dataset-name="${dsName}">${dsName}</option>`;
            datasetMenu.appendChild(item.content.children[0]);
        }
        datasetMenu.addEventListener("change", () => {
            if (datasetMenu.selectedIndex !== 0) {
                populateSimilarityFunctions(datasetLoader, datasetMenu.value);
                updateSimilarityDescription("");
            }
        });

    };   
}

async function populateSimilarityFunctions(datasetLoader, datasetName){
    let itemDAO = await datasetLoader.getItemDAO(datasetName);
    let simDAO = new SimilarityDAO(datasetLoader.getSimilarityFunctionsForDataset(datasetName), itemDAO.getIds());
    populateWeights();
    const simFiles = simDAO.getFiles();
    let simMenu = document.getElementById("similarity-select");
    simMenu.innerHTML = "<option selected>Choose similarity function...</option>";
    for (let file of simFiles) {
        let item = document.createElement('template');
        item.innerHTML = `<option class="dropdown-item" data-sim-name="${file}">${file}</option>`;
        simMenu.appendChild(item.content.children[0]);
    }
    simMenu.addEventListener("change", () => {
        if (simMenu.selectedIndex !== 0) {
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