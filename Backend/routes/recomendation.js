// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Faculty = require('../Models/addfaculty'); // Path to your Faculty schema file

// // const token = req.headers.authorization;
// //     const t = req.headers['type'];

// if(t===17){
// //post methode for sectionB
// router.post('/postfaculty/:id/sectionB', async (req, res) => {
//     try {
//       const facultyId = req.params.id;
//       const sectionBData = req.body; // Ensure body contains data matching SectionBSchema
  
//       const faculty = await Faculty.findById(facultyId);
//       if (!faculty) {
//         return res.status(404).json({ message: 'Faculty not found' });
//       }
  
//       faculty.sectionB.push(sectionBData);
//       await faculty.save();
  
//       res.status(201).json({ message: 'SectionB data added successfully', data: sectionBData });
//     } catch (error) {
//       res.status(500).json({ message: 'Error adding SectionB data', error: error.message });
//     }
//   });
  
// //get methode for sectionB  
// router.get('/getfaculty/:id/sectionB', async (req, res) => {
//     try {
//       const facultyId = req.params.id;
  
//       const faculty = await Faculty.findById(facultyId);
//       if (!faculty) {
//         return res.status(404).json({ message: 'Faculty not found' });
//       }
  
//       res.status(200).json({ sectionB: faculty.sectionB });
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching SectionB data', error: error.message });
//     }
//   });
// }

// if(t===18){
// //post methode for sectionC
//   router.post('/postfaculty/:id/sectionC', async (req, res) => {
//     try {
//       const facultyId = req.params.id;
//       const sectionCData = req.body; // Ensure body contains data matching SectionCSchema
  
//       const faculty = await Faculty.findById(facultyId);
//       if (!faculty) {
//         return res.status(404).json({ message: 'Faculty not found' });
//       }
  
//       faculty.sectionC.push(sectionCData);
//       await faculty.save();
  
//       res.status(201).json({ message: 'SectionC data added successfully', data: sectionCData });
//     } catch (error) {
//       res.status(500).json({ message: 'Error adding SectionC data', error: error.message });
//     }
//   });

// //get methode for sectionB
//   router.get('/getfaculty/:id/sectionC', async (req, res) => {
//     try {
//       const facultyId = req.params.id;
  
//       const faculty = await Faculty.findById(facultyId);
//       if (!faculty) {
//         return res.status(404).json({ message: 'Faculty not found' });
//       }
  
//       res.status(200).json({ sectionC: faculty.sectionC });
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching SectionC data', error: error.message });
//     }
//   });
// }
// module.exports = router;