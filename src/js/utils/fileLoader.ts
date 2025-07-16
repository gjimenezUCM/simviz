import JSZip from "jszip";

/**
 * Loads a file and returns the json object contained in the file
 * The file can be:
 * - A json file.
 * - A zip file that contains a json file with the same name
 *   (if the filename is foo.zip then it should contain a foo.json file)
 * @param {string} jsonFilePath JSON filename
 * @returns A object; or null, if file does not exist or if zip file does not contain
 *          a json file with the same name.
 */
export async function loadJSONData(
  jsonFilePath: string
): Promise<Object | null> {
  let fileName = jsonFilePath.split("/").pop();
  const response = await fetch(jsonFilePath, { cache: "no-cache" }).catch(
    (error) => {
      window.alert("Error loading " + jsonFilePath + ":" + error);
      return null;
    }
  );
  if (response && response.ok) {
    if (fileName?.endsWith(".zip")) {
      fileName = fileName.replace(".zip", "");
      const json = await readJsonFromZip(response, fileName);
      return json;
    }
    const json = await response.json();
    return json;
  } else {
    window.alert("Unable to load file:" + jsonFilePath);
    return null;
  }
}

/**
 * Reads and parses a JSON file from a ZIP archive provided as a Response object.
 *
 * @param aResponse - The Response object containing the ZIP file as its body.
 * @param jsonFilename - The base name (without extension) of the JSON file to extract from the ZIP.
 * @returns A promise that resolves to the parsed JSON object if found, or null if the file does not exist in the ZIP.
 */
async function readJsonFromZip(
  aResponse: Response,
  jsonFilename: string
): Promise<any> {
  let jsonContent = null;
  const zipArrayBuffer = await aResponse.arrayBuffer();
  const expectedJsonFile = `${jsonFilename}.json`;
  const zip = await JSZip.loadAsync(zipArrayBuffer);

  // Search for the json file
  const jsonFile = zip.file(expectedJsonFile);

  if (jsonFile) {
    // Read json content and parse it
    const jsonText = await jsonFile.async("string");
    jsonContent = JSON.parse(jsonText);
  } else {
    // For debugging
    console.error(`Unable to find ${expectedJsonFile} in zip file`);
    console.log("Files in zip file:");
    zip.forEach((relativePath, file) => {
      console.log("- " + relativePath);
    });
  }

  return jsonContent;
}
