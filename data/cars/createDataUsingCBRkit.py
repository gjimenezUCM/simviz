import cbrkit

import json

def runAndDump(casebase, simFunction, dumpFilename):
    retriever = cbrkit.retrieval.build(
            simFunction
        )
    result = cbrkit.retrieval.apply_queries(casebase, casebase, retriever)

    cbrkit.dumpers.file(dumpFilename,result)

def wupalmer(casebase):
    # Wu-Palmer
    taxFunction = cbrkit.sim.taxonomy.build( "./cars/cars-taxonomy.yaml", cbrkit.sim.taxonomy.wu_palmer(),
            )
    simFunction = cbrkit.sim.attribute_value(
        attributes={
            "manufacturer": taxFunction
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean"),
    )

    runAndDump(casebase, simFunction, "./cars/cbrkit_wu_palmer.json")

def paths(casebase):
    # Wu-Palmer
    taxFunction = cbrkit.sim.taxonomy.build( "./cars/cars-taxonomy.yaml", cbrkit.sim.taxonomy.paths(),
            )
    simFunction = cbrkit.sim.attribute_value(
        attributes={
            "manufacturer": taxFunction
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean"),
    )

    runAndDump(casebase, simFunction, "./cars/cbrkit_paths.json")

def levenshtein(casebase):
    simFunction = cbrkit.sim.attribute_value(
        attributes={
            "year": cbrkit.sim.numbers.linear_interval(1950,2021),
            "manufacturer":cbrkit.sim.strings.levenshtein()
        },
        aggregator=cbrkit.sim.aggregator(
            pooling="mean",
            pooling_weights= dict(year=0.8, manufacturer=0.2)),
    )
    runAndDump(casebase, simFunction, "./cars/cbrkit_year_manufacturer.json")


if __name__ == "__main__":
    # cars-1k.json contains the cases and the metadata about the casebase
    with open('./cars/cars-1k.json') as f:
        dataFile = json.load(f)
    cases = dataFile["cases"]

    """In CBRkit there is no way to explicit which attribute is the 
    case id so we have to transform the cases into a dictionaty
    """
    casebase = { case["id"]: case for case in cases }


    # Wu-Palmer
    wupalmer(casebase)

    # Levenshtein
    #levenshtein(casebase)

    # Path steps
    paths(casebase)
    
