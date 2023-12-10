// userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Adjust the path based on your actual project structure

// GET user profile
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST create/update user profile
router.post("/users", async (req, res) => {
  try {
    const { username, bio } = req.body;
    // Assuming you have a User model with 'username' and 'bio' fields
    const user = await User.findOneAndUpdate(
      { _id: req.params.id }, // Use '_id' for default MongoDB _id field
      { username, bio },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// DELETE user profile
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
