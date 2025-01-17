const express = require('express');
const bcrypt = require('bcryptjs');
const Institute = require('../Models/Institute');
const { verifyToken } = require('../Module/auth');
const JWT_SECRET = 'qwsn23ed23p0ed-f3f[34r34r344f34f3f,k3jif930r423lr3dm3234r';
const router = express.Router();
router.post('/formbuilder',verifyToken, async (req, res) => {
   try{
    const formData = req.body;
    try {
        const updatedInstitute = await Institute.findByIdAndUpdate(
            req.user,
            { form: formData },
            { new: true, runValidators: true } 
        );
        if (!updatedInstitute) {
            return res.status(404).json({ error: 'Institute not found' });
        }
        res.status(200).json({
            message: 'Form data updated successfully',
            institute: updatedInstitute,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
   }catch (error) {
      res.status(500).json({ message: 'Server error, please try again later.', ok: 0 });
    }
  });
  router.get('/formbuilde', async (req, res) => {
     const formData = req.body;
     try {
         const Institute1 = await Institute.findOne({_id:'674eacb7ba24a94305714099'});
         if (!Institute1) {
             return res.status(404).json({ error: 'Institute not found' });
         }
         res.status(200).json(Institute1.form);
     } catch (error) {
         res.status(500).json({ error: 'Internal server error' });
     }
   });
module.exports = router;