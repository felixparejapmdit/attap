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
  Card,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  workerCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    margin: "10px 0",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  actionButtons: {
    display: "flex",
    gap: "10px",
  },
  addButton: {
    marginBottom: "20px",
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  dialog: {
    "& .MuiDialog-paper": {
      width: "400px",
      padding: "20px",
    },
  },
  formField: {
    marginBottom: "15px",
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
      const response = await axios.get("http://localhost:5000/api/workers");
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
          `http://localhost:5000/api/workers/${currentWorker._id}`,
          currentWorker
        );
      } else {
        await axios.post("http://localhost:5000/api/workers", currentWorker);
      }
      fetchWorkers();
      handleClose();
    } catch (error) {
      console.error("Error saving worker:", error);
    }
  };

  const handleDelete = async (workerId) => {
    try {
      await axios.delete(`http://localhost:5000/api/workers/${workerId}`);
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

      <div>
        {workers.map((worker) => (
          <Card className={classes.workerCard} key={worker._id}>
            <CardContent>
              <Typography variant="h6">{worker.Name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {worker.Trade}
              </Typography>
            </CardContent>
            <div className={classes.actionButtons}>
              <IconButton color="primary" onClick={() => handleOpen(worker)}>
                <EditIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => handleDelete(worker._id)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Card>
        ))}
      </div>

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
