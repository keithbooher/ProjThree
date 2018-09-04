const router = require("express").Router();


const Product = require("../../models/Product");
const User = require("../../models/User");


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
      .then(function(dbModel) {
        return User.findOneAndUpdate(
          { _id: req.params.id }, { $push: { product: dbModel}}, { new: true });
        })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
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


// app.post("/notes/:id", function(req, res) {
//   console.log('***req.params:   ', req.params)
  
//   console.log('***res.body:   ', req.body)
  
//   // console.log('res', res.body)
//   db.Note.create(req.body)
//       .then(function(dbNote) {
//           return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id }}, { new: true });
//       }).then(function(dbArticle) {
//           // If we were able to successfully update an Article, send it back to the client
//           res.json(dbArticle);
//         })
//         .catch(function(err) {
//           // If an error occurred, send it to the client
//           res.json(err);
//         });
 
// });
