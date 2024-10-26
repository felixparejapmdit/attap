import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Attendance = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [workers, setWorkers] = useState([]);
  const [attendance, setAttendance] = useState(Array(200).fill(false));

  // Fetch areas and workers on component load
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/areas`);
        setAreas(response.data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    const fetchWorkers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/workers`);
        setWorkers(response.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchAreas();
    fetchWorkers();
  }, []);

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleWorkerSelect = (index) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index] = !updatedAttendance[index];
    setAttendance(updatedAttendance);
  };

  const submitAttendance = async () => {
    const presentWorkers = attendance
      .map((isSelected, index) => (isSelected ? workers[index]?._id : null))
      .filter((workerID) => workerID !== null);

    if (!selectedArea) {
      alert("Please select an area.");
      return;
    }

    if (presentWorkers.length === 0) {
      alert("No workers selected.");
      return;
    }

    // Format the current date and time
    const currentDate = new Date();
    const date = currentDate.toISOString().split("T")[0]; // 'YYYY-MM-DD' format
    const time = currentDate.toTimeString().slice(0, 5); // 'HH:mm' format

    // Construct the attendance data payload
    const attendanceData = presentWorkers.map((workerID) => ({
      WorkerID: workerID,
      Area: selectedArea,
      Date: date,
      Time: time,
      Status: "Present",
    }));

    console.log("Constructed attendance data:", attendanceData);

    try {
      // Loop over attendanceData if backend expects individual entries
      for (let record of attendanceData) {
        console.log("Submitting record:", record); // Debug log for each record
        const response = await axios.post(
          `${API_URL}/api/attendancelogs`,
          record
        );

        if (response.status === 201 || response.status === 200) {
          console.log("Record submitted successfully:", record);
        } else {
          console.error("Failed to submit record:", record);
          throw new Error("Failed to submit attendance");
        }
      }

      alert("All attendance records submitted successfully.");
      setAttendance(Array(200).fill(false)); // Reset the attendance selection
    } catch (error) {
      console.error(
        "Error submitting attendance:",
        error.response?.data || error
      );
      alert("Error submitting attendance. Please try again.");
    }
  };

  return (
    <div>
      <h2>Attendance</h2>

      <div>
        <label>Select Area:</label>
        <select value={selectedArea} onChange={handleAreaChange}>
          <option value="">Select Area</option>
          {areas.map((area) => (
            <option key={area._id} value={area._id}>
              {area.AreaName}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {workers.slice(0, 200).map((worker, index) => (
          <button
            key={worker._id}
            onClick={() => handleWorkerSelect(index)}
            style={{
              backgroundColor: attendance[index] ? "green" : "lightgrey",
              padding: "10px",
              cursor: "pointer",
              border: "1px solid #ccc",
            }}
          >
            {worker.WorkerID || index + 1}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={submitAttendance}>Submit Attendance</button>
      </div>
    </div>
  );
};

export default Attendance;
