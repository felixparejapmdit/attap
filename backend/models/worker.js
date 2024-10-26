const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  WorkerID: { type: Number, unique: true, required: true },
  Name: { type: String, required: true },
  Trade: { type: String, required: true },
  AssignedArea: { type: mongoose.Schema.Types.ObjectId, ref: "Area" },
  Remarks: { type: String },
});

module.exports = mongoose.model("Worker", workerSchema);
