const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');
const apikeys = require('./apikeys.json');

const SCOPE = ['https://www.googleapis.com/auth/drive'];

async function authorize() {
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();
    return jwtClient;
}

async function uploadFileToDrive(filePath, fileName) {
    console.log('do')
    const authClient = await authorize();

    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth: authClient });

        const fileMetaData = {
            name: fileName, // Use the uploaded file's name
            parents: ['1pfX1znpJSdbgFjoZnZGT8xbh3MCgWDlm'], // Your folder ID
        };

        const media = {
            mimeType: 'application/pdf',
            body: fs.createReadStream(filePath),
        };

        drive.files.create(
            {
                resource: fileMetaData,
                media: media,
                fields: 'id',
            },
            (error, file) => {
                if (error) {
                    return reject(error);
                }
                resolve(file.data.id); // Return only the file ID
            }
        );
    });
}

module.exports = { uploadFileToDrive };
