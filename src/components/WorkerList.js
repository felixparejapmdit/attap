import React, { useState, useEffect } from "react";
import axios from "axios";

const WorkerList = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axios.get("/api/workers").then((response) => {
      setWorkers(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Workers List</h2>
      <ul>
        {workers.map((worker) => (
          <li key={worker._id}>
            {worker.Name} - {worker.Trade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerList;
