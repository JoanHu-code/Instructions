# 目錄

- [MongoDB 介紹與安裝](#MongoDB-介紹與安裝)
- [資料庫增刪查改](#資料庫增刪查改)
  - [Database collection document](#Database-collection-document)
  - [Database 的基本操作](#Database-的基本操作)
  - [什麼是 JSON](#什麼是-JSON)
  - [在 collection 裡面 insert 資料](#在-collection-裡面-insert-資料)
  - [JSON 和 BSON](#JSON-和-BSON)
  - [插入和刪除](#插入和刪除)
- [結構和資料類型](#結構和資料類型)
- [NOSQL 中的關係](#NOSQL-中的關係)
- [深入了解增刪查改](#深入了解增刪查改)
- [使用 index 索引](#使用-index-索引)
- [地理空間資料處理](#地理空間資料處理)
- [聚合操作](#聚合操作)
- [資料庫管理](#資料庫管理)
- [圖形化管理工具](#圖形化管理工具)
- [主從複製](#主從複製)
- [sharding 分片技術](#sharding-分片技術)

# MongoDB 介紹與安裝

What is MongoDB?

- Scable, High-performance, Open source, Document-orientated database.
  - Build for Speed
  - Rich Document based queries
  - Full index support
  - Map/reduce for aggregation
  - Replication and Failover
  - Auto Sharding

Why use MongoDB?

- SQL was invented in the 70's to store data.
- MongoDB stored documents (or) objects.
- Now-a-days, everyone workd with objects (Python/Ruby/Java...etc.)
- And we need Databases to persist our objects. Then why not store objects directly?
- Embedded documents and arrays reduce need for joins. No joins and No-multi document transactions.

- 安裝 MongoDB

[官方網址](https://www.mongodb.com/try/download/community)

![安裝 MongoDB Community Serve](../img/mongoDB/01.png)

> 不安裝 Compass

[shell 下載網址](https://www.mongodb.com/try/download/shell)

下載完後丟進`C:\Program Files`

> 設置環境變數

複製網址到環境變數裡

```shell
C:\Program Files\mongosh-2.5.0-win32-x64\bin
```

![設置環境變數](../img/mongoDB/02.png)
![設置環境變數](../img/mongoDB/03.png)
![設置環境變數](../img/mongoDB/04.png)
![設置環境變數](../img/mongoDB/06.png)

> 打開命令提示字元，看是否安裝成功

```shell
mongosh --help
```

> 若沒有東西要手動啟動 mogoDB server

用管理員身分打開 cmd

![設置環境變數](../img/mongoDB/07.png)

```shell
net start MongoDB
```

![設置環境變數](../img/mongoDB/08.png)

```shell
mongosh
```

> 離開可按 `CTRL-D` 或打

```shell
exit()
```

# 資料庫增刪查改

(CRUD): create/read/update/delete

## Database collection document

![增刪查改](../img/mongoDB/09.png)

對應 mySQL 例子:

Database: database
Collection: table
Document: row of table

## Database 的基本操作

- 清除指令

```shell
cls
```

- 幫助指令

```shell
help
```

![幫助指令](../img/mongoDB/10.png)

- 退出指令

```shell
exit
```

- 進入指令

```shell
mongosh
```

![進入指令](../img/mongoDB/11.png)

- 查看目前資料庫有幾個

```shell
show dbs
```

![基本操作](../img/mongoDB/12.png)

- 創建資料庫(直接使用資料庫)

```shell
use <database-name>
```

![基本操作](../img/mongoDB/13.png)

> 因為 demo 這個 database 裡面還沒有 collection，所以不會出現在`show dbs`裡面

- 查看所有 db 操作

```shell
db.help
```

![基本操作](../img/mongoDB/16.png)

- 創建 collection

```shell
db.createCollection('<collection-name>')
```

![基本操作](../img/mongoDB/14.png)

> 按 tab 鍵可以提示有哪些命令可以輸入

![基本操作](../img/mongoDB/15.png)

> 輸入可以不用打全，例如打 Co 按下 tab 鍵就會自動帶入

- 查詢目前所在的資料庫

```shell
db.getName()
```

![基本操作](../img/mongoDB/17.png)

- 查詢目前所在的資料庫有哪些 collections

```shell
db.getCollectionNames()
```

![基本操作](../img/mongoDB/18.png)

- 刪除資料庫

> 先要到此資料庫後再使用下面指令

```shell
db.dropDatabase()
```

![基本操作](../img/mongoDB/19.png)

## 什麼是 JSON

JSON(JavaScript Object Notation):有兩種結構

1. Object(物件): 包含一系列無順序的 key-value pair。

```js
{
    "name":"Joan",
    "age":"26"
}
```

2. Array(陣列): 多個 value 放入中括弧`[]`裡面，並且用逗號分割

```js
["test1", "test2"];
```

> json 就是陣列包物件，把多個 object 放入`[]`裡面

- json 格式和 js 格式的不同在於
  - 若在 js 裡面寫陣列包物件，key 若是英文那可以不加引號(`""`)， 但 json 不管英文或中文，它的 key 值都需要加引號
  - 最後一個 key-value pair 在 json 裡不可加逗號，但在 js 裡面可以

```json
[
  {
    "name": "Joan",
    "age": "26",
  },
  {
    "name": "John",
    "age": "31",
  }
];
```

## 在 collection 裡面 insert 資料

> 實際上 collection 和 database 一樣不需要去創建，可以直接使用

```shell
db.<collection-name>.insertOne(<Object>)
```

```shell
db.employee.insertOne(
    {
        "first_name":"Robin",
        "last_name":"Jackman",
        "title":"Software Engineer",
        "Salary":3000,
        "Intership":true
    }
)
```

![基本操作](../img/mongoDB/20.png)

- 查詢插入資料

```shell
db.employee.find()
```

![基本操作](../img/mongoDB/21.png)

## JSON 和 BSON

> `_id: ObjectId('6813218e25986ff956b5f899'),`此格式並不符合 json， 格式是屬於 BSON 格式

BSON 就是二進制的 JSON，為什麼要用 BSON? 因為它可以提高效率

> ID 可以指定，但絕不能重複

```shell
db.employee.insertOne(
    {
        "_id": 1,
        "first_name": 'Joan',
        "last_name": 'Hu',
        "title": 'Teacher',
        'salary': 1500,
        'Intership': false
    }
 )
```

![基本操作](../img/mongoDB/22.png)

```shell
db.employee.insertOne(
    {
        "_id": 1,
        "first_name": 'error',
        "last_name": 'duplicate_id',
        "title": 'Teacher',
        'salary': 1500,
        'Intership': false
    }
 )
```

![基本操作](../img/mongoDB/23.png)

## 插入和刪除

- 插入
  - insertOne(document,options)
  - insertMany(document,options)
- 刪除

  - deleteOne(filiter,options)
  - deleteMany(filiter,options)

**插入**

- 插入一個數據`insertOne`:

```shell
db.employee.insertOne(
    {
        "first_name":"Taylor",
        "last_name":"Edward",
        "title":"Software Engineer",
        "Salary":7500,
        "Intership":false
    }
)
```

![插入和刪除](../img/mongoDB/28.png)

- 插入多個數據`insertMany`:

```shell
db.employee.insertMany([

    {
        "first_name":"Taylor",
        "last_name":"Edward",
        "title":"Software Engineer",
        "Salary":7500,
        "Intership":false
    },
    {
        "first_name":"Robin",
        "last_name":"Jackman",
        "title":"Software Engineer",
        "Salary":3000,
        "Intership":true
    }
])
```

![插入和刪除](../img/mongoDB/29.png)

**刪除**

- 刪除一個數據`deleteOne`:

```shell
db.<collection-name>.deleteOne({"_id": <num>})
```

```shell
db.employee.deleteOne({"_id":1})
```

![插入和刪除](../img/mongoDB/24.png)

> 若 filter 有兩個結果，但我使用`deleteOne`時會優先刪除第一個匹被盜的數據

```shell
db.employee.deleteOne({"a":1})
```

![插入和刪除](../img/mongoDB/25.png)

- 刪除多個數據`deleteMany`:

```shell
db.<collection-name>.deleteMany({"_id": <num>})
```

```shell
db.employee.deleteMany({"a":1})
```

![插入和刪除](../img/mongoDB/26.png)

[官方網站講解](https://www.mongodb.com/docs/manual/reference/operator/query/)

> 若想刪除薪水大於 2000

```shell
db.employee.deleteMany({"Salary":{"$gt":2000}})
```

![插入和刪除](../img/mongoDB/27.png)
