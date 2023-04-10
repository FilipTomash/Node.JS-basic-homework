import { Order } from "../modules/order.model.js";

export class OrderService {
  static async getAllOrders() {
    return Order.find({});
  }

  static async getOrderById(orderId) {
    const order = Order.findById(orderId).populate("products");
    if (!order) throw new Error("Order not found!");
    return order;
  }

  static async createOrder(orderData) {
    if (orderData.id) throw new Error("Invalid data!");

    const newOrder = new Order(orderData);

    const createdOrder = await newOrder.save();

    return createdOrder;
  }
  static async updateOrder(orderId, updateData) {
    const order = this.getOrderById(orderId);

    if (updateData.id) throw new error("Invalid data!");

    Object.assign(order, updateData);

    const updatedOrder = await order.save();

    return updatedOrder;
  }
  static async deleteOrder(orderId) {
    const response = await Order.findByIdAndDelete(orderId);

    if (!response) throw new Error("Order not found!");
    console.log(response);

    return response;
  }
}
