import { LocalSimilarityDescription, SimilarityConfiguration } from "../types/simvizTypes";

export class CBRkitAdapter {
  static adaptConfiguration(config: any): SimilarityConfiguration {


    let adaptedConfig:any = {
        globalSim: {
            name: ""
        },
        localSim: {            
        }
    }   
    
    
    if (
      "metadata" in config &&
      "similarity_func" in config["metadata"] &&
      "metadata" in config["metadata"]["similarity_func"]
    ) {
      let metadata = config["metadata"]["similarity_func"]["metadata"];
      console.log(metadata);
      let weights: any = { };
      if ("aggregator" in metadata && "metadata" in metadata["aggregator"]) {
        let globalSimMetadata = metadata["aggregator"]["metadata"];

        if ("pooling" in globalSimMetadata) {
          adaptedConfig.globalSim.name = globalSimMetadata["pooling"];
        }
        if ("pooling_weights" in globalSimMetadata) {
          weights = globalSimMetadata["pooling_weights"];
        }
      }

      if ("attributes" in metadata) {
        for (const attName of Object.keys(metadata["attributes"])) {
          let currentLocalSim = metadata["attributes"][attName];

          let localSimConfig: LocalSimilarityDescription = {
            name: "",
            weight: 1.0,
            description: "",
          };

          localSimConfig["name"] = currentLocalSim["name"];
          localSimConfig["description"] = currentLocalSim["doc"];
          if (weights && (attName in weights) ) {
            localSimConfig["weight"] = weights[attName];
          }
          adaptedConfig.localSim[attName] = localSimConfig;
        }
      }
      return adaptedConfig;
    } 
    else {
        return config;
    }
  }
}