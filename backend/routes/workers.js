const express = require("express");
const router = express.Router();
const Worker = require("../models/worker");

// Get all workers with populated AssignedArea details
router.get("/", async (req, res) => {
  try {
    const workers = await Worker.find().populate("AssignedArea");
    res.json(workers);
  } catch (error) {
    console.error("Error fetching workers:", error);
    res.status(500).json({ error: "Failed to fetch workers" });
  }
});

// Add a new worker
router.post("/", async (req, res) => {
  try {
    const { WorkerID, Name, Trade, AssignedArea, Remarks } = req.body;

    // Validate required fields
    if (!WorkerID || !Name || !Trade) {
      return res
        .status(400)
        .json({ error: "WorkerID, Name, and Trade are required" });
    }

    const newWorker = new Worker({
      WorkerID,
      Name,
      Trade,
      AssignedArea,
      Remarks: Remarks || "", // Optional field
    });

    await newWorker.save();
    res.json(newWorker);
  } catch (error) {
    console.error("Error adding worker:", error);
    res.status(500).json({ error: "Failed to add worker" });
  }
});

// Update a worker's details
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { WorkerID, Name, Trade, AssignedArea, Remarks } = req.body;

    const updatedWorker = await Worker.findByIdAndUpdate(
      id,
      { WorkerID, Name, Trade, AssignedArea, Remarks },
      { new: true }
    );
    if (!updatedWorker) {
      return res.status(404).json({ error: "Worker not found" });
    }
    res.json(updatedWorker);
  } catch (error) {
    console.error("Error updating worker:", error);
    res.status(500).json({ error: "Failed to update worker" });
  }
});

// Delete a worker by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorker = await Worker.findByIdAndDelete(id);

    if (!deletedWorker) {
      return res.status(404).json({ error: "Worker not found" });
    }

    res.json({ message: "Worker deleted successfully" });
  } catch (error) {
    console.error("Error deleting worker:", error);
    res.status(500).json({ error: "Failed to delete worker" });
  }
});

module.exports = router;
