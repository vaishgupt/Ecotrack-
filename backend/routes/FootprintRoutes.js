const express = require("express");
const { calculateFootprint } = require("../controllers/FootprintController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// This route handles POST requests to /api/calculate
// authMiddleware checks if user is logged in (has valid token)
// If logged in, it calls calculateFootprint function
router.post("/calculate", authMiddleware, calculateFootprint);

module.exports = router;
