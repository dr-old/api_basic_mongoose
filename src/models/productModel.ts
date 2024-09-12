import mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
  categoryId: string;
  categoryName: string;
  sku: string;
  name: string;
  description: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  image: string;
  price: number;
  createdAt: Date;
  updatedAt?: Date;
}

const productSchema = new mongoose.Schema({
  categoryId: { type: String, required: true },
  categoryName: { type: String, required: true },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  weight: { type: Number, required: true },
  width: { type: Number, required: true },
  length: { type: Number, required: true },
  height: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model<IProduct>("products", productSchema);

export default Product;
