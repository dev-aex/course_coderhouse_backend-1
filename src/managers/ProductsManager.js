import ErrorManager from "./ErrorManager.js";
import { ProductModel } from "../models/product.model.js";
import { isValidId } from "../config/mongoose.config.js";
import { generateProductCode } from "../utils/random.js";

class ProductsManager {
  #productModel;
  constructor() {
    this.#productModel = ProductModel;
  }

  // FIND ONE BY ID
  async #findOneById(id) {
    if (!isValidId(id)) {
      throw new ErrorManager("No valid ID", 400);
    }

    const product = await this.#productModel.findById(id);

    if (!product) {
      throw new ErrorManager(`Product with the ID: ${id} not found `, 404);
    }

    return product;
  }

  // READ ALL
  async readAll(params) {
    try {
      const $and = [];

      if (params?.name)
        $and.push({ name: { $regex: params.name, $options: "i" } });
      const filters = $and.length > 0 ? { $and } : {};

      const sort = {
        asc: { name: 1 },
        desc: { name: -1 },
      };

      const paginationOptions = {
        limit: params?.limit || 8,
        page: params?.page || 1,
        sort: sort[params?.sort] ?? {},
        lean: true,
      };

      return await this.#productModel.paginate(filters, paginationOptions);
    } catch (err) {
      throw ErrorManager.handleError(err);
    }
  }

  // READ ONE BY ID
  async readOneById(id) {
    try {
      const product = await this.#findOneById(id);

      return product;
    } catch (err) {
      throw ErrorManager.handleError(err);
    }
  }

  // CREATE ONE
  async createOne(data) {
    try {
      const { newProductId, brand, category } = data;

      data.code = await generateProductCode(newProductId, brand, category);

      const product = await this.#productModel.create(data);
      return product;
    } catch (err) {
      throw ErrorManager.handleError(err);
    }
  }

  // UPDATE ONE BY ID
  async updateOneById(id, data) {
    try {
      const product = await this.#findOneById(id);

      const updatedProduct = {
        code: product.code,
        name: data.name ?? product.name,
        brand: data.brand ?? product.brand,
        category: data.category ?? product.category,
        price: data.price ?? Number(product.price),
        description: data.description ?? product.description,
        stock: data.stock ?? Number(product.stock),
        thumbnail: data.thumbnail ?? product.thumbnail,
        status: true,
      };

      await product.set(updatedProduct);
      await product.save();

      return product;
    } catch (err) {
      throw ErrorManager.handleError(err);
    }
  }

  // DELETE ONE BY ID
  async deleteOneByID(id) {
    try {
      const product = await this.#findOneById(id);

      await product.deleteOne();

      return product;
    } catch (err) {
      throw ErrorManager.handleError(err);
    }
  }
}

export { ProductsManager };
