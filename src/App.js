import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Attendance from "./components/Attendance";
import WorkerList from "./components/WorkerList";
import AreaList from "./components/AreaList";
import TaskList from "./components/TaskList";
import Summary from "./components/Summary";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Attendance App</h1>
          <nav>
            <ul>
              <li>
                <Link to="/attendance">Attendance</Link>
              </li>
              <li>
                <Link to="/workers">Workers List</Link>
              </li>
              <li>
                <Link to="/areas">Areas List</Link>
              </li>
              <li>
                <Link to="/summary">Summary</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          {/* Replace Switch with Routes */}
          <Routes>
            {/* Route definitions */}
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/workers" element={<WorkerList />} />
            <Route path="/areas" element={<AreaList />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/summary" element={<Summary />} />
            <Route
              path="/"
              element={
                <div>Welcome to the Attendance App! Select a tab to begin.</div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
