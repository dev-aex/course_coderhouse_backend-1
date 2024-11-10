import moment from "moment";
import path from "path";
import ErrorManager from "../managers/ErrorManager";

const generateNumber = (startNumber, endNumber) => {
  if (startNumber > endNumber) {
    throw new ErrorManager("El número inicial no puede ser mayor que el número final", 400 );
  }

  return Math.floor(
    Math.random() * (endNumber - startNumber + 1) + startNumber
  );
};

const generateNameForFile = (fileName) => {
  if (!fileName || fileName.indexOf(".") === -1) {
    throw new Error("Nombre de archivo inválido");
  }

  const randomNumber = generateNumber(1000, 9999);
  const dateTime = moment().format("DDMMYYYY_HHmmss");
  const extension = path.extname(fileName);

  return `file_${randomNumber}_${dateTime}${extension}`;
};

export { generateNumber, generateNameForFile };
