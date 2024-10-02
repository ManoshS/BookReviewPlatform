
// File: src/server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books');
const reviewsRoutes = require('./routes/reviews');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const bookFilters = require('./routes/bookFilters')
const cors = require('cors');


const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/books', booksRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/users', usersRoutes);
app.use('/filter', bookFilters);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
