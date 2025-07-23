import {
  SimilarityConfiguration,
  StringStringObject,
} from "../types/simvizTypes";

export function findValueInSimilarityValue(
  aSimilarityValue: any,
  attributeName: string
): any {
  let value: any = null;
  if (aSimilarityValue.hasOwnProperty(attributeName)) {
    value = aSimilarityValue[attributeName];
  }
  let nestedAttributes = attributeName.split(".");
  if (nestedAttributes.length > 0) {
    let tempvalue = aSimilarityValue;
    for (const att of nestedAttributes) {
      if (tempvalue.hasOwnProperty(att)) {
        if (typeof tempvalue[att] === "number") {
          tempvalue = tempvalue[att];
        } else {
          tempvalue = tempvalue[att]["attributes"];
        }
      } else {
        return null;
      }
    }
    value = tempvalue;
  }
  return value;
}

export function findValueInCase(aCase: Object, attributeName: string): any {
  let value: any = null;
  if (aCase.hasOwnProperty(attributeName)) {
    value = aCase[attributeName as keyof Object];
  }
  let nestedAttributes = attributeName.split(".");
  if (nestedAttributes.length > 0) {
    let tempvalue: any = aCase;
    for (const att of nestedAttributes) {
      if (tempvalue.hasOwnProperty(att)) {
        tempvalue = tempvalue[att];
      } else {
        return null;
      }
    }
    value = tempvalue;
  }
  return value;
}

export function findTaxonomyAttribute(attributes: StringStringObject): string {
  let attribute = "";
  for (const [key, value] of Object.entries(attributes)) {
    if (value === "Taxonomy") {
      attribute = key;
      return attribute;
    } else {
      if (typeof value === "object") {
        let suffix = findTaxonomyAttribute(value);
        if (suffix !== "") {
          return `${key}.${suffix}`;
        }
      }
    }
  }
  return attribute;
}

export function getWeightInSimilarityConfiguration(
  aSimilarityConfiguration: SimilarityConfiguration,
  attributeName: string
): number {
  let weight: number = 0;
  if (aSimilarityConfiguration.localSim.hasOwnProperty(attributeName)) {
    weight = aSimilarityConfiguration.localSim[attributeName].weight;
  } else {
    let nestedAttributes = attributeName.split(".");
    if (nestedAttributes.length > 0) {
      let tempConfiguration: SimilarityConfiguration = aSimilarityConfiguration;
      for (const att of nestedAttributes) {
        if (tempConfiguration.localSim.hasOwnProperty(att)) {
          if (tempConfiguration.localSim[att].nestedSimilarityConfiguration) {
            tempConfiguration =
              tempConfiguration.localSim[att].nestedSimilarityConfiguration;
          } else {
            weight = tempConfiguration.localSim[att].weight;
          }
        } else {
          return 0.0;
        }
      }
    }
  }
  return weight;
}

export function setWeightInSimilarityConfiguration(
  aSimilarityConfiguration: SimilarityConfiguration,
  attributeName: string,
  newWeight: number
): boolean {
  let correct: boolean = false;
  if (aSimilarityConfiguration.localSim.hasOwnProperty(attributeName)) {
    aSimilarityConfiguration.localSim[attributeName].weight = newWeight;
    correct = true;
  } else {
    let nestedAttributes = attributeName.split(".");
    if (nestedAttributes.length > 0) {
      let tempConfiguration: SimilarityConfiguration = aSimilarityConfiguration;
      for (const att of nestedAttributes) {
        if (tempConfiguration.localSim.hasOwnProperty(att)) {
          if (tempConfiguration.localSim[att].nestedSimilarityConfiguration) {
            tempConfiguration =
              tempConfiguration.localSim[att].nestedSimilarityConfiguration;
          } else {
            tempConfiguration.localSim[att].weight = newWeight;
            correct = true;
          }
        } else {
          return false;
        }
      }
    }
  }
  return correct;
}

export function removeAttributeFromSimilarityConfiguration(
  aSimilarityConfiguration: SimilarityConfiguration,
  attributeName: string
): boolean {
  let correct: boolean = false;
  if (aSimilarityConfiguration.localSim.hasOwnProperty(attributeName)) {
    delete aSimilarityConfiguration.localSim[attributeName];
    correct = true;
  } else {
    let nestedAttributes = attributeName.split(".");
    if (nestedAttributes.length > 0) {
      let tempConfiguration: SimilarityConfiguration = aSimilarityConfiguration;
      for (const att of nestedAttributes) {
        if (tempConfiguration.localSim.hasOwnProperty(att)) {
          if (tempConfiguration.localSim[att].nestedSimilarityConfiguration) {
            tempConfiguration =
              tempConfiguration.localSim[att].nestedSimilarityConfiguration;
          } else {
            delete tempConfiguration.localSim[att];
            correct = true;
          }
        } else {
          return false;
        }
      }
    }
  }
  return correct;
}
