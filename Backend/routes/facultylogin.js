const express = require('express');
const router = express.Router();
const Faculty = require('../Models/addfaculty');
const bcrypt = require('bcryptjs');
const {
    getdb
} = require('../Module/db')
const Institute = require('../Models/Institute')
const ff=require('../Models/freshFaculty')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';
router.post('/facultylogin', async (req, res) => {
    const {
        email,
        password
    } = req.body;
        const user = await ff.findOne({
            'username': email
        });
        if (!user) {
            return res.status(400).json({
                error: 'Invalid email or password1'
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                error: 'Invalid email or password'
            });
        }
        const fdb=user.instituteName.replace(/[^a-zA-Z0-9]/g, '_')
        const fdb1=getdb(fdb)
        const user1=Faculty(fdb1)
        const u1=await user1.findOne({'facultyEmail':email})
        const token = jwt.sign({
            userId: u1._id,
            db: user.instituteName.replace(/[^a-zA-Z0-9]/g, '_')
        }, JWT_SECRET, {
            expiresIn: '2h'
        });
        res.json({
            message: 'Login successful!',
            token,
            role:u1.role,
            ok: 1
        });
});
module.exports = router;