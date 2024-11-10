import fs from "fs";
import path from "path";
import ErrorManager from "../managers/ErrorManager.js";

// Validation
const validateFile = (filePath, fileName, fileContent) => {
  if (filePath !== null && filePath === undefined)
    throw new ErrorManager("The file Path was not provided.", 400);
  if (fileName !== null && fileName === undefined)
    throw new ErrorManager("The file Name was not provided.", 400);
  if (fileContent !== null && fileContent === undefined)
    throw new ErrorManager("The file Content was not provided.", 400);
};

// READ
const readJsonFile = async (filePath, fileName) => {
  validateFile(filePath, fileName, null);
  try {
    const content = await fs.promises.readFile(
      path.join(filePath, fileName),
      "utf8"
    );

    return JSON.parse(content || "[]");
  } catch (err) {
    throw new ErrorManager(err.message, err.code);
  }
};

//WRITE
const writeJsonFile = async (filePath, fileName, fileContent) => {
  validateFile(filePath, fileName, fileContent);
  try {
    await fs.promises.writeFile(
      path.join(filePath, fileName),
      JSON.stringify(fileContent, null, "\t"),
      "utf8"
    );
  } catch (err) {
    throw new ErrorManager(err.message, err.code);
  }
};

export { readJsonFile, writeJsonFile };
