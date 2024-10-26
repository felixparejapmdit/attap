const express = require("express");
const router = express.Router();
const AttendanceLog = require("../models/attendanceLog");

// Get all attendance logs with populated Worker and Area details
router.get("/", async (req, res) => {
  try {
    const logs = await AttendanceLog.find()
      .populate("WorkerID")
      .populate("Area");
    res.json(logs);
  } catch (error) {
    console.error("Error fetching attendance logs:", error);
    res.status(500).json({ error: "Failed to fetch attendance logs" });
  }
});

// Get attendance logs for a specific worker or area
router.get("/search", async (req, res) => {
  const { workerId, areaId } = req.query;
  const query = {};

  if (workerId) query.WorkerID = workerId;
  if (areaId) query.Area = areaId;

  try {
    const logs = await AttendanceLog.find(query)
      .populate("WorkerID")
      .populate("Area");
    res.json(logs);
  } catch (error) {
    console.error("Error fetching attendance logs:", error);
    res.status(500).json({ error: "Failed to fetch attendance logs" });
  }
});

// Add a new attendance log
router.post("/", async (req, res) => {
  try {
    const { WorkerID, Area, Status, Remarks } = req.body;

    // Check for required fields
    if (!WorkerID || !Area || !Status) {
      return res
        .status(400)
        .json({ error: "WorkerID, Area, and Status are required" });
    }

    // Set Date and Time to current if not provided
    const Date = req.body.Date || new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD' format
    const Time =
      req.body.Time ||
      new Date().toLocaleTimeString("en-US", { hour12: false }); // 'HH:mm:ss' format

    // Create a new attendance log entry
    const newLog = new AttendanceLog({
      WorkerID,
      Area,
      Date,
      Time,
      Status,
      Remarks: Remarks || "",
    });

    await newLog.save();
    res.status(201).json(newLog); // Return 201 for successful creation
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate LogID error if it occurs
      console.error("Duplicate LogID error:", error);
      return res
        .status(400)
        .json({ error: "Duplicate LogID. Entry already exists." });
    }
    console.error("Error adding attendance log:", error);
    res.status(500).json({ error: "Failed to add attendance log" });
  }
});

// Delete an attendance log by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLog = await AttendanceLog.findByIdAndDelete(id);

    if (!deletedLog) {
      return res.status(404).json({ error: "Attendance log not found" });
    }
    res.json({ message: "Attendance log deleted successfully" });
  } catch (error) {
    console.error("Error deleting attendance log:", error);
    res.status(500).json({ error: "Failed to delete attendance log" });
  }
});

module.exports = router;
