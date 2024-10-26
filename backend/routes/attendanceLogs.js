const express = require("express");
const router = express.Router();
const AttendanceLog = require("../models/attendanceLog");

// Get all attendance logs
router.get("/", async (req, res) => {
  const logs = await AttendanceLog.find().populate("WorkerID").populate("Area");
  res.json(logs);
});

// Add new attendance log
router.post("/", async (req, res) => {
  const newLog = new AttendanceLog(req.body);
  await newLog.save();
  res.json(newLog);
});

module.exports = router;
