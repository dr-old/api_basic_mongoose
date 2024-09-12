import Joi from "joi";

export const registerSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const personSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),
  birthday: Joi.string().required(),
  photo: Joi.string(),
});

export const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

export const ticketSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid("open", "closed").required(),
  priority: Joi.string().valid("low", "normal", "high").required(),
  assignedTo: Joi.string().required(),
  createdBy: Joi.string(),
  updatedBy: Joi.string(),
  updatedAt: Joi.date(),
});

export const productSchema = Joi.object({
  categoryId: Joi.string().required(),
  categoryName: Joi.string().required(),
  sku: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  weight: Joi.number().positive().required(),
  width: Joi.number().positive().required(),
  length: Joi.number().positive().required(),
  height: Joi.number().positive().required(),
  image: Joi.string().uri().required(), // Ensure it's a valid URI
  price: Joi.number().positive().required(),
});
