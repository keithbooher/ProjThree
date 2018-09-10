const router = require("express").Router();
const User = require("../../models/User");

module.exports = app => {
  // Find All
  app.get("/api/user", (req, res) => {
    User.find(req.body)
      .sort({ firstName: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  // Find by Id
  app.get("/api/user/:id", (req, res) => {
    User.findById(req.params.id)
      .then(dbModel => console.log(dbModel))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  });

  // Create User
  app.post("/api/user", (req, res) => {
    User.create(req.body)
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
