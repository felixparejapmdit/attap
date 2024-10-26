const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  TaskID: {
    type: Number,
    unique: true,
    required: true,
    min: [1, "TaskID must be a positive number"],
  },
  TaskDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, "TaskDescription cannot exceed 500 characters"],
  },
  AreaAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: true,
  },
  Status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
