const express = require("express");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

const BUCKET_NAME = "artgutter";
const IAM_USER_KEY = process.env.AWS_ACCESS_KEY_ID;
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

mongoose.connect(keys.mongoURI);

// Connect to the Mongo DB for our gallery collection
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/galleryList");
mongoose.connect("mongodb://localhost/galleryList");

// Running express and assigning it to a variable
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Making cookies last for thirty days
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(fileupload());

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// When we require the authroutes file it returns a function. We the then immediately invoke the function with the app object (express)
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/api/user")(app);
require("./routes/api/gallery")(app);
require("./routes/contactUsRoute")(app);
``;

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // Like our main.js file, or our main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // If it doesnt recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// socket = io.listen(process.env.PORT);

// Making a production port or a dev port
const PORT = process.env.PORT || 5000;
// Making express listen input
app.listen(PORT);
