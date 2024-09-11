import mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Category = mongoose.model<ICategory>("categories", categorySchema);

export default Category;
