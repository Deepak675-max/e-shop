const Product = require('../models/product');
const mongodb = require("mongodb");

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  try {
    const productData = {
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      userId: req.user._id
    }
    const product = new Product(productData);
    const result = await product.save();
    console.log("Product created successfully", result);
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const editMode = req.query.edit;
    console.log("edit mode", editMode);
    if (!editMode) {
      return res.redirect('/');
    }
    const productId = req.params.productId;
    const product = await Product.findOne({
      _id: productId,
      isDeleted: false
    });
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    const productData = {
      productId: req.body.productId,
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      userId: req.user._id
    }
    const product = await Product.findOne({
      _id: productData.productId,
      isDeleted: false
    })
    if (!product) throw new Error("Product is not exist");
    await product.updateOne(productData, {
      new: true
    });
    console.log('UPDATED PRODUCT!');
    res.redirect('/admin/products');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      isDeleted: false
    });
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const product = await Product.findOne({
      _id: productId,
      isDeleted: false
    })
    if (!product) throw new Error("Product is not exist");
    await product.updateOne({ isDeleted: true }, {
      new: true
    });
    console.log('DESTROYED PRODUCT');
    res.redirect('/admin/products');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
