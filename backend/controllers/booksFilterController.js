
const db = require('../config/database');
// To add filter based on time in ascending order of time
exports.getBooksByAscTime = (req, res) => {
    const page = parseInt(req.query.page) || 1;//creating pagination of length 20 
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const query = 'SELECT b.id, b.title,b.author,b.description, r.rating FROM books b join rating r ON b.id = r.bookId ORDER BY b.updated_at ASC LIMIT ? OFFSET ?;';
    db.query(query, [limit, offset], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving books' });
        } else {
            res.json(results);
        }
    });
};
// To add filter based on time in descending order of time
exports.getBooksByDescTime = (req, res) => {
    const page = parseInt(req.query.page) || 1;//creating pagination of length 20 
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const query = 'SELECT b.id, b.title,b.author,b.description, r.rating FROM books b join rating r ON b.id = r.bookId ORDER BY b.updated_at DESC LIMIT ? OFFSET ?;';
    db.query(query, [limit, offset], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving books' });
        } else {
            res.json(results);
        }
    });
};





// To add filter based on rating in ascending order of rating

exports.getBooksByAscRating = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;//creating pagination of length 20 
    const offset = (page - 1) * limit;

    const query = 'SELECT b.id, b.title,b.author,b.description, r.rating FROM books b JOIN rating r ON b.id = r.bookId ORDER BY r.rating ASC LIMIT ? OFFSET ?;';
    db.query(query, [limit, offset], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving books' });
        } else {
            res.json(results);
        }
    });
};
// To add filter based on rating in descending order of rating
exports.getBooksByDescRating = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;//creating pagination of length 20 
    const offset = (page - 1) * limit;

    const query = 'SELECT b.id, b.title,b.author,b.description, r.rating FROM books b JOIN rating r ON b.id = r.bookId ORDER BY r.rating DESC LIMIT ? OFFSET ?;';
    db.query(query, [limit, offset], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving books' });
        } else {
            res.json(results);
        }
    });
};

