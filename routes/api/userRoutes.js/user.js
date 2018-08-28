const router = require("express").Router();
const artController = require("../../controllers/artController");
const userController = require("../../controllers/userController");


router.route("/current_user")
.get(userController.findAll);

router.route ("/api/submit_product")
.post(artController.create)

// var express = require('express')
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })

// var app = express()

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })


module.exports = router;
