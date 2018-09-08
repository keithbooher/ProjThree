const nodemailer = require("nodemailer");


module.exports = app => {


    app.post("/api/contactus",(req, res) =>{

        console.log(req.body);
        let name = req.body.name;
        let email = req.body.email;
        let subject = req.body.subject;
        let body = req.body.text;

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "groupthreebootcamp@gmail.com", // generated ethereal user
              pass: "project3#" // generated ethereal password
            }
          });
          
          let mailOptions = {
            from: "groupthreebootcamp@gmail.com",
            to: "groupthreebootcamp@gmail.com",
            subject: `Customer Contact Us ${req.body.name}`,
            text: "Contact Us help",
            html: 
                `<b> Contact Us <br>
                ${name} <br>
                ${email} <br>
                ${subject} <br>
                ${body}
                </b>
                `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          
    } )


}

