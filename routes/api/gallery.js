const router = require("express").Router();


const Product = require("../../models/Product");

// Defining methods for the ProductsController
module.exports = (app) => {
  app.get('/api/product', (req, res) => {
    Product
      .find(req.query)
      .sort({ productName: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })
  
  app.get('/api/product/:id', (req, res) => {
    Product
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })

  app.post('/api/product/:id', (req, res) => {
    Product
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })

  app.put('/api/product/:id', (req, res) => {
    Product
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })

  app.delete('/api/product/:id', (req, res) => {
    Product
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })
};
