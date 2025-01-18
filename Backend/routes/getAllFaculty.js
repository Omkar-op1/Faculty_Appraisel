const express = require('express');
const mongoose = require('mongoose');
const Faculty  = require('../Models/addfaculty'); 
const { getdb } = require('../Module/db');

const router = express();
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';

router.get('/get-all-faculty', async (req, res) => {



  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
}
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = decoded.userId;
      const fdb = getdb(decoded.db);
      const FacultyModel = Faculty(fdb);
      const faculty = await FacultyModel.findOne({ _id: user});

    try {
      const faculties = await FacultyModel.find({departmentName: faculty.departmentName});
      res.status(200).json(faculties);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching faculty data', error });
    }
  });
  module.exports = router;