import { ProductService } from "../services/product.service.js";

export class ProductController {
  static async getAllProducts(req, res) {
    try {
      const allProducts = await ProductService.getAllProducts();

      return res.json(allProducts);
    } catch (error) {
      console.log(error);
      return res.status(500).sent({ msg: error.message });
    }
  }
  static async getProductById(req, res) {
    try {
      const { id: productId } = req.params;
      const product = await ProductService.getProductById(productId);
      return res.json(product);
    } catch (error) {
      console.log(error);
      return res.status(404).send({ msg: error.message });
    }
  }
  static async createProduct(req, res) {
    try {
      const createdProduct = await ProductService.createProduct(req.body);

      return res.json(createdProduct);
    } catch (error) {
      return res.status(500).sent({ msg: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updateData = req.body;

      const updatedProduct = await ProductService.updateProduct(
        productId,
        updateData
      );

      return res.json(updatedProduct);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ msg: error.message });
    }
  }
  static async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      await ProductService.deleteProduct(productId);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(404).send({ msg: error.message });
    }
  }
  static async deleteAll(req, res) {
    try {
      await ProductService.deleteAll();

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(401).send({ msg: error.message });
    }
  }
}
