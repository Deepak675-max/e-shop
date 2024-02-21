const {getDb} = require("../util/database");
const mongodb = require("mongodb");

class Product {
  constructor(title, price, imageUrl, description, id, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id;
    this.userId = userId;
  }

  async save() {
    try {
      const db = getDb();
      if(this._id) {
        return await db.collection('products').updateOne({_id: this._id}, {$set: this});
      }
      return await db.collection('products').insertOne(this);
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

  static async findById(productId) {
    try {
      const db = getDb();
      const result = await db.collection('products').find({_id: new mongodb.ObjectId(productId)}).toArray();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteOne(productId) {
    try {
      console.log(productId);
      const db = getDb();
      const result = await db.collection('products').deleteOne({_id: new mongodb.ObjectId(productId)});
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = Product;
