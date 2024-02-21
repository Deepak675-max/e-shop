const { getDb } = require("../util/database");
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart ? cart: {items: []};
    this._id = id;
  }

  async save() {
    try {
      const db = getDb(); 
      return await db.collection('users').insertOne(this); 
    } catch (error) {
      throw new Error(`Error saving user: ${error.message}`);
    }
  }

  async addToCart(product) {
    try {
      const cartItemIndex = this.cart.items.findIndex(item => (item.productId).toString() === (product._id).toString());
      const updatedCartItems = [...this.cart.items];
      let newQuantity = 1; 

      if(cartItemIndex != -1) {
        newQuantity = this.cart.items[cartItemIndex].quantity + 1;
        updatedCartItems[cartItemIndex].quantity = newQuantity;
      }
      else {
        updatedCartItems.push({productId: product._id, quantity: newQuantity})
      }

      const updatedCart = {
        items: updatedCartItems
      }
      const db = getDb();
      return await db.collection('users').updateOne({_id: this._id}, {$set: {cart: updatedCart}}); 
    } catch (error) {
      throw new Error(`Error adding product in cart: ${error.message}`);
    }
  }

  async getCart() {
    try {
      const db = getDb();
      const productsIds = this.cart.items.map((item) => item.productId);
      const products = await db.collection('products').find({_id: {$in: productsIds}}).toArray();
      return await Promise.all(
        products.map(product => {
          return {
            ...product,
            quantity: this.cart.items.find(item => (item.productId).toString() === (product._id).toString()).quantity
          }
        })
      )
    } catch (error) {
      throw new Error(`Error in getting cart: ${error.message}`);
    }
  }

  async deleteItemFromCart(product) {
    try {
      const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== product._id.toString());
      const db = getDb();
      return await db.collection('users').updateOne({_id: this._id}, {$set: {cart: {items: updatedCartItems}}}); 
    } catch (error) {
      throw new Error(`Error deleting cart item: ${error.message}`);
    }
  }


  static async findById(userId) {
    try {
      const db = getDb();
      const user = await db.collection('users').findOne({_id: mongodb.ObjectId.createFromHexString(userId)});
      return user; 
    } catch (error) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }
}

module.exports = User;
