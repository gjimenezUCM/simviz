import cbrkit
import json
from cbrkit.typing import SimFunc
type Number = float | int

from colormath.color_objects import LabColor, sRGBColor
from colormath.color_conversions import convert_color
from colormath.color_diff import delta_e_cie2000
import os


def runAndDump(casebase, simFunction, dumpFilename):
    retriever = cbrkit.retrieval.build(
            simFunction
        )
    result = cbrkit.retrieval.apply_queries(casebase, casebase, retriever)

    cbrkit.dumpers.file(os.path.join(os.path.dirname(__file__),dumpFilename),result)

# color_diff.py uses numpy.asscalar() np.asscalar(a) and is deprecated since NumPy v1.16
# temporary solution (https://github.com/gtaylor/python-colormath/issues/104)
import numpy as np
def patch_asscalar(a):
    return a.item()



def avg(aList:list):
    return sum(aList) / len(aList)

class ColorSimilarity(SimFunc[str, float]):
    """Return the perceived similarity value of two colors
    Colors can be defined as a list with RGB values (in [0,255]) or
    a string with a X11 color name
    """

    def __init__(self):
        super().__init__()
        self.cache = {}
        setattr(np, "asscalar", patch_asscalar)

        #. Read the color JSON file
        colorfilePath = colorfilePath = os.path.join(os.path.dirname(__file__),'..','utils','colors.json')
        with open(colorfilePath) as json_file:
            self.objColors = json.load(json_file)

    def colorName2RGB(self, colorName: str) -> list:
        """Converts a color name into a list with RGB values.

        ColorName must be a X11 color.

        Returns
        -------
        list
            A list with the RGB values in [0,255]; 
            or an empty list if the color name does not exist.
        """
        if colorName.lower() in self.objColors:
            return self.objColors[colorName.lower()]
        else:
            return []
        
    def __call__(self, x: str, y: str) -> float:

        """Return the perceived similarity value of two colors
        Colors can be defined as a list with RGB values (in [0,255]) or
        a string with a X11 color name
        """
        xName = ""
        yName = ""
        if x == y:
            return 1.0
        if (type(x) is str):
            xName = x
        if (type(y) is str):
            yName = y 

        # If colors are strings, then convert to RGB
        if (type(x) is str) and (type(y) is str):
            if (x in self.cache) and (y in self.cache[x]):
                return self.cache[x][y]
            elif (y in self.cache) and (x in self.cache[y]):
                return self.cache[y][x]
            else:
                x = self.colorName2RGB(x)
                y = self.colorName2RGB(y)
        
        # If colors are lists but not in RGB, return 0.0
        if (type(x) is list) and len(x) != 3:
            if len(xName)!=0:
                if xName in self.cache:
                    self.cache[xName][yName] = 0.0
                else:
                    self.cache[xName] = dict(yName=  0.0)
            return 0.0
        if (type(y) is list) and len(y) != 3:
            if len(yName)!=0:
                if yName in self.cache:
                    self.cache[yName][xName] = 0.0
                else:
                    self.cache[yName] = dict(xName=  0.0)
            return 0.0

        # Apply delta function to compare colors. First, convert to Lab color format
        xRGB = sRGBColor(x[0], x[1], x[2], is_upscaled=True)
        xLab = convert_color(xRGB,LabColor)
        yRGB = sRGBColor(y[0], y[1], y[2], is_upscaled=True)
        yLab = convert_color(yRGB,LabColor)
        # Apply distance function on Lab colors. delta functions return a value in [0, 100]
        # so we normalize to [0.0, 1.0]
        deltaValue = delta_e_cie2000(xLab, yLab)/100
        # Clamp values greater than 1.0
        deltaValue = 1.0 if deltaValue>1.0 else deltaValue
        # Transform distance into similarity
        simValue = 1.0 - deltaValue
        # Store in cache
        if len(xName)!=0:
            if xName in self.cache:
                self.cache[xName][yName] = simValue
            else:
                self.cache[xName] = dict(yName= simValue)
        if len(yName)!=0:
            if (yName in self.cache):
                self.cache[yName][xName] = simValue
            else:
                self.cache[yName] = dict(xName= simValue)
        
        return simValue

class list_similarity(SimFunc[str, float]):
    """Similarity function that aggregates the partial similarities
    of the elements of two lists using an aggregation function.
    Lists can have different lenght"""

    def __init__(self, similarityFunction:callable, aggFunction:callable):
        super().__init__()
        self.similarityFunction = similarityFunction
        self.aggFunction = aggFunction

    def __call__(self, x:list, y:list):
        if (type (x) is not list) or len(x) == 0:
            return 0.0
        if (type (y) is not list) or len(y) == 0:
            return 0.0
        # Choose the smaller list as list1
        if len(x)>len(y):
            tempList = y
            y = x
            x = tempList
        
        partialSims = []        
        for i in range(len(x)):
            simValuesForItem = []
            for j in range(len(y)):
                simValuesForItem.append(self.similarityFunction(x[i], y[j]))
            # Choose the best similarity value 
            partialSims.append( max(simValuesForItem) )  
        
        return self.aggFunction(partialSims) 

class decade_similarity(SimFunc[Number, float]):
    """Similarity based on the _Decade_ that the year belongs to, normalized in the range of
    decades included in the dataset. The _Decade_ is computed using the year and starts in "1"
    and finishes in "0" (e.g. 1950 belongs to the 40s)
    """

    def __init__(self,minYear:int, maxYear:int):
        super().__init__()
        self.minDecade = self.convertYearToDecade(minYear)
        self.maxDecade = self.convertYearToDecade(maxYear)
        self.decadeRange = self.maxDecade - self.minDecade

    def __call__(self, x: Number, y: Number) -> float:
        if (x is not None) and (y is not None):
            decade1 = self.convertYearToDecade(x)
            decade2 = self.convertYearToDecade(y)

            normalizeDecade1 = (decade1 - self.minDecade) / self.decadeRange
            normalizeDecade2 = (decade2 - self.minDecade) / self.decadeRange
            return 1-abs(normalizeDecade2 - normalizeDecade1)
        else:
            return 0.0
    
    def convertYearToDecade(self,year):
        return int((year-1)/10) * 10


if __name__ == "__main__":
    import json
    # Opening JSON file
    with open(os.path.join(os.path.dirname(__file__),'items.json')) as f:
        dataFile = json.load(f)
    cases = dataFile["cases"]

    """In CBRkit there is no way to explicit which attribute is the 
    case id so we have to transform the cases into a dictionaty
    """
    attributeId = dataFile["metadata"]["id"]
    casebase = { case[attributeId]: case for case in cases }
    
    years = [item["year"] for item in cases if item["year"] is not None]
    simFunction = cbrkit.sim.attribute_value(
        attributes= {
            "year": decade_similarity(min(years), max(years))
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean")
    )
    runAndDump(casebase, simFunction, "cbrkit_Decades.json")

    simFunction = cbrkit.sim.attribute_value(
        attributes={
            "Color": list_similarity(ColorSimilarity(),max)
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean")
    )
    runAndDump(casebase, simFunction, "cbrkit_MaxColor.json")

    simFunction = cbrkit.sim.attribute_value(
        attributes={
            "Color": list_similarity(ColorSimilarity(),avg)
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean")
    )
    runAndDump(casebase, simFunction, "cbrkit_AvgColor.json")

    simFunction = cbrkit.sim.attribute_value(
        attributes={
            "Color": list_similarity(ColorSimilarity(),max),
            "author": cbrkit.sim.strings.levenshtein()
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean", pooling_weights=dict(Color=0.8, author=0.2))
    )
    runAndDump(casebase, simFunction, "cbrkit_Author80Color20.json")

    simFunction = cbrkit.sim.attribute_value(
        attributes={
            "Color": list_similarity(ColorSimilarity(),max),
            "author": cbrkit.sim.strings.levenshtein()
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean", pooling_weights=dict(Color=0.5, author=0.5))
    )
    runAndDump(casebase, simFunction, "cbrkit_Author50Color50.json")
