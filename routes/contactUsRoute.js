const nodemailer = require("nodemailer");


module.exports = app => {

    app.post('/api/contactus', (req, res) => {
        console.log("testing");

    })

    // app.post("/api/contactus",(req, res) =>{

    //     res.send()

        // let transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //       user: "groupthreebootcamp@gmail.com", // generated ethereal user
        //       pass: process.env.EmailPassword // generated ethereal password
        //     }
        //   });
          
        //   let mailOptions = {
        //     from: "groupthreebootcamp@gmail.com",
        //     to: "groupthreebootcamp@gmail.com",
        //     subject: req.body.subject,
        //     text: req.body.text
        //   };
          
        //   transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log('Email sent: ' + info.response);
        //     }
        //   });
          
    // } )


}

