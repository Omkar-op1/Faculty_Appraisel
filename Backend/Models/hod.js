const mongoose = require('mongoose');


const SectionBSchema = new mongoose.Schema({
  observations: { type: String, required: true, trim: true },
  recommendations: { type: String, required: true, trim: true },
});


const SectionCSchema = new mongoose.Schema({
  recommendation: { type: String, required: true, trim: true },
  signature: { type: String, required: true, trim: true },
});


const HodSchema = new mongoose.Schema({
  title: { type: String, enum: ['Dr.', 'Prof.', 'Mr.', 'Ms.', 'Mrs.'], trim: true },
  firstName: { type: String, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], trim: true },
  dateOfBirth: { type: Date },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  zipcode: { type: String, trim: true },
  state: { type: String, trim: true },
  country: { type: String, trim: true },
  departmentName: { type: String, trim: true },
  facultyId: { type: String, unique: true, trim: true },
  dateOfJoining: { type: Date },
  designation: { type: String, trim: true },
  facultyEmail: { type: String, trim: true },
  educationQualification: { type: String, trim: true },
  areasOfSpecialization: { type: [String] },
  experiences: { type: Number, min: 0 },
  employeeType: { type: String, enum: ['Permanent', 'Contract', 'Part-Time'], trim: true },

  
  teachingProcess: [{
    semester: { type: String, required: true },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    scheduledClasses: { type: Number, required: true },
    actuallyHeldClasses: { type: Number, required: true },
    pointsEarned: { type: Number, required: true },
    document: { type: String }, 
  }],

  studentsFeedback: [{
    semester: { type: String, required: true },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    studentFeedback: { type: String, required: true },
    pointsEarned: { type: Number, required: true },
    document: { type: String },
  }],

  departmentActivities: [{
    semester: { type: String, required: true },
    activity: { type: String, required: true },
    pointsEarned: { type: Number, required: true },
    criteria: { type: String, required: true },
    document: { type: String },
  }],

  instituteActivities: [{
    semester: { type: String, required: true },
    activity: { type: String, required: true },
    pointsEarned: { type: Number, required: true },
    criteria: { type: String, required: true },
    document: { type: String },
  }],

  resultSummary: [{
    semester: { type: String, required: true },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    studentsRegistered: { type: Number, required: true },
    studentsPassed: { type: Number, required: true },
    creditPoint: { type: Number, required: true },
    document: { type: String },
  }],

  research: [{
    research: { type: String, required: true },
    publicationName: { type: String, required: true },
    category: { type: String, required: true },
    document: { type: String },
    creditPoint: { type: Number, required: true },
  }],

  contributionSociety: [{
    semester: { type: String, required: true },
    activity: { type: String, required: true },
    criteria: { type: String, required: true },
    pointsEarned: { type: Number, required: true },
    document: { type: String },
  }],

  
  sectionB: [SectionBSchema],

  
  sectionC: [SectionCSchema],

}, { timestamps: true });

const hod = mongoose.model('HOD', HodSchemaSchema);

module.exports = hod;
