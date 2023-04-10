import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: String,
    reqired: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export const Order = model("Order", orderSchema);
