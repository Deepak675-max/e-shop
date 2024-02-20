const {getDb} = require("../util/database");

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  async save() {
    try {
      const db = getDb();
      const result = await db.collection('products').insertOne(this);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async fetchAll() {
    try {
      const db = getDb();
      const result = await db.collection('products').find().toArray();
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
