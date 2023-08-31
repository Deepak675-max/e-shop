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
    const cartProducts = await Cart.findAll({
      where: {
        isDeleted: false
      }
    })
    // console.log(cartProducts);
    const products = [];
    await Promise.all(
      cartProducts.map(async (cartProduct) => {
        const product = await Product.findOne({
          where: {
            id: cartProduct.productId,
            isDeleted: false
          }
        })
        if (product)
          products.push(product);
      })
    )
    res.render('shop/cart', {
      cart: products,
      path: '/cart',
      pageTitle: 'Your Cart'
    });
  } catch (error) {
    console.log(error);
    res.redirect('/error');
  }
};

exports.postCart = (req, res, next) => {
  try {
    const productId = req.body.productId;
    const newCartProduct = new Cart({
      productId: productId,
      isDeleted: false
    })
    newCartProduct.save().catch(error => {
      throw new Error("Unable to add product in cart")
    })
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
