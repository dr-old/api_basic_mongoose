import mongoose from "mongoose";

export interface IPerson extends Document {
  fullname: string;
  birthday?: String;
  email: string;
  password: string;
  photo?: string;
  role: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const personSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: "" },
  photo: { type: String, default: "" },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  birthday: { type: String, default: "" },
  role: { type: String, default: "user" },
});

const Person = mongoose.model<IPerson>("users", personSchema);

export default Person;
