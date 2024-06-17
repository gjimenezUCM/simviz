import { loadJSONData } from "./fileLoader";
import { CasebaseDAO } from "./DAO/casebaseDAO";
export class DatasetLoader{    
    constructor(){
        this.datasets ={};     
    }

    async init(filename){
        const data = await loadJSONData(filename); 
        if (data) {
            for (let datasetDescription of data) {
                let datasetInfo = {}
                let datasetName = datasetDescription.dataset.name;
                datasetInfo["filename"] =  datasetDescription.dataset.uri;
                datasetInfo["similarityDatasets"] = datasetDescription.similarityDatasets;
                this.datasets[datasetName] = datasetInfo;
            }  
            return true;
        }     
        else {
            return false;
        }
    }

    getDatasetNames(){
        return Object.keys(this.datasets);
    }
    
    async getItemDAO(datasetName){
        if (datasetName in this.datasets) {
            let datasetInfo = this.datasets[datasetName];
            if ("dao" in datasetInfo){
                return datasetInfo.dao;
            } else {
                // cargar DAO
                let itemData = await loadJSONData(datasetInfo["filename"]);
                if (itemData) {
                    this.datasets[datasetName]['dao'] = new CasebaseDAO(itemData);
                    return this.datasets[datasetName]['dao'];
                }
                else {
                    return null;
                }
            }      

        } else {
            return null;
        }
    }

    getSimilarityFunctionsForDataset(datasetName) {
        if (datasetName in this.datasets) {
            return this.datasets[datasetName]["similarityDatasets"]

        } else {
            return null;
        }
    }
}