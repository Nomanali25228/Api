const express = require('express');
const app = express();
const productRoute = require('./api/routes/product');
const userRoute = require('./api/routes/user');
const categorypath = require('./api/routes/category');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Update the MongoDB connection string
const mongoURI = 'mongodb+srv://noman:nomi123@cluster0.93xpkzw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', err => {
  console.log('connection failed:', err);
});

mongoose.connection.on('connected', () => {
  console.log('connected successfully with database');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure express-fileupload to use the /tmp directory
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use(cors());

app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/category', categorypath);

app.use('*', (req, res) => {
  res.status(500).json({
    message: 'bad request',
  });
});

module.exports = app;
