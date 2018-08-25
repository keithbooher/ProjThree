// Require express Router

const router = require("express").Router();
const galleryRoutes = require('./galleryList');

// Article routes
router.use("/products", galleryRoutes);

module.exports = router;