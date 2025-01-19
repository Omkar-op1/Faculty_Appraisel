const mongoose = require('mongoose');
const FieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: { type: String, required: true },
  options: [String], // For dropdown or radio fields
});

const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fields: [FieldSchema],
});

const FormSchema = new mongoose.Schema({
  sections: [SectionSchema],
  createdAt: { type: Date, default: Date.now },
});

const instituteSchema = new mongoose.Schema({
  login: {
    username: { type: String, unique: true },
    password: { type: String }, 
  },
  st1: { type: Boolean, default: false },
  basicInfo: {
    instituteName: { 
      type: String, 
      
    },
    instituteType: { 
      type: String, 
      enum: ['school', 'college', 'university'],
      
    },
    registrationNumber: { 
      type: String, 
      
    },
    yearOfEstablishment: { 
      type: Number, 
      
    },
  },
  address: {
    street: { type: String },
    city: { 
      type: String,
      
    },
    state: { 
      type: String, 
      
    },
    postalCode: { 
      type: String, 
      
    },
  },
  contact: {
    contactNumber: { 
      type: String, 
      
    },
    email: { 
      type: String, 
      
    },
    emaildomain: {
      type: String,
    },
    website: { type: String }, 
  },
  adminDetails: {
    principalName: { 
      type: String, 
      
    },
    principalContact: {
      phone: { 
        type: String, 
        
      },
      email: { 
        type: String, 
        
      },
    },
    additionalAdminContact: {
      name: { type: String },
      phone: { type: String },
      email: { type: String },
    },
  },
  affiliation: {
    affiliatingBody: { 
      type: String, 
      
    },
    accreditation: {
      body: { type: String },
      grade: { type: String },
    },
  },
  uploadedDocuments: {
    registrationCertificate: { type: String },
    affiliationCertificate: { type: String },
    principalIDProof: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  
  department: [String]  ,

  

  form: FormSchema,


  credits:{
    Professor:{
      A:{type:Number , default:0.1},
      B:{type:Number , default:0.1},
      C:{type:Number , default:0.1},
      D:{type:Number , default:0.4},
      E:{type:Number , default:0.1},
      F:{type:Number , default:0.1},
      G:{type:Number , default:0.1},
    },
    Associate:{
      A:{type:Number , default:0.2},
      B:{type:Number , default:0.1},
      C:{type:Number , default:0.1},
      D:{type:Number , default:0.3},
      E:{type:Number , default:0.1},
      F:{type:Number , default:0.1},
      G:{type:Number , default:0.1},
    },
    Assitant:{
      A:{type:Number , default:0.2},
      B:{type:Number , default:0.2},
      C:{type:Number , default:0.1},
      D:{type:Number , default:0.2},
      E:{type:Number , default:0.1},
      F:{type:Number , default:0.1},
      G:{type:Number , default:0.1},

    }

  }
  });


  const myDatabase = mongoose.connection.useDb('Institute-Details');
  const Institute = myDatabase.model('Institute', instituteSchema);

module.exports =Institute;