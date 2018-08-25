// Require express Router

const router = require("express").Router();
const galleryRoutes = require('./galleryRoutes');
const userRoutes = require('./userRoutes');


// Article routes
router.use("/products", galleryRoutes);
router.use("/current_user", userRoutes);


module.exports = router;