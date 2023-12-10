// uploadRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Set up storage for multer (customize as needed)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST upload image
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    // Assuming you have an Image model with a 'url' field
    // Save the image to your database or storage service
    // Return the URL of the uploaded image
    const imageUrl = URL;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
