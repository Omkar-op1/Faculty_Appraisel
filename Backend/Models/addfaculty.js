const mongoose = require('mongoose');


const FacultySchema = new mongoose.Schema({
  title: { type: String, enum: ['Dr.', 'Prof.', 'Mr.', 'Ms.', 'Mrs.'], trim: true },
  firstName: { type: String, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  phone:{ type: String,  trim: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], trim: true },
  dateOfBirth: { type: Date },
  address1: { type: String, trim: true },
  address2: { type: String, trim: true },
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
  scholarid:{ type: String },
  role:{type:String},
  experiences: { type: Number, min: 0 },
  employeeType: { type: String, enum: ['Permanent', 'Contract', 'Part-Time'], trim: true },
  password: { type: String },
    A:{type:Number, default:0},
    B:{type:Number, default:0},
    E:{type:Number, default:0},
    F:{type:Number, default:0},
    C:{type:Number, default:0},
    D:{type:Number, default:0},
    G:{type:Number, default:0},
    total:{type:Number, default:0},
  teachingProcess: [{
    semester: { type: String },
    subjectCode: { type: String },
    subjectName: { type: String },
    scheduledClasses: { type: Number },
    actualClasses: { type: Number },
    attainment:{ type: Number},
    document: { type: String },
    score: { type: Number},
    erp:{type:Boolean, default:false}
  }],

  studentsFeedback: [{
    semester: { type: String },
    subjectCode: { type: String },
    subjectName: { type: String },
    studentFeedback: { type: String },
    pointsEarned: { type: Number },

    document: { type: String },
    score: { type: Number},
    erp:{type:Boolean, default:false}
  }],

  departmentActivities: [{
    semester: { type: String },
    activity: { type: String },
    criteria: { type: String },
    document: { type: String },
    score: { type: Number}
  }],

  instituteActivities: [{
    semester: { type: String },
    activity: { type: String },
    criteria: { type: String },
    document: { type: String },
    score: { type: Number}
  }],

  resultSummary: [{
    semester: { type: String },
    subjectCode: { type: String },
    subjectName: { type: String },
    noRegisteredStudents: { type: Number },
    noPassedStudents: { type: Number },
    result: { type: Number },

    document: { type: String },
    score: { type: Number},
    erp:{type:Boolean, default:false}
  }],

  research: [{

    research: { type: String },
    publicationType: { type: String },
    publisherType: { type: String },
    publication: { type: String },
    authorType: { type: String },
    category: { type: String },
    document: { type: String },
    score: { type: Number},
    scholar:{type:Boolean, default:false}
  }],

  contributionSociety: [{
    semester: { type: String },
    activity: { type: String },
    criteria: { type: String },
      document: { type: String },
    score: { type: Number}
  }],

  recommendation: { type: String, trim: true },
  recommendedby: { type: String, trim: true },
  fr:{type:Boolean, default:false},
  
  feedback: { type: String, trim: true },
}, { timestamps: true });

const Faculty = (db) => {
  return db.model('Faculty', FacultySchema);
};

module.exports = Faculty;
