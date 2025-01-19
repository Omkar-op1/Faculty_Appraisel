const express = require('express');
const Faculty = require('../Models/addfaculty');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Institute = require('../Models/Institute');
const { updateScore } = require('../Module/finalscore');

const { getdb } = require('../Module/db');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';
router.get('/get-details', async (req, res) => {
    const token = req.headers.authorization;
    const t = req.headers['type'];
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
      if (t==='0') {
       res.json({ key: faculty.teachingProcess });
      }
      if (t==='1') {
       res.json({ key: faculty.studentsFeedback });
      }
      if (t==='2') {
        res.json({ key: faculty.departmentActivities });
      }
      if (t==='3') {
        res.json({ key: faculty.instituteActivities });
      }
      if (t==='4') {
        res.json({ key: faculty.resultSummary });
      }
      if (t==='6') {
        res.json({ key: faculty.research });
      }
      if (t==='5') {
        res.json({ key: faculty.contributionSociety });
      }
      if(t==='7')
      {
        res.json({ key: faculty });
      }
  });

  router.delete('/delete-details/:entryId', async (req, res) => {
    const { entryId } = req.params; 
      const token = req.headers.authorization;
    const t = req.headers['type'];
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = decoded.userId;
      const fdb = getdb(decoded.db);
      const FacultyModel = Faculty(fdb);
      const faculty = await FacultyModel.findOne({ _id: user});
      let result;

      if (t==='0') {
        result = await faculty.updateOne(
          { $pull: { teachingProcess: { _id: entryId } } } 
        );
       }
       if (t==='1') {
        result = await faculty.updateOne(
          { $pull: { studentsFeedback: { _id: entryId } } } 
        );
       }
       if (t==='2') {
         result = await faculty.updateOne(
          { $pull: { departmentActivities: { _id: entryId } } } 
        );
       }
       if (t==='3') {
         result = await faculty.updateOne(
          { $pull: { instituteActivities: { _id: entryId } } } 
        );
       }
       if (t==='4') {
         result = await faculty.updateOne(
          { $pull: { resultSummary: { _id: entryId } } } 
        );
       }
       if (t==='6') {
         result = await faculty.updateOne(
          { $pull: { research: { _id: entryId } } } 
        );
       }
       if (t==='5') {
         result = await faculty.updateOne(
          { $pull: { contributionSociety: { _id: entryId } } } 
        );
       }
      if (result.modifiedCount === 0) {
        return res.status(404).send({ message: 'Entry not found' });
      }
      const nf=await new Promise(resolve => resolve(faculty.save()));;
      const faculty1 = await FacultyModel.findOne({ _id: user});
      updateScore(faculty1);
      res.send({ message: 'Entry deleted successfully' });
    // } catch (error) {
    //   res.status(500).send({ message: 'Failed to delete entry' });
    // }
  });
  router.get('/get-details1', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = decoded.userId;
      const fdb = getdb(decoded.db);
      const FacultyModel = Faculty(fdb);


      const facultyId = req.query.facultyId;
        const userId = facultyId || user; 
      const faculty = await FacultyModel.findOne({ _id: userId});
      if (!faculty) {
        return res.status(404).json({ message: 'Faculty not found' });
      }
      res.json({faculty});
  });
  router.post('/reccomend', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = decoded.userId;
      const fdb = getdb(decoded.db);
      const FacultyModel = Faculty(fdb);

      const hod=await FacultyModel.findOne({ _id: user});
      const facultyId = req.query.facultyId;
        const userId = facultyId; 
        console.log(userId)
      const faculty = await FacultyModel.findOne({ _id: userId});
      if (!faculty) {
        return res.status(404).json({ message: 'Faculty not found' });
      }
      console.log(faculty);
      
      faculty.recommendation=req.body.recommendation;
      faculty.feedback=req.body.feedback;
      faculty.fr=true;
      faculty.recommendedby = hod.firstname + " " + hod.lastname;
      const nf=await faculty.save();
      console.log(nf);
      return res.status(200).json({ message: 'done' });
     
  });
  router.get('/get-details2', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = decoded.userId;


      const institute = await Institute.findOne({ '_id': user });
      if (!institute) {
        return res.status(404).json({ message: 'Institute not found', ok: 0 });
      }
  
  const FacultyModel = Faculty(getdb(institute.basicInfo.instituteName.replace(/[^a-zA-Z0-9]/g, '_'))); 


      const facultyId = req.query.facultyId;
        const userId = facultyId || user; 
      const faculty = await FacultyModel.findOne({ _id: userId});
      if (!faculty) {
        return res.status(404).json({ message: 'Faculty not found' });
      }
      res.json({faculty});
  });
  
  module.exports = router;
