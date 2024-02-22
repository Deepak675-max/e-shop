require('dotenv').config()
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
require("./util/database");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('65d7207889689c70366e55ca').populate({
      path: 'cart.items.product',
      match: { isDeleted: false } // Include products with isDeleted: true
    }).exec();
    if (!user) throw new Error("User not found");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

const port = process.env.APP_PORT;

app.use(errorController.get404);

app.listen(port, () => {
  console.log(`server is listening on the port of ${port}`);
})

process.on('SIGINT', () => {
  // Perform cleanup operations here
  console.log('Received SIGINT signal. application terminated successfully.');

  // Exit the application
  process.exit(0);
});

process.on("uncaughtException", (error) => {
  console.error(`Uncaught Exception Occured\n${error}`);
});
