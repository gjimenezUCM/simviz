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
    value = aSimilarityValue;
    for (const att of nestedAttributes) {
      if (value.hasOwnProperty(att)) {
        if (typeof value[att] === "number") {
          value = value[att];
        } else {
          value = value[att]["attributes"];
        }
      }
    }
  }
  return value;
}

export function findValueInCase(aCase: Object, attributeName: string) {
  let value: any = null;
  if (aCase.hasOwnProperty(attributeName)) {
    value = aCase[attributeName as keyof Object];
  }
  let nestedAttributes = attributeName.split(".");
  if (nestedAttributes.length > 0) {
    value = aCase;
    for (const att of nestedAttributes) {
      if (value.hasOwnProperty(att)) {
        value = value[att];
      }
    }
  }
  return value;
}
