const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find().populate("AreaAssigned");
  res.json(tasks);
});

// Add new task
router.post("/", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

module.exports = router;
