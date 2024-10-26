const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 5000;
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
mongoose.connect(
  "mongodb+srv://felixparejapmdit07:hBXOoOzEFcNTfJmC@cluster0.wxvlrzj.mongodb.net/attendance-app?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Use Routes
app.use("/api/areas", areasRoute);
app.use("/api/workers", workersRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/attendanceLogs", attendanceLogsRoute);


// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://172.18.125.134:${PORT}`);
//});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost/:${PORT}`);
});
