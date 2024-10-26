import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

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
    try {
      const response = await axios.get(`${API_URL}/api/tasks`); // Update with backend URL
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to load tasks. Please try again.");
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/areas`); // Update with backend URL
      setAreas(response.data);
    } catch (error) {
      console.error("Error fetching areas:", error);
      alert("Failed to load areas. Please try again.");
    }
  };

  const addTask = async () => {
    if (newTask.trim() === "" || selectedArea === "") {
      alert("Please enter a task and select an area.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/tasks`, {
        TaskDescription: newTask,
        AreaAssigned: selectedArea,
      });
      setTasks([...tasks, response.data]);
      setNewTask("");
      alert("Task added successfully.");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert("Task deleted successfully.");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <div>
      <h2>Tasks List</h2>

      {/* Area selection dropdown */}
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

      {/* New task input */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>

      {/* Task list */}
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
