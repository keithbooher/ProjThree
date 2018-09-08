const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
const { exec } = require("child_process");
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    //creating the charge here
    const charge = await stripe.charges.create(
      {
        amount: req.body.price,
        currency: "usd",
        description: "money for art",
        source: req.body.id,
        application_fee: req.body.platform_fee
      },
      {
        stripe_account: req.body.stripe_account
      }
    );
    const user = await req.user.save();
    // console.log("LOOK HERE", req.body);
    let name = req.body.card.name;
    let artistEmail = req.body.artistEmail;
    let currentUserEmail = req.body.currentUserEmail;
    let addressCity = req.body.card.address_city;
    let addressCountry = req.body.card.address_country;
    let addressLine = req.body.card.address_line1;
    let addressState = req.body.card.address_state;
    let addressZip = req.body.card.address_zip;
    let cardBrand = req.body.card.brand;
    let expMonth = req.body.card.exp_month;
    let expYear = req.body.card.exp_year;
    let cardDigits = req.body.card.last4;

    // NODEMAILER
    // ==================================================================
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "groupthreebootcamp@gmail.com", // generated ethereal user
        pass: process.env.EmailPassword // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Art Gutter" <groupthreebootcamp@gmail.com>', // sender address
      to: `${artistEmail}, ${currentUserEmail}`, // list of receivers
      subject: `Art Gutter order for ${name}`, // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Hello ${name},<br>Thanks for shopping with Art Gutter!<br>Your order will be shipped to:<br>${addressLine}<br>${addressCity} ${addressState}, ${addressZip}</b>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

    res.send(user);
  });

  app.get("/api/stripe", (req, res) => {
    //  res.redirect('/')
    const url = req.originalUrl;
    const splitURL = url.split("=");
    const targetQueryCode = splitURL[2];

    var cmd = `curl https://connect.stripe.com/oauth/token -d client_secret=sk_test_uDaKbfwMIWARk54H2UiKxeIv -d code="${targetQueryCode}" -d grant_type=authorization_code`;

    exec(cmd, function(error, stdout, stderr) {
      console.log(`stdout: ${stdout}`);
      const returnData = stdout;
      const splitItUp = returnData.split('"stripe_user_id": "');
      const splitItUpAgain = splitItUp[1].split('""scope":');
      const targetedStripeAccount = splitItUpAgain[0].slice(0, 21);
      console.log("test", targetedStripeAccount);

      res.send(
        "Copy this ID and paste it into the admin form to start accepting payments through Art Gutter: " +
          targetedStripeAccount
      ); //.redirect("/adminform")

      // res.sendFile("C:\Users\Keith\Desktop\School\group activity\proj3\ProjThree\views\stripe.html")
      //   res.write(<a href="/adminform"> click here to go back to the Admin Form</a>)
      //   res.end();

      // var html = fs.readFileSync('../views/stripe.html', 'utf8')
      // res.render('test', { html: html })
      // res.send(html)

      // res.render('../views/stripe.html', {root: __dirname })
    });
  });
};

// *********************************************************************************************
// ************ URL brought back from going through the stripe oAuth Process *******************
// *********************************************************************************************
// keibooher@gmail.com stripe that registered for our app returned:
// http://localhost:3000/api/stripe/?scope=read_write&code=ac_DW9PDT7JFl68eSv2yKHUMcMGyOmaKK1z

// *************************************************
// ******************* curl request ****************
// *************************************************
// $ curl https://connect.stripe.com/oauth/token
// -d client_secret=sk_test_uDaKbfwMIWARk54H2UiKxeIv
// -d code="ac_DWKaguXB4R7xSdaISIvDZKxLNtAZF8Y0"
// -d grant_type=authorization_code

// ********************************************************
// **************** Response to curl Request **************
// ********************************************************
// "access_token": "sk_test_UouLbnFMyZwBZXESXboDeWVS",
// "livemode": false,
// "refresh_token": "rt_DWKayariSj5HIMgtFOYrLOriq6hiSGPAfUj3Cyu3NwOVK5Kw",
// "token_type": "bearer",
// "stripe_publishable_key": "pk_test_zCS5GowOndpV7su7CvLzNcQM",
// "stripe_user_id": "acct_1D570wLWgPyrropm",
// "scope": "read_write"
