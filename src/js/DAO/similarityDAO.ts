const FILEPATH = "./data/";
const FILEEXTENSION = ".json";

import { DataProvider, SimilarityDescription, SimilarityValue } from "../types/simvizTypes";
import { loadJSONData } from "../utils/fileLoader";
import SimilarityData from "./similarityData";

/**
 * A DAO that stores similarity data for different similarity functions for a unique case base
 */
export class SimilarityDAO {
    /**
     * A list with the unique case ids for the casebase stored in this DAO
     */
    private caseIds: Array<string>;

    /**
     * A list with the similarity data files available for a case base
     */
    private similarityFunctions: {
        [key: string]: DataProvider
    }

    /**
     * It contains the similarity data for the similarity functions available for a case base.
     * It uses a lazy load so similarity data is only stored on request
     */
    private similarityDB: {
        [key: string]: SimilarityData;
    }

    /**
     * Constructor
     */
    constructor() {
    }

    /**
     * Initialize the similarity DAO for a case base with the similarity functions provided
     * @param similarityFunctions A list with the similarity data files available for a case base
     * @param caseIds A list with the unique case ids for the casebase stored in this DAO
     */
    init(similarityFunctions: Array<DataProvider> | null, caseIds: Array<string>){
        this.similarityFunctions = {};
        this.similarityDB = {};
        if (similarityFunctions !== null) {
            for (let aSimFunction of similarityFunctions) {
                this.similarityFunctions[aSimFunction.name] = aSimFunction;
            }
        }    
        this.caseIds = caseIds;
    }

    /**
     * Return the list of similarity data files available in this DAO
     * @returns A list with the similarity data files available
     */
    getFiles():Array<string> {
        return Object.keys(this.similarityFunctions);
    }

    /**
     * It returns the list of local similarity functions for a similarity function
     * @param simFuncName The name of a similarity function 
     * @returns The list of local similarity functions if the similarity function exists in this DAO; or null, otherwise
     */
    getListSimilarityAttsByName(simFuncName: string): Array<string>|null {
        if (simFuncName in this.similarityDB) {
            return Object.keys(this.similarityDB[simFuncName].similarityDescription["localSim"]);
        }
        else 
            return null;
    }

    /**
     * Return the similarity value of two cases using a similarity function. 
     * The similarity values is returned as an object with detailed information about global and local similarity between cases
     * @param simFuncName The name of a similarity function
     * @param id1 A unique case id
     * @param id2 Another unique case id
     * @returns A similarity value object; or null if any case or the similarity function does not exist in this DAO.
     */
    getSimilarityByName(simFuncName:string, id1:string, id2:string):SimilarityValue | null {
        if (simFuncName in this.similarityDB) {
            return this.similarityDB[simFuncName].getSimilarity(id1, id2);

        } else {
            return null;
        }
    }

    /**
     * Return the Similarity data computed for a similarity function on a casebase
     * @param simFuncName The name of a similarity function
     * @returns The similarity data for this similarity function; 
     * or null, if the similarity function does not exist for this dataset
     */
    async getSimilarityDataByName(simFuncName:string): Promise<SimilarityData | null> {
        if (simFuncName in this.similarityDB) {
            return this.similarityDB[simFuncName];
        }
        else {
            if (simFuncName in this.similarityFunctions) {
                let uri:string = this.similarityFunctions[simFuncName].uri;
                const data = await loadJSONData(uri);
                console.log(data);
                if (this.addSimilarityData(simFuncName,data as SimilarityData)){
                    return this.similarityDB[simFuncName];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }

    /**
     * Try to create a similarity data for a similarity function. 
     * @param simFuncName The name of a similarity function
     * @param data The similarity data (commonly, from a similarity data file)
     * @returns true if the similarity data was created; false, otherwise
     */
    addSimilarityData(simFuncName: string, data: SimilarityData): boolean {
        if (data !== null) {
            this.similarityDB[simFuncName] = new SimilarityData(data.similarityDescription, data.similarities, this.caseIds);
            return true;
        } else {
            return false;
        }
    }
}

const theSimilarityDAO = new SimilarityDAO();
export { theSimilarityDAO };