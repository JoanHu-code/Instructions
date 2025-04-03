# 目錄

- [MySQL](#MySQL)

  - [資料庫管理系統 DBMS](#資料庫管理系統-DBMS)
  - [增刪查改 CRUD](#增刪查改-CRUD)
  - [Relational Database and Excel](#Relational-Database-and-Excel)
  - [SQL](#SQL)
  - [下載 MySQL Server](#下載-MySQL-Server)
  - [PopSQL 下載](#PopSQL-下載)
  - [SQL Data Type](#SQL-Data-Type)
  - [SQL 表格設定](#SQL-表格設定)
  - [SQL 基本語法](#SQL-基本語法)
  - [SQL 與 NoSQL 比較](#SQL-與-NoSQL-比較)

- [MongoDB](#MongoDB)
  - [安裝 MongoDB 與 Mongo Shell](#安裝-MongoDB-與-Mongo-Shell)
  - [JSON and BSON](#JSON-and-BSON)
  - [mongosh 與 數據新增](#mongosh-與-數據新增)
  - [數據查詢](#數據查詢)
  - [修改與刪除](#修改與刪除)

# MySQL

## 資料庫管理系統

**我們為什麼需要資料庫?不能將所有數據用 Excel 儲存嗎?**

> 儘管我們可以對 Excel 表格中的數據進行排序和過濾，但資料庫具有廣泛的查詢功能，可以檢索與選擇條件匹配的所有紀錄，並且在多個表格中做交叉引用紀錄，以及跨多個表格執行複雜的聚合計算

> 此外，就查詢資料而言，資料庫比 Excel 快上許多，在資料龐大時差別會更明顯。Excel 可以處理最多大約 100 萬行數據，但對於現代資料來說，明顯容量不足了。

- 資料庫管理系統(database management system，縮寫:DBMS) 是一種為管理資料庫而設計的管理系統，具有代表性的資料管理系統有:Microsoft SQL Server、MongoDB、MySQL 及 PostgreSQL 等。(簡單來說，DBMS 就是管理資料庫的軟體)

**資料庫在概念上來說，可以被分成兩種:**

1. Relational Database (or SQL Database):是一種存儲並提供對彼此相關的數據點訪問的資料庫。例如，一家娛樂公司有一個資料庫來儲存他們所有的藝術家和歌曲數據。所有歌曲都有一位或多於一位作家，所有作家都有一首或多於一首歌曲。因此，該數據庫的每個表格之間是有關聯的。

![Relational Database](../img/SQL/01.png)

> ER Diagram 由美籍台灣人電腦科學家陳品姍發明，常用於資訊系統設計中；對於大型的資料庫來說，建構的第一步就是設計資料庫，並且畫出 ER Diagram。

> 大多會用表格做儲存
> ![Relational Database](../img/SQL/02.png)

2. Non-Relational Database (or NoSQL Database)

> 會用 json 做儲存而不是表格

> 數據的彈性會更好

![Relational Database](../img/SQL/03.png)

- 幾十年來，SQLite、PostgreSQL、MySQL 和 SQL Server 等關係資料庫已成為數據儲存的熱門選擇。近幾年來，包括 MongoDB 和 Redis 在內的 NoSQL 資料庫也逐漸受到青睞。

## 增刪查改 CRUD

> 增刪查改(CRUD)，全稱增加(Create，意為「建立」)、刪除(Delete)、查詢(Read，意為「讀取」)、改正(Updata，意味「更新」)，是在 DBMS 當中，一連串幢建的操作行為。

**增刪查改除了常用於 SQL 資料庫之外，也在與網站的 API 阜口時常使用。在 Resful API 製作時，會再次使用。但網站的 API 阜口使用 HTTP 協定傳送通訊，所以原本的「增珊查改」所對應的英文字會因此改名，不再對應 CRUD。比如:「查」不再是 Read，而改為 GET；「增」不再是 Create，而改為 POST；「改」不再是 Update，而改為 PUT 等等。**

**英語中因為 CRUD 比中文所對應的 CRUD 易讀易記而將「刪除」(Delete)放置於最後。但是英文小寫的 curd，是指水垢、腐蝕淤泥，或是噁心的東西。**

## Relational Database and Excel

![Relational Database](../img/SQL/05.png)

> 整個叫 Database，一個 Databas 可能會有很多個 table，在 table 和 table 之間他們是互相有關連的

### key

- 關係鍵(keys)是關聯式資料庫的重要組成部分。關係鍵是一個表中的一個或幾個屬性，用來標示該錶的每一行或與另一個表產生關係。在 DBMS 當中，主要的 keys 有:

1. 主鍵(primary key): 是資料庫表中對儲存資料誤鍵予以唯一和完整標示的資料列或屬性的鍵。一筆資料只能有一個主鍵(但可以由兩個以上的行組成 primary key)，且主鍵的取值不能缺失，即不能為空值(Null)。

2. 外鍵(foreign Key): 是指向其他表個主鍵的欄位，用於確定兩張表格的關聯性

3. 自然鍵(natural key): 若使用在真實生活中唯一確定一個事物的標識，來當作資料庫的 primary key，則此 primary key 可被稱作是 natural key。例如，台灣的身分證字號可以當作資料庫的 natural key。

4. 代理鍵(surrogate key): 相對於 natural key，在當資料表格中的所有現有欄位都不適合當主鍵時，例如資料太長，或是意義層面太多，就會製作一個無意義的欄位來代為作主鍵

5. 複合主鍵(composite key): 當資料表的主鍵(Primary Key)如果是由多個欄位組成，則稱為 composite key。

## SQL

- SQL(Structured Query Language，結構化查詢語言)是一種特定目的的程式語言，用於對關聯式資料庫管理系統(Relational DBMS, or RDBMS)下達指令。SQL 在 1987 年成為國際標準化組織(ISO)標準。
- 雖然有這一標準的存在，但大部分的 SQL 代碼在不同的資料庫系統中並不具有完全的跨平台性，也就是說，雖然 SQL 這門程式語言可以用來操作 DBMS，但每個 DBMS 所接受的 SQL 語法有些微差異。例如，用來操作 MySQL 這個 DBMS 的 SQL 程式碼不能全部拿去用來操作 Mircosoft SQL Server 這個 DBMS。

## 下載 MySQL Server

![Relational Database](../img/SQL/06.png)
![Relational Database](../img/SQL/07.png)
![Relational Database](../img/SQL/08.png)
![Relational Database](../img/SQL/09.png)
![Relational Database](../img/SQL/10.png)
![Relational Database](../img/SQL/11.png)
![Relational Database](../img/SQL/12.png)
![Relational Database](../img/SQL/13.png)

## PopSQL 下載

![Relational Database](../img/SQL/14.png)
![Relational Database](../img/SQL/15.png)
![Relational Database](../img/SQL/16.png)
![Relational Database](../img/SQL/17.png)
![Relational Database](../img/SQL/18.png)
![Relational Database](../img/SQL/19.png)
![Relational Database](../img/SQL/20.png)

> 測試是否有連接

![Relational Database](../img/SQL/21.png)
![Relational Database](../img/SQL/22.png)

- 新增 TABLE

```SQL
CREATE TABLE employees (
    employeeID int PRIMARY key
)
```

- 刪除 TABLE

```sql
DROP TABLE employees;
```

## SQL Data Type

| Data Types   | Bytes             | Description                                                                                               |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------------------- |
| INT          | 4 bytes           | 資料範圍是-2^31~2^31-1(-2147483648~2147483467)                                                            |
| DECIMAL(p,s) | 視精確度而定      | p 代表 total digits，s 代表小數點後的 digits。例如:152.23 為例，p 是 5,s 是 2。資料範圍是-10^38+1~10^38-1 |
| VARCHAR(n)   | 變動長度，max=2GB | 資料範圍是 1~2^31-1                                                                                       |
| DATETIME     | 8bytes            | 資料範圍是 1753/1/1~9999/12/31 ex2008-11-27 08:08:08:888                                                  |

## SQL 表格設定

試試看製作下面表格

![Relational Database](../img/SQL/05.png)

- Employee table

```sql
CREATE TABLE employees (
    employeeID INT PRIMARY key,
    employeeName VARCHAR(50),
    age INT,
    salary INT,
    supervisor INT,
    departmentID INT
)
```

## SQL 基本語法

- 在 SQL 中，創造新表格的語法為:

```SQL
CREATE TABLE table_name(
column1 datatype,
column2 datatype,
column3 datatype,
.....
)

```

```sql
CREATE TABLE employees (
    employeeID INT PRIMARY key,
    employeeName VARCHAR(50),
    age INT,
    salary INT,
    supervisor INT,
    departmentID INT
)
```

- 想要得到 SQL 的表格資訊，可以用:

```SQL
DESCRIBE table_name
```

```SQL
DESCRIBE employees
```

- 刪除表格

```SQL
DROP TABLE table_name
```

```SQL
DROP TABLE employees
```

![Relational Database](../img/SQL/23.png)

- 若要在表格中心曾資料，則語法為:

1. 指定 column name 和要插入的值:

```spl
INSERT INTO table_name (column1,column2,column3, ...)
VALUES (value1,value2,value3,...)
```

```SQL
INSERT INTO employees (employeeID, employeeName, age, salary, supervisor, department)
VALUES (100, "Josh Donaldson" ,35 ,3500, NULL,1);
```

2. 如果要為表格的所有 column 添加值，則無需指定 column name。但是，需要確保值的順序與表中 column 的順序相同。

```sql
INSERT INTO table_name
VALUES (value1,value2,value3,...);
```

```sql
INSERT INTO employees
VALUES (101, "Mike Napoli" ,40 ,2400, 100,1);
```

- 查詢的語法

```sql
SELECT* FROM table_name;
```

```sql
SELECT* FROM employees;
```

- `*`: 所有欄位

![Relational Database](../img/SQL/24.png)

- 修改表格現有的紀錄，語法:

```sql
UPDATE table_name
SET column1 = value1, column2 = value2,...
WHERE condition;
```

> 更新表中的紀錄時要小心!注意 UPDATE 語句中的 WHERE。WHERE 可以指定應該更新那些紀錄。如果省略 WHERE，表中所有紀錄都將被更新!

```SQL
INSERT INTO employees
VALUES (103, "Nolan Ryan" ,34, 1500, 101,1);
INSERT INTO employees
VALUES (104, "Jason Heyward" ,33, 1500, 102,2);
INSERT INTO employees
VALUES (105, "Fred Johnson" ,30, 1500, 101,1);
INSERT INTO employees
VALUES (106, "Zach Britton" ,29, 1500, 101,1);
INSERT INTO employees
VALUES (108, "Oliver Perez" ,30, 1500, 102,2);
SELECT* FROM employees;
```

![Relational Database](../img/SQL/25.png)

```SQL
UPDATE employees
SET employeeID = 107
WHERE employeeID = 108
```

![Relational Database](../img/SQL/26.png)

- 刪除表格現有的紀錄，語法為:

```SQL
DELETE FROM table_name WHERE condition;
```

> 刪除表格中的紀錄時也要小心! 如果省略 WHERE，表中的所有紀錄都將被刪除!DELETE 語法只能夠刪除表格中的資料，但表格本身依然存在。若要刪除表格，則必須使用語法:

```SQL
DROP TABLE table_name
```

```SQL
DELETE FROM employees WHERE employeeID = 107;
```

![Relational Database](../img/SQL/27.png)

- 查詢表格中的資料時，常用語法為:

```SQL
SELECT column1, column2,...
FROM table_name;
```

```SQL
SELECT employeeID, employeeName, age
FROM employees;
```

![Relational Database](../img/SQL/28.png)

> 如果要選擇表中所有的 column，可使用:

```SQL
SELECT * FROM table_name
```

- ORDER BY 關鍵字用於對查詢結果按升序或降序進行排序(默認按升序(ASC)紀錄進行排序)

```SQL
SELECT column1, column2,...
FROM table_name
ORDER BY column1 (ASC|DESC), column2 (ASC|DESC), ...;
```

```sql
SELECT*
FROM employees
ORDER BY age ;
```

![Relational Database](../img/SQL/29.png)

```SQL
SELECT*
FROM employees
ORDER BY age DESC;
```

![Relational Database](../img/SQL/30.png)

- 查詢表格中的資料時，可以用 WHERE 過濾資料:

```sql
SELECT column1, column2,...
FROM table_name
WHERE condition;
```

> WHERE 中可以使用以下運算符號: `=`,`<`,`<=`,`>`,`>=`,`<>`,IN,BETWEEN,`!=`等等。

```sql
SELECT employeeID, age, departmentID
FROM employees
WHERE departmentID = 1
ORDER BY age;
```

![Relational Database](../img/SQL/31.png)

```sql
SELECT employeeName,salary, departmentID
FROM employees
WHERE departmentID = 1 AND salary >=2000
```

![Relational Database](../img/SQL/32.png)

- JOIN 用於根據兩個或多個表之間相關 COLUMN 的組合。JOIN 的語法為:

```SQL
SELECT column1, column2,...
FROM table1
JOIN table2 ON table.columnName = table2.columnName;
```

```SQL
CREATE TABLE department(
  departmentID INT PRIMARY KEY,
  departmentName VARCHAR(20),
  address VARCHAR(20),
  headID INT
)
```

```SQL
INSERT INTO department
VALUES (1, "North Cement Ltd." ,"NY No.11" ,101);

INSERT INTO department
VALUES (2, "South Cement Ltd." ,"CA No.15" ,102);
```

```sql
SELECT *
FROM department d
JOIN employees e
ON d.headID = e.employeeID;
```

> Let A and B be subsets of S. The Cartesian Prodcut (or cross product) of A and B, denoted by A x B is defined by:

\[
A \times B = \{ (a, b) \mid a \in A, b \in B \}
\]
