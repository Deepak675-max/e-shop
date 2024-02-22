const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
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

module.exports = mongoose.model('order', orderSchema);