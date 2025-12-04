const express = require("express");
const router = express.Router();

// Ruta principal
router.get("/", (req, res) => {
  res.send("Welcome to UniTrade Backend 🚀");
});

// Ruta 'about'
router.get("/about", (req, res) => {
  res.send("This is UniTrade, a global barter platform 🌍");
});

// Ruta 'contact'
router.get("/contact", (req, res) => {
  res.send("Contact us at: support@unitrade.com 📧");
});

module.exports = router;