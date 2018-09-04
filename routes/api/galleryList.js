const router = require("express").Router();
const artController = require("../../controllers/artController");
const userController = require("../../controllers/userController");
const Product = require("../../models/Product")
const AWS = require('aws-sdk')


const BUCKET_NAME = 'artgutter';
const IAM_USER_KEY = process.env.AWS_ACCESS_KEY_ID;
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;

function uploadToS3(file){
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function(){
    var params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data
    };
    s3bucket.upload(params, function(err, data){
      if(err){
        console.log('error in callback');
        console.log(err);
      }
      console.log('success');
      console.log(data);
    })
  })
}

module.exports = (app) =>{
// db.Product
app.post("/api/products", function(req, res, next) {
    console.log(req.body);
    // console.log(req.files.file)
    // uploadToS3(req.files.file);
    Product
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(e)
    res.end();
}),

app.post("/api/uploadImage", function(req, res){
  console.log(req.files, "gallerylist awwwwwww yeah")

  uploadToS3(req.files.file);
  res.end()
});

}



