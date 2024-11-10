import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import { convertToBool } from "../utils/converter.js";
import ErrorManager from "./ErrorManager.js";

export default class ProductsManager {
  #jsonFileName;
  #products;
  constructor() {
    this.#jsonFileName = "products.json";
  }

  // GET ALL
  async getAll() {
    try {
      this.#products = await readJsonFile(paths.data, this.#jsonFileName);
      return this.#products;
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }

  // FIND BY ID
  async $findById(id) {
    try {
      this.#products = await this.getAll();
      const productFound = this.#products.find(
        (product) => product.id === Number(id)
      );

      if (!productFound) {
        throw new ErrorManager(`Error finding the product: [${id}]`, 404);
      }
      return productFound;
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }

  // GET BY ID
  async getById(id) {
    try {
      const productFound = await this.$findById(id);
      return productFound;
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }

  // INSERT
  async insertProduct(data) {
    try {
      const {
        name,
        brand,
        category,
        price,
        description,
        stock,
        image,
        status,
      } = data;

      if (
        !name ||
        !brand ||
        !category ||
        !price ||
        !description ||
        !stock ||
        !image ||
        !status
      ) {
        throw new ErrorManager("Missing required data", 400);
      }

      const product = {
        id: generateId(await this.getAll()),
        name,
        brand,
        category,
        price,
        description,
        stock: Number(stock),
        image,
        status: convertToBool(status),
      };
      this.#products.push(product);
      await writeJsonFile(paths.data, this.#jsonFileName, this.#products);
      return product;
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }

  // UPDATE
  async updateProduct(id, data) {
    try {
      const {
        name,
        brand,
        category,
        price,
        description,
        stock,
        image,
        status,
      } = data;

      const productFound = await this.$findById(id);

      const product = {
        id: productFound.id,
        name: name ? name : productFound.name,
        brand: brand ? brand : productFound.brand,
        category: category ? category : productFound.category,
        price: price ? Number(price) : productFound.price,
        description: description ? description : productFound.description,
        stock: stock ? Number(stock) : productFound.stock,
        image: image ? image : productFound.image,
        status: status ? convertToBool(status) : productFound.status,
      };

      const productIndex = this.#products.findIndex(
        (product) => product.id === productFound.id
      );

      this.#products[productIndex] = product;

      await writeJsonFile(paths.data, this.#jsonFileName, this.#products);

      return product;
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }

  // DELETE
  async deleteProduct(id) {
    try {
      const productFound = await this.$findById(id);
      const productIndex = this.#products.findIndex(
        (product) => product.id === productFound.id
      );
      this.#products.splice(productIndex, 1);
      await writeJsonFile(paths.data, this.#jsonFileName, this.#products);
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }
}
