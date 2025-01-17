const express = require('express');
const mongoose = require('mongoose');
const HOD = require('./path/to/your/hod/model'); 
const app = express();
app.use(express.json());
app.post('/api/hod', async (req, res) => {
  try {
    const {
      title,
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      address,
      city,
      zipcode,
      state,
      country,
      departmentName,
      facultyId,
      dateOfJoining,
      designation,
      facultyEmail,
      educationQualification,
      areasOfSpecialization,
      experiences,
      employeeType,
      teachingProcess,
      studentsFeedback,
      departmentActivities,
      instituteActivities,
      resultSummary,
      research,
      contributionSociety,
      sectionB,
      sectionC
    } = req.body;
    const newHOD = new HOD({
      title,
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      address,
      city,
      zipcode,
      state,
      country,
      departmentName,
      facultyId,
      dateOfJoining,
      designation,
      facultyEmail,
      educationQualification,
      areasOfSpecialization,
      experiences,
      employeeType,
      teachingProcess,
      studentsFeedback,
      departmentActivities,
      instituteActivities,
      resultSummary,
      research,
      contributionSociety,
      sectionB,
      sectionC
    });
    const savedHOD = await newHOD.save();
    res.status(201).json({
      message: 'HOD details added successfully',
      data: savedHOD
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to add HOD details',
      error: error.message
    });
  }
});