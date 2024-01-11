const FILEPATH = "./data/";
const FILEEXTENSION = ".json";

import { loadJSONData } from "../fileLoader";
export default class SimilarityDAO {
    constructor(itemIds) {
        this.fileList = [
            "blood"
            // "Author50Color50",
            // "Author80Color20",
            // "simMaxColor",
            // "simAvgColor",
            // "simDecades"
        ];

        this.similarityDB = {}
        this.itemIds = itemIds;
    }
    getFiles() {
        return this.fileList;
    }

    async getSimilarityMatrixByName(name) {
        if (name in this.similarityDB) {
            return this.similarityDB[name].similarityMatrix;
        }
        else {
            const data = await loadJSONData(FILEPATH + name + FILEEXTENSION);
            if (data !== null) {
                let simData = {};
                simData["similarityMatrix"] = this._createMatrix(data.similarityData);
                simData["similarityDescription"] = data.similarityDescription;
                simData["similarityValues"] = data.similarityData;
                this.similarityDB[name] = simData;
            }
            return this.similarityDB[name].similarityMatrix;
        }
    }

    getListSimilarityAttsByName(name) {
        if (name in this.similarityDB) {
            return Object.keys(this.similarityDB[name].similarityDescription);
        }
        else 
            return null;
    }

    _createMatrix(similarityData) {
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

    getSimilarityByName(name, id1, id2) {
        if (name in this.similarityDB) {
            let simObject = this.similarityDB[name].similarityValues.find(
                (elem) => (elem.id1 === id1) && (elem.id2 === id2)
            )
            if (simObject) {
                return simObject.value;
            }
            else {
                simObject = this.similarityDB[name].similarityValues.find(
                    (elem) => (elem.id1 === id2) && (elem.id2 === id1)
                ) 
                if (simObject) {
                    return simObject.value;
                } else {
                    return null;
                }
            }

        } else {
            return null;
        }
    }

    async getSimilarityDataByName(name) {
        if (name in this.similarityDB) {
            return this.similarityDB[name];
        }
        else {
            const data = await loadJSONData(FILEPATH + name + FILEEXTENSION);
            if (data !== null) {
                let simData = {};
                simData["similarityMatrix"] = this._createMatrix(data.similarityData);
                simData["similarityDescription"] = data.similarityDescription;
                simData["similarityValues"] = data.similarityData;
                this.similarityDB[name] = simData;
            }
            return this.similarityDB[name];
        }
    }
}

export function getSimilarityInData(simData, id1, id2) {
    let simObject = simData.similarityValues.find(
        (elem) => (elem.id1 === id1) && (elem.id2 === id2)
    )
    if (simObject) {
        return simObject.value;
    }
    else {
        simObject = simData.similarityValues.find(
            (elem) => (elem.id1 === id2) && (elem.id2 === id1)
        )
        if (simObject) {
            return simObject.value;
        } else {
            return null;
        }
    }
}