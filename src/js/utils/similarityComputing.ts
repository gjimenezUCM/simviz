import SimilarityData from "../DAO/similarityData";
import {
  SimilarityConfiguration,
  EntrySimilarityValue,
  SimilarityValue,
  LocalSimilarityDescription,
} from "../types/simvizTypes";

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
  static run(
    oldSimilarityValues: { [key: string]: EntrySimilarityValue },
    newSimilarityDescription: SimilarityConfiguration
  ): SimilarityData {
    let newSimilarityData: { [key: string]: EntrySimilarityValue } = {};

    for (let id1 in oldSimilarityValues) {
      let simData4Id1: EntrySimilarityValue = JSON.parse(
        JSON.stringify(oldSimilarityValues[id1])
      );
      for (let id2 in simData4Id1) {
        let newSimPair: SimilarityValue = JSON.parse(
          JSON.stringify(simData4Id1[id2])
        );
        let newSimValue = 0.0;
        let totalWeight = 0.0;
        for (let [att, localFunc] of Object.entries(
          newSimilarityDescription.localSim
        )) {
          let weight = localFunc.weight;
          totalWeight += weight;
          if (att in newSimPair["attributes"]) {
            const attValue = this.computeLocalSimilarityValue(
              newSimPair,
              newSimilarityDescription,
              att
            );
            newSimValue += weight * attValue;
          }

          // /// FIX: ignoring complex functions
          // if (localFunc.nestedSimilarityConfiguration === null) {
          //   let weight = localFunc.weight;
          //   totalWeight += weight;
          //   if (att in newSimPair["attributes"]) {
          //     const attValue = newSimPair["attributes"][att] as number;
          //     newSimValue += weight * attValue;
          //   }
          // }
        }
        if (totalWeight !== 0) {
          newSimValue /= totalWeight;
        } else {
          newSimValue = 0.0;
        }
        newSimPair["value"] = newSimValue;
        simData4Id1[id2] = newSimPair;
      }
      newSimilarityData[id1] = simData4Id1;
    }
    return new SimilarityData(newSimilarityDescription, newSimilarityData);
  }

  /**
   * Computes the local similarity value for a given attribute within a similarity value object,
   * based on the provided similarity configuration.
   *
   * This method handles both primitive (number) attributes and nested similarity structures.
   *
   * @param simValue - The similarity value object containing attribute values (possibly nested).
   * @param simDescription - The similarity configuration describing weights and nested configurations.
   * @param attName - The name of the attribute for which to compute the similarity value.
   * @returns The computed local similarity value as a number.
   */
  static computeLocalSimilarityValue(
    simValue: SimilarityValue,
    simDescription: SimilarityConfiguration,
    attName: string
  ): number {
    let result = 0;
    if (
      attName in simValue["attributes"] &&
      typeof simValue["attributes"][attName] === "number"
    ) {
      result =
        simValue["attributes"][attName] *
        simDescription["localSim"][attName].weight;
    } else {
      // Recursive on nested similarity configuration
      let innerSimValue = simValue["attributes"][attName] as SimilarityValue;
      let innerSimilarityConfiguration =
        simDescription["localSim"][attName].nestedSimilarityConfiguration;
      if (innerSimilarityConfiguration) {
        let totalWeight = 0.0;
        for (const subAtt in innerSimValue["attributes"]) {
          let partialResult = this.computeLocalSimilarityValue(
            innerSimValue,
            innerSimilarityConfiguration,
            subAtt
          );
          result +=
            partialResult *
            innerSimilarityConfiguration["localSim"][subAtt].weight;
          totalWeight +=
            innerSimilarityConfiguration["localSim"][subAtt].weight;
        }
        if (totalWeight !== 0) {
          result /= totalWeight;
        } else {
          result = 0.0;
        }
        innerSimValue.value = result;
      }
    }
    return result;
  }
}
