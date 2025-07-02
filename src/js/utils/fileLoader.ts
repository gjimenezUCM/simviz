/**
 * Loads a JSON file and returns the 
 * object contained in the file
 * @param {string} fileName JSON filename
 * @returns A object or null (if file does not exist)
 */
export async function loadJSONData(fileName: string): Promise<Object | null> {
    const response = await fetch(fileName, { cache: "no-cache" }).catch(
      (error) => {
        window.alert("Error loading " + fileName + ":" + error);
        return null;
      }
    );
    if (response && response.ok) {
        const json = await response.json();
        return json;
    } else {
        window.alert("Unable to load file:"+ fileName);
        return null;
    }
}

