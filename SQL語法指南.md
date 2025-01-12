# SQL 語法教學

## 目錄

- [基本結構](#基本結構)
- [查詢數據 (`SELECT`)](#1-查詢數據-select)
- [插入數據 (`INSERT`)](#2-插入數據-insert)
- [更新數據 (`UPDATE`)](#3-更新數據-update)
- [刪除數據 (`DELETE`)](#4-刪除數據-delete)

---

## 基本結構

SQL（Structured Query Language）是一種用於與關聯式資料庫進行交互的語言，主要分為以下幾類：

1. **資料操作語言 (DML)**：處理數據。

   - `SELECT`
   - `INSERT`
   - `UPDATE`
   - `DELETE`

2. **資料定義語言 (DDL)**：定義數據結構。

   - `CREATE`
   - `ALTER`
   - `DROP`

3. **資料控制語言 (DCL)**：控制數據訪問。
   - `GRANT`
   - `REVOKE`

---

## 1. 查詢數據 (`SELECT`)

```sql
SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column ASC|DESC;
```

### 說明

- SELECT：選擇要顯示的欄位。
- FROM：指定資料來源表格。
- WHERE：條件篩選。
- ORDER BY：排序結果。

```sql
SELECT name, age
FROM users
WHERE age > 18
ORDER BY age DESC;
```

> 查詢 users 表格中年齡大於 18 的用戶，並按年齡降序排列。

## 2. 插入數據 (`INSERT`)

```sql
INSERT INTO table_name (column1, column2)
VALUES (value1, value2);
```

### 說明

- INSERT INTO：插入數據到表格。
- VALUES：對應欄位的值。

```sql
INSERT INTO users (name, age)
VALUES ('Alice', 25);
```

> 新增一筆記錄到 users 表格，名稱為 Alice，年齡為 25。

## 3.更新數據 (UPDATE)

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
```

### 說明

- UPDATE：修改表格中的數據。
- SET：設定新的欄位值。
- WHERE：限制修改範圍。

```sql
UPDATE users
SET age = 26
WHERE name = 'Alice';
```

> 將 users 表格中名稱為 Alice 的年齡更新為 26。

## 4.刪除數據 (DELETE)

```sql
DELETE FROM table_name
WHERE condition;
```

### 說明

- DELETE：刪除表格中的數據。
- WHERE：限制刪除範圍。

```sql
DELETE FROM users
WHERE age < 18;
```

> 此內容已經包含了目錄及對應的教學章節，方便快速導航和學習！
