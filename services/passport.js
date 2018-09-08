const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//pulling a schema out of mongoose
const User = mongoose.model('users');

//user st argument ---------done second argument
//same user model instance that we just pulled out of the database from the .then functions below
passport.serializeUser((user, done) => {
    //user.id is not the same as profile.id below
    //profile.id (below) is the google.id
    //user.id is the id that is assigned to this record by mongo
    done(null, user.id);
});

//pulls the cookie assigned by serialize. which is the user.id
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});


//This is the place were we define the callback url also
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async  (accessToken, refreshToken, profile, done) => {
        //A query for looking through the user collection. find the frst record inside that collection with a google id of profile.id
        // A query reaching out to the mongo data base is an asyncrous opporation and to deal with that, we get a promise. So we chained on a .then that was called within existing user if found
        const existingUser = await User.findOne({ googleId: profile.id })
            // console.log(profile)
            // existing user is a model instance that represesnts a user that was found
            if(existingUser) {
                //we already have a record with the given profile id
                return done(null, existingUser);
            }
            console.log('accessToken', accessToken)
            console.log('refreshToken', refreshToken)
            console.log('profile', profile.emails[0].value)
            //we dont have a user record with this id, make a new record
            //model instance
            const user = await new User({ googleId: profile.id, firstName: profile.name.givenName, email: profile.emails[0].value }).save()

            //model instance
            //just came back from database so it has all the most up to date info 
            done(null, user);
            
    })
);

// console.log(user)
