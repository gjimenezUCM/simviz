/*
* CSS imports
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/simviz.style.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';


/*
* JS imports
*/
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import nanoMarkdown from 'nano-markdown';

import { daoItems } from './mockdata';
import { theController } from "./controller";
import SimilarityDAO from './DAO/similarityDAO';
import { DatasetLoader } from './datasetLoader';
import { similarityPanel } from './Components/similarityPanel';
import { SimConfigurator } from './Components/simConfigurator';

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
    const myModal = document.getElementById('similarity-configuration');  

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
                updateWithSelectedDataset(datasetLoader, datasetMenu.value);                
            }
        });
    };   
    let pinButtons = document.querySelectorAll("#item-comparator button[data-item-id]");
    for (let btn of pinButtons){
        btn.addEventListener("click", (event) => {
            let itemId = event.currentTarget.getAttribute("data-item-id");
            if (itemId) {
                theController.filterByItemId(itemId);
            }

        })
    }
}

async function updateWithSelectedDataset(datasetLoader, datasetName){
    let itemDAO = await datasetLoader.getItemDAO(datasetName);

    let datasetDescription = document.getElementById("dataset-desc");
    datasetDescription.innerHTML = `<h3>Description</h3>
        ${nanoMarkdown(itemDAO.getDescription())}
        <h3>Number of instances</h3>
        <p>${itemDAO.getNumCases()}</p>`;


    let simDAO = new SimilarityDAO(datasetLoader.getSimilarityFunctionsForDataset(datasetName), itemDAO.getIds());
    similarityPanel.init(simDAO, itemDAO);
    theController.onDatasetSelected();
    theController.init(itemDAO, null);
}

async function loadSimilarityFunction(simDAO, itemDAO, file){
    let simData = await simDAO.getSimilarityDataByName(file);
    if (simData){
        theController.init(itemDAO, simData);
        window.addEventListener("resize", (event) => {
            theController.onResize();
        }); 

        let simConf = new SimConfigurator();
        simConf.init(simDAO, simData);
    }
}

//initApp();  