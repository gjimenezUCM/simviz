from colormath.color_objects import LabColor, sRGBColor
from colormath.color_conversions import convert_color
from colormath.color_diff import delta_e_cie2000
import json
from cbrkit import retrieval
import os

# color_diff.py uses numpy.asscalar() np.asscalar(a) and is deprecated since NumPy v1.16
# temporary solution (https://github.com/gtaylor/python-colormath/issues/104)
import numpy as np
def patch_asscalar(a):
    return a.item()

setattr(np, "asscalar", patch_asscalar)

# Read the color JSON file
colorfilePath = os.path.dirname(__file__)
with open(colorfilePath+'/colors.json') as json_file:
    objColors = json.load(json_file)

def colorName2RGB(colorName: str) -> list:
    """Converts a color name into a list with RGB values.

    ColorName must be a X11 color.

    Returns
    -------
    list
        A list with the RGB values in [0,255]; 
        or an empty list if the color name does not exist.
    """
    if colorName.lower() in objColors:
        return objColors[colorName.lower()]
    else:
        return []

def color_similarity():
    cache = {}

    def wrapped_function(x: str | list, y: str | list) -> float:
        cache = {}

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
            if (x in cache) and (y in cache[x]):
                return cache[x][y]
            elif (y in cache) and (x in cache[y]):
                return cache[y][x]
            else:
                x = colorName2RGB(x)
                y = colorName2RGB(y)
        
        # If colors are lists but not in RGB, return 0.0
        if (type(x) is list) and len(x) != 3:
            if len(xName)!=0:
                if xName in cache:
                    cache[xName][yName] = 0.0
                else:
                    cache[xName] = dict(yName=  0.0)
            return 0.0
        if (type(y) is list) and len(y) != 3:
            if len(yName)!=0:
                if yName in cache:
                    cache[yName][xName] = 0.0
                else:
                    cache[yName] = dict(xName=  0.0)
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
            if xName in cache:
                cache[xName][yName] = simValue
            else:
                cache[xName] = dict(yName= simValue)
        if len(yName)!=0:
            if (yName in cache):
                cache[yName][xName] = simValue
            else:
                cache[yName] = dict(xName= simValue)
        
        return simValue
    return wrapped_function

def list_similarity(similarityFunction:callable, aggFunction:callable):
    """Similarity function that aggregates the partial similarities
    of the elements of two lists using an aggregation function.
    Lists can have different lenght"""
    def wrapped_function(x:list, y:list):
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
                simValuesForItem.append(similarityFunction(x[i], y[j]))
            # Choose the best similarity value 
            partialSims.append( max(simValuesForItem) )  
        
        return aggFunction(partialSims) 

    return wrapped_function  

def decade_similarity(minYear:int, maxYear:int):
    def convertYearToDecade(year):
        return int((year-1)/10) * 10
    
    minDecade = convertYearToDecade(minYear)
    maxDecade = convertYearToDecade(maxYear)
    decadeRange = maxDecade - minDecade

    def wrapped_function(year1:int, year2:int):
        if (year1 is not None) and (year2 is not None):
            decade1 = convertYearToDecade(year1)
            decade2 = convertYearToDecade(year2)

            normalizeDecade1 = (decade1 - minDecade) / decadeRange
            normalizeDecade2 = (decade2 - minDecade) / decadeRange
            return 1-abs(normalizeDecade2 - normalizeDecade1)
        else:
            return 0.0
    return wrapped_function

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



def compute_similarity_data(casebase, simFunction,idAttribute = None):
    cases = casebase.values()
    numCases = len(cases)
    retriever = retrieval.build(
        simFunction,
        limit=numCases
    )
    i=0
    similarityData = {}
    for case in cases:
        id1 = "c"+str(i) if idAttribute is None else case[idAttribute]
        query = case
        result = retrieval.apply(casebase, query, retriever)
        simValues = {}
        for (caseId,simValue) in result.similarityScores.items():
            if caseId>=i:
                id2 = "c"+str(caseId) if idAttribute is None else casebase[caseId][idAttribute]
                simValues[id2] = simValue
        similarityData[id1] = simValues
        i+=1
    return similarityData

import orjson
def default(obj):
    if isinstance(obj, np.float64):
        return float(obj)
    raise TypeError

def exportToJson(similarityData, filePath):
    simprint = orjson.dumps(similarityData, default=default, option=orjson.OPT_NON_STR_KEYS)
    with open(filePath, "w") as file:
        file.write(simprint.decode("utf-8"))