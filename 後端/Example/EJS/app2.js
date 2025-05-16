const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
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
  scholarship: {    // 你有用到 scholarship，要加這欄位
    merit: Number,
    other: Number,
  }
});
const Student = mongoose.model("Student", studentSchema);

// 修改學生資料表單頁面 (注意路由前面要有 /)
app.get("/students/:_id/edit", async (req, res, next) => {
  let { _id } = req.params;
  try {
    let foundStudent = await Student.findOne({ _id }).exec();
    if (foundStudent != null) {
      return res.render("edit-student", { foundStudent }); // 拼錯，原本是 "esit-student"
    } else {
      return res.status(400).render("student-not-found");
    }
  } catch (e) {
    next(e);
  }
});

// 新增學生 (POST)
app.post("/students", async (req, res) => {
  try {
    let { name, age, merit, other } = req.body;
    let newStudent = new Student({
      name,
      age,
      scholarship: {
        merit: Number(merit), // 資料型態轉換，避免存字串
        other: Number(other),
      },
    });
    let savedStudent = await newStudent.save();
    return res.render("student-save-success", { savedStudent });
  } catch (e) {
    return res.status(400).render("student-save-fail");
  }
});

// 修改學生資料 (PUT)
app.put("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, age, merit, other } = req.body;
    let newData = await Student.findOneAndUpdate(
      { _id },
      {
        name,
        age,
        scholarship: {
          merit: Number(merit),
          other: Number(other),
        },
      },
      {
        new: true,
        runValidators: true,
        overwrite: true,
      }
    );
    return res.render("student-update-success", { newData });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

// 刪除學生資料 (DELETE)
// 路由修正: 要跟其他路由保持一致 /students 而非 /student
app.delete("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deleteResult = await Student.deleteOne({ _id });
    return res.send(deleteResult);
  } catch (e) {
    console.log(e);
    return res.status(500).send("could not delete.");
  }
});

// 取得所有學生資料
app.get("/students", async (req, res, next) => {
  try {
    let studentData = await Student.find({}).exec();
    return res.render("students", { studentData });
  } catch (e) {
    next(e);
  }
});

// 依ID取得單一學生資料
app.get("/students/:id", async (req, res,next) => {
  let { id } = req.params;
  try {
    let foundStudent = await Student.findById(id).exec();
    if (foundStudent != null) {
      return res.render("student-page", { foundStudent });
    } else {
      return res.status(400).render("student-not-found");
    }
  } catch (e) {
    next(e);
    // return res.status(400).render("student-not-found");
  }
});

// 新增學生表單頁面
app.get("/students/new", (req, res) => {
  return res.render("new-student-form");
});

// 錯誤處理 middleware
app.use((err, req, res, next) => {
  console.error("Error middleware");
  return res.status(400).render("error");
});

app.listen(3000, () => {
  console.log("server is listening port 3000");
});
