require("dotenv").config();
const path = require('path');
require("./helper/common/init_mysql")

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require("./helper/common/init_mysql");

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const Product = require('./models/product');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize.sync({ alter: true })
    .then(() => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Deepak', email: 'deepak@test.com', phoneNumber: "6395467288" });
        }
        return user;
    })
    .then(() => {
        app.listen(3000, () => {
            console.log(`App is listening on the url http://localhost:3000`)
        });
    })
    .catch(error => {
        console.log(error);
    })

