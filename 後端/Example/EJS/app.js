const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const studentRoutes = require("./routes/student-routes");
const facultyRoutes = require("./routes/faculty-routes");

mongoose
  .connect("mongodb://localhost:27017/exampleDB")
  .then(() => {
    console.log("Successfully connected to MongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/students", studentRoutes);
app.use("/faculty", facultyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log("Using this middleware...");
  return res.status(400).render("error");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
