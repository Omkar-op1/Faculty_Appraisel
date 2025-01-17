const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  login: {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  // Add more fields as needed
});

const University = mongoose.model('University', UniversitySchema);
module.exports = University;