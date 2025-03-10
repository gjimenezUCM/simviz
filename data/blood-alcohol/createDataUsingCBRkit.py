import cbrkit
import json

def nominal_range_similarity(listNominalValues: list):
    """Similarity function for a range of nominal values
    It works like the range similarity function but using 
    value indexes
    """
    min = 0
    max = len(listNominalValues)-1
    range = max
    def wrapped_function(x:str, y:str):
        if (x in listNominalValues)  and (y in listNominalValues):
            ix = listNominalValues.index(x)
            iy = listNominalValues.index(y)
            normalizeX = (ix - min) / range
            normalizeY = (iy - min) / range
            return 1-abs(normalizeX - normalizeY)
        else:
            return 0.0
    return wrapped_function

def runAndDump(casebase, simFunction, dumpFilename):
    retriever = cbrkit.retrieval.build(
            simFunction
        )
    result = cbrkit.retrieval.apply_queries(casebase, casebase, retriever)

    cbrkit.dumpers.file(dumpFilename,result)


if __name__ == "__main__":
    import json
    # Opening JSON file
    with open('./blood-alcohol/blood-alcohol-domain.json') as f:
        dataFile = json.load(f)
    cases = dataFile["cases"]

    """In CBRkit there is no way to explicit which attribute is the 
    case id so we have to transform the cases into a dictionaty
    """
    attributeId = dataFile["metadata"]["id"]
    casebase = { case[attributeId]: case for case in cases }

    simFunction = cbrkit.sim.attribute_value(
        attributes= {
            "Gender": cbrkit.sim.generic.equality(),
            "AmountConsumed": cbrkit.sim.numbers.linear_interval(1,14),
            "Meal": nominal_range_similarity (['none', 'snack', 'full']),
            "Duration": cbrkit.sim.numbers.linear_interval(30,240)
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean")
    )

    runAndDump(casebase, simFunction, "./blood-alcohol/cbrkit_GenderAmountMealDuration.json")

    simFunction = cbrkit.sim.attribute_value(
        attributes= {
            "Gender": cbrkit.sim.generic.equality(),
            "AmountConsumed": cbrkit.sim.numbers.linear_interval(1,14),
            "Meal": nominal_range_similarity (['none', 'snack', 'full']),
            "FrameSize": cbrkit.sim.numbers.linear_interval(1,8)
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean")
    )

    runAndDump(casebase, simFunction, "./blood-alcohol/cbrkit_GenderAmountMealFrameSize.json")

    simFunction = cbrkit.sim.attribute_value(
        attributes= {
            "AmountConsumed": cbrkit.sim.numbers.linear_interval(1,14),
            "Meal": nominal_range_similarity (['none', 'snack', 'full']),
            "FrameSize": cbrkit.sim.numbers.linear_interval(1,8)
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean")
    )

    runAndDump(casebase, simFunction, "./blood-alcohol/cbrkit_AmountMealFrameSize.json")


    
    
