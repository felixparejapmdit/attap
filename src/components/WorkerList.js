import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles({
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  tableContainer: {
    marginTop: "20px",
    marginBottom: "20px",
    width: "100%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  addButton: {
    marginBottom: "20px",
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  formField: {
    marginBottom: "15px",
  },
  tableHeader: {
    backgroundColor: "#3f51b5",
    color: "white",
  },
});

const WorkerList = () => {
  const classes = useStyles();
  const [workers, setWorkers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentWorker, setCurrentWorker] = useState({
    WorkerID: "",
    Name: "",
    Trade: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/workers`);
      setWorkers(response.data);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const handleOpen = (worker = { WorkerID: "", Name: "", Trade: "" }) => {
    setCurrentWorker(worker);
    setIsEditMode(!!worker._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentWorker({ WorkerID: "", Name: "", Trade: "" });
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentWorker({ ...currentWorker, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await axios.put(
          `${API_URL}/api/workers/${currentWorker._id}`,
          currentWorker
        );
      } else {
        await axios.post(`${API_URL}/api/workers`, currentWorker);
      }
      fetchWorkers();
      handleClose();
    } catch (error) {
      console.error("Error saving worker:", error);
    }
  };

  const handleDelete = async (workerId) => {
    try {
      await axios.delete(`${API_URL}/api/workers/${workerId}`);
      fetchWorkers();
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.title}>Workers</Typography>
      <Button
        className={classes.addButton}
        startIcon={<AddIcon />}
        onClick={() => handleOpen()}
      >
        Add Worker
      </Button>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell style={{ color: "white" }}>Worker ID</TableCell>
              <TableCell style={{ color: "white" }}>Name</TableCell>
              <TableCell style={{ color: "white" }}>Designation</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers.map((worker) => (
              <TableRow key={worker._id}>
                <TableCell>{worker.WorkerID}</TableCell>
                <TableCell>{worker.Name}</TableCell>
                <TableCell>{worker.Trade}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(worker)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(worker._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} className={classes.dialog}>
        <DialogTitle>{isEditMode ? "Edit Worker" : "Add Worker"}</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.formField}
            autoFocus
            margin="dense"
            name="WorkerID"
            label="Worker ID"
            type="number"
            fullWidth
            value={currentWorker.WorkerID}
            onChange={handleChange}
          />
          <TextField
            className={classes.formField}
            margin="dense"
            name="Name"
            label="Name"
            type="text"
            fullWidth
            value={currentWorker.Name}
            onChange={handleChange}
          />
          <TextField
            className={classes.formField}
            margin="dense"
            name="Trade"
            label="Trade"
            type="text"
            fullWidth
            value={currentWorker.Trade}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkerList;
