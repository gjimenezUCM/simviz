import { StringStringObject } from "../types/simvizTypes";

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
