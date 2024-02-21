const { getDb } = require("../util/database");
const mongodb = require("mongodb");

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  async save() {
    try {
      const db = getDb(); 
      return await db.collection('users').insertOne(this); 
    } catch (error) {
      throw new Error(`Error saving user: ${error.message}`);
    }
  }

  static async findById(userId) {
    try {
      const db = getDb();
      const user = await db.collection('users').findOne({_id: new mongodb.ObjectId(userId)});
      return user; 
    } catch (error) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }
}

module.exports = User;
