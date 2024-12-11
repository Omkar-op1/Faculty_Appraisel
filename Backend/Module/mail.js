const nodemailer = require("nodemailer");





async function sendPasswordEmail(receiverEmail, password) {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'appraiselfaculty@gmail.com', 
            pass: 'fntusslmwgvdyayq'  
        }
    });

    
    const mailOptions = {
        from: 'appraiselfaculty@gmail.com',
        to: receiverEmail,
        subject: 'Your Password',
        text: `Welcome to faculty appraisel system \n\nYour login id is: ${receiverEmail}\n\nYour password is: ${password}\n\nKeep it secure and do not share it with anyone.`,
    };

    
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error sending email: ${error}`);
    }
}


module.exports = sendPasswordEmail; 