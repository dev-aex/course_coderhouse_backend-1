import ErrorManager from "../managers/ErrorManager.js";

const generateId = (collection) => {
  if (!Array.isArray(collection)) {
    throw new ErrorManager(`Not valid collection:[{${collection}]`);
  }

  let maxId = 0;
  collection.forEach((product) => {
    if (product.id > maxId) {
      maxId = product.id;
    }
  });
  return maxId + 1;
};

export { generateId };
