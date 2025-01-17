
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

const Form = mongoose.model('Form', FormSchema);