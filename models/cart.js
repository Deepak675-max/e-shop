const sequelize = require("../helper/common/init_mysql")

const DataTypes = require("sequelize");

const Cart = sequelize.define('Cart', {
  // Model attributes are defined here
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: true
});


module.exports = Cart;