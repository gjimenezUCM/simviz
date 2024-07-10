/*
* CSS imports
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/simviz.style.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';


/*
* JS/TS imports
*/
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import nanoMarkdown from 'nano-markdown';


import { theController } from "./controller";
import { theSimilarityDAO} from './DAO/similarityDAO';
import { DatasetLoader } from './datasetLoader';
import { CasebaseDAO } from './DAO/casebaseDAO';

/**
 * On load, init the app
 */
window.addEventListener("load", (event)=>  { initApp() });

/**
 * Asynchronous function for initializing the app
 */
async function initApp() {
    const myModal = document.getElementById('similarity-configuration');  

    let datasetLoader = new DatasetLoader();

    // Load the dataset/casebase file and populate the dataset selector
    if (await datasetLoader.init("data/datasets.json")){
        let datasetMenu: HTMLSelectElement | null = <HTMLSelectElement>document.getElementById("dataset-select");
        if (datasetMenu){
            datasetMenu.innerHTML = "<option selected>Choose dataset...</option>";
            for (let dsName of datasetLoader.getDatasetNames()) {
                let item = document.createElement('template');
                item.innerHTML = `<option class="dropdown-item" dataset-name="${dsName}">${dsName}</option>`;
                datasetMenu.appendChild(item.content.children[0]);
            }
            datasetMenu.addEventListener("change", () => {
                if (datasetMenu.selectedIndex !== 0) {
                    loadDataset(datasetLoader, datasetMenu.value);
                }
            });
        }
    };
    let pinButtons = document.querySelectorAll("#item-comparator button[data-item-id]");
    // Suscribe to click events on pin buttons
    for (let btn of pinButtons){
        btn.addEventListener("click", (event) => {
            if (event.currentTarget){
                let itemId = (<HTMLElement>event.currentTarget).getAttribute("data-item-id");
                if (itemId) {
                    theController.filterByCaseId(itemId);
                }
            }
        })
    }
}

/**
 * Load a dataset
 * @param datasetLoader The dataset loader
 * @param datasetName The name of the dataset selected
 */
async function loadDataset(datasetLoader:DatasetLoader, datasetName:string){
    let casebaseDAO:CasebaseDAO|null = await datasetLoader.getCasebaseDAO(datasetName);

    let datasetDescription = document.getElementById("dataset-desc");
    if (datasetDescription && casebaseDAO){
        datasetDescription.innerHTML = `<h3>Description</h3>
        ${nanoMarkdown(casebaseDAO.getDescription())}
        <h3>Number of instances</h3>
        <p>${casebaseDAO.getNumCases()}</p>`;

        theSimilarityDAO.init(datasetLoader.getSimilarityFunctionsForDataset(datasetName), casebaseDAO.getIds());
        theController.onDatasetSelected();
        theController.init(casebaseDAO, null);
    }
}


