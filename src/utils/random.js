import moment from "moment";
import path from "path";
import ErrorManager from "../managers/ErrorManager";

const generateNumber = (startNumber, endNumber) => {
  if (startNumber > endNumber) {
    throw new ErrorManager("The starting number cannot be greater than the ending number", 400 );
  }

  return Math.floor(
    Math.random() * (endNumber - startNumber + 1) + startNumber
  );
};

const generateNameForFile = (fileName) => {
  if (!fileName || fileName.indexOf(".") === -1) {
    throw new ErrorManager("No valid file name", 400);
  }

  const randomNumber = generateNumber(1000, 9999);
  const dateTime = moment().format("DDMMYYYY_HHmmss");
  const extension = path.extname(fileName);

  return `file_${randomNumber}_${dateTime}${extension}`;
};

export { generateNumber, generateNameForFile };
