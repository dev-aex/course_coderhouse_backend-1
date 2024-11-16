// UTILS
import paths from "../utils/paths.js";
import { generateId } from "../utils/collectionHandler.js";
import { convertToBool } from "../utils/converter.js";
import { generateProductCode } from "../utils/random.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";

// MANAGERS
import ErrorManager from "./ErrorManager.js";

class ProductsManager {
  #jsonFileName;
  #products;
  constructor() {
    this.#jsonFileName = "products.json";
  }

  // GET PRODUCTS
  async getProducts(query) {
    const { limit } = query;

    try {
      this.#products = await readJsonFile(paths.data, this.#jsonFileName);

      if (limit > 0) this.#products = this.#products.slice(0, limit);

      return this.#products;
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }

  // FIND BY ID
  async $findById(id) {
    try {
      this.#products = await this.getProducts(0);
      const productFound = this.#products.find(
        (product) => product.id === Number(id)
      );

      if (!productFound) {
        throw new ErrorManager("Error finding the product", 404);
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
        code,
        brand,
        category,
        price,
        description,
        stock,
        thumbnail,
        status,
      } = data;

      if (!name || !brand || !category || !price || !description || !stock) {
        throw new ErrorManager("Missing required data", 400);
      }

      let productExists = false;

      this.#products = await this.getProducts(0);
      const allProducts = this.#products;

      for (const item of allProducts) {
        if (item.code === data.code) {
          item.stock++;
          productExists = true;
          this.#products = allProducts;
          await writeJsonFile(paths.data, this.#jsonFileName, this.#products);
          return item;
        } else if (item.name === data.name) {
          item.stock++;
          productExists = true;
          this.#products = allProducts;
          await writeJsonFile(paths.data, this.#jsonFileName, this.#products);
          return item;
        }
      }

      const newProductId = generateId(await this.getProducts(0));
      const newProductCode = await generateProductCode(
        newProductId,
        brand,
        category
      );

      if (!productExists) {
        const product = {
          id: newProductId,
          name,
          code: newProductCode,
          brand,
          category,
          price: Number(price),
          description,
          stock: Number(stock),
          thumbnail: thumbnail || "",
          status: true,
        };
        this.#products.push(product);
        await writeJsonFile(paths.data, this.#jsonFileName, this.#products);
        return product;
      }
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
        thumbnail,
        status,
      } = data;

      const productFound = await this.$findById(id);

      const product = {
        id: productFound.id,
        name: name ? name : productFound.name,
        code: productFound.code,
        brand: brand ? brand : productFound.brand,
        category: category ? category : productFound.category,
        price: price ? Number(price) : productFound.price,
        description: description ? description : productFound.description,
        stock: stock ? Number(stock) : productFound.stock,
        thumbnail: thumbnail ? thumbnail : productFound.thumbnail,
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

export default ProductsManager;
