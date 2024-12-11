const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Module/auth');
const Institute=require('../Models/Institute')
router.get('/institute-name', verifyToken, async (req, res) => {
    try {
      const institute = await Institute.findOne({ _id: req.user }).select('basicInfo.instituteName');
      if (!institute) {
        return res.status(404).json({ message: 'Institute not found' });
      }
      res.status(200).json({ instituteName: institute.basicInfo.instituteName });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching institute name', error });
    }
  });
  module.exports = router;