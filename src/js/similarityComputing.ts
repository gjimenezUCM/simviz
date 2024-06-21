import SimilarityData from "./DAO/similarityData";
import { SimilarityDescription, SimilarityValue } from "./types/simvizTypes";

/**
 * Utility class for computing the similarity values based on previouly loaded similarity data.
 * It only has a method for computing and creating a new SimilarityData.
 */
export class SimilarityComputing {

    /**
     * Computes new similarity data based on the values of similarity data previously loaded.
     * The new similarity description is created based on a previous one, modifying the weights, 
     * so this function recalculate the global similarity values based on the old
     * similarity values and the new local similarity weights.
     * @param oldSimilarityValues Similarity values for a previous similarity function
     * @param newSimilarityDescription Description of the new similarity data
     * @returns A SimilarityData object
     */
    static run(oldSimilarityValues: Array<SimilarityValue>, newSimilarityDescription: SimilarityDescription): SimilarityData {
        let newSimilarityData: Array<SimilarityValue> = [];

        oldSimilarityValues.forEach(simPair => {
            let newSimPair = JSON.parse(JSON.stringify(simPair));
            let newSimValue = 0.0;
            let totalWeight = 0.0;
            for (let [att, localFunc] of Object.entries(newSimilarityDescription.localSim)) {
                let weight = localFunc.weight
                totalWeight += weight;
                if (att in simPair['value']['local']) {
                    newSimValue += weight * simPair['value']['local'][att];
                }
            }
            if (totalWeight !== 0) {
                newSimValue /= totalWeight;
            } else {
                newSimValue = 0.0;
            }
            newSimPair['value']['global'] = newSimValue;
            newSimilarityData.push(newSimPair);       
        });

        return new SimilarityData(newSimilarityDescription, newSimilarityData);
    }
}