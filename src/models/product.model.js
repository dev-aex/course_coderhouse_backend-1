import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "code is required"],
      unique: true,
      index: { name: "idx_code" },
    },
    name: {
      type: String,
      required: [true, "name is required"],
      index: { name: "idx_name" },
    },
    brand: { type: String, required: [true, "brand is required"] },
    category: { type: String, required: [true, "category is required"] },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "price needs to be greater than 0"],
    },
    description: { type: String, required: [true, "description is required"] },
    stock: {
      type: Number,
      required: [true, "stock is required"],
      min: [0, "stock needs to be greater than 0"],
    },
    thumbnail: { type: String },
    status: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

productSchema.plugin(paginate);

const ProductModel = model("products", productSchema);

export { ProductModel };
