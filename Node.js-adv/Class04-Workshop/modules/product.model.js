import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
  },
  category: {
    type: String,
    reqired: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  rating: {
    type: Number,
    reqired: true,
    min: 1,
    max: 5,
  },
});

export const Product = model("Product", productSchema);
