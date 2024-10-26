const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  TaskID: { type: Number, unique: true, required: true },
  TaskDescription: { type: String, required: true },
  AreaAssigned: { type: mongoose.Schema.Types.ObjectId, ref: "Area" },
  Status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Task", taskSchema);
