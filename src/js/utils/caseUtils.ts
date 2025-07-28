/**
 * A set of utility functions to find attributes in {@link SimilarityConfiguration},
 * {@link SimilarityValue}, or {@link Taxonomy} objects. The attribute can be expressed
 * as a path with dot (.) notation.
 */
import {
  SimilarityConfiguration,
  StringStringObject,
} from "../types/simvizTypes";

/**
 * Finds and returns a value from a {@link SimilarityValue} object using a given attribute name.
 * Supports nested attribute access using dot notation (e.g., "parent.child.value").
 *
 * @param aSimilarityValue The {@link SimilarityValue} object to search within
 * @param attributeName The name of the attribute to find, supports dot notation
 * @returns The numeric value if found, or null if the attribute does not exist
 */
export function findValueInSimilarityValue(
  aSimilarityValue: any,
  attributeName: string
): number | null {
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

/**
 * Finds and returns a value from a case object using a dot-notation attribute path.
 * This function searches for a value in an object by traversing nested properties
 * using a dot-separated attribute name (e.g., "parent.child.value").
 *
 * @param aCase The case object to search within
 * @param attributeName The attribute name or dot-notation path to the desired value
 * @returns The value found at the specified path, or null if the path does not exist
 *
 */
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

/**
 * Recursively searches through an attributes object to find the attribute whose type is {@link Taxonomy}.
 *
 * @param attributes Object containing string key-value pairs or nested objects to search through
 * @returns The dot-notation path to the attribute whose type is "Taxonomy", or empty string if not found
 */
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

/**
 * Retrieves the weight value for a given attribute from a similarity configuration.
 * Supports both direct attribute access and nested attribute paths using dot notation.
 *
 * @param aSimilarityConfiguration The {@link SimilarityConfiguration} object to search within
 * @param attributeName The name of the attribute or nested path (e.g., "attr" or "parent.child")
 * @returns The weight value for the specified attribute, or 0 if the attribute is not found
 */
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

/**
 * Updates the weight value for a given attribute from a similarity configuration.
 * Supports both direct attribute access and nested attribute paths using dot notation.
 *
 * @param aSimilarityConfiguration The {@link SimilarityConfiguration} object to search within
 * @param attributeName The name of the attribute or nested path (e.g., "attr" or "parent.child")
 * @param newWeight The new value for the weight attribute
 * @returns true, if the weight value has been updated, or false if the attribute is not found
 */
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
