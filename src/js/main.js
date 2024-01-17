/*
* CSS imports
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/simviz.style.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import nanoMarkdown from 'nano-markdown';
import { SimConfigurator } from './Components/simConfigurator';

/*
* JS imports
*/
import { daoItems } from './mockdata';
import { Controller } from "./controller";
import SimilarityDAO from './DAO/similarityDAO';
import { DatasetLoader } from './datasetLoader';
import { populateWeights } from './compare';
import { similarityPanel } from './Components/simDescriptor';

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
}

async function updateWithSelectedDataset(datasetLoader, datasetName){
    let itemDAO = await datasetLoader.getItemDAO(datasetName);

    let datasetDescription = document.getElementById("dataset-desc");
    datasetDescription.innerHTML = `<h3>Description</h3>
        ${nanoMarkdown(itemDAO.description)}
        <h3>Number of instances</h3>
        <p>${itemDAO.getNumInstances()}</p>`;


    let simDAO = new SimilarityDAO(datasetLoader.getSimilarityFunctionsForDataset(datasetName), itemDAO.getIds());
    similarityPanel.init(simDAO, itemDAO);
    // const simFiles = simDAO.getFiles();
    // let simMenu = document.getElementById("similarity-select");
    // simMenu.innerHTML = "<option selected>Choose similarity function...</option>";
    // for (let file of simFiles) {
    //     let item = document.createElement('template');
    //     item.innerHTML = `<option class="dropdown-item" data-sim-name="${file}">${file}</option>`;
    //     simMenu.appendChild(item.content.children[0]);
    // }
    // simMenu.addEventListener("change", () => {
    //     if (simMenu.selectedIndex !== 0) {
    //         loadSimilarityFunction(simDAO, itemDAO, simMenu.value);
    //     }
    // });
    //populateWeights();
    let theController = new Controller(itemDAO, null);
    // updateSimilarityDescription("");
}

async function loadSimilarityFunction(simDAO, itemDAO, file){
    let simData = await simDAO.getSimilarityDataByName(file);
    if (simData){
        let theController = new Controller(itemDAO, simData);
        window.addEventListener("resize", (event) => {
            theController.onResize();
        }); 

        let newDescription = Object.assign({}, simData.similarityDescription);
        newDescription.localSim = {
            "Color": {
                "simFunction": "equals",
                "weight": 1.0
            },
            "title": {
                "simFunction": "equals",
                "weight": 0.0
            },
            "title2": {
                "simFunction": "equals",
                "weight": 0.0
            }
        }

        let simConf = new SimConfigurator();
        simConf.init(simDAO, simData);

    }
}

//initApp();  