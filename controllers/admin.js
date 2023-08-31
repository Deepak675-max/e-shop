const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = async (req, res, next) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      imageURL: req.body.imageURL,
      price: req.body.price,
      description: req.body.description
    })
    newProduct.save().catch(error => {
      console.error('Unable to save product:', error);
    });
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/add-product');
  }
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId,
        isDeleted: false
      }
    });
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: product
    });
  } catch (error) {
    console.log(error);
    res.redirect('/error')
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    const product = {
      id: req.body.productId,
      name: req.body.name,
      imageURL: req.body.imageURL,
      price: req.body.price,
      description: req.body.description
    }
    const updatedProduct = await Product.update(product,
      {
        where: {
          id: req.body.productId
        }
      });
    res.redirect('/admin/products');

  } catch (error) {
    console.log(error);
    res.redirect('/error')
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        isDeleted: false
      }
    });
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  } catch (error) {
    console.log(error);
    res.redirect('/error')
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    await Product.update({ isDeleted: true }, {
      where: {
        id: productId
      }
    });
    res.redirect('/admin/products');
  } catch (error) {
    console.log(error);
    res.redirect('/error')
  }
};
