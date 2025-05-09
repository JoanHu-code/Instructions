# 目錄

- [Mongoose 介紹](#Mongoose-介紹)
- [Mongoose 套件下載](#Mongoose-套件下載)
- [Model and Schema](#Model-and-Schema)
- [Query Object 與 Promise 比較補充](#Query-Object-與-Promise-比較補充)
- [更新資料](#更新資料)
- [刪除資料](#刪除資料)
- [Schema Vaildation](#Schema-Vaildation)
- [Static method and instance method](#Static-method-and-instance-method)
- [Mongoose Middleware](#Mongoose-Middleware)

## Mongoose 介紹

> 若要在程式語言中使用或存取 MongoDB ，我們需要工具讓資料庫可以跟 JavaScript 程式碼連結。這類工具的特點就是，能夠將 JavaScript 中的 Object 轉換成 MongoDB 當中的 document，因此，這類的工具叫做 object-document mapping(ODM)。在市面上，眾多 MongoDB 的 ODM 當中，最熱門的叫做 mongoose。

使用 ODM 的好處在於:

1. 資料庫的結構能被追蹤。通常資料庫的結構經過改變之後，很難退回到未改變的結構。使用 ODM 可以將資料庫的結構寫在程式碼內部，方便追蹤與更改。

2. 通常 ORM/ODM 會內建保護機制或是保護型語法，所以使用 SQL 資料庫時，就不用擔心 SQL Injection 之類的攻擊。

3. 讓 Project 更符合 MVC 模型。Mongoose 是 model，用來與 MongoDB 互動獲得或改變資料、View 是 EJS，Controller 則是 app.js 擔任

**SQL 資料庫使用的工具叫做 ORM，而 NoSQL 資料庫使用的工具叫做 ODM。兩者功能相同但名稱不同。**

![Mongoose](../img/Mongoose/CN01.png)

## Mongoose 套件下載

> 創建資料夾後用 VS code 打開，下載 npm

```shell
npm init
```

> 全部留預設

![Mongoose](../img/Mongoose/02.png)

> 下載 express 和 ejs

```shell
npm install express ejs
```

![Mongoose](../img/Mongoose/03.png)

> 新建一個檔案(app.js)

```js
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("server is listening port 3000");
});
```

> 啟動伺服器

```shell
nodemon app.js
```

![Mongoose](../img/Mongoose/04.png)

> 下載 mongoose

```shell
npm install mongoose
```

[npm install mongoose](https://www.npmjs.com/package/mongoose)

![Mongoose](../img/Mongoose/05.png)

> package.json

```json
{
  "name": "mongoose",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "ejs": "^3.1.10",
    "express": "^5.1.0",
    "mongoose": "^8.14.1"
  }
}
```

[mongoose 官網](https://mongoosejs.com/)

> 連結 mongoose，修改 app.js

```js
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017/demo")
  .then(() => {
    console.log("connecting is successful...");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(3000, () => {
  console.log("server is listening port 3000");
});
```

![Mongoose](../img/Mongoose/07.png)
![Mongoose](../img/Mongoose/08.png)

> `mongoose.connect("mongodb://<IP>:<port>/yourDB")`

> 啟動伺服器

```shell
nodemon app.js
```

![Mongoose](../img/Mongoose/09.png)

## Model and Schema

> 在 Mongoose 中，兩個 keyword 需要記得:

1. Schema: 每個 Schema 映射到一個 MongoDB 中的 Collection，並且定義該 Collection 中的 document 的架構，包含默認值、最大長度、最大值、最小值等等。

2. Model: 包裝 Schema 的容器。在資料庫中，Schema 所對應到的 Collection 提供了一個接口，可以用 Model 來對 Collection 進行新增、查詢、更新、刪除紀錄等功能

**Model 就像是 SQL 當中的 table，而 Schema 是 create table 的步驟。**

> Schema 的語法為:

```js
import mongoose from "mongoose";
const { Schema } = mongoose;
const blogSchema = new Schema({
  title: String, //String is shorthand for {type: String},
  data: { type: Date, default: Date.now },
  meta: { votes: Number, favs: Number },
});
```

**範例:**

```js
const mongoose = require("mongoose");
const { Schema } = mongoose;
const studentSchema = new Schema({
  name: String,
  age: Number,
  major: String,
  scholarship: {
    merit: Number,
    other: Number,
  },
});
```

> 在 blogSchema 的 constructor 當中，參數為一個物件，而物件的每個 key 都定義了 blog collection 當中的 document 的屬性。並且賦予的 value 為一個屬性為 SchemaType 的物件。常見的 SchemaType 有: String,Number,Date,Boolean,ObjectId,Array,Decimal128,Map

[mongoose schematypes](https://mongoosejs.com/docs/schematypes.html)

> Model 語法為

```js
const Blog = mongoose.model("Blog", blogSchema);
```

特別注意，mongoose.nodel()的第一個參數是 String，為我們的 collection 名稱。這裡使用的 String 必須為大寫英文字母開頭，且為`單數形式`。例如，如果我們希望製作名為 students 的 collection，就必須使用`Student`，而如果要製作名為 people 的 collection，就必須使用`Person`。(Mongoose 會自動轉換，我們需要確保提供正確拚字即可)

**範例:**

```js
const Student = mongoose.model("Student", studentSchema);

const newObject = new Student({
  name: "Esther",
  age: 27,
  major: "Mathematics",
  scholarship: {
    merit: 6000,
    other: 7000,
  },
});
```

**CRUD in Mongoose**

> 常見在 Mongoose 中，跟 CRUD 有關的操作是:

- document.save(): 在 MongoDB 中儲存 document。return a promise。

```js
doc.save().then(saveDoc = >{savedDoc === dov;//true })
```

**範例**

```js
newObject
  .save()
  .then((saveObject) => {
    console.log("The data has been saved. The saved data is... ");
    console.log(saveObject);
  })
  .catch((e) => {
    console.log(e);
  });
```

![Mongoose](../img/Mongoose/10.png)
![Mongoose](../img/Mongoose/11.png)
![Mongoose](../img/Mongoose/12.png)

在 Mongoose 當中，許多 methods 的 return type 都是「Query」。Query 是一種 Mongoose 特有的 Class(根據 documentation，Query 是一種 thenable object，但不是 Promise)，提供用於 find、update 和 documents 等操作提供 method chaining。如果要讓這些 methods 的 return type 變成 promise，可以讓 Query 執行.exec()即可。
