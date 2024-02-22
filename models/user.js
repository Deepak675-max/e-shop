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
      const products = [];
      await Promise.all(
          this.cart.items.map(async (item) => {
              const product = await db.collection('products').findOne({ _id: item.productId });
              if (product) {
                  products.push({
                      ...product,
                      quantity: item.quantity
                  });
              } else {
                  // If the product is not found, you can handle it as per your requirements
                  await this.deleteItemFromCart(item.productId);
              }
          })
      );
      return products;
    } catch (error) {
      throw new Error(`Error in getting cart: ${error.message}`);
    }
  }

  async deleteItemFromCart(productId) {
    try {
      const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
      const db = getDb();
      return await db.collection('users').updateOne({_id: this._id}, {$set: {cart: {items: updatedCartItems}}}); 
    } catch (error) {
      throw new Error(`Error deleting cart item: ${error.message}`);
    }
  }

  async addOrder() {
    try {
      const db = getDb();
      const cartItems = await this.getCart();
      const order = {
        items: cartItems,
        user: {
          _id: this._id,
          name: this.name
        }
      }
      await db.collection('orders').insertOne(order);
      this.cart = {items: []};
      return await db.collection('users').updateOne({_id: this._id}, {$set: {cart: this.cart}}); 
    } catch (error) {
      throw new Error(`Error adding order: ${error.message}`);
    }
  }

  async getOrders() {
    try {
      const db = getDb();
      return await db.collection('orders').find({'user._id': this._id}).toArray(); 
    } catch (error) {
      throw new Error(`Error getting order: ${error.message}`);
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
