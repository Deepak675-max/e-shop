const express = require('express');
const path = require('path');

const app = express();

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');
const contactRoutes = require('./routes/contact');


const rootDir = require('./helper/path')

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactRoutes);


app.use((req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', '404.html'));
});

const port = 3000;

app.listen(port, () => {
    console.log(`app is listening on the http://localhost:${port}`)
});
