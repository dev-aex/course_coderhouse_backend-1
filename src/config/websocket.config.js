import { Server } from "socket.io";
import ProductsManager from "../managers/ProductsManager.js";
import CartsManager from "../managers/CartsManager.js";

const productsManager = new ProductsManager();
const cartsManager = new CartsManager();

export const config = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", async (socket) => {
    await socketServer.emit("products-list", {
      products: await productsManager.getProducts(0),
    });

    await socketServer.emit("cart-list", {
      cart: await cartsManager.showProductInCart(),
    });

    await socket.on("new-product", async (data) => {
      try {
        await productsManager.insertProduct(data);

        await socketServer.emit("products-list", {
          products: await productsManager.getProducts(0),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });

    await socket.on("update-product", async (data) => {
      try {
        await productsManager.updateProduct(Number(data.id), data.data);

        await socketServer.emit("products-list", {
          products: await productsManager.getProducts(0),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });

    await socket.on("delete-product", async (data) => {
      try {
        await productsManager.deleteProduct(Number(data.id));

        await socketServer.emit("products-list", {
          products: await productsManager.getProducts(0),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });

    await socket.on("add-product-cart", async (data) => {
      try {
        const productFound = await productsManager.getById(data.product);
        const cartFound = await cartsManager.getById(data.cart);

        await cartsManager.insertProductToCart(cartFound, productFound);
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });

    await socket.on("delete-product-cart", async (data) => {
      try {
        const cartFound = await cartsManager.getById(data.cart);
        await cartsManager.deleteProductToCart(cartFound, data.product);

        await socketServer.emit("cart-list", {
          cart: await cartsManager.showProductInCart(),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });
  });
};
