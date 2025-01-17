const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const University = require('./Models/University'); // Assuming a University model
const router = express.Router();

const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';

// University Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find university based on the username in the login field
    const university = await University.findOne({ 'login.username': username });
    if (!university) {
      return res.status(404).json({ message: 'University not found', ok: 0 });
    }

    // Compare passwords securely using bcrypt
    const isPasswordValid = await bcrypt.compare(password, university.login.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials', ok: 0 });
    }

    // Generate a JWT token with userId (university ID) as payload
    const token = jwt.sign({ userId: university._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send response with the token
    res.status(200).json({ message: 'Login successful', token, ok: 1 });
  } catch (error) {
    console.error('University Login error:', error);
    res.status(500).json({ message: 'Server error', ok: 0 });
  }
});

module.exports = router;
