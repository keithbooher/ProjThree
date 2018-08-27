const router = require("express").Router();
const artController = require("../../controllers/artController");
const userController = require("../../controllers/userController");



module.exports = (app) => {

  app.get('/api/user', (req, res) => {
    res.send("i work")
      userController.findAll
  })
  
  app.post('/api/user', (req, res) => {
    console.log("post")
    res.send('yay')
    userController.create
  })





  app.get('/api/user/:id', (req, res) => {
      userController.update    
      res.send(req.user);
  })

  app.put('/api/user/:id', (req, res) => {
    console.log(req.params.id)    
    console.log(req.user)
    res.send(req.user)    
    userController.update    
})


};