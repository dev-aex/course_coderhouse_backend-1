import handlebars from "express-handlebars";
import paths from "../utils/paths.js";

export const config = (APP) => {
  APP.engine(
    "handlebars",
    handlebars.engine({
      helpers: {
        formatPrice: function (price) {
          return price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        },
      },
    })
  );
  APP.set("views", paths.views);
  APP.set("view engine", "handlebars");
};

export default config;
