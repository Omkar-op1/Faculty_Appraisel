const express = require('express');
const Institute = require('../Models/Institute');
const Faculty = require('../Models/addfaculty');
const multer = require("multer");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const  { uploadFileToDrive }=require('../Module/multer')
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';
const upload = multer({ dest: 'uploads/' });
const ff=require('../Models/freshFaculty')
const fs = require('fs');


const {
  verifyToken,
  generatePassword,
} = require('../Module/auth');
const { getdb } = require('../Module/db');
const sendPasswordEmail = require('../Module/mail');
const { updatescore } = require('../Module/finalscore');
const router = express.Router();
router.post('/addFaculty', verifyToken, async (req, res) => {
    const {
      title,
      firstName,
      middleName,
      lastName,
      departmentName,
      facultyId,
      dateOfJoining,
      designation,
      facultyEmail,
    } = req.body;
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);
const institute = await Institute.findOne({ _id: req.user }).select('basicInfo.instituteName');
    const institute_name = institute.basicInfo.instituteName;
    const newf=new ff ({
      username : facultyEmail,
      password : hashedPassword,
      instituteName : institute_name
    })
    const nf = await newf.save()
    const fdb = getdb(institute_name.replace(/[^a-zA-Z0-9]/g, '_'));
    const FacultyModel = Faculty(fdb);
    const newFaculty = new FacultyModel({
      title,
      firstName,
      middleName,
      lastName,
      departmentName,
      facultyId,
      dateOfJoining,
      designation,
      facultyEmail,
      password
    });
    const savedFaculty = await newFaculty.save();
    sendPasswordEmail(newFaculty.facultyEmail, password);
    res.status(201).json({
      message: 'Faculty added successfully',
      faculty: savedFaculty,
    });
});
  router.post('/add-details', async (req, res) => {
  const data = req.body
  const token = req.headers.authorization;
  if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = decoded.userId;
    const fdb = getdb(decoded.db);
    const FacultyModel = Faculty(fdb);
    const faculty = await FacultyModel.findOne({ _id: user});
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    if (data.t==='0') {
      faculty.teachingProcess.push(data);
    }
    if (data.t==='1') {
      faculty.studentsFeedback.push(data);
    }
    if (data.t==='2') {
      faculty.departmentActivities.push(data);
    }
    if (data.t==='3') {
      faculty.instituteActivities.push(data);
    }
    if (data.t==='4') {
      faculty.resultSummary.push(data);
    }
    if (data.t==='6') {
      faculty.research.push(data);
    }
    if (data.t==='5') {
      faculty.contributionSociety.push(data);
    }
    if(data.t=='7'){
      faculty.updateOne(data);
    }
    const nf=await faculty.save();
    updatescore(nf);
    res.status(200).json({
      message: 'Details added successfully',
      faculty,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating details',
      error: error.message,
    });
  }
});
router.post('/upload',upload.single('file'), async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
  }
    try { 
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = decoded.userId;
    const fdb = getdb(decoded.db);
    const FacultyModel = Faculty(fdb);
    const faculty = await FacultyModel.findOne({ _id: user});
      const uploadedFile = req.file;
      if (!uploadedFile) {
          return res.status(400).send('No file uploaded.');
      }
      const fileId = await uploadFileToDrive(uploadedFile.path, uploadedFile.originalname);
      fs.unlinkSync(uploadedFile.path);
      res.status(200).send({ fileId });
  } catch (error) {
      res.status(500).send('Error uploading file.');
  }
}
);
module.exports = router;
