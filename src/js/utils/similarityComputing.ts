import SimilarityData from "../DAO/similarityData";
import { SimilarityDescription, EntrySimilarityValue, SimilarityValue } from "../types/simvizTypes";

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
    static run(oldSimilarityValues: { [key: string]: EntrySimilarityValue }, newSimilarityDescription: SimilarityDescription): SimilarityData {
        let newSimilarityData: { [key: string]: EntrySimilarityValue } = {};

        for (let id1 in oldSimilarityValues) {
            let simData4Id1: EntrySimilarityValue = oldSimilarityValues[id1]
            for (let id2 in simData4Id1) {
                let newSimPair:SimilarityValue = JSON.parse(JSON.stringify(simData4Id1[id2]))
                let newSimValue = 0.0;
                let totalWeight = 0.0;
                for (let [att, localFunc] of Object.entries(newSimilarityDescription.localSim)) {
                    let weight = localFunc.weight
                    totalWeight += weight;
                    if (att in newSimPair['by_attribute']) {
                        newSimValue += weight * newSimPair['by_attribute'][att];
                    }
                }
                if (totalWeight !== 0) {
                    newSimValue /= totalWeight;
                } else {
                    newSimValue = 0.0;
                }
                newSimPair['value'] = newSimValue;
                simData4Id1[id2] = newSimPair;
            }
            newSimilarityData[id1] = simData4Id1;
        };


        // oldSimilarityValues.forEach(simPair => {
        //     let newSimPair: SimilarityValue = JSON.parse(JSON.stringify(simPair));
        //     let newSimValue = 0.0;
        //     let totalWeight = 0.0;
        //     for (let [att, localFunc] of Object.entries(newSimilarityDescription.localSim)) {
        //         let weight = localFunc.weight
        //         totalWeight += weight;
        //         if (att in simPair['similarity']['by_attribute']) {
        //             newSimValue += weight * simPair['similarity']['by_attribute'][att];
        //         }
        //     }
        //     if (totalWeight !== 0) {
        //         newSimValue /= totalWeight;
        //     } else {
        //         newSimValue = 0.0;
        //     }
        //     newSimPair['similarity']['value'] = newSimValue;
        //     newSimilarityData.push(newSimPair);       
        // });

        return new SimilarityData(newSimilarityDescription, newSimilarityData);
    }
}