const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { LocalStorage } = require('node-localstorage');


const localStorage = new LocalStorage('./scratch');

const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
const router = express.Router();
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';




const verifyToken = (req, res, next) => {
    console.log(req.body);
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.userId;
        req.db=decoded.db;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

function generatePassword(length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
  
    return password;
  }
  

module.exports = {verifyToken,generatePassword};