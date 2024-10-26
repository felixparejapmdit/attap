import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const AreaList = () => {
  const [areas, setAreas] = useState([]);
  const [newArea, setNewArea] = useState("");

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/areas`); // Update to your backend URL
      setAreas(response.data);
    } catch (error) {
      console.error("Error fetching areas:", error);
      alert("Failed to load areas. Please try again.");
    }
  };

  const addArea = async () => {
    if (newArea.trim() === "") {
      alert("Area name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/areas`, {
        AreaName: newArea,
      });
      setAreas([...areas, response.data]);
      setNewArea(""); // Clear input after adding
      alert("Area added successfully.");
    } catch (error) {
      console.error("Error adding area:", error);
      alert("Failed to add area. Please try again.");
    }
  };

  const deleteArea = async (areaId) => {
    try {
      await axios.delete(`${API_URL}/api/areas/${areaId}`);
      setAreas(areas.filter((area) => area._id !== areaId));
      alert("Area deleted successfully.");
    } catch (error) {
      console.error("Error deleting area:", error);
      alert("Failed to delete area. Please try again.");
    }
  };

  return (
    <div>
      <h2>Areas List</h2>
      <input
        type="text"
        value={newArea}
        onChange={(e) => setNewArea(e.target.value)}
        placeholder="New Area"
      />
      <button onClick={addArea}>Add Area</button>

      <ul>
        {areas.map((area) => (
          <li key={area._id}>
            {area.AreaName}
            <button onClick={() => deleteArea(area._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AreaList;
