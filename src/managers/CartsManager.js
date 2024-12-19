import ErrorManager from "./ErrorManager.js";
import { CartModel } from "../models/cart.model.js";
import { isValidId } from "../config/mongoose.config.js";

class CartsManager {
  #CartModel;
  constructor() {
    this.#CartModel = CartModel;
  }

  // FIND ONE BY ID
  async #findOneById(id) {
    if (!isValidId(id)) {
      throw new ErrorManager("No valid ID", 400);
    }

    const cart = await this.#CartModel.findById(id);

    if (!cart) {
      throw new ErrorManager(`Cart with the ID: ${id} not found `, 404);
    }

    return cart;
  }

  // READ ALL
  async readAll() {
    try {
      return await this.#CartModel.find();
    } catch (err) {
      throw ErrorManager.handleError(err);
    }
  }

  // CREATE ONE
  async createOne(data) {
    try {
      const cart = await this.#CartModel.create(data);
      return cart;
    } catch (err) {
      throw ErrorManager.handleError(err);
    }
  }

  // READ ONE CART BY ID
  async readOneById(id) {
    try {
      const cart = await this.#findOneById(id);

      return cart;
    } catch (err) {
      throw ErrorManager.handleError(err);
    }
  }

  // INSERT ONE PRODUCT BY ID
  async insertOneProductById(cartId, productId, quantity) {
    try {
      if (!isValidId(productId)) {
        throw new ErrorManager("No valid product ID", 400);
      }

      const cart = await this.#findOneById(cartId);

      const findProduct = cart.products.findIndex(
        (product) => product.product.toString() === productId.toString()
      );

      if (findProduct > -1) {
        cart.products[findProduct].quantity += quantity;
      } else {
        cart.products.push({
          product: productId,
          quantity: quantity,
        });
      }

      await cart.save();

      return cart;
    } catch (err) {
      throw ErrorManager.handleError(err);
    }
  }

  // DELETE ONE PRODUCT ON CART BY ID
  async deleteOneProductById(cartId, productId) {
    try {
      if (!isValidId(productId)) {
        throw new ErrorManager("No valid product ID", 400);
      }

      const cart = await this.#findOneById(cartId);

      const updatedProducts = cart.products.filter(
        (product) => product.product.toString() !== productId.toString()
      );

      cart.products = updatedProducts;

      await cart.save();

      return cart;
    } catch (err) {
      throw ErrorManager.handleError(err);
    }
  }

  // READ POPULATED CART
  async readPopulate() {
    try {
      return await this.#CartModel.find().populate("products.product");
    } catch (err) {
      throw ErrorManager.handleError(err);
    }
  }

  // QUANTITY CART
  async quantityCart(cartId, productId, operation) {
    try {
      const cart = await this.#findOneById(cartId);

      const productIndex = cart.products.findIndex(
        (product) => product.product.toString() === productId.toString()
      );

      if (productIndex === -1) {
        throw new ErrorManager("Product not Found", 400);
      }

      if (cart.products[productIndex].quantity >= 1) {
        if (operation === "+") {
          cart.products[productIndex].quantity += 1;
        } else {
          cart.products[productIndex].quantity -= 1;
        }
      }

      await cart.save();
    } catch (err) {
      throw ErrorManager.handleError(err);
    }
  }
}

export { CartsManager };
