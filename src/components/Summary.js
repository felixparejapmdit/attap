import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Summary = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [workers, setWorkers] = useState([]);
  const [remarks, setRemarks] = useState({});

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/areas`);
      setAreas(response.data);
    } catch (error) {
      console.error("Error fetching areas:", error);
      alert("Failed to load areas. Please try again.");
    }
  };

  const fetchWorkersByArea = async (areaId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/areas/${areaId}/workers`
      );
      setWorkers(response.data);

      // Log the workers fetched for debugging
      console.log("Fetched workers for area:", response.data);

      // Initialize remarks for each worker if not already present
      const initialRemarks = {};
      response.data.forEach((worker) => {
        initialRemarks[worker._id] = worker.Remarks || ""; // Set existing remark or empty
      });
      setRemarks(initialRemarks);
    } catch (error) {
      console.error("Error fetching workers by area:", error);
      alert("Failed to load workers for the selected area. Please try again.");
    }
  };

  const handleAreaChange = (e) => {
    const areaId = e.target.value;
    setSelectedArea(areaId);
    if (areaId) {
      fetchWorkersByArea(areaId);
    } else {
      setWorkers([]);
      setRemarks({});
    }
  };

  const handleRemarkChange = (workerId, value) => {
    setRemarks((prevRemarks) => ({
      ...prevRemarks,
      [workerId]: value,
    }));
  };

  const saveAllRemarks = async () => {
    try {
      const saveRequests = Object.keys(remarks).map((workerId) =>
        axios.put(`${API_URL}/api/workers/${workerId}`, {
          Remarks: remarks[workerId],
        })
      );
      await Promise.all(saveRequests); // Wait for all save requests to complete
      alert("All remarks saved successfully.");
    } catch (error) {
      console.error("Error saving remarks:", error);
      alert("Failed to save remarks. Please try again.");
    }
  };

  return (
    <div>
      <h2>Summary by Area</h2>

      {/* Area selection dropdown */}
      <select value={selectedArea} onChange={handleAreaChange}>
        <option value="">Select an Area</option>
        {areas.map((area) => (
          <option key={area._id} value={area._id}>
            {area.AreaName}
          </option>
        ))}
      </select>

      {/* Workers summary table */}
      {workers.length > 0 ? (
        <div style={{ marginTop: "20px" }}>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th>Worker Name</th>
                <th>Trade</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <tr key={worker._id}>
                  <td>{worker.Name}</td>
                  <td>{worker.Trade}</td>
                  <td>
                    <input
                      type="text"
                      value={remarks[worker._id] || ""}
                      onChange={(e) =>
                        handleRemarkChange(worker._id, e.target.value)
                      }
                      placeholder="Enter remarks"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={saveAllRemarks} style={{ marginTop: "20px" }}>
            Save All Remarks
          </button>
        </div>
      ) : (
        selectedArea && <p>No workers assigned to this area.</p>
      )}
    </div>
  );
};

export default Summary;
