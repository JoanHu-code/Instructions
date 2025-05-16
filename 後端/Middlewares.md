# 目錄

- [Express Middlewares](#Express-Middlewares)
- [Express Router](#Express-Router)

## Express Middlewares

> Express 中的 Middleware(中介軟體)除了可以放在所有的 routes 之前，也可以放在 route 內部的 path 以及 callbackFn 之間。語法是:

```js
app.METHOD(path, middlewareFn, callbackFn);
```

```js
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
  return res.render("new-student-form");
});

app.listen(3000, () => {
  console.log("server is listening port 3000");
});
```

> students.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Students' home</title>
  </head>
  <body>
    <h1>Students' home</h1>
    <ul>
      <% studentData.forEach(student => { %>
      <li><a href="/students/<%= student._id %>"><%= student.name %></a></li>
      <% }) %>
    </ul>
    <a href="/students/new">Create a new student</a>
  </body>
</html>
```

![Middlewares](../img/Middlewares/01.png)
![Middlewares](../img/Middlewares/02.png)

> 使用時機，若某些route需要使用者登入後才准看，那就可以用這個來設定

> 也可以寫成箭頭涵式的形式

```js
app.get("/students",
 (req, res, next) => {
  console.log("In myMiddleware...");
  next(); // 呼叫 next()，讓流程繼續
}, async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    return res.render("students", { studentData }); // 變數名要一致
  } catch (e) {
    return res.status(500).send("error...");
  }
});
```

> 若有兩個middleware執行該怎麼辦呢?要使用array的寫法

```js
app.get("/students",
[ 
  (req, res, next) => {
  console.log("In myMiddleware...");
  next(); // 呼叫 next()，讓流程繼續
  },
  (req, res, next) => {
  console.log("In myMiddleware2...");
  next(); // 呼叫 next()，讓流程繼續
  },
], async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    return res.render("students", { studentData }); // 變數名要一致
  } catch (e) {
    return res.status(500).send("error...");
  }
});
```
![Middlewares](../img/Middlewares/03.png)


之前的課程有提過，Middelware 中的 callbackFn 內可以有三個參數，分別為 req，res 以及 next。若我們希望用 middleware 來處理錯誤，則可以改用包含四個參數的 callbackFn。四個參數分別為: err,req,res,next(順序不能換)。

在 try catch block 內部，我們可以把 catch()到的錯誤，用 next()往 middleware 的方向傳送。此時，我在 express 的 app.use() 所使用的 callbackFn 則需要四個參數:err,req,res 以及 next。

```js
app.get("/students/:id",async(req,res)=>{
  let{_id}=req.params;
  try{
    //let foundStudent = await Student.findOne({_id}).exec();
    let foundStudent = await Student.findById({_id}).exec();
    if(foundStudent!=null){
      return res.render("student-page",{foundStudent});
    }else{
      return res.status(400).render("student-not-found");
    }
  }catch(e){
    return res.status(400.render("student-not-found"))
  }
})
```

![Middlewares](../img/Middlewares/04.png)
