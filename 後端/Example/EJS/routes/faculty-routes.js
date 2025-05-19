const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Welcome to the staff homepage");
});

router.get("/new", (req, res) => {
  return res.send("This is the page for adding new staff data.");
});

module.exports = router;
