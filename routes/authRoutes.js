const passport = require('passport');
const userController = require('../controllers/userController.js')

module.exports = (app) => {

    //user comes to this route. so this says "hey passport attemp to authenticate the user who is coming in on this route and use the strategy called google"
    app.get('/auth/google', 
        passport.authenticate('google', {
            //asking google to give us profile information and email
            scope: ['profile', 'email']
        })
    );

    //telling passport to use passport and google strategy to finish authenticattion by exchanging newly obtained user code for the user profile
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        //logout is a function that is attatched to the req object by passport 
        //when we call log out it takes the cookie that contains our user id and it kills that id in there.
        req.logout();
        res.redirect('/')
    })

    
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })


    

};
