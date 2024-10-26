const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  WorkerID: {
    type: Number,
    unique: true,
    required: true,
    min: [1, "WorkerID must be a positive number"],
  },
  Name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  Trade: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, "Trade cannot exceed 50 characters"],
  },
  AssignedArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    default: null,
  },
  Remarks: {
    type: String,
    trim: true,
    maxlength: [500, "Remarks cannot exceed 500 characters"],
  },
});

module.exports = mongoose.model("Worker", workerSchema);
