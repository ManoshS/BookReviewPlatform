const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

//registeration for users 
exports.register = async (req, res) => {
  const { username, email, password ,role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    // Check if user already exists
    const userCheck = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(userCheck, [username, email], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error checking user existence' });
      }
      if (results.length > 0) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
     
      // Insert new user
      const insertUser = 'INSERT INTO users (username, email, password,role) VALUES (?, ?, ?,?)';
      db.query(insertUser, [username, email, hashedPassword , role ||'user'], (err, result) => { //degault is user ,Admin needs to be passed
        if (err) {
          return res.status(500).json({ error: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

//login to get token and user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    //checking if user is there or not 
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error during login' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = results[0];
      //checking password will match or not
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
     
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },//adding data jwt 
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.json({ message: 'Login successful', token ,user:user});
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};