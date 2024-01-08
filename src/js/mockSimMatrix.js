import { daoItems } from "./mockdata";

export default function createMatrix(similarityData, daoItems) {
    let itemIds = daoItems.getIds();
    let matrix = [];
    for (let i=0; i<itemIds.length; i++) {
        matrix[i] = [];
        matrix[i][i] = 1.0;
    }
    for (let simPair of similarityData) {
        let id1 = simPair["id1"]
        let id2 = simPair["id2"]
        let index1 = itemIds.indexOf(id1);
        let index2 = itemIds.indexOf(id2);
        matrix[index1][index2] = simPair["value"]["global"]
        matrix[index2][index1] = simPair["value"]["global"]
    }

    return matrix;
}

//let sampleData = await loadJSONData("data/newSimData.json");
//const matrix = createMatrix(sampleData.similarityData, daoItems);
 