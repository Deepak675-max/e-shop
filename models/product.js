const sequelize = require("../helper/common/init_mysql")

const DataTypes = require("sequelize");

const Product = sequelize.define('Product', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.STRING,
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

Product.sync({ alter: true })
  .then(() => {
    console.log('Product table is synchronized.');
  })
  .catch((error) => {
    console.error('Error synchronizing Product table:', error);
  });

module.exports = Product;