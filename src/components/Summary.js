import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    const response = await axios.get("/api/areas");
    setAreas(response.data);
  };

  const fetchWorkersByArea = async (areaId) => {
    const response = await axios.get(`/api/areas/${areaId}/workers`);
    setWorkers(response.data);
  };

  const handleAreaChange = (e) => {
    const areaId = e.target.value;
    setSelectedArea(areaId);
    fetchWorkersByArea(areaId);
  };

  return (
    <div>
      <h2>Summary by Area</h2>
      <select value={selectedArea} onChange={handleAreaChange}>
        <option value="">Select an Area</option>
        {areas.map((area) => (
          <option key={area._id} value={area._id}>
            {area.AreaName}
          </option>
        ))}
      </select>

      {workers.length > 0 && (
        <table>
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
                <td>{worker.Remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Summary;
