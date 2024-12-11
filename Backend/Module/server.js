const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const getf=require('../routes/facultyget')
const addfacultyRoute = require('../routes/addfaculty'); 
// const submit=require('../routes/submit')
const app = express();
const Instituteregister=require('../routes/Instituteregister');
const IN=require('../routes/Instituteregister2');
const InLogin=require('../routes/Institutelogin')
const InName=require('../routes/institutename')
const faculty_login=require('../routes/facultylogin')
const cookieParser = require('cookie-parser');
const formbuild=require('../routes/formbuilder')
const erp=require('./erpapi')
//const upload = require('../Module/multer');

app.use(cookieParser());
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // specify your front-end origin
  credentials: true, // allow credentials (cookies, HTTP authentication)
}

//get all the faculty details
const getallfaculty= require ('../routes/getAllFaculty');


app.use(cors(corsOptions));
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api',Instituteregister,IN,InLogin,InName,addfacultyRoute,faculty_login,getf,formbuild);
app.use('/api', getallfaculty ,erp);
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).send({ error: 'Something went wrong!' });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});