const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(product) {
    // Fetch the previous cart
    const fileContent = fs.readFileSync(p, 'utf-8');
    console.log("cart file data = ", fileContent);
    let cartData = { products: [], totalPrice: 0 };
    if (fileContent !== "") {
      cartData = JSON.parse(fileContent);
    }
    const isProductExist = cartData.products.findIndex(prod => prod.id === product.id);
    if (isProductExist === -1) {
      product.qty = 1;
      cartData.products.push(product);
    }
    else {
      const existingProduct = cartData.products[isProductExist];
      existingProduct.qty = existingProduct.qty + 1;
      cartData.products[isProductExist] = existingProduct;
    }
    cartData.totalPrice += +product.price;
    fs.writeFile(p, JSON.stringify(cartData), err => {
      console.log(err);
    });
  }

  static getCartProducts() {
    const fileContent = fs.readFileSync(p, 'utf-8');
    if (fileContent === "") return { products: [], totalPrice: 0 };
    return JSON.parse(fileContent);
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, 'utf-8', (err, fileContent) => {
      if (err || fileContent === "") {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(prod => prod.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        prod => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }
};
