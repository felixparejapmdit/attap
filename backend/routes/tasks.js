const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks with populated AreaAssigned details
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("AreaAssigned");
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Add a new task
router.post("/", async (req, res) => {
  try {
    const { TaskID, TaskDescription, AreaAssigned, Status } = req.body;

    // Validate required fields
    if (!TaskID || !TaskDescription || !AreaAssigned || !Status) {
      return res.status(400).json({
        error: "TaskID, TaskDescription, AreaAssigned, and Status are required",
      });
    }

    const newTask = new Task({
      TaskID,
      TaskDescription,
      AreaAssigned,
      Status,
    });

    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Failed to add task" });
  }
});

// Update an existing task by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("AreaAssigned");

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
