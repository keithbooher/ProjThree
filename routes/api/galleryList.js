const router = require("express").Router();
const artController = require("../../controllers/artController");
const userController = require("../../controllers/userController");
const Product = require("../../models/Product")





module.exports = (app) =>{
// db.Product
app.post("/api/product", function(req, res, next) {
    console.log(req.body, 'Body');
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



