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

Cart.sync({ alter: true })
  .then(() => {
    console.log('Cart table is synchronized.');
  })
  .catch((error) => {
    console.error('Error synchronizing Cart table:', error);
  });

module.exports = Cart;