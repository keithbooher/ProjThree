const router = require("express").Router();
const artController = require("../../controllers/artController");
const userController = require("../../controllers/userController");
const Product = require("../../models/Product")


module.exports = (app) =>{
// db.Product
app.post("/api/products", function(req, res, next) {
    console.log(req.body, 'Body');
    Product
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.json(err));
    res.end();
})

}
