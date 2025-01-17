// const express = require('express'); // Express.js ko import karo
// const axios = require('axios'); // Axios ko import karo (API request ke liye)
// const cors = require('cors'); // CORS library ko import karo
// const Faculty = require('../Models/addfaculty');
// const {getdb}=require('./db')
// const app = express();
// app.use(cors()); // CORS ko enable karo

// // SerpAPI ka API Key aur Author ID
// const API_KEY = 'd660c81506a488b9fa048c86e9c3a85c5272c8a4fb61f1a06540f49e9fe03499';
// // const AUTHOR_ID = 'K2BMBtcAAAAJ';


// async function fetch(AUTHOR_ID) {
//     const response = await axios.get('https://serpapi.com/search.json', {
//     params: {
//         engine: 'google_scholar_author',
//         author_id: AUTHOR_ID,
//         api_key: API_KEY,
//     }
// });
// const data = response.data;

//         const publications = data.articles || [];
//         console.log(publications);
  
//       addResearchData('67517294d48b85a4c1c3c80c',publications)
// }
// async function addResearchData(facultyId, researchData) {
//     try {

//         const faculty=Faculty(getdb('Bajaj_Institute_of_Technology'));
//       // Transform incoming JSON data to match schema structure
//       const transformedData = {
//         research: researchData.title,
//         publicationName: researchData.publication,
//         category: "Research Paper", // Set a default or dynamic category
//         document: researchData.link, // Storing the link as document
//         creditPoint: 0, // Set based on your criteria
//         score: 0, // Set based on your criteria
//         scholar: true // Set true if citation_id is present
//       };
  
//       // Update the faculty document
//       const result = await faculty.findOneAndUpdate(
//         { _id: facultyId }, // Filter by faculty ID
//         { $push: { research: transformedData } }, // Push to research array
//         { new: true, useFindAndModify: false } // Return updated document
//       );
  
//       if (!result) {
//         console.log('Faculty not found');
//         return null;
//       }
  
//       console.log('Updated Faculty:', result);
//       return result;
//     } catch (error) {
//       console.error('Error adding research data:', error);
//     }
//   }

// const fetchPublications = async () => {
//     try {
//         // Proxy server se data fetch karo
//         const response = await fetch('http://localhost:4000/fetch-publications');
//         const data = await response.json();
  
//         console.log('API Response:', data); // Debug ke liye response ko print karo
//         const publications = data.publications || [];
  
//         if (publications.length > 0) {
//             // Pehli publication ka data auto-fill karo
//             const firstPublication = publications[0];
//             document.getElementById('publication-title').value = firstPublication.title || '';
//             document.getElementById('publication-citations').value = firstPublication.cited_by || '';
//             document.getElementById('publication-journal').value = firstPublication.journal || '';
//             document.getElementById('publication-year').value = firstPublication.year || '';
//         } else {
//             console.log('No publications found.');
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
//   };
  
//   // Function ko page load hone par call karo
//   window.onload = fetchPublications;





const express = require('express'); // Express.js ko import karo
const axios = require('axios'); // Axios ko import karo (API request ke liye)
const cors = require('cors'); // CORS library ko import karo
const Faculty = require('../Models/addfaculty');
const {getdb}=require('./db')
const app = express();
app.use(cors()); // CORS ko enable karo
const { updatescore } = require('../Module/finalscore');
const router = express.Router();

const jwt = require('jsonwebtoken');

const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';


// SerpAPI ka API Key aur Author ID
const API_KEY = 'd660c81506a488b9fa048c86e9c3a85c5272c8a4fb61f1a06540f49e9fe03499';
// const AUTHOR_ID = 'K2BMBtcAAAAJ';








async function fetch(faculty) {


  console.log('3');


  const AUTHOR_ID=faculty.scholarid;
  console.log(AUTHOR_ID)
    const response = await axios.get('https://serpapi.com/search.json', {
    params: {
        engine: 'google_scholar_author',
        author_id: AUTHOR_ID,
        api_key: API_KEY,
    }
});
const data = response.data;

        const publications = data.articles || [];
        // console.log(publications);
       const s= await addResearchData(faculty,publications[0])

          
  
}
async function addResearchData(faculty, researchData) {
    try {
        
     console.log(researchData)
      const transformedData = {
        research: researchData.title,
        publicationName: researchData.publication,
        category: "Research Paper", 
        document: researchData.link, 
        scholar: true 
      };
  
      // Update the faculty document
      const publicationExists = faculty.research.some(
        (pub) =>
          pub.research === transformedData.research
      );
    
      // if (!publicationExists) {
        // Add the new publication to the array
        const result = await faculty.updateOne(
         {$push: { research: transformedData } }
        );
    
     const saved=await faculty.save();
        updatescore(saved);
      console.log('Updated Faculty:', result);
      return result;
    
  }catch (error) {
      console.error('Error adding research data:');
    }

}
router.post('/fetchg', async (req, res) => {
  console.log('1')
  const token = req.headers.authorization;
  if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
  }
    try { 
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = decoded.userId;
    const fdb = getdb(decoded.db);
    const FacultyModel = Faculty(fdb);
    const faculty = await FacultyModel.findOne({ _id: user});
console.log('2')
     const g = await  fetch(faculty);

    


      res.status(200).send('ok');
  } catch (error) {
      res.status(500).send('Error uploading file.');
  }
}
);
module.exports=router