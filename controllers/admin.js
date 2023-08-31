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
    await req.user.createProduct({
      name: req.body.name,
      imageURL: req.body.imageURL,
      price: req.body.price,
      description: req.body.description
    })
    res.redirect('/admin/products');

  } catch (error) {
    console.log(error);
    res.redirect('/add-product');
  }
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    const product = await req.user.getProducts({ where: { id: prodId, isDeleted: false } });
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: product[0]
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
    const products = await req.user.getProducts({ where: { isDeleted: false } });
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
