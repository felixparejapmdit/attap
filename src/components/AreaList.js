import React, { useState, useEffect } from "react";
import axios from "axios";

const AreaList = () => {
  const [areas, setAreas] = useState([]);
  const [newArea, setNewArea] = useState("");

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    const response = await axios.get("/api/areas");
    setAreas(response.data);
  };

  const addArea = async () => {
    if (newArea.trim() === "") return;

    const response = await axios.post("/api/areas", { AreaName: newArea });
    setAreas([...areas, response.data]);
    setNewArea(""); // Clear input after adding
  };

  const deleteArea = async (areaId) => {
    await axios.delete(`/api/areas/${areaId}`);
    setAreas(areas.filter((area) => area._id !== areaId));
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
