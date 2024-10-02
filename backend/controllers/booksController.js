
const db = require('../config/database');

//getting all the books 
exports.getAllBooks = (req, res) => {
  const page = parseInt(req.query.page) || 1;//creating pagination of length 20 
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM books LIMIT ? OFFSET ?';
  db.query(query, [limit, offset], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving books' });
    } else {
      res.json(results);
    }
  });
};
//get book by id using params
exports.getBook = (req, res) => {
  const bookId = req.params.id;
  const query = 'SELECT * FROM books WHERE id = ?';
  db.query(query, [bookId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving book' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(results[0]);
    }
  });
};

//uploading Book to the store
exports.addBook = (req, res) => {
  const { title, author, description } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const query = 'INSERT INTO books (title, author, description) VALUES (?, ?, ?)';
  db.query(query, [title, author, description], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error adding book' });
    } else {
      res.status(201).json({ id: result.insertId, message: 'Book added successfully' });
    }
  });
};