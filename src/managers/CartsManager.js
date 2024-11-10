import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import ErrorManager from "./ErrorManager.js";

class CartsManager {
  #jsonFileName;
  #carts;
  constructor() {
    this.#jsonFileName = "carts.json";
  }

  // GET ALL
  async getCarts(query) {
    const { limit } = query;
    try {
      this.#carts = await readJsonFile(paths.data, this.#jsonFileName);

      if (limit > 0) {
        this.#carts = this.#carts.slice(0, limit);
      }

      return this.#carts;
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }

  // FIND BY ID
  async $findById(id) {
    try {
      this.#carts = await this.getCarts(0);
      const cartFound = this.#carts.find((cart) => cart.id === Number(id));

      if (!cartFound) {
        throw new ErrorManager("Error finding the cart", 404);
      }
      return cartFound;
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }

  // GET BY ID
  async getById(id) {
    try {
      const cartFound = await this.$findById(id);
      return cartFound;
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }

  // INSERT NEW CART
  async insertCart(data) {
    try {
      const { products } = data;

      if (!products) {
        throw new ErrorManager("Missing required data", 400);
      }

      const cart = {
        id: generateId(await this.getCarts(0)),
        products,
      };

      this.#carts.push(cart);
      await writeJsonFile(paths.data, this.#jsonFileName, this.#carts);
      return cart;
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }

  // UPDATE
  async updateCart(id, data) {
    try {
      const { products } = data;

      const cartFound = await this.$findById(id);

      const cart = {
        id: cartFound.id,
        products: products ? products : cartFound.products,
      };

      const cartIndex = this.#carts.findIndex(
        (cart) => cart.id === cartFound.id
      );

      this.#carts[cartIndex] = cart;

      await writeJsonFile(paths.data, this.#jsonFileName, this.#carts);

      return cart;
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }

  // DELETE
  async deleteCart(id) {
    try {
      const cartFound = await this.$findById(id);
      const cartIndex = this.#carts.findIndex(
        (cart) => cart.id === cartFound.id
      );
      this.#carts.splice(cartIndex, 1);
      await writeJsonFile(paths.data, this.#jsonFileName, this.#carts);
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }

  // INSERT PRODUCT TO CART
  async insertProductToCart(cart, product) {
    try {
      if (!cart || !product) {
        throw new ErrorManager("Missing required data", 400);
      }

      let productExists = false;

      for (const item of cart.products) {
        if (item.id === product.id) {
          item.quantity++;
          productExists = true;
          break;
        }
      }

      if (!productExists) {
        const newProduct = {
          id: product.id,
          quantity: 1,
        };
        cart.products.push(newProduct);
      }
      const newCart = await this.updateCart(cart.id, cart);

      return newCart;
    } catch (err) {
      throw new ErrorManager(err.message, err.code);
    }
  }
}

export default CartsManager;
