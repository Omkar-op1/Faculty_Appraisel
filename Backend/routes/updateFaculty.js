const express = require('express');
const Faculty = require('../Models/addfaculty'); // Path to your Faculty model
const bcrypt = require('bcryptjs');
const router = express.Router();

// POST method to create a new faculty member
router.post('/updateFaculty', async (req, res) => {
  const {
    title,
    firstName,
    middleName,
    lastName,
    phone,
    gender,
    dateOfBirth,
    address1,
    address2,
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
  } = req.body;

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Faculty instance
    const newFaculty = new Faculty({
      title,
      firstName,
      middleName,
      lastName,
      phone,
      gender,
      dateOfBirth,
      address1,
      address2,
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
    });

    // Save the new faculty to the database
    const savedFaculty = await newFaculty.save();

    // Respond with the saved faculty data (without password)
    res.status(201).json({
      message: 'Faculty member created successfully',
      faculty: {
        id: savedFaculty._id,
        title: savedFaculty.title,
        firstName: savedFaculty.firstName,
        lastName: savedFaculty.lastName,
        phone: savedFaculty.phone,
        gender: savedFaculty.gender,
        dateOfBirth: savedFaculty.dateOfBirth,
        // You can return other details as needed
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating faculty member', error: error.message });
  }
});

module.exports = router;
