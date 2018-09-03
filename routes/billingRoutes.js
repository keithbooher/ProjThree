const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
const request = require('request')

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        

        //creating the charge here
        const charge = await stripe.charges.create({
            amount: req.body.price,
            currency: 'usd',
            description: 'money for art',
            source: req.body.id,
            application_fee: req.body.platform_fee
        }, {
            stripe_account: req.body.stripe_account
          });
        const user = await req.user.save();


        console.log('req.body', req.body)
        
        res.send(user);
    });

    app.get('/api/stripe', (req, res) => {
        //  res.redirect('/')
        console.log('req.query', req.query)
        //request package
        request.post(`https://connect.stripe.com/oauth/token/?client_secret=sk_test_uDaKbfwMIWARk54H2UiKxeIv&code=${req.query.code}&grant_type=authorization_code`, function(error, response, body) {
            console.log("BODY======= ", body);
        })
        res.send(res.user)  
    })

    // app.get('/api/stripe', (req, res) => {
    //     console.log('req.params', req.query)
    //     debugger
    //     res.send(res.user)  
    // })


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