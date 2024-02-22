const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");


exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      isDeleted: false
    });
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({
      _id: productId,
      isDeleted: false
    });
    if (!product) throw new Error("Product not found");
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.find({
      isDeleted: false
    });
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.getCart = async (req, res, next) => {
  const items = req.user.cart.items;
  // Filter out null or undefined products
  const filteredProducts = items.filter(item => item.product);
  // Update the user's cart with the filtered products
  req.user.cart.items = filteredProducts;
  await req.user.save();
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: filteredProducts
  });
};

exports.postCart = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const product = await Product.findOne({
      _id: productId,
      isDeleted: false
    })
    if (!product) {
      throw new Error("Product not found");
    }
    const result = await req.user.addToCart(product)
    console.log("result", result);
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    console.log(productId);
    const items = req.user.cart.items;
    const updatedCartItems = items.filter(item => item.product._id.toString() !== productId.toString());
    req.user.cart.items = updatedCartItems;
    await req.user.save();
    console.log("Deleted cart item successfully");
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    const result = await req.user.addOrder();
    console.log("order placed successfully", result);
    res.redirect('/orders');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id, isDeleted: false }).populate('items.product').exec();
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
