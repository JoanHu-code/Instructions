# 目錄

- [MongoDB 介紹與安裝](#MongoDB-介紹與安裝)
- [資料庫增刪查改](#資料庫增刪查改)
  - [Database collection document](#Database-collection-document)
  - [Database 的基本操作](#Database-的基本操作)
  - [什麼是 JSON](#什麼是-JSON)
  - [在 collection 裡面 insert 資料](#在-collection-裡面-insert-資料)
  - [JSON 和 BSON](#JSON-和-BSON)
  - [插入和刪除](#插入和刪除)
  - [查找和更新](#查找和更新)
  - [find 方法和 cursor 物件](#find-方法和-cursor-物件)
  - [projection](#projection)
  - [Document 嵌套](#Document-嵌套)
  - [Document limitation](#Document-limitation)
- [結構和資料類型](#結構和資料類型)
  - [Collection 有 Schema 嗎](Collection-有-Schema-嗎)
  - [資料類型](#資料類型)
  - [關於時間資料類型](#關於時間資料類型)
  - [關於數字資料類型](#關於數字資料類型)
- [NOSQL 中的關係](#NOSQL-中的關係)
  - [什麼是關係](#什麼是關係)
  - [一對一關係](#一對一關係)
  - [一對多關係](#一對多關係)
  - [多對多關係](#多對多關係)
  - [一對多關係 Aggregation](#一對多關係-Aggregation)
- [深入了解增刪查改](#深入了解增刪查改)
  - [insert-方法](#insert-方法)
  - [insertMany 是否按順序插入對結果的影響](#insert-是否按順序插入對結果的影響)
  - [如何透過 JSON 文件導入資料](#如何透過-JSON-文件導入資料)
  - [method filter operator](#method-filter-operator)
  - [比較操作符](#比較操作符)
  - [邏輯操作符](#邏輯操作符)
  - [邏輯和比較操作符練習](#邏輯和比較操作符練習)
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

## 查找和更新

- 查找
  - findOne(fliter,options)
  - find(filter,option)
- 更新

  - updateOne(fliter,update,options)
  - updateMany(fliter,update,options)

- 所使用的 json

```json
[
  {
    "first_name": "Robin",
    "last_name": "Jackman",
    "title": "Software Engineer",
    "salary": 5500,
    "hire_date": "2001-10-12"
  },
  {
    "first_name": "Taylor",
    "last_name": "Edward",
    "title": "Software Architect",
    "salary": 7200,
    "hire_date": "2002-09-21"
  },
  {
    "first_name": "Vivian",
    "last_name": "Dickens",
    "title": "Database Administrator",
    "salary": 6000,
    "hire_date": "2012-08-29"
  },
  {
    "first_name": "Harry",
    "last_name": "Clifford",
    "title": "Database Administrator",
    "salary": 6800,
    "hire_date": "2015-12-10"
  },
  {
    "first_name": "Eliza",
    "last_name": "Clifford",
    "title": "Software Engineer",
    "salary": 4750,
    "hire_date": "1998-10-19"
  },
  {
    "first_name": "Nancy",
    "last_name": "Newman",
    "title": "Software Engineer",
    "salary": 5100,
    "hire_date": "2007-01-23"
  },
  {
    "first_name": "Melinda",
    "last_name": "Clifford",
    "title": "Project Manager",
    "salary": 8500,
    "hire_date": "2013-10-29"
  },
  {
    "first_name": "Jack",
    "last_name": "Chan",
    "title": "Test Engineer",
    "salary": 6500,
    "hire_date": "2018-09-07"
  },
  {
    "first_name": "Harley",
    "last_name": "Gilbert",
    "title": "Software Architect",
    "salary": 8000,
    "hire_date": "2000-07-17"
  }
]
```

**查找**

```shell
db.employee.find({'title':"Software Architect"})
```

![查找和更新](../img/mongoDB/30.png)

> 可以把引號去掉

```shell
db.employee.find({salary :{$gt:6000}})
```

![查找和更新](../img/mongoDB/31.png)

> `findOne` 只返回第一個符合的資料

```shell
db.employee.findOne({salary :{$gt:6000}})
```

![查找和更新](../img/mongoDB/32.png)

**更新**

> `updateOne`

```shell
db.<collection-name>.updateOne({<filter>},{$set:{<edit>}}}
```

```shell
db.employee.updateOne({_id: ObjectId('6813786025986ff956b5f8ae')},{$set:{"salary":7300}})
```

![查找和更新](../img/mongoDB/33.png)

> `updateMany`

```shell
db.<collection-name>.updateMany({<filter>},{$set:{<edit>}}}
```

```shell
db.employee.updateMany({title:"Software Architect"},{$set:{"salary":8000}})
```

![查找和更新](../img/mongoDB/34.png)

> 直接覆蓋可用`replaceOne`

```shell
db.<collection-name>.replaceOne({<filter>},{$set:{<edit>}}}
```

```shell
db.employee.replaceOne({_id: ObjectId('6813786025986ff956b5f8ad')},{
    "first_name": "Joan",
    "last_name": "Hu",
    "title": "Teacher",
    "salary": 1500,
    "hire_date": "2012-11-10"
  })
```

![查找和更新](../img/mongoDB/35.png)

## find 方法和 cursor 物件

> 使用資料

```json
[
  { "name": "Linda Rodgers" },
  { "name": "Oscar Jensen" },
  { "name": "Dawn Dingle" },
  { "name": "Joline Thomas" },
  { "name": "Mary Bennett" },
  { "name": "Steven Partee" },
  { "name": "Vickie Lyle" },
  { "name": "Richard Hartman" },
  { "name": "David Baldwin" },
  { "name": "Elizabeth Oneal" },
  { "name": "Sharon Hanson" },
  { "name": "Caleb Kirkpatrick" },
  { "name": "Bruce Spruill" },
  { "name": "Ralph Smith" },
  { "name": "Monica Baxter" },
  { "name": "Faith Williams" },
  { "name": "Helen Tucker" },
  { "name": "Vernell Mcmorran" },
  { "name": "Eric Smith" },
  { "name": "Floyed Gallup" },
  { "name": "John Doe" },
  { "name": "Jane Smith" },
  { "name": "Michael Johnson" },
  { "name": "Patricia Williams" },
  { "name": "Robert Brown" },
  { "name": "Jennifer Davis" },
  { "name": "Linda Miller" },
  { "name": "Michael Wilson" },
  { "name": "Sarah Moore" }
]
```

![find 方法和 cursor 物件](../img/mongoDB/35.png)
![find 方法和 cursor 物件](../img/mongoDB/36.png)
![find 方法和 cursor 物件](../img/mongoDB/37.png)
![find 方法和 cursor 物件](../img/mongoDB/38.png)
![find 方法和 cursor 物件](../img/mongoDB/39.png)

[官方網站](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/)

> 打`it`可察看更多資訊，這裡的`it`全名是`iterate`
> iterate:透過 for 迴圈迭代的物件

> `db.collection.find()`:默認只返回前二十個，透過`it`可以再取得二十個

- 對 javascript 來講，可以轉換成 array

```shell
db.name.find().toArray()
```

> 這樣不用輸入`it`可直接返回所有資料

![find 方法和 cursor 物件](../img/mongoDB/40.png)

[MongoDB Drivers](https://www.mongodb.com/docs/drivers/)

## projection

> 原始資料

```json
{
  "first_name": "Robin",
  "last_name": "Jackman",
  "title": "Software Ebgineer",
  "salary": 5500,
  "hire_date": "2001-10-12"
}
```

> 需要的資料

```json
{
  "first_name": "Robin",
  "last_name": "Jackman",
  "salary": 5500
}
```

> 若把所有資料都傳給前端，讓前端處理會造成浪費存處和傳輸頻寬，所以在資料庫返回時就該處理好資料再進行返回

```shell
db.collections.find(filter,condition)
```

```shell
db.employee.find({},{first_name:1,last_name:1,salary:1,_id:0})
```

![projection](../img/mongoDB/41.png)

## Document 嵌套

> 使用資料

```json
[
  {
    "first_name": "Robin",
    "last_name": "Jackman",
    "title": "Software Engineer",
    "salary": 5500,
    "hire_date": "2001-10-12",
    "hobby": ["book", "movie"],
    "contact": {
      "email": "rj@jackman.com",
      "phone": 1111
    }
  },
  {
    "first_name": "Taylor",
    "last_name": "Edward",
    "title": "Software Architect",
    "salary": 7200,
    "hire_date": "2002-09-21",
    "hobby": ["travel", "hiking"],
    "contact": {
      "email": "te@edward.com",
      "phone": 2222
    }
  },
  {
    "first_name": "Vivian",
    "last_name": "Dickens",
    "title": "Database Administrator",
    "salary": 6000,
    "hire_date": "2012-08-29",
    "hobby": ["travel", "music"],
    "contact": {
      "email": "vd@dickens.com",
      "phone": 3333
    }
  },
  {
    "first_name": "Harry",
    "last_name": "Clifford",
    "title": "Database Administrator",
    "salary": 6800,
    "hire_date": "2015-12-10",
    "hobby": ["book", "gym"],
    "contact": {
      "email": "hc@clifford.com",
      "phone": 4444
    }
  }
]
```

![Document 嵌套](../img/mongoDB/41.png)
![Document 嵌套](../img/mongoDB/42.png)
![Document 嵌套](../img/mongoDB/43.png)

> 顯示第一條紀錄

```shell
db.employee.findOne()
```

![Document 嵌套](../img/mongoDB/44.png)

> 找尋物件單筆資料

```shell
db.employee.findOne({"contact.phone":1111})
```

![Document 嵌套](../img/mongoDB/45.png)

> 當有嵌套時，`key`的引號不能省略不然會報錯

❌

```shell
db.employee.findOne({contact.phone:1111})
```

![Document 嵌套](../img/mongoDB/46.png)

**找尋陣列資料**

> 找尋 hobby 有 book 的資料

```shell
db.employee.find({"hobby":"book"})
```

![Document 嵌套](../img/mongoDB/47.png)

> 找尋有 book 和 movie

```shell
db.employee.find({"hobby":["book","movie"]})
```

![Document 嵌套](../img/mongoDB/48.png)

> 找尋 hobby 有 book 或 movie 的資料

[include 官網](https://www.mongodb.com/docs/manual/reference/operator/query/in/)

```shell
db.employee.find({ "hobby": { $in: ["book", "movie"] } })
```

![Document 嵌套](../img/mongoDB/49.png)

```shell
db.employee.find({ "hobby": { $in: ["book", "movie","travel"] } })
```

![Document 嵌套](../img/mongoDB/50.png)

## Document limitation

[官網](https://www.mongodb.com/docs/manual/reference/limits/#bson-documents)

![Document 嵌套](../img/mongoDB/51.png)

> 一個 BSON 大小不能超過十六兆，嵌套不能超過一百層

# 結構和資料類型

## Collection 有 Schema 嗎

Schema: 固定結構，須提前定義

> 例如: MySQL 再給定資料前，要先新建結構，例如要這個 table 要幾個 column，每一列的數據類型都是固定的，例如: age 就是 int，name 就是 varchar，定好後就要按照這結構插入數據，不能多也不能少

> Collection 沒有任何限制，可以插入任何類型的數據，但 collection 有 Schema，不是強制但可以設定

**在使用上雖然 mongoDB 可以隨意插入不同類型的數據，但設計者並不會讓使用者這麼做，畢竟一旦這麼做了，就很難去控管和對數據做處理，所以都還是會設計 Schema**

## 資料類型

- String
- Boolean
- Number (32 bit interger, 64bit Interger, Decimal)
- ObjectID
- Data (Timestamp, ISODate)
- Array

**數據類型用到的方法**

1. 用物件 `.` 的形式拿取資料

```shell
db.employee.findOne({}).<key>
```

- 範例

```shell
db.employee.findOne({}).title
```

```shell
db.employee.findOne({}).hobby
```

```shell
db.employee.findOne({}).contact
```

![資料類型](../img/mongoDB/52.png)

2. 使用`typeof`查看數據類型

```shell
typeof db.employee.findOne({}).<key>
```

- 範例

```shell
typeof db.employee.findOne({}).title
```

```shell
typeof db.employee.findOne({}).hobby
```

```shell
typeof db.employee.findOne({}).contact
```

![資料類型](../img/mongoDB/53.png)

## 關於時間資料類型

> 透過 javascript 語法產生

```shell
var a = new Date()
```

```shell
var b = new Timestamp()
```

```shell
db.test.insertOne({date: a, timedtamp:b})
```

> 之後要使用這個需要看要使用什麼 drive，每個指令會不同，而去選擇使用

![資料類型](../img/mongoDB/54.png)

## 關於數字資料類型

> 透過 javascript 語法產生

```shell
var a = 1234
```

```shell
var b = NumberLong(1234)
```

```shell
db.test.insertOne({a: a, b:b})
```

![資料類型](../img/mongoDB/55.png)
![資料類型](../img/mongoDB/56.png)

```shell
db.test.updateOne({},{$set:{c:1.001}})
```

![資料類型](../img/mongoDB/57.png)

```shell
type db.test.findOne().a
```

```shell
type db.test.findOne().b
```

```shell
type db.test.findOne().c
```

![資料類型](../img/mongoDB/58.png)

# NOSQL 中的關係

## 什麼是關係

關係分很多種情況

1. 1 對 1
2. 1 對多
3. 多對多

> 方法 1

```json
{
  "_id": 1,
  "name": "John Cart",
  "email": "test@g,com",
  "phone": 1234,
  "orders": [
    {
      "date": "2018-12-10",
      "product": "a book",
      "cost": 19.99
    },
    {
      "date": "2018-12-22",
      "product": "a computer",
      "cost": 2000
    }
  ]
}
```

> 方法 2

**customers**

```json
{
  "_id": 1,
  "name": "John Cart",
  "email": "test@g,com",
  "phone": 1234,
  "orders": [1, 2]
}
```

**orders**

```json
[
  {
    "_id": 1,
    "date": "2018-12-10",
    "product": "a book",
    "cost": 19.99
  },
  {
    "_id": 2,
    "date": "2018-12-22",
    "product": "a computer",
    "cost": 2000
  }
]
```

**這兩方法各有優缺**

可能會使用方法 2 的情況下，就是怕超過嵌套的限制，若訂單很多比就會優先選方法 2

## 一對一關係

**現有資料**

> 一個人只有一個 address，一個 address 只能對應一個人

> people

```json
{
  "_id": 1,
  "name": "John Cart",
  "email": "jc@gmail.com",
  "phone": 12345,
  "address": 1
}
```

> address

```json
{
  "_id": 1,
  "city": "Shanghai",
  "street": "street",
  "buliding": 1,
  "unit": 2,
  "room": 1021
}
```

> all

```json
{
  "_id": 1,
  "name": "John Cart",
  "email": "jc@gmail.com",
  "phone": 12345,
  "address": {
    "_id": 1,
    "city": "Shanghai",
    "street": "street",
    "buliding": 1,
    "unit": 2,
    "room": 1021
  }
}
```

> mongoDB(方法一)

```shell
db.people.insertOne(
    {
    "_id":1,
    "name":"John Cart",
    "email": "jc@gmail.com",
    "phone": 12345,
    "address": 1
   }
)
```

![一對一關係](../img/mongoDB/59.png)

```shell
db.address.insertOne(
    {
        "_id": 1,
        "city": "Shanghai",
        "street": "street",
        "buliding": 1,
        "unit": 2,
        "room": 1021
    }
)
```

![一對一關係](../img/mongoDB/60.png)

> mongoDB(方法二)

```shell
db.people.insertOne(
    {
    "_id":1,
    "name":"John Cart",
    "email": "jc@gmail.com",
    "phone": 12345,
    "address": {
        "_id": 1,
        "city": "Shanghai",
        "street": "street",
        "buliding": 1,
        "unit": 2,
        "room": 1021
     }
   }
)
```

![一對一關係](../img/mongoDB/61.png)

> 若不想出現 address 則可以:

```shell
db.people.findOne({ "name":"John Cart"},{address:0})
```

![一對一關係](../img/mongoDB/62.png)

## 一對多關係

**資料**

> 全部

```json
{
  "_id": 1,
  "name": "John Cart",
  "email": "jc@gmail.com",
  "phone": 12345,
  "orders": [
    {
      "date": "2018-12-19",
      "product": "book",
      "cost": 19.99
    },
    {
      "date": "2018-12-13",
      "product": "book",
      "cost": 39.99
    },
    {
      "date": "2018-12-22",
      "product": "computer",
      "cost": 2899
    }
  ]
}
```

> customers

```json
{
  "_id": 1,
  "name": "John Cart",
  "email": "jc@gmail.com",
  "phone": 12345,
  "orders": [1, 2, 3]
}
```

> orders

```json
{
  "_id": 1,
  "date": "2018-12-19",
  "product": "book",
  "cost": 19.99
},
{
  "_id": 2,
  "date": "2018-12-13",
  "product": "book",
  "cost": 39.99
},
{
  "_id": 3,
  "date": "2018-12-22",
  "product": "computer",
  "cost": 2899
}
```

> mongoDB(方法一)

```shell
db.customer.insertOne(
  {
    "_id": 1,
    "name": "John Cart",
    "email": "jc@gmail.com",
    "phone": 12345,
    "orders": [
      {
        "date": "2018-12-19",
        "product": "book",
        "cost": 19.99
      },
      {
        "date": "2018-12-13",
        "product": "book",
        "cost": 39.99
      },
      {
        "date": "2018-12-22",
        "product": "computer",
        "cost": 2899
      }
    ]
  }
)
```

![一對多關係](../img/mongoDB/63.png)

> 好處:用一條 find 語法就可以找到全部的資料
> 壞處: 無法對整體訂單進行分析

> mongoDB(方法二)

```shell
db.customer.insertOne(
  {
    "_id": 1,
    "name": "John Cart",
    "email": "jc@gmail.com",
    "phone": 12345,
    "orders": [1, 2, 3]
  }
)
```

![一對多關係](../img/mongoDB/64.png)

```shell
db.order.insertMany([
   {
    "_id": 1,
    "date": "2018-12-19",
    "product": "book",
    "cost": 19.99
  },
  {
    "_id": 2,
    "date": "2018-12-13",
    "product": "book",
    "cost": 39.99
  },
  {
    "_id": 3,
    "date": "2018-12-22",
    "product": "computer",
    "cost": 2899
  }
])
```

![一對多關係](../img/mongoDB/65.png)

> 壞處:至少需要兩次的查詢
> 好處:可以針對訂單做操作；例如可以統計書的訂單共有多少

**範例**

```shell
db.customer.insertMany([
  {
    "_id": 1,
    "name": "John Cart",
    "email": "jc@gmail.com",
    "phone": 12345,
    "orders": [
      {
        "date": "2018-12-19",
        "product": "book",
        "cost": 19.99
      },
      {
        "date": "2018-12-13",
        "product": "book",
        "cost": 39.99
      },
      {
        "date": "2018-12-22",
        "product": "computer",
        "cost": 2899
      }
    ]
  },
    {
    "_id": 2,
    "name": "Arber Su",
    "email": "as@gmail.com",
    "phone": 6666,
    "orders": [
      {
        "date": "2018-12-01",
        "product": "book",
        "cost": 19.99
      },
      {
        "date": "2018-12-29",
        "product": "computer",
        "cost": 2899
      }
    ]
  }
])
```

![一對多關係](../img/mongoDB/66.png)

> 尋找哪些訂單是書的訂單

```shell
db.customer.aggregate([
  { $unwind: "$orders" },
  { $match: { "orders.product": "book" } },
  { $replaceRoot: { newRoot: "$orders" } }
])
```

![一對多關係](../img/mongoDB/73.png)

```shell
db.customer.insertMany([
  {
    "_id": 1,
    "name": "John Cart",
    "email": "jc@gmail.com",
    "phone": 12345,
    "orders": [1,2,3]
  },
    {
    "_id": 2,
    "name": "Arber Su",
    "email": "as@gmail.com",
    "phone": 6666,
    "orders": [4,5]
  }
])
```

![一對多關係](../img/mongoDB/67.png)

```shell
db.order.insertMany([
  {
    "_id": 1,
    "date": "2018-12-19",
    "product": "book",
    "cost": 19.99
  },
  {
    "_id": 2,
    "date": "2018-12-13",
    "product": "book",
    "cost": 39.99
  },
  {
    "_id": 3,
    "date": "2018-12-22",
    "product": "computer",
    "cost": 2899
  },
  {
    "_id": 4,
    "date": "2018-12-01",
    "product": "book",
    "cost": 19.99
   },
   {
    "_id": 5,
    "date": "2018-12-29",
    "product": "computer",
    "cost": 2899
  }
])
```

![一對多關係](../img/mongoDB/68.png)

> 把顧客和訂單做連結

```shell
let a = db.customer.findOne({_id:1}).orders
db.order.find({_id: {$in: a}})
```

![一對多關係](../img/mongoDB/69.png)

> 尋找哪些訂單是書的訂單

```shell
db.order.find({product:"book"})
```

![一對多關係](../img/mongoDB/70.png)

> 做一些額外的統計

```shell
db.order.find({product:"book"}.count)
```

![一對多關係](../img/mongoDB/71.png)

```shell
db.order.countDocuments({product:"book"})
```

![一對多關係](../img/mongoDB/72.png)

## 多對多關係

> 所有顧客可以購買多個商品，任一商品都可以被多個顧客購買

**資料**

> customer

```json
  {
    "_id":"c01",
    "name":"Jack",
    "age": 20
  },
  {
    "_id":"c02",
    "name":"Max",
    "age":20
  }
```

> product

```json
  {
    "_id":"p01",
    "name":"Book",
    "price": 19
  },
  {
    "_id":"p02",
    "name":"Computer",
    "price": 2000
  }
```

> order(連接客戶與商品)

```json
  {
    "_id":"o01",
    "customer_id":"c01",
    "product_id":"p01",
    "qantity":2
  },
  {
    "_id":"o02",
    "customer_id":"c01",
    "product_id":"p02",
    "_id":"o02",
    "qantity":1
  },
  {
    "_id":"o03",
    "customer_id":"c02",
    "product_id":"p02",
    "_id":"o02",
    "qantity":1
  }
```

**MongoDB**

> 方法一

```shell
db.customers.insertMany([
  {
    "_id":"c01",
    "name":"Jack",
    "age": 20,
    "orders":[
      {
        "name":"Book",
        "price": 19,
        "quantity":2
      },
      {
        "name":"Computer",
        "price": 2000,
        "quantity":1
      },
    ]
  },
  {
    "_id":"c02",
    "name":"Max",
    "age":20,
      "orders":[
      {
        "name":"Book",
        "price": 19,
        "quantity":1
      },
    ]
  }
])
```

![多對多關係](../img/mongoDB/77.png)
![多對多關係](../img/mongoDB/78.png)

> 方法二

> customer

```shell
db.customer.insertMany([
  {
    "_id":"c01",
    "name":"Jack",
    "age": 20
  },
  {
    "_id":"c02",
    "name":"Max",
    "age":20
  }
])
```

![多對多關係](../img/mongoDB/74.png)

> product

```shell
db.product.insertMany([
  {
    "_id":"p01",
    "name":"Book",
    "price": 19
  },
  {
    "_id":"p02",
    "name":"Computer",
    "price": 2000
  }
])
```

![多對多關係](../img/mongoDB/75.png)

> order

```shell
db.order.insertMany([
  {
    "_id":"o01",
    "customer_id":"c01",
    "product_id":"p01",
    "quantity":2
  },
  {
    "_id":"o02",
    "customer_id":"c01",
    "product_id":"p02",
    "quantity":1
  },
  {
    "_id":"o03",
    "customer_id":"c02",
    "product_id":"p02",
    "quantity":1
  }
])
```

![多對多關係](../img/mongoDB/76.png)

> 優點:可修改商品價格，因為訂單是歷史紀錄應該不能修改價格

## 一對多關係 Aggregation

```shell
db.customer.insertMany([
  {
    "_id": 1,
    "name": "John Cart",
    "email": "jc@gmail.com",
    "phone": 12345,
    "orders": [1,2,3]
  },
    {
    "_id": 2,
    "name": "Arber Su",
    "email": "as@gmail.com",
    "phone": 6666,
    "orders": [4,5]
  }
])
```

```shell
db.order.insertMany([
  {
    "_id": 1,
    "date": "2018-12-19",
    "product": "book",
    "cost": 19.99
  },
  {
    "_id": 2,
    "date": "2018-12-13",
    "product": "book",
    "cost": 39.99
  },
  {
    "_id": 3,
    "date": "2018-12-22",
    "product": "computer",
    "cost": 2899
  },
  {
    "_id": 4,
    "date": "2018-12-01",
    "product": "book",
    "cost": 19.99
   },
   {
    "_id": 5,
    "date": "2018-12-29",
    "product": "computer",
    "cost": 2899
  }
])
```

> 如何透過一條語法找到客戶的詳細資訊並起找到此訂單訊息?

```shell
db.customer.aggregate([
  {
    $lookup: {
      from: "order",
      localField: "orders",
      foreignField: "_id",
      as: "order_details"
    }
  }
])
```

![一對多關係](../img/mongoDB/79.png)

# 深入了解增刪查改

## insert 方法

可以使用 insertOne 和 insertMany

```shell
db.test.insertOne({A:1,B:1})
```

```shell
db.test.insertMany([{A:3,B:4},{A:5,B:6}])
```

![insert](../img/mongoDB/80.png)

可以賦予給變數後做處理

```shell
a = db.test.insertMany([{A:3,B:4},{A:5,B:6}])
```

![insert](../img/mongoDB/81.png)

**insert()可以差一個值和多個值**

```shell
db.test.insert({A:10,B:20})
```

```shell
db.test.insert([{A:30,B:40},{A:50,B:60}])
```

![insert](../img/mongoDB/82.png)

## insertMany 是否按順序插入對結果的影響

1. id 重複會造成什麼問題呢?

```shell
db.test.insertOne({_id:1,A:1,B:2})
```

![insert](../img/mongoDB/83.png)

> 如果再 insertMany 插入有些重複 id 的資料會如何?

```shell
db.test.insertMany([{_id:2, A:10},{_id:1,A:20},{_id:3,A:30}])
```

![insert](../img/mongoDB/84.png)

> insertMany 插入時會按照順序插入，因此若前面沒有重複會成功插入，但後面重複以及之後的數據就不會被插入，會擋掉

> 若我們希望只擋掉 id 重複的值，其他值要成功插入該怎麼辦?

> 要加入 `{ordered:false}`

```shell
db.test.insertMany([{_id:2, A:10},{_id:1,A:20},{_id:3,A:30}],{ordered:false})
```

![insert](../img/mongoDB/85.png)

## 如何透過 JSON 文件導入資料

**mongo_import.json**

```JSON
[
  {
    "name":"A",
    "age": 12
  },
  {
    "name":"B",
    "age": 14
  },
  {
    "name":"C",
    "age": 15
  }
]
```

1. 安裝 mongoDB Tools

[官方網址](https://www.mongodb.com/try/download/database-tools)

> 下載完 zip 檔案後解壓縮，把所有 bin 資料夾裡的.exe 檔案直接放入`C:\Program Files\MongoDB\Server\8.0\bin`，之後打下面指令，測試是否安裝完成

```shell
mongoimport --version
```

![mongo_import](../img/mongoDB/87.png)

1. 複製此 josn 資料路徑

![mongo_import](../img/mongoDB/86.png)

2. 打開 CMD，貼上複製的 path

```shell
mongoimport <your-json-path> -d <your-database> -c <your-collection> --jsonArray --drop
```

```shell
mongoimport D:\USERS\Desktop\Instructions\資料庫\mogoDB\mongo_import.json -d test -c demo --jsonArray --drop
```

![mongo_import](../img/mongoDB/88.png)

3. 查看資料是否有真的匯入

![mongo_import](../img/mongoDB/89.png)

## method filter operator

![mongo_import](../img/mongoDB/90.png)

> operator 的種類

- Query 和 Projection 查找和返回值修整
  - 用於過濾數據，和修改返回值的表現形式
- Update 更新
  - 用於修改資料庫中的具體資料
- Aggregation 聚合
  - 用於聚合的 pipeline

[更多相關資訊](https://docs.mongodb.com/manual/reference/operator/)

## 比較操作符

`$eq`: 等於
`$gt`: 大於
`$gte`: 大於等於
`$in`: 包含其中任意一個
`$lt`: 小於
`$lte`: 小於等於
`$ne`: 不等於
`$nin`: 不包含其中任意一個

> 使用方式

**eq**

> tags 等於 A 和 B

> 此 eq 可以不寫，結果是一樣的

```shell
db.inventory.find({tags:{$eq:["A","B"]}})
```

**in**

> price 等於 5 或 15

```shell
db.inventory.find({price:{$in:[5,15]}})
```

**ne**

> price 不等於 20

```shell
db.inventory.find({price:{$ne:20}})
```

**nin**

> price 不等於 5 並且不等於 15

```shell
db.inventory.find({price:{$nin:{5,15}}})
```

## 邏輯操作符

`$and`: 邏輯與
`$not`: 邏輯非
`$nor`: 邏輯或的相反
`$or`: 邏輯或

**$and**

> 找出 price 不等於 1.99 以及有 price 的資料

```shell
db.inventory.find({$and:[{price:{$ne:1.99}},{price:{$exists:true}}]})
```

**$not**

> 找出 price 不大於 1.99(小於等於 1.99)

```shell
db.inventory.find({price:{$not:{$gt:1.99}}})
```

**$nor**

> 找出 price 不滿足 price 不等於 1.99 或 sale 不等於 true 的資料

```shell
db.inventory.find({$nor:[{price:1.99},{sale:true}]})
```

**$or**

> 找出 quantity 小於 20 或 price 等於 10 的資料

```shell
db.inventory.find({$or:[{quantity:{$lt:20}},{price:10}]})
```

## 邏輯和比較操作符練習

> 練習檔案`movie.json`

```shell
mongoimport D:\USERS\Desktop\Instructions\資料庫\mogoDB\movie.json -d demo -c movie --jsonArray --drop
```

![mongo_import](../img/mongoDB/91.png)
![mongo_import](../img/mongoDB/92.png)

1. 在 100 部電影裡，找出 imdb_score 大於 8 分的電影

```shell
db.movie.find({imdb_score:{$gt:8}})
```

![mongo_import](../img/mongoDB/93.png)

> 取總數

```shell
db.movie.countDocuments({ imdb_score: { $gt: 8 } })
```

![mongo_import](../img/mongoDB/94.png)

```shell
db.movie.find({imdb_score:{$gt:8}}).count()
```

![mongo_import](../img/mongoDB/95.png)

2.  在 100 部電影裡，找出 imdb_score 小於 7 分的電影

```shell
db.movie.find({imdb_score:{$lt:7}})
```

> 取總數

```shell
db.movie.countDocuments({ imdb_score: { $lt: 7 } })
```

```shell
db.movie.find({imdb_score:{$lt:7}}).count()
```

3.  在 100 部電影裡，找出 imdb_score 小於等於 7 分的電影

```shell
db.movie.find({imdb_score:{$lte:7}})
```

> 取總數

```shell
db.movie.countDocuments({ imdb_score: { $lte: 7 } })
```

```shell
db.movie.find({imdb_score:{$lte:7}}).count()
```

3.  在 100 部電影裡，找出 imdb_score 等於 7 分的電影

```shell
db.movie.find({imdb_score:{$eq:7}})
```

```shell
db.movie.find({imdb_score:7})
```

> 取總數

```shell
db.movie.countDocuments({ imdb_score: { $eq: 7 } })
```

```shell
db.movie.countDocuments({ imdb_score: 7})
```

```shell
db.movie.find({imdb_score:{$eq:7}}).count()
```

```shell
db.movie.find({imdb_score:7}).count()
```

4.  在 100 部電影裡，找出 actors 有 Johnny Depp

```shell
db.movie.find({actors:{$in:["Johnny Depp"]}})
```

![mongo_import](../img/mongoDB/96.png)

```shell
db.movie.find({actors:{$in:["Johnny Depp"]}}).count()
```

![mongo_import](../img/mongoDB/97.png)

5. 在 100 部電影裡，找出 actors 不包含 Johnny Depp

```shell
db.movie.find({actors:{$nin:["Johnny Depp"]}})
```

```shell
db.movie.find({actors:{$nin:["Johnny Depp"]}}).count()
```

6. 在 100 部電影裡，找出 imdb_score 超過 7 但 8 分以下( 8>= imdb_score>7 )

```shell
db.movie.find({$and:[{imdb_score:{$gt:7}},{imdb_score:{$lte:8}}]})
```

![mongo_import](../img/mongoDB/98.png)

```shell
db.movie.find({$and:[{imdb_score:{$gt:7}},{imdb_score:{$lte:8}}]}).count()
```

![mongo_import](../img/mongoDB/99.png)

7. 在 100 部電影裡，找出 imdb_score 不小於等於 7

```shell
db.movie.find({ imdb_score: { $not: { $lte: 7 } } })
```

```shell
db.movie.find({ imdb_score: { $not: { $lte: 7 } } }).count()
```

8. 在 100 部電影裡，找出 imdb_score 大於 8 或小於 7

```shell
db.movie.find({$or:[{imdb_score:{$gt:8}},{imdb_score:{$lt:7}}]})
```

```shell
db.movie.find({$or:[{imdb_score:{$gt:8}},{imdb_score:{$lt:7}}]}).count()
```

![mongo_import](../img/mongoDB/100.png)

9. 在 100 部電影裡，找出 imdb_score 小於等於 8 或大於等於 7

```shell
db.movie.find({$nor:[{imdb_score:{$gt:8}},{imdb_score:{$lt:7}}]})
```

```shell
db.movie.find({$nor:[{imdb_score:{$gt:8}},{imdb_score:{$lt:7}}]}).count()
```

![mongo_import](../img/mongoDB/101.png)

**or 和 nor 加起來剛好是 100**
