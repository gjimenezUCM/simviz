export class SimilarityComputing {
    constructor(oldSimilarity, newSimilarityDescription){
        this.oldSimilarity = oldSimilarity
        this.newSimilarityDescription = newSimilarityDescription
    }

    run(){
        let oldSimilarityData = this.oldSimilarity.similarityValues;
        this.newSimilarityData = [];
        for (let simPair of oldSimilarityData) {
            let newSimPair = JSON.parse(JSON.stringify(simPair));
            let newSimValue = 0.0;
            let totalWeight = 0.0;
            for (let [att,localFunc] of Object.entries(this.newSimilarityDescription.localSim)) {
                let weight = localFunc.weight
                totalWeight+=weight;
                if (att in simPair['value']['local']){
                    newSimValue += weight * simPair['value']['local'][att];
                }
            }
            if (totalWeight!==0){
                newSimValue/=totalWeight;
            } else {
                newSimValue = 0.0;
            }
            newSimPair['value']['global'] = newSimValue;
            this.newSimilarityData.push(newSimPair);
        }
    }
}