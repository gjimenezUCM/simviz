import { loadJSONData } from "./utils/fileLoader";
import { CasebaseDescription, DataProvider, DatasetInfo } from "./types/simvizTypes";
import { CasebaseDAO } from "./DAO/casebaseDAO";

/**
 * A specific type for the dataset loader.
 */
interface datasetType extends DatasetInfo {
    /**
     * A DAO for accessing the casebase defined by this dataset.
     * It is optional because it is loaded on demand.
     */
    dao?: CasebaseDAO
};

/**
 * The dataset loader contains the information needed to load a casebase (dataset)
 * and their similarity functions. It is in charge of caching the list of dataset
 * files and their similarity functions. 
 */
export class DatasetLoader { 
   
    /**
     * It contains information about the datasets and the case base represented by the
     * dataset (lazy load)
     */
    private datasets: {
        [k: string]: datasetType
    };

    /**
     * Constructor
     */
    constructor(){
        this.datasets = {};
    }

    /**
     * Init the dataset loader, returning if the initialization worked 
     * @param uri A URI for the resource that contains a list of datasets
     * @returns true if the initialization was successful; false, otherwise
     */
    async init(uri:string): Promise<boolean> {
        const data = await loadJSONData(uri) as Array<DatasetInfo>; 
        if (data) {
            // Store the datasets using their name as key
            for (const datasetDescription of data) {
                this.datasets[datasetDescription.dataset.name] = datasetDescription;
            }  
            return true;
        }     
        else {
            return false;
        }
    }

    /**
     * Return a list with the name of the datasets available in the dataset loader
     * @returns The name of the datasets available in the dataset loader
     */
    getDatasetNames(): Array<string>{
        return Object.keys(this.datasets);
    }
    
    /**
     * Return the CasebaseDAO for a dataset identified by name. If it is not cached, the
     * CasebaseDAO is loaded the first time this method is invoked
     * @param datasetName Name of the dataset
     * @returns null if the dataset does not exist or it could not be loaded;
     *          the CasebaseDAO stored for this dataset, otherwise
     */
    async getCasebaseDAO(datasetName:string ): Promise<CasebaseDAO|null> {
        if (datasetName in this.datasets) {
            let datasetInfo = this.datasets[datasetName];
            if ("dao" in datasetInfo){
                return datasetInfo.dao ? datasetInfo.dao : null;
            } else {
                // Load DAO
                let itemData = await loadJSONData(datasetInfo.dataset["uri"]) as CasebaseDescription;
                if (itemData) {
                    let cbDAO = new CasebaseDAO(itemData);
                    this.datasets[datasetName]['dao'] = cbDAO;
                    return cbDAO;
                }
                else {
                    return null;
                }
            }      

        } else {
            return null;
        }
    }

    /**
     * 
     * @param datasetName Name of the dataset
     * @returns A list of similarity function datafiles (identified by a name and stored in a URI)
     */
    getSimilarityFunctionsForDataset(datasetName:string):Array<DataProvider>|null {
        if (datasetName in this.datasets) {
            return this.datasets[datasetName]["similarityDatasets"]

        } else {
            return null;
        }
    }
}