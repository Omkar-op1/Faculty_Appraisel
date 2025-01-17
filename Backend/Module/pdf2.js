const express = require('express');
const router = express.Router();
const pdf = require("pdf-creator-node");
const fs = require("fs");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Faculty = require('../Models/addfaculty');
const Institute = require('../Models/Institute');
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';

const {getdb}=require('../Module/db')


const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");

const hbs = allowInsecurePrototypeAccess(Handlebars);

// Fetch faculty data
async function getFacultyData(facultyId, instituteName) {
    try {
        const sanitizedInstituteName = instituteName.replace(/[^a-zA-Z0-9]/g, '_');
        const FacultyModel = Faculty(getdb(sanitizedInstituteName));
        const data = await FacultyModel.findOne({ _id: facultyId });
        if (!data) throw new Error('Faculty not found');
        return data;
    } catch (error) {
        console.error('Error fetching faculty data:', error.message);
        throw error;
    }
}

// Generate PDF
async function generatePDF(facultyData) {
    try {
        const html = fs.readFileSync("template.html", "utf8");
        const template = hbs.compile(html);
        const output = template(facultyData);

        const options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
            },
            footer: {
                height: "28mm",
                contents: {
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
                },
            },
        };

        const document = {
            html: output,
            data: facultyData,
            path: "./output.pdf",
            type: "",
        };

        const result = await pdf.create(document, options);
        return result.filename;
    } catch (error) {
        console.error('Error generating PDF:', error.message);
        throw error;
    }
}

// Download endpoint
router.post('/download/:facultyId', async (req, res) => {
    const facultyId = req.params.facultyId;
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = decoded.userId;

        const institute = await Institute.findOne({ _id: user });
        if (!institute) {
            return res.status(404).json({ error: 'Institute not found' });
        }

        const instituteName = institute.basicInfo.instituteName;
        const facultyData = await getFacultyData(facultyId, instituteName);

        const filePath = await generatePDF(facultyData);
        const fileName = `Faculty_Report_${facultyId}.pdf`;

        if (fs.existsSync(filePath)) {
            // Set headers for PDF download
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
            
            // Send the file
            res.download(filePath, 'document.pdf', (err) => {
              if (err) {
                // Handle any errors during download
                res.status(500).send('Could not download the file');
              }
            });
          } else {
            res.status(404).send('PDF not found');
          }
    } catch (error) {
        console.error('Error in download route:', error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
