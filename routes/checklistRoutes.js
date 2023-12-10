// checklistRoutes.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET checklist for a project
router.get("/projects/:id/checklist", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project.checklist);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST add item to checklist
router.post("/projects/:id/checklist", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    project.checklist.push({ name: req.body.name, checked: false });
    await project.save();
    res.json(project.checklist);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// PUT update item in checklist
router.put("/projects/:projectId/checklist/:itemId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    const item = project.checklist.id(req.params.itemId);
    item.checked = req.body.checked;
    await project.save();
    res.json(project.checklist);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// DELETE remove item from checklist
router.delete("/projects/:projectId/checklist/:itemId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    project.checklist.id(req.params.itemId).remove();
    await project.save();
    res.json(project.checklist);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
