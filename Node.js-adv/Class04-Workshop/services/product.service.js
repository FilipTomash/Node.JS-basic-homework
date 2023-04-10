import { Product } from "../modules/product.model.js";

export class ProductService {
  static async getAllProducts() {
    return await Product.find({});
  }
  static async getProductById(productId) {
    const product = Product.findById(productId);

    if (!product) throw new Error("Product not found!");

    return product;
  }
  static async createProduct(productData) {
    if (productData.id) throw new Error("Invalid data!");

    const newProduct = new Product(productData);

    const createdProduct = await newProduct.save();

    return createdProduct;
  }
  static async updateProduct(productId, updateData) {
    if (updateData.id) throw new Error("Invalid update!");

    const product = await this.getProductById(productId);

    Object.assign(product, updateData);

    const response = await product.save();

    return response;
  }
  static async deleteProduct(productId) {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) throw new Error("Product not found!");
  }

  static async deleteAll() {
    await Product.deleteMany();
  }
}
