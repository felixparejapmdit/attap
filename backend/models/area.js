const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  AreaID: {
    type: Number,
    unique: true,
    default: null, // Default to null if not provided
  },
  AreaName: {
    type: String,
    required: true,
  },
  WorkersAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    },
  ],
  TasksAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

// Pre-save hook to auto-increment AreaID if it's null
areaSchema.pre("save", async function (next) {
  if (this.isNew && this.AreaID == null) {
    try {
      // Find the last document with the highest AreaID
      const lastArea = await this.constructor.findOne().sort({ AreaID: -1 });
      this.AreaID = lastArea ? lastArea.AreaID + 1 : 1; // Increment by 1 or start at 1
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("Area", areaSchema);
