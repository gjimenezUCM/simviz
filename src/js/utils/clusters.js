import { clusterData, averageDistance } from "@greenelab/hclust";

/**
 * Runs a hierarchical clustering algorithm on a similarity matrix and reorders the matrix and case IDs based on the clustering result.
 * 
 * @param {number[][]} simMatrix - A 2D array representing the similarity matrix where simMatrix[i][j] is the similarity between cases i and j
 * @param {string[]} caseIds - Array of case identifiers corresponding to the rows/columns of the similarity matrix
 * @returns {[number[][], string[]]} A tuple containing the reordered similarity matrix and the reordered case IDs array
 * 
 */
export function clusterSorting(simMatrix, caseIds) {
  const completeLinkage = (setA, setB, distances) => {
    let distance = 0;
    for (const a of setA) {
      for (const b of setB)
        if (distances[a][b] > distance) distance = distances[a][b];
    }
    return distance;
  };
  
  const simpleLinkage = (setA, setB, distances) => {
    let distance = 1;
    for (const a of setA) {
      for (const b of setB)
        if (distances[a][b] < distance) distance = distances[a][b];
    }
    return distance;
  };
  
  const distance = (arrayA, arrayB, matrix = simMatrix) => {
    let idA = arrayA[0];
    let idB = arrayB[0];
    let ixA = caseIds.indexOf(idA);
    let ixB = caseIds.indexOf(idB);
    return 1 - matrix[ixA][ixB];
  };

  const data = caseIds.map((x) => [x]);

  const { clusters, distances, order, clustersGivenK } = clusterData({
    data: data,
    distance: distance,
    //linkage: //simpleLinkage, //completeLinkage, averageDistance
  });

  let newMatrix = [];
  let newCaseIds = [];
  let newIndices = order;
  for (let i = 0; i < newIndices.length; i++) {
    newCaseIds[i] = caseIds[newIndices[i]];
    newMatrix[i] = [];
    for (let j = 0; j < newIndices.length; j++) {
      newMatrix[i][j] = simMatrix[newIndices[i]][newIndices[j]];
    }
  }

  return [newMatrix, newCaseIds];
}