const mongoose = require("mongoose");

const attendanceLogSchema = new mongoose.Schema({
  LogID: {
    type: Number,
    unique: true,
    default: null, // Default to null if not provided
  },
  WorkerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    required: true,
  },
  Date: { type: Date, default: Date.now, required: true },
  Time: { type: String, required: true },
  Status: { type: String, enum: ["Present", "Absent"], required: true },
  Area: { type: mongoose.Schema.Types.ObjectId, ref: "Area", required: true },
  Remarks: { type: String },
});

// Pre-save hook to auto-increment LogID if it's null
attendanceLogSchema.pre("save", async function (next) {
  if (this.isNew && this.LogID == null) {
    try {
      // Find the last document with the highest LogID
      const lastLog = await this.constructor.findOne().sort({ LogID: -1 });
      this.LogID = lastLog ? lastLog.LogID + 1 : 1; // Increment by 1 or start at 1
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("AttendanceLog", attendanceLogSchema);
