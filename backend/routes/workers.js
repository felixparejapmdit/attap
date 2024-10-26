const express = require("express");
const router = express.Router();
const Worker = require("../models/worker");

// Get all workers
router.get("/", async (req, res) => {
  const workers = await Worker.find().populate("AssignedArea");
  res.json(workers);
});

// Add new worker
router.post("/", async (req, res) => {
  const newWorker = new Worker(req.body);
  await newWorker.save();
  res.json(newWorker);
});

module.exports = router;
