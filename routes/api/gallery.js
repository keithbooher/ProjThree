const AWS = require("aws-sdk");

const Product = require("../../models/Product");
const User = require("../../models/User");

const keys = require("../../config/keys");

const BUCKET_NAME = "artgutter";
// const IAM_USER_KEY = process.env.AWS_ACCESS_KEY_ID;
// const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;

function uploadToS3(file, cb) {
  let s3bucket = new AWS.S3({
    accessKeyId: keys.AWS_ACCESS_KEY_ID,
    secretAccessKey: keys.AWS_SECRET_ACCESS_KEY,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function() {
    var params = {
      Bucket: BUCKET_NAME,
      Key: String(Date.now()),
      Body: file.data
    };
    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log("error in callback");
        console.log(err);
      }
      console.log("success");
      // console.log(data);
      cb(data.Location);
    });
    // console.log(data)
  });
}

// Defining methods for the ProductsController
module.exports = app => {
  app.get("/api/product", (req, res) => {
    console.log(req);
    Product.find(req.body)
      .sort({ datePosted: -1 })
      .limit(20)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  app.get("/api/carousel", (req, res) => {
    console.log(req);
    Product.find(req.body)
      .sort({ datePosted: -1 })
      .limit(6)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  app.get("/api/product/:id", (req, res) => {
    Product.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  app.post("/api/product/:id", (req, res) => {
    Product.create(req.body)
      .then(dbModel => {
        return User.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { product: dbModel } },
          { new: true }
        );
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  });

  app.put("/api/product/:id", (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  // Update User Profile Pic
  app.put("/api/updatequantity/:id", (req, res) => {
    console.log("req.body*******", req.body);
    Product.findOneAndUpdate(
      { _id: req.params.id },
      { quantity: req.body.quantity }
    )
      .then(console.log("req.body", req))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  // Change sold value back to false
  app.put("/api/updatesold/:id", (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.id }, { sold: false })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  // Change sold value back to false
  app.put("/api/updatesoldtrue/:id", (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.id }, { sold: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  app.delete("/api/product/:id", (req, res) => {
    Product.deleteOne({ _id: req.params.id })
      // .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  app.post("/api/uploadImage", (req, res) => {
    console.log(req.files, "gallerylist awwwwwww yeah");

    uploadToS3(req.files.file, data => {
      res.send(data);
    });
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
