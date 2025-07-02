import cbrkit
import json
from cbrkit.typing import SimFunc
type Number = float | int
import os

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

def runAndDump(casebase, simFunction, dumpFilename):
    retriever = cbrkit.retrieval.build(
            simFunction
        )
    result = cbrkit.retrieval.apply_queries(casebase, casebase, retriever)

    cbrkit.dumpers.file(os.path.join(os.path.dirname(__file__),dumpFilename),result)


if __name__ == "__main__":
    import json
    # Opening JSON file
    with open(os.path.join(os.path.dirname(__file__),'blood-alcohol-domain.json')) as f:
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

    runAndDump(casebase, simFunction, "cbrkit_GenderAmountMealDuration.json")

    simFunction = cbrkit.sim.attribute_value(
        attributes= {
            "Gender": cbrkit.sim.generic.equality(),
            "AmountConsumed": cbrkit.sim.numbers.linear_interval(1,14),
            "Meal": nominal_range_similarity (['none', 'snack', 'full']),
            "FrameSize": cbrkit.sim.numbers.linear_interval(1,8)
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean")
    )

    runAndDump(casebase, simFunction, "cbrkit_GenderAmountMealFrameSize.json")

    simFunction = cbrkit.sim.attribute_value(
        attributes= {
            "AmountConsumed": cbrkit.sim.numbers.linear_interval(1,14),
            "Meal": nominal_range_similarity (['none', 'snack', 'full']),
            "FrameSize": cbrkit.sim.numbers.linear_interval(1,8)
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean")
    )

    runAndDump(casebase, simFunction, "cbrkit_AmountMealFrameSize.json")


    
    
