// server.js
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer"); 
const upload = multer({ dest: "uploads/" }); 

const app = express();
// const PORT = process.env.PORT || 3000;
const { PORT = 4000, DATABASE_URL } = process.env;


mongoose.connect("mongodb+srv://juliorivera1993:Jrivera16@cluster0.wvj7l28.mongodb.net/?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});



mongoose.connection
  .on("open", () => console.log("Connected to mongoose"))
  .on("close", () => console.log("Disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const ProjectSchema = new mongoose.Schema({
  projectName: String,
  description: String,
  startDate: Date,
  endDate: Date,
  status: String,
  budget: Number,
  imageUrl: String, 
});


const Project = mongoose.model("Project", ProjectSchema);

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(cors("*"));
app.use(morgan("dev"));
app.use(express.json());

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  
  next();
});

///////////////////////////////
// ROUTES
////////////////////////////////


app.get("/", (req, res) => {
  res.send("Welcome to CasaTrack");
});

// PROJECT INDEX ROUTE
app.get("/projects", async (req, res) => {
  try {
    res.json(await Project.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// PROJECT CREATE ROUTE
app.post("/projects", async (req, res) => {
  try {
    res.json(await Project.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// PROJECT UPDATE ROUTE
app.put("/projects/:id", async (req, res) => {
  try {
    res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch (error) {
    res.status(400).json(error);
  }
});

// PROJECT DELETE ROUTE
app.delete("/projects/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(deletedProject);
  } catch (error) {
    console.error("Error in DELETE route:", error);
    res.status(500).json({ message: "Error deleting project", error: error.message });
  }
});

// PROJECT IMAGE UPLOAD ROUTE
app.post("/projects/:id/upload", upload.single("image"), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Save the image URL in the project document
    project.imageUrl = req.file.path; // Assuming multer saves the file and provides its path

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(400).json(error);
  }
});


///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

