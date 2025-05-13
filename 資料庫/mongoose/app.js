const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;

app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017/demo")
  .then(() => {
    console.log("connecting is successful...");
  })
  .catch((e) => {
    console.log(e);
  });

const studentSchema = new Schema({
  name: String,
  age: { type: Number, min: [0, "Age cannot be less than 0"] },
  major: String,
  scholarship: {
    merit: Number,
    other: Number,
  },
});

const Student = mongoose.model("Student", studentSchema);

Student.findOneAndUpdate(
  { name: "Mike" },
  { name: "Mike Chen" },
  { runValidators: true, new: false } //new預設為false
)
  .exec()
  .then((oldData) => {
    console.log(oldData);
  })
  .catch((e) => {
    console.log(e);
  });

// Student.updateOne({ name: "Esther Lam" }, { age: 27 }, { runValidators: true })
//   .exec()
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// let newStudent = new Student({
//   name: "Joan",
//   age: -12,
//   major: "Business Administration",
//   scholarship: {
//     merit: 5000,
//     other: 2000,
//   },
// });

// newStudent
//   .save()
//   .then((data) => {
//     console.log("success!");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// Student.updateOne({ name: "Esther Lam" }, { age: -5 })
//   .exec()
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// Student.updateOne({ name: "Esther" }, { name: "Esther Lam" })
//   .exec()
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// app.get("/", async (req, res) => {
//   try {
//     let data = await Student.findOne({ name: "Grace" }).exec();
//     res.send(data);
//   } catch (e) {
//     console.log(e);
//   }
// });

// Student.find({})
//   .exec()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

app.listen(3000, () => {
  console.log("server is listening port 3000");
});
