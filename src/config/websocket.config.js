import { Server } from "socket.io";
import { ProductsManager } from "../managers/ProductsManager.js";
import { CartsManager } from "../managers/CartsManager.js";

const productsManager = new ProductsManager();
const cartsManager = new CartsManager();

export const config = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", async (socket) => {
    await socketServer.emit("products-list", {
      products: await productsManager.readAll(),
    });

    // PAGINATION
    await socket.on("product-page", async (data) => {
      await socketServer.emit("products-list", {
        products: await productsManager.readAll({ page: data.page }),
      });
    });

    // NEW PRODUCT
    await socket.on("new-product", async (data) => {
      try {
        await productsManager.createOne(data);

        await socketServer.emit("products-list", {
          products: await productsManager.readAll(),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });

    // UPDATE PRODUCT
    await socket.on("update-product", async (data) => {
      try {
        await productsManager.updateOneById(data.id, data.data);

        await socketServer.emit("products-list", {
          products: await productsManager.readAll(),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });

    // DELETE PRODUCT
    await socket.on("delete-product", async (data) => {
      try {
        await productsManager.deleteOneByID(data.id);

        await socketServer.emit("products-list", {
          products: await productsManager.readAll(),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });

    // READ CART
    await socketServer.emit("cart-list", {
      cart: await cartsManager.readPopulate(),
    });

    // ADD TO CART
    await socket.on("add-product-cart", async (data) => {
      try {
        await cartsManager.insertOneProductById(
          data.cart,
          data.product,
          data.quantity
        );
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });

    // DELETE PRODUCT CART
    await socket.on("delete-product-cart", async (data) => {
      try {
        await cartsManager.deleteOneProductById(data.cart, data.product);

        await socketServer.emit("cart-list", {
          cart: await cartsManager.readPopulate(),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });

    // PLUS BTN
    await socket.on("plus-quantity", async (data) => {
      try {
        await cartsManager.quantityCart(
          data.cart,
          data.product,
          data.operation
        );

        await socketServer.emit("cart-list", {
          cart: await cartsManager.readPopulate(),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });

    // MINUS BTN
    await socket.on("minus-quantity", async (data) => {
      try {
        await cartsManager.quantityCart(
          data.cart,
          data.product,
          data.operation
        );

        await socketServer.emit("cart-list", {
          cart: await cartsManager.readPopulate(),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });
  });
};
