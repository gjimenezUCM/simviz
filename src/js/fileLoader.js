/**
 * Loads a JSON file and returns the 
 * object contained in the file
 * @param {string} fileName JSON filename
 * @returns A object or null (if file does not exist)
 */
export async function loadJSONData(fileName){
    const response = await fetch(fileName);
    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        window.alert("Unable to load file:", fileName);
        return null;
    }
}

