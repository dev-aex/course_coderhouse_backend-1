import { Server } from "socket.io";
import ProductsManager from "../managers/ProductsManager.js";

const productsManager = new ProductsManager();

export const config = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", async (socket) => {
    socketServer.emit("products-list", {
      products: await productsManager.getProducts(0),
    });

    socket.on("new-product", async (data) => {
      try {
        await productsManager.insertProduct(data);

        socketServer.emit("products-list", {
          products: await productsManager.getProducts(0),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });

    socket.on("update-product", async (data) => {
      try {
        await productsManager.updateProduct(Number(data.id), data.data);

        socketServer.emit("products-list", {
          products: await productsManager.getProducts(0),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });

    socket.on("delete-product", async (data) => {
      try {
        await productsManager.deleteProduct(Number(data.id));

        socketServer.emit("products-list", {
          products: await productsManager.getProducts(0),
        });
      } catch (err) {
        socketServer.emit("err-message", {
          message: err.message,
        });
      }
    });
  });
};
