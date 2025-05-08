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

> 若要在程式語言中使用或存取 MongoDB ，我們需要工具讓資料庫可以跟JavaScript程式碼連結。這類工具的特點就是，能夠將JavaScript中的Object轉換成MongoDB當中的document，因此，這類的工具叫做object-document mapping(ODM)。在市面上，眾多MongoDB的ODM當中，最熱門的叫做mongoose。

使用ODM的好處在於:

1. 資料庫的結構能被追蹤。通常資料庫的結構經過改變之後，很難退回到未改變的結構。使用ODM可以將資料庫的結構寫在程式碼內部，方便追蹤與更改。

2. 通常ORM/ODM會內建保護機制或是保護型語法，所以使用SQL資料庫時，就不用擔心SQL Injection之類的攻擊。

3. 讓Project更符合MVC模型。Mongoose是model，用來與MongoDB互動獲得或改變資料、View是EJS，Controller則是app.js擔任

**SQL資料庫使用的工具叫做ORM，而NoSQL資料庫使用的工具叫做ODM。兩者功能相同但名稱不同。**

![Mongoose](../img/Mongoose/CN01.png)

## Mongoose 套件下載

> 創建資料夾後用VS code打開，下載npm

```shell
npm init
```
> 全部留預設

![Mongoose](../img/Mongoose/02.png)

> 下載 express和ejs

```shell
npm install express ejs
```
![Mongoose](../img/Mongoose/03.png)

> 新建一個檔案(app.js)

```js
const express = require("express");
const app = express();

app.set("view engine","ejs");

app.listen(3000, ()=>{
  console.log("server is listening port 3000")
})
```

> 啟動伺服器

```shell
nodemon app.js
```

![Mongoose](../img/Mongoose/04.png)

>  下載mongoose

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

> 連結mongoose，修改app.js

```js
const express = require("express");
const app = express();
const mongoose = require("mongoose")

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/demo").then(()=>{
  console.log("connecting is successful...");
}).catch((e)=>{
  console.log(e);
})

app.listen(3000, ()=>{
  console.log("server is listening port 3000");
})
```
![Mongoose](../img/Mongoose/07.png)
![Mongoose](../img/Mongoose/08.png)

> `mongoose.connect("mongodb://<IP>:<port>/yourDB")`

> 啟動伺服器

```shell
nodemon app.js
```

![Mongoose](../img/Mongoose/09.png)
