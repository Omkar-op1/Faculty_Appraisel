const express = require('express');
const mongoose = require('mongoose');
const Faculty  = require('../Models/addfaculty'); 
const router = express();
router.get('/get-all-faculty', async (req, res) => {
    try {
      const db = mongoose.connection.useDb('Bajaj_Institute_of_Technology'); 
      const FacultyModel = Faculty(db); 
      const faculties = await FacultyModel.find();
      res.status(200).json(faculties);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching faculty data', error });
    }
  });
  module.exports = router;