// Require express Router

const router = require("express").Router();
const userRoutes = require('./user');

// Article routes
router.use("/current_user", userRoutes);

module.exports = router;