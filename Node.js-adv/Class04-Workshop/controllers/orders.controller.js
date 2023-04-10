import { OrderService } from "../services/order.service.js";

export class OrderController {
  static async getAllOrders(req, res) {
    try {
      const allOrders = await OrderService.getAllOrders();

      return res.json(allOrders);
    } catch (error) {
      console.log(error);
      return res.status(500).sent({ msg: error.message });
    }
  }
  static async getOrderById(req, res) {
    try {
      const { id: orderId } = req.params;
      const order = await OrderService.getOrderById(orderId);
      return res.json(order);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ msg: error.message });
    }
  }
  static async createOrder(req, res) {
    try {
      const createdOrder = await OrderService.createOrder(req.body);

      return res.json(createdOrder);
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  }

  static async updateOrder(req, res) {
    try {
      const orderId = req.params.id;
      const updateData = req.body;

      const updatedOrder = await OrderService.updateOrder(orderId, updateData);

      return res.json(updatedOrder);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ msg: error.message });
    }
  }
  static async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      await OrderService.deleteOrder(orderId);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(404).send({ msg: error.message });
    }
  }
}
