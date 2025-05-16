const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override"); // 新增引入
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/demo")
  .then(() => {
    console.log("connecting is successful...");
  })
  .catch((e) => {
    console.log(e);
  });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const studentSchema = new Schema({
  name: String,
  age: Number,
});
const Student = mongoose.model("Student", studentSchema);

function myMiddleware(req, res, next) {
  console.log("In myMiddleware...");
  next(); // 呼叫 next()，讓流程繼續
}

app.get("/students", myMiddleware, async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    return res.render("students", { studentData }); // 變數名要一致
  } catch (e) {
    return res.status(500).send("error...");
  }
});

app.get("/students/new", (req, res) => {
  return res.render("nwe-student-form");
});

app.listen(3000, () => {
  console.log("server is listening port 3000");
});
