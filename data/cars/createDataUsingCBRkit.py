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

def wupalmer(casebase):
    # Wu-Palmer
    taxFunction = cbrkit.sim.taxonomy.build( "./cars-taxonomy.yaml", cbrkit.sim.taxonomy.wu_palmer(),
            )
    simFunction = cbrkit.sim.attribute_value(
        attributes={
            "manufacturer": taxFunction
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean"),
    )

    runAndDump(casebase, simFunction, "./cbrkit_wu_palmer.json")

def paths(casebase):
    # Wu-Palmer
    taxFunction = cbrkit.sim.taxonomy.build( "./cars-taxonomy.yaml", cbrkit.sim.taxonomy.paths(),
            )
    simFunction = cbrkit.sim.attribute_value(
        attributes={
            "manufacturer": taxFunction
        },
        aggregator=cbrkit.sim.aggregator(pooling="mean"),
    )

    runAndDump(casebase, simFunction, "./cbrkit_paths.json")

def yearManufacturerPrice(casebase):
    simFunction = cbrkit.sim.attribute_value(
        attributes={
            "year": cbrkit.sim.numbers.linear_interval(1950,2021),
            "manufacturer":cbrkit.sim.strings.levenshtein(),
            "price": cbrkit.sim.numbers.linear(max=200000)
        },
        aggregator=cbrkit.sim.aggregator(
            pooling="mean",
            pooling_weights= dict(year=0.4, price=0.4, manufacturer=0.2)),
    )
    runAndDump(casebase, simFunction, "./cbrkit_year_manufacturer_price.json")

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

def yearManufacturerCondition(casebase):
    simFunction = cbrkit.sim.attribute_value(
        attributes={
            "year": cbrkit.sim.numbers.linear_interval(1950,2021),
            "manufacturer":cbrkit.sim.strings.levenshtein(),
            "condition": nominal_range_similarity(['excellent','new','like new','good','fair','salvage'])
        },
        aggregator=cbrkit.sim.aggregator(
            pooling="mean",
            pooling_weights= dict(year=0.4, condition=0.4, manufacturer=0.2)),
    )
    runAndDump(casebase, simFunction, "./cbrkit_year_manufacturer_condition.json")

# color_diff.py uses numpy.asscalar() np.asscalar(a) and is deprecated since NumPy v1.16
# temporary solution (https://github.com/gtaylor/python-colormath/issues/104)
import numpy as np
def patch_asscalar(a):
    return a.item()





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
        print(colorfilePath)
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

def colorSimilarity(casebase):
    simFunction = cbrkit.sim.attribute_value(
        attributes={
            "paint_color": ColorSimilarity(),
        },
        aggregator=cbrkit.sim.aggregator(
            pooling="mean"),
    )
    runAndDump(casebase, simFunction, "./cbrkit_color.json")


if __name__ == "__main__":
    print (os.path.dirname(__file__))
    # cars-1k.json contains the cases and the metadata about the casebase
    cbFileName = os.path.join(os.path.dirname(__file__),'cars-10.json' )
    with open(cbFileName) as f:
        dataFile = json.load(f)
    cases = dataFile["cases"]

    """In CBRkit there is no way to explicit which attribute is the 
    case id so we have to transform the cases into a dictionaty
    """
    casebase = { case["id"]: case for case in cases }

    # Year manufacturer price
    #yearManufacturerPrice(casebase)

    # Year manufacturer condition (using a custom similarity function)
    # yearManufacturerCondition(casebase)

    # Wu-Palmer
    #wupalmer(casebase)

    # Path steps
    #paths(casebase)

    # Color
    # colorSimilarity(casebase)

    # simFunction = cbrkit.sim.attribute_value(
    #     attributes={
    #         "paint_color": color_similarity()
    #     },
    #     aggregator=cbrkit.sim.aggregator(pooling="mean")
    # )
    # runAndDump(casebase, simFunction, "./cars/cbrkit_color.json")
    retriever = cbrkit.retrieval.build(
        cbrkit.sim.attribute_value(
            attributes={
                "year": cbrkit.sim.numbers.linear_interval(1950,2021),
                "model": cbrkit.sim.attribute_value(
                    attributes={
                        "make": cbrkit.sim.strings.levenshtein(),
                        "manufacturer": cbrkit.sim.taxonomy.build(
                            os.path.join(os.path.dirname(__file__),"cars-taxonomy.yaml"),
                            cbrkit.sim.taxonomy.wu_palmer(),
                        ),
                    }
                ),
            },
            aggregator=cbrkit.sim.aggregator(pooling="mean"),
        ),
    )
    result = cbrkit.retrieval.apply_queries(casebase, casebase, retriever)

    cbrkit.dumpers.file(os.path.join(os.path.dirname(__file__),"model-object.json"),result)

    
