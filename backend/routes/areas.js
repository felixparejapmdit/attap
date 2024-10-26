const express = require("express");
const router = express.Router();
const Area = require("../models/area");
const Worker = require("../models/worker");

// Get all areas with populated workers and tasks
router.get("/", async (req, res) => {
  try {
    const areas = await Area.find()
      .populate("WorkersAssigned")
      .populate("TasksAssigned");
    res.status(200).json(areas);
  } catch (error) {
    console.error("Error fetching areas:", error);
    res.status(500).json({ error: "Failed to fetch areas" });
  }
});

// Get workers assigned to a specific area
router.get("/:areaId/workers", async (req, res) => {
  const { areaId } = req.params;

  try {
    const area = await Area.findById(areaId).populate("WorkersAssigned");

    if (!area) {
      return res.status(404).json({ error: "Area not found" });
    }

    console.log("Fetched area with populated workers:", area); // Debug log
    res.status(200).json(area.WorkersAssigned);
  } catch (error) {
    console.error("Error fetching workers for area:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch workers for the specified area" });
  }
});

// Add a new area
router.post("/", async (req, res) => {
  try {
    const { AreaName, WorkersAssigned, TasksAssigned } = req.body;

    // Check if AreaName is provided
    if (!AreaName) {
      return res.status(400).json({ error: "AreaName is required" });
    }

    const newArea = new Area({
      AreaName,
      WorkersAssigned: WorkersAssigned || [],
      TasksAssigned: TasksAssigned || [],
    });

    await newArea.save();
    res.status(201).json(newArea);
  } catch (error) {
    console.error("Error adding area:", error);
    res.status(500).json({ error: "Failed to add area" });
  }
});

// Delete an area by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArea = await Area.findByIdAndDelete(id);

    if (!deletedArea) {
      return res.status(404).json({ error: "Area not found" });
    }

    res.status(200).json({ message: "Area deleted successfully" });
  } catch (error) {
    console.error("Error deleting area:", error);
    res.status(500).json({ error: "Failed to delete area" });
  }
});

module.exports = router;
