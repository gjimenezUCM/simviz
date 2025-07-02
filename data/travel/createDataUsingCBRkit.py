import cbrkit
import json
from dataclasses import dataclass
from cbrkit.typing import SimFunc

type Number = float | int
def runAndDump(casebase, simFunction, dumpFilename):
    retriever = cbrkit.retrieval.build(
            simFunction
        )
    result = cbrkit.retrieval.apply_queries(casebase, casebase, retriever)

    cbrkit.dumpers.file(dumpFilename,result)

class nominal_range_similarity(SimFunc[Number, float]):
    """Similarity function for a range of nominal values
    It works like the range similarity function but using 
    value indexes
    """

    def __init__(self, listNominalValues):
        super().__init__()
        self.listNominalValues = listNominalValues
        self.min = 0
        self.max = len(listNominalValues)-1
        self.range = self.max

    def __call__(self, x: str, y: str) -> float:
        if (x in self.listNominalValues)  and (y in self.listNominalValues):
            ix = self.listNominalValues.index(x)
            iy = self.listNominalValues.index(y)
            normalizeX = (ix - self.min) / self.range
            normalizeY = (iy - self.min) / self.range
            return 1-abs(normalizeX - normalizeY)
        else:
            return 0.0

class circular_range_similarity(SimFunc[Number, float]):
    """Similarity function for a range of nominal values
    It works like the range similarity function but using 
    value indexes
    """

    def __init__(self, listNominalValues):
        super().__init__()
        self.listNominalValues = listNominalValues
        self.range = len(listNominalValues)

    def __call__(self, x: str, y: str) -> float:
        if (x in self.listNominalValues) and (y in self.listNominalValues):
            indexV1 = self.listNominalValues.index(x)
            indexV2 = self.listNominalValues.index(y)
            totheleft = (indexV2-indexV1) % self.range
            totheright = (indexV1-indexV2) % self.range
            return 1.0 - min(totheleft, totheright) / (self.range/2)
        else:
            return 0.0

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

    
    
