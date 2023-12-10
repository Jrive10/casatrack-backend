// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
// const PORT = process.env.PORT || 3000;
const { PORT = 3000, DATABASE_URL } = process.env;


// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// MongoDB connection setup
// mongoose.connect(process.env.DATABASE_URL, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });
mongoose.connect("mongodb://localhost:27017/casatrack", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});


mongoose.connection
  .on("open", () => console.log("Connected to mongoose"))
  .on("close", () => console.log("Disconnected from mongoose"))
  .on("error", (error) => console.log(error));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to CasaTrack - Your Home Improvement Planner!");
});

// Import and use project routes
const projectRoutes = require("./routes/projectRoutes");
app.use(projectRoutes);

// Import and use other routes
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const checklistRoutes = require("./routes/checklistRoutes");

app.use(userRoutes);
app.use(uploadRoutes);
app.use(checklistRoutes);

// Listener
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
