const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

const PORT = process.env.PORT || 3000;

// express app
const app = express();

// connect to mongodb

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to db");
    // listen for requests
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  })


// register view engine
app.set('view engine', 'ejs');



// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));



app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get("/about", (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});