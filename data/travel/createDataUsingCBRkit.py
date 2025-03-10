import cbrkit
import json


def runAndDump(casebase, simFunction, dumpFilename):
    retriever = cbrkit.retrieval.build(
            simFunction
        )
    result = cbrkit.retrieval.apply_queries(casebase, casebase, retriever)

    cbrkit.dumpers.file(dumpFilename,result)

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

def circular_range_similarity(listNominalValues: list):
    """Similarity function for a range of nominal values
    It works like the range similarity function but using 
    value indexes
    """
    range = len(listNominalValues)

    def wrapped_function(x:str, y:str):
        if (x in listNominalValues) and (y in listNominalValues):
            indexV1 = listNominalValues.index(x)
            indexV2 = listNominalValues.index(y)
            totheleft = (indexV2-indexV1) % range
            totheright = (indexV1-indexV2) % range
            return 1.0 - min(totheleft, totheright) / (range/2)
        else:
            return 0.0
        
    return wrapped_function

if __name__ == "__main__":
    import json
    # Opening JSON file
    with open('./travel/travel.json') as f:
        dataFile = json.load(f)
    cases = dataFile["cases"]

    """In CBRkit there is no way to explicit which attribute is the 
    case id so we have to transform the cases into a dictionaty
    """
    attributeId = dataFile["metadata"]["id"]
    casebase = { case[attributeId]: case for case in cases }

    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    simFunction = cbrkit.sim.attribute_value(
        attributes= {
            "HolidayType": cbrkit.sim.generic.equality(),
            "NumberOfPersons": cbrkit.sim.numbers.linear_interval(1,12),
            "Region": cbrkit.sim.generic.equality(),
            "Duration": cbrkit.sim.numbers.linear_interval(3,21),
            "Month": circular_range_similarity(months)
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean")
    )
    runAndDump(casebase, simFunction, "./travel/cbrkit_allAttributes.json")

    simFunction = cbrkit.sim.attribute_value(
        attributes= {
            "Month": nominal_range_similarity(months)
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean")
    )
    runAndDump(casebase, simFunction, "./travel/cbrkit_month1.json") 

    simFunction = cbrkit.sim.attribute_value(
        attributes= {
            "Month": circular_range_similarity(months)
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean")
    )
    runAndDump(casebase, simFunction, "./travel/cbrkit_month2.json")   

    
    
