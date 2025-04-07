# 目錄
- [介紹SQL]
  - [什麼是資料庫](#什麼是資料庫)
  - [SQL 和 NOSQL](#SQL-和-NOSQL)
  - [為什麼選擇 MySQL](#為什麼選擇-MySQL)
  - [MySQL 版本的選擇](#MySQL-版本的選擇)
- [Database和Table](#Database-和-Table)
  - [本章介紹](#本章介紹)
  - [資料庫的基本操作](#資料庫的基本操作)  
  - [為什麼要輸入分號執行SQL](#為什麼要輸入分號執行-SQL) 
  - [SQL 大小寫的問題](#SQL-大小寫的問題)
  - [表的基本介紹](#表的基本介紹)
  - [資料類型的基本介紹](#資料類型的基本介紹)
  - [表的創建和基本操作](#表的創建和基本操作)  
  - [範例](#範例)   

# 介紹SQL

## 什麼是資料庫

**資料庫有已下的特徵:**

1. Collection of Data: 資料的收集器(集合)

![Collection of Data](../img/mySQL/01.png)

> Find Nancy's phone number?

2. Methods for accessing and manipulating that data

> Database vs. DBMS(Database Management system)

![Database](../img/mySQL/02.png)

DBMS: 對database存取的橋梁
Database: 存取資料的方式

透過DBMS可以訪問獲取資料，或對資料進行編輯刪除等操作

宏觀意義上的database: DBMS+Database

市面上有很多不同的DBMS，使用者可以透過這些DBMS去和Database做交互

## SQL 和 NOSQL

> SQL:(prounced"ess-que-el") stands for **Structured Query Language**. SQL is used to communicate with a database. According to ANSI(American National Standards Institue), it is the standard language for **relational database** management systems.

[資料來源](https://en.wikipedia.org/wiki/SQL)

![SQL](../img/mySQL/03.png)

## 為什麼選擇 MySQL

根據[資料庫網站](https://db-engines.com/en/ranking)排名

![SQL](../img/mySQL/04.png)

> 第一、第二是商業軟體都要收費，所以選擇MySQL

# Database和Table

## 本章介紹

- A **database** is just a bunch of **tables**
- Tables hold the **data** (a collection of related data held in a **structured format** within a database)

## 資料庫的基本操作

- 顯示當前有哪些databases

```sql
show databases;
```

![show databases](../img/mySQL/05.png)

- 創建databases

```sql
create database <name>;
```
> name可以是任意的數字和字母組成但不能有空格

![show databases](../img/mySQL/06.png)

- 刪除databases

```sql
drop database <name>;
```
![use](../img/mySQL/09.png)

- databases切換

```sql
use <database name>;
```
![use](../img/mySQL/07.png)

- 查看當前正再使用哪個database

```sql
select database();
```
![select database](../img/mySQL/08.png)

> 預設使用的database是null
![select database](../img/mySQL/10.png)

## 為什麼要輸入分號執行SQL

> 在SQL裡面`;`代表語句的結束，若沒有輸入，SQL會不知道語句已經結束，會報錯

這個`;`是可以變的，改變可以通過下面語法:

```SQL
delimiter $$
```
![delimiter](../img/mySQL/11.png)

## SQL 大小寫的問題

[stackOverfolw](https://stackoverflow.com/questions/292026/is-there-a-good-reason-to-use-upper-case-for-sql-keywords)

> 建議KEYWORDS大寫，並且每遇到關鍵字就換行

## 表的基本介紹

- A database is just a bunch of **tables**
- Tables hold the **data in a structured format**

![表的基本介紹](../img/mySQL/12.png)

每個table都有column、row

header: Name、Phone、Age
data: 剩餘的部分


## 資料類型的基本介紹

![資料類型的基本介紹](../img/mySQL/13.png)

- Numeric Types
  - INT
  - SMALLINT
  - MEDIUMINT
  - BIGINT
  - DECIMAL
  - NUMERIC
  - FLOAT
  - DOUBLE
  - BIT
 - String Types
  - CHAR
  - VARCHAR
  - BINARY
  - VARNINARY
  - BLOB
  - TINYBLOB
  - MEDIUMBLOB
  - LONGLOB
  - TEXT
  - TINYTEXT
  - MEDIUMTEXT
  - LONGTEXT
  - ENUM
 - Data Types
  - DATA
  - DATETIME
  - TIMESTAMP
  - TIME
  - YEAR 

[官方網站](https://dev.mysql.com/doc/refman/8.4/en/data-types.html)
[w3s](https://www.w3schools.com/mysql/mysql_datatypes.asp)

## 表的創建和基本操作

- 創建table

```sql
CREATE TABLE table_name(
  column_name data_type,
  column_name data_type,
  ...
)
```

## 範例