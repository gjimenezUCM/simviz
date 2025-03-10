import cbrkit
import json

def runAndDump(casebase, simFunction, dumpFilename):
    retriever = cbrkit.retrieval.build(
            simFunction
        )
    result = cbrkit.retrieval.apply_queries(casebase, casebase, retriever)

    cbrkit.dumpers.file(dumpFilename,result)


if __name__ == "__main__":
    # cars-1k.json contains the cases and the metadata about the casebase
    with open('./BCWD/bcwd.json') as f:
        dataFile = json.load(f)
    cases = dataFile["cases"]

    """In CBRkit there is no way to explicit which attribute is the 
    case id so we have to transform the cases into a dictionaty
    """
    attributeId = dataFile["metadata"]["id"]
    casebase = { case[attributeId]: case for case in cases }

    columnNames = [
        "ClumpThickness",
        "UniformityCellSize",
        "UniformityCellShape",
        "MarginalAdhesion",
        "SingleEpithelialCellSize",
        "BareNuclei",
        "BlandChromatin",
        "NormalNucleoli",
        "Mitoses"
    ]
    attributes={ att: cbrkit.sim.numbers.linear_interval(1,14) for att in columnNames }
    simFunction = cbrkit.sim.attribute_value(
        attributes=attributes,
        aggregator=cbrkit.sim.aggregator(
            pooling="mean",
        )
    )
    runAndDump(casebase, simFunction, "./BCWD/cbrkit_allattributes.json")


    
    
