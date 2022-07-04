const nodemailer = require('nodemailer')
const db = require('../database/connection')
// allow less secure app
// ktmpndwsvjuqxaeg
// using express


async function main() {
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'sahagarima844@gmail.com', // generated ethereal user
            pass: 'ktmpndwsvjuqxaeg', // generated ethereal password
        },
    });
    let data = await db.getAllQueueUser()
    let emailto=[]
    for(var i = 0 ; i < data.length ; i++)
    {
        emailto.push(data[i].Email);
        console.log(emailto[i]);
    }
    const msg ={
        from: '"Washing Portal" <sahagarima844@gmail.com>', // sender address
        to: emailto, // list of receivers
        subject: "Reminder For Washing Machine", // Subject line
        html: "<H3>Hi User,</H3><br><p>Just Now One Of The Washing Machine User Has Finished His Work. In Case You Wanna wash your Clothes 🙂 Hurry Up!!<br> Regards,Washing Portal</p>", // html body
     }
    // send mail with defined transport object
    try {
        let info = await transporter.sendMail(msg);
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error)
    }
}

module.exports.mail = main
