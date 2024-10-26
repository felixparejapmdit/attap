const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  AreaID: { type: Number, unique: true, required: true },
  AreaName: { type: String, required: true },
  TasksAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  WorkersAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Worker" }],
});

module.exports = mongoose.model("Area", areaSchema);
