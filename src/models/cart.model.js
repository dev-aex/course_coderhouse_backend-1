import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const cartSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: [true, "The product name is required"],
        },
        quantity: {
          type: Number,
          required: [true, "The quantity is required"],
          min: [1, "The quantity needs to be more than 0"],
        },
        _id: false,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

cartSchema.plugin(paginate);

const CartModel = model("carts", cartSchema);

export { CartModel };
