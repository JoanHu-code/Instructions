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