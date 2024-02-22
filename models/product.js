const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('product', productSchema);

// const {getDb} = require("../util/database");
// const mongodb = require("mongodb");

// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id;
//     this.userId = userId;
//   }

//   async save() {
//     try {
//       const db = getDb();
//       if(this._id) {
//         return await db.collection('products').updateOne({_id: this._id}, {$set: this});
//       }
//       return await db.collection('products').insertOne(this);
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async fetchAll() {
//     try {
//       const db = getDb();
//       const result = await db.collection('products').find().toArray();
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async findById(productId) {
//     try {
//       const db = getDb();
//       const product = await db.collection('products').findOne({_id: mongodb.ObjectId.createFromHexString(productId)});
//       return product;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async deleteOne(productId) {
//     try {
//       console.log(productId);
//       const db = getDb();
//       const result = await db.collection('products').deleteOne({_id: mongodb.ObjectId.createFromHexString(productId)});
//       console.log(result);
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   }

// }

// module.exports = Product;



