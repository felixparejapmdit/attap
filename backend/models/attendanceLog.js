const mongoose = require("mongoose");

const attendanceLogSchema = new mongoose.Schema({
  LogID: { type: Number, unique: true, autoIncrement: true },
  WorkerID: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" },
  Date: { type: Date, default: Date.now },
  Time: { type: String },
  Status: { type: String, enum: ["Present", "Absent"], required: true },
  Area: { type: mongoose.Schema.Types.ObjectId, ref: "Area" },
  Remarks: { type: String },
});

module.exports = mongoose.model("AttendanceLog", attendanceLogSchema);
