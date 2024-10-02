const db = require('../config/database');

//get reviews based on book id in query parem
exports.getReviews = (req, res) => {
  const bookId = req.query.bookId;
  if (!bookId) {
    return res.status(400).json({ error: 'Book ID is required' });
  }

  const query = 'SELECT * FROM reviews WHERE book_id = ?';
  db.query(query, [bookId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving reviews' });
    } else {
      res.json(results);
    }
  });
};
//get reviews of individual on different books usinh query parem userid
exports.getIndividualsReviews = (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: 'Book ID is required' });
  }

  const query = 'SELECT * FROM reviews WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving reviews' });
    } else {
      res.json(results);
    }
  });
};
//add review 
exports.addReview = (req, res) => {
  const { bookId, rating, comment } = req.body;
  const userId = req.user.id;

  if (!bookId || !rating) {
    return res.status(400).json({ error: 'Book ID and rating are required' });
  }

  const query = 'INSERT INTO reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)';
  db.query(query, [bookId, userId, rating, comment], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error submitting review' });
    } else {
      res.status(201).json({ id: result.insertId, message: 'Review submitted successfully' });
    }
  });
};