const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

//running express and assigning it to a variable
const app = express();

app.use(bodyParser.json());
//making cookies last for thirty days
app.use( 
    cookieSession({
        maxAge: 30 * 24 * 60 *60 * 1000,
        keys: [keys.cookieKey] 
    })
)

//
app.use(passport.initialize());
app.use(passport.session());

// when we require the authroutes file it returns a function. We the then immediately invoke the function with the app object (express)
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//making a production port or a dev port
const PORT = process.env.PORT || 5000;
//making express listen input
app.listen(PORT);