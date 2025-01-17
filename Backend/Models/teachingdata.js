const mongoose = require('mongoose');

const FacultyEntrySchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  subjectCode: {
    type: String,
    required: true,
    trim: true,
    unique: true, 
  },
  semester: {
    type: String,
    required: true,
    enum: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'], 
  },
  scheduledClasses: {
    type: Number,
    required: true,
    min: 0, 
  },
  actualClasses: {
    type: Number,
    required: true,
    min: 0, 
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('FacultyEntry', FacultyEntrySchema);
