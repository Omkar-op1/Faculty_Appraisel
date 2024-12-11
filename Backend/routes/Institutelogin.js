const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Institute = require('../Models/Institute');
const router = express.Router();

const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const institute = await Institute.findOne({ 'login.username': username });
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found', ok: 0 });
    }

    const isPasswordValid = await bcrypt.compare(password, institute.login.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials', ok: 0 });
    }

    const token = jwt.sign({ userId: institute._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, ok: 1 });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', ok: 0 });
  }
});

module.exports = router;