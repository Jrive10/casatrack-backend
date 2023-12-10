// models/Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: Number,
  tasks: [
    {
      taskName: String,
      completed: Boolean,
    },
  ],
  timeline: {
    startDate: Date,
    endDate: Date,
  },
  materials: [
    {
      itemName: String,
      quantity: Number,
    },
  ],
  beforePhotos: [String],
  afterPhotos: [String],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
