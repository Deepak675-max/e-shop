const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        isDeleted: false
      }
    });
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  } catch (error) {
    console.log(error);
    res.redirect('/error');
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({
      where: {
        id: productId,
        isDeleted: false
      }
    });
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  } catch (error) {
    console.log(error);
    res.redirect('/error');
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        isDeleted: false
      }
    });
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  } catch (error) {
    console.log(error);
    res.redirect('/error');
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart()
    const products = await cart.getProducts()
    res.render('shop/cart', {
      products: products,
      path: '/cart',
      pageTitle: 'Your Cart'
    });
  } catch (error) {
    console.log(error);
    res.redirect('/error');
  }
};

exports.postCart = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    let newQuantity = 1;
    const cart = await req.user.getCart()
    const products = await cart.getProducts({ where: { id: productId } });
    let product;
    if (products.length > 0) {
      product = products[0];
    }
    if (product) {
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
    }
    else {
      product = await Product.findByPk(productId);
    }
    cart.addProduct(product, {
      through: { quantity: newQuantity }
    })
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
    res.redirect('/error');
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: prodId } });
    await products[0].cartItem.destroy();
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
    res.redirect('/error');
  }
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
