const router = require("express").Router();
const artController = require("../../controllers/artController");
const userController = require("../../controllers/userController");



module.exports = (app) => {

  app.get('/api/current_user', (req, res) => {
    res.send("i work")
      userController.findAll
  })
  
  app.post('/api/current_user', (req, res) => {
    console.log("post")
    res.send('yay')
    userController.create
  })

  app.get('/api/current_user/:id', (req, res) => {
      res.send(req.user);
  })
  

  app.put('/api/current_user/:id', (req, res) => {
    res.send(req.user);
})


};