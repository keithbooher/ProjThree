const router = require("express").Router();
const User = require("../../models/User");
const Style = require("../../models/Styles");

module.exports = app => {
  // Find All
  app.get("/api/user", (req, res) => {
    User.find(req.body)
      .sort({ firstName: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  // Find All
  app.get("/api/user/popular", (req, res) => {
    User.find(req.body)
      .sort({ pageViews: -1 })
      .populate('product')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  // Find by Id
  app.get("/api/user/:id", (req, res) => {
    User.findById(req.params.id)
      .then(dbModel => console.log("****LOOK HERE******",dbModel))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  });

  // Create User
  app.post("/api/user", (req, res) => {
    User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  });

  app.post("/api/style/:id", (req, res) => {
    console.log(req.body)
    Style.update({UID: req.params.id }, {border: "solid"}, {upsert: "true"})
      .then(dbModel => {
        return User.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { style: dbModel } },
          { new: true }
        );
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  });

  // Update User
  app.put("/api/user/:id", (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { admin: true, stripeAccount: req.body.stripeAccount }
    )
      .then(console.log("req.body", req))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });


  // Follow Artist
  app.put('/api/user/follow/:id', (req, res) => {
    User
    .findOneAndUpdate({ _id: req.params.id }, { $push: {following: req.body.follow}})
    .then(console.log('req.body', req))
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  })

  // Update User Rating
  app.put('/api/user/rating/:id', (req, res) => {
    User
    .findOneAndUpdate({ _id: req.params.id }, { $push: {rating: req.body.rating}})
    .then(console.log('req.body', req))
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }) 

    // Update User AVERAGE Rating
    app.put('/api/user/averageRating/:id', (req, res) => {
      User
      .findOneAndUpdate({ _id: req.params.id }, { averageRating: req.body.averageRating})
      .then(console.log('req.body', req))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    })

    // Update User Profile Pic
    app.put("/api/user/pic/:id", (req, res) => {
      console.log('req.body*******', req.body)
      User
      .findOneAndUpdate({ _id: req.params.id }, { img: req.body.img})
      .then(console.log('req.body', req))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    })

    // Update User Profile Pic
    app.put("/api/user/description/:id", (req, res) => {
      console.log('req.body*******', req.body)
      User
      .findOneAndUpdate({ _id: req.params.id }, { aboutMe: req.body.description})
      .then(console.log('req.body', req))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    })

    // Plus one page view
    app.put("/api/user/pageview/:id", (req, res) => {
      console.log('req.body*******', req.body)
      User
      .findOneAndUpdate({ _id: req.params.id }, { pageViews: req.body.plusOne})
      .then(console.log('req.body', req))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    })

    // remove user product
    app.put('/api/user/product/:id', (req, res) => {
      console.log(req)      
      console.log('req.body.productID', req.body.productID)
      User
      .findOneAndUpdate({ _id: req.params.id }, { $pull: {product: req.body.productID}})
      .then(console.log('req.body', req))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  // Find user by id and delete document
  app.delete("/api/user/:id", (req, res) => {
    User.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });
};
