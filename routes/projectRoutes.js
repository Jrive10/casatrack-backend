// projectRoutes.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// PROJECT INDEX ROUTE
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PROJECT DETAIL ROUTE
router.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
    } else {
      res.json(project);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PROJECT CREATE ROUTE
router.post("/projects", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// PROJECT UPDATE ROUTE
router.put("/projects/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      res.status(404).json({ error: "Project not found" });
    } else {
      res.json(updatedProject);
    }
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// PROJECT DELETE ROUTE
router.delete("/projects/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndRemove(req.params.id);
    if (!deletedProject) {
      res.status(404).json({ error: "Project not found" });
    } else {
      res.json(deletedProject);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
