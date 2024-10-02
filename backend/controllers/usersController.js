
const db = require('../config/database');
//get current users profile info
exports.getUserProfile = (req, res) => {
  const userId = req.params.id;
  if (req.user.id !== parseInt(userId)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const query = 'SELECT id, username, email, role FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving user profile' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(results[0]);
    }
  });
};
//update user
exports.updateUserProfile = (req, res) => {
  const userId = req.params.id;
  if (req.user.id !== parseInt(userId)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { username, email,role } = req.body;
  if (!username && !email && !role) {
    return res.status(400).json({ error: 'At least one field (username or email,or role) is required for update' });
  }

  const updateFields = [];
  const updateValues = [];
  if (username) {
    updateFields.push('username = ?');
    updateValues.push(username);
  }
  if (email) {
    updateFields.push('email = ?');
    updateValues.push(email);
  }
  if (role) {
    updateFields.push('role = ?');
    updateValues.push(role);
  }
  updateValues.push(userId);

  const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
  db.query(query, updateValues, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error updating user profile' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User profile updated successfully' });
    }
  });
};