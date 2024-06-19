/**
 * Datatype for the metadata and the cases contained in a casebase
 */
export type CasebaseDescription = {
    /**
    * A textual description of the case base
    */
    description: string;

    /**
     * The attributes stored on a case
     */
    attributes: Object;

    /**
     * Name of the case attribute that represents the unique case id
     */
    id: string;
    
    /**
     * The cases
     */
    data: Array<Object>
}




export type LocalSimilarityDescription = {
    simFunction: string;
    weight: number,
    description: string
};

export type SimilarityDescription =  {
    globalSim: {
        simFunction: string
    },
    localSim: {
        [key:string]: LocalSimilarityDescription
    }
}

export type SimilarityValue = {
    id1: string,
    id2: string,
    value: {
        global: number,
        local: {
            [key: string]: number
        }
    }
}




/**
 * A generic type for storing data providers:
 * - a name that describes the data provider
 * - a URI that contains the data
 */
export type DataProvider = {
    "name": string,
    "uri": string
}

/**
 * A container for the information about the datasets
 * and their corresponding similarity functions
 */
export interface DatasetInfo { 
    "dataset": DataProvider
    "similarityDatasets": Array<DataProvider>
}