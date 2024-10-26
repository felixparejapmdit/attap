const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const areasRoute = require("./routes/areas");
const workersRoute = require("./routes/workers");
const tasksRoute = require("./routes/tasks");
const attendanceLogsRoute = require("./routes/attendanceLogs");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/attendance-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use Routes
app.use("/api/areas", areasRoute);
app.use("/api/workers", workersRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/attendanceLogs", attendanceLogsRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
