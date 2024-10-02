import { EntrySimilarityValue, SimilarityDescription, SimilarityValue } from "../types/simvizTypes";

/**
 * This class encapsulates all the information about the similarity values computed using a similarity function 
 * for all the cases in a casebase
 * It contains information that describes the similarity function employed to copmpute the similarity data.
 * The similarity values are stored in two different ways:
 * - A list of pairs of cases with detailed similarity values (global and local similarity values)
 * - A matrix of global similarity values
 */
export default class SimilarityData {

    /**
     * A detailed description about the similarity function employed to computed the similarity data
     */
    similarityDescription: SimilarityDescription;

    /**
     * A list of pairs of cases with detailed similarity values (global and local similarity values)
     */
    similarities: { [key: string]: EntrySimilarityValue };

    /**
     * A matrix of global similarity values. This attribute is optional because it is commonly created
     * during the construction
     */
    similarityMatrix?: Array<Array<number>>;

    /**
     * Constructor (as a copy constructor)
     * @param data Another similarityData object, commonly without the similarity matrix
     * @param caseIds A list with all the ids in the casebase
     */
    constructor(description: SimilarityDescription, similarityValues: { [key: string]: EntrySimilarityValue }, caseIds?: Array<string>){
        this.similarityDescription = description;
        this.similarities = similarityValues;
        if (caseIds){
            this.similarityMatrix = this._createMatrix(similarityValues, caseIds);
        }
    }

    /**
     * Create a matrix of global similarity values
     * @param similarityValues A list of pairs of cases with global and local similarity values
     * @param itemIds A list with all the ids in the casebase
     * @returns A matrix with global similarity values
     */
    private _createMatrix(similarityValues: { [key: string]: EntrySimilarityValue }, itemIds: Array<string>): Array<Array<number>> {
        let matrix: Array<Array<number>> = [];
        for (let i = 0; i < itemIds.length; i++) {
            matrix[i] = [];
            matrix[i][i] = 1.0;
        }
        for (let id1 in similarityValues) {
            let simData4Id1:EntrySimilarityValue = similarityValues[id1]
            for (let id2 in simData4Id1) {
                let index1 = itemIds.indexOf(id1);
                let index2 = itemIds.indexOf(id2);
                matrix[index1][index2] = simData4Id1[id2]["value"];
                matrix[index2][index1] = simData4Id1[id2]["value"];
            }
        }

        return matrix;
    }

    /**
     * Return the similarity value of a pair of cases (id1, id2). The similarity values is
     * returned as an object with detailed information about global and local similarity between cases
     * @param id1 The unique identifier of a case
     * @param id2 The unique identifier of a case
     * @returns A similarity value object; or null if any case does not exist.
     */
    getSimilarity(id1:string, id2:string): SimilarityValue | null {
        // Look for (id1,id2)
        if ((id1 in this.similarities) && (id2 in this.similarities[id1])){
            return this.similarities[id1][id2];
        }
        // Look for (id2,id1)
        if ((id2 in this.similarities) && (id1 in this.similarities[id2])) {
            return this.similarities[id2][id1];
        }
        return null;
    }

}