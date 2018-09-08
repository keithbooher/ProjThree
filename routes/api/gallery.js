const router = require("express").Router();

const AWS = require('aws-sdk')

const Product = require("../../models/Product");
const User = require("../../models/User");

const BUCKET_NAME = 'artgutter';
const IAM_USER_KEY = process.env.AWS_ACCESS_KEY_ID;
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;

function uploadToS3(file, cb){
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function(){
    var params = {
      Bucket: BUCKET_NAME,
      Key: String(Date.now()),
      Body: file.data
    };
    s3bucket.upload(params, function(err, data){
      if(err){
        console.log('error in callback');
        console.log(err);
      }
      console.log('success');
      // console.log(data);
      cb(data.Location)
    })
    // console.log(data)
  })
}


// Defining methods for the ProductsController
module.exports = (app) => {
  app.get('/api/product', (req, res) => {
    console.log(req)
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

  app.post("/api/uploadImage", function(req, res){
    console.log(req.files, "gallerylist awwwwwww yeah")
  
    uploadToS3(req.files.file, function(data){
      res.send(data)
    })
    // res.end()
  });
  
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
