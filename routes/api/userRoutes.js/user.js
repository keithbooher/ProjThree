const router = require("express").Router();
const artController = require("../../controllers/artController");
const userController = require("../../controllers/userController");


router.route("/current_user")
.get(userController.findAll);


router
  .route("/:id")
  .put(userController.update);



module.exports = router;
