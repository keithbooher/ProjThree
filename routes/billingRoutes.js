const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const token = req.body.data.token;
        const amount = req.body.data.amount;
        //creating the charge here
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            description: 'money for art',
            source: token  //req.body.id
        });

        const user = await req.user.save();

        console.log('token', token)
        console.log('amount', amount)
        
        res.send(user);
    });
};