import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchAreas();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("/api/tasks");
    setTasks(response.data);
  };

  const fetchAreas = async () => {
    const response = await axios.get("/api/areas");
    setAreas(response.data);
  };

  const addTask = async () => {
    if (newTask.trim() === "" || selectedArea === "") return;

    const response = await axios.post("/api/tasks", {
      TaskDescription: newTask,
      AreaAssigned: selectedArea,
    });
    setTasks([...tasks, response.data]);
    setNewTask("");
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`/api/tasks/${taskId}`);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <div>
      <h2>Tasks List</h2>

      <select
        value={selectedArea}
        onChange={(e) => setSelectedArea(e.target.value)}
      >
        <option value="">Select Area</option>
        {areas.map((area) => (
          <option key={area._id} value={area._id}>
            {area.AreaName}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.TaskDescription} - {task.AreaAssigned.AreaName}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
