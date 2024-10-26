const express = require("express");
const router = express.Router();
const Area = require("../models/area");

// Get all areas
router.get("/", async (req, res) => {
  const areas = await Area.find()
    .populate("WorkersAssigned")
    .populate("TasksAssigned");
  res.json(areas);
});

// Add new area
router.post("/", async (req, res) => {
  const newArea = new Area(req.body);
  await newArea.save();
  res.json(newArea);
});

module.exports = router;
