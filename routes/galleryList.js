const router = require("express").Router();
const artController = require("../../controllers/artController");

// Matches with "/api/products"
router.route("/")
  .get(artController.findAll)
  .post(artController.create);

// Matches with "/api/products/:id"
router
  .route("/:id")
  .get(artController.findById)
  .put(artController.update)
  .delete(artController.remove);

module.exports = router;
