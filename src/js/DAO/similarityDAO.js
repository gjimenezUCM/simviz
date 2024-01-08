const FILEPATH = "./data/";
const FILEEXTENSION = ".json";

import { loadJSONData } from "../fileLoader";
export default class SimilarityDAO {
    constructor(itemIds) {
        this.fileList = [
            "Author50Color50",
            "Author80Color20",
            "simMaxColor",
            "simAvgColor",
            "simDecades"
        ];
        this.similarityMatrix = {};
        this.similarityAtts = {};
        this.itemIds = itemIds;
    }
    getFiles() {
        return this.fileList;
    }

    async getSimilarityMatrixByName(name) {
        if (name in this.similarityMatrix) {
            return this.similarityMatrix[name];
        }
        else {
            const data = await loadJSONData(FILEPATH + name + FILEEXTENSION);
            if (data !== null) {
                this.similarityMatrix[name] = this.createMatrix(data.similarityData); 
                this.similarityAtts = data.similarityDescription;
            }
            return this.similarityMatrix[name];
        }
    }

    getListSimilarityAtts(name) {
        if (name in this.similarityAtts) {
            return Object.keys(this.similarityAtts[name]);
        }
        else 
            return null;
    }

    createMatrix(similarityData) {
        let matrix = [];
        for (let i = 0; i < this.itemIds.length; i++) {
            matrix[i] = [];
            matrix[i][i] = 1.0;
        }
        for (let simPair of similarityData) {
            let id1 = simPair["id1"]
            let id2 = simPair["id2"]
            let index1 = this.itemIds.indexOf(id1);
            let index2 = this.itemIds.indexOf(id2);
            matrix[index1][index2] = simPair["value"]["global"]
            matrix[index2][index1] = simPair["value"]["global"]
        }

        return matrix;
    }
}