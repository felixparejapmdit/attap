import React, { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [attendance, setAttendance] = useState(Array(200).fill(false)); // Array of 200 workers' attendance, default to false (not selected)

  // Fetch areas on component load
  useEffect(() => {
    axios.get("/api/areas").then((response) => {
      setAreas(response.data);
    });
  }, []);

  // Handle area selection
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  // Handle worker selection (tap to select, double-tap to deselect)
  const handleWorkerSelect = (index) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index] = !updatedAttendance[index]; // Toggle attendance
    setAttendance(updatedAttendance);
  };

  // Handle form submission for attendance logging
  const submitAttendance = () => {
    const presentWorkers = attendance
      .map((isSelected, index) => (isSelected ? index + 1 : null))
      .filter((workerID) => workerID !== null); // Get the IDs of selected workers (present)

    if (!selectedArea) {
      alert("Please select an area.");
      return;
    }

    if (presentWorkers.length === 0) {
      alert("No workers selected.");
      return;
    }

    // Submit attendance to the backend
    axios
      .post("/api/attendanceLogs", {
        area: selectedArea,
        workers: presentWorkers,
      })
      .then((response) => {
        alert("Attendance submitted successfully.");
        setAttendance(Array(200).fill(false)); // Reset attendance
      })
      .catch((error) => {
        console.error("Error submitting attendance:", error);
      });
  };

  return (
    <div>
      <h2>Attendance</h2>

      {/* Dropdown for selecting area */}
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

      {/* Worker number buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {Array.from({ length: 200 }, (_, index) => (
          <button
            key={index}
            onClick={() => handleWorkerSelect(index)}
            style={{
              backgroundColor: attendance[index] ? "green" : "lightgrey",
              padding: "10px",
              cursor: "pointer",
              border: "1px solid #ccc",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Submit button */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={submitAttendance}>Submit Attendance</button>
      </div>
    </div>
  );
};

export default Attendance;
