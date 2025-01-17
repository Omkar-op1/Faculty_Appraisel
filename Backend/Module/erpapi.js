const axios = require('axios');
const mongoose = require('mongoose');
const {db,getdb}=require('./db');
const express = require('express')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';

// MongoDB Schema for Faculty (Assuming it's already defined)
const Faculty = require('../Models/addfaculty');
const { updatescore } = require('./finalscore');
const router = express.Router();

// Function to update existing data
const updateFacultyData = async (faculty) => {
  try {
            
            const facultyid=faculty.facultyId;
            console.log(facultyid)

      
    const existingData = faculty;

    if (!existingData) {
      console.log("Faculty not found.");
      return;
    }

    // Fetch new data from API
    const response = await axios.get(`http://localhost:3000/api/faculty/${facultyid}`);
    const fetchedData = response.data;

    // Update empty fields
    for (let key in fetchedData) {
      if (Array.isArray(fetchedData[key])) {
        // For arrays, append unique objects
        fetchedData[key].forEach((newItem) => {
          const existingArray = existingData[key] || [];
          const isDuplicate = existingArray.some((item) =>
            JSON.stringify(item) === JSON.stringify(newItem)
          );
          if (!isDuplicate) {
            newItem['erp']=true;
            existingArray.push(newItem);
          }
          existingData[key] = existingArray;
        });
      } else if (!existingData[key]) {
        // For non-array fields, update only if empty
        existingData[key] = fetchedData[key];
      }
    }

    
    const g1=await existingData.save();
    return g1;
  } catch (error) {
    console.error("Error fetching or updating data:", error);
  }
};

// Call the function to update data for a specific faculty ID




router.post('/fetcherp', async (req, res) => {
  const token = req.headers.authorization;
console.log('working')
  if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
  }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = decoded.userId;
    const fdb = getdb(decoded.db);
    const FacultyModel = Faculty(fdb);
    const faculty = await FacultyModel.findOne({ _id: user});
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    const g1= await updateFacultyData(faculty);
    // updatescore(g1);



    res.json({faculty});
});
module.exports = router;



// async function updatescore(faculty)
// {
//     for(let key in faculty.teachingprocess)
//     {

//     }



// }