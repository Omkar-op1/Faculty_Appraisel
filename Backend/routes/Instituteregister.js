const express = require('express');
const bcrypt = require('bcryptjs');
const Institute = require('../Models/Institute');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';
const router = express.Router();
const { LocalStorage } = require('node-localstorage');

// Set up localStorage for Node.js
const localStorage = new LocalStorage('./scratch');

router.post('/signup', async (req, res) => {
  try {


    console.log(req.body);
    const { username, password} = req.body;

    const existingUser = await Institute.findOne({ 'login.username': username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' ,ok:0});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newInstitute = new Institute({
      login: {
        username: username,
        password: hashedPassword,
      },
      st1: true,
    });

    await newInstitute.save();


    const token = jwt.sign({ userId: newInstitute._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log(token);
    res.status(201).json({ 
      message: 'Signup successful!', 
      token, 
      ok: 1 
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

module.exports = router;