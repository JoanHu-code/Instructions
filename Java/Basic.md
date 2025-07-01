# 目錄

- [Java 基本介紹](#Java-基本介紹)
- [環境設定和基本安裝](#環境設定和基本安裝)
- [第一支Java程式](#第一支Java程式)
- [基本語法](#基本語法)
  - [基本介紹](#基本介紹)
  - [變量和賦值](#變量和賦值)
  - [Data Type](#Data-Type)
  - [String Operation](#String-Operation)
  - [關係 條件運算符](#關係-條件運算符)
  - [Arithmetic Operator](#Arithmetic-Operator)
  - [if statement](#if-statement)
  - [Array and ArrayList](#Array-and-ArrayList)
  - [2D Array](#2D-Array)
  - [For Loop](#For-Loop)
  - [while Loop](#while-Loop)
  - [Nested Loops 巢狀迴圈](#Nested-Loops-巢狀迴圈)
  - [break continue](#break-continue)
  - [Java 圖形用戶介面](#Java-圖形用戶介面)
  - [Loop Lab](#Loop-Lab)
  - [Java Method](#Java-Method)
  - [Return Keyword](#Return-Keyword)
  - [Method Overloading](#Method-Overloading)
  
## Java 基本介紹

**什麼是Java?**

Java 是一種廣泛使用的電腦程式設計語言，擁有跨平台、物件導向等特性，廣泛應用於企業級Web應用開發和各種行動應用開發。例如: Android Apps,數據中心和超級計算機，桌面應用程序，數據庫連接，資料視覺化以及數據分析，都可以見到Java的應用。許多政府機關、醫療、教育、國防以及電子交易系統也是用Java做成的!

簡單來說，Java是非常受歡迎的程式語言，可以運用在各種領域，支援性非常強大！此外，Java是跨平台的程式語言，寫一份程式碼，就可以在多個平台上運行

Java優點包含：

1. 跨平台、相容性高

2. 可以做各式各樣的應用，不論是網站、應用程式、使用者圖形介面、網頁伺服器，都可以透過Java撰寫而成。

3. 市場需求高，很難找不到工作。

缺點包含：

1. 執行速度緩慢（相較於C++）

2. 需要經過編譯（compile）。跟Python等直譯語言相比，Java需要先經過轉換，才能被執行

## 環境設定和基本安裝

> 判定是否已安裝java

```shell
java -version
```
若沒有呈現東西，那可以到下面網址安裝，安裝完後再打上面指令看是否有安裝成功

[安裝網址](https://adoptium.net/temurin/release/)

在 Windows上，Java通常安裝在C:/Program Files/Java 目錄中。可以檢查此文件夾是否存在

> 安裝IDE 

整合開發環境(Integrated development environment) 是一種輔助程式開發軟體的應用軟體，在開發工具內部就可以輔助編寫原始碼文字、並編譯打包成為可用的程式，通常包刮除錯器以及文字修正功能。

常用的Java IDE 包含:

1. Eclipse (屬於Linux基金會，財大氣粗，功能非常強大，也支援其他語言)

2. IntelliJ IDEA(號稱地球最強Java開發神器，背靠JetBrains這棵大樹)

3. VS Code (微軟開發的輕量級程式碼編輯器。嚴格來說，算不上是IDE，卻比IDE好用)

4. NetBeans(Apache基金會出品必屬精品)

## 第一支Java程式

在Java中，所有程式碼是以.java做結尾的純文本文件。這些文件後由javac(Java Compiler)編譯器編譯成.class文件。.class文件包含Java虛擬機(Java Virtual Machine)的機器語言。最後，Java啟動器工具使用Java虛擬機來運行我們寫的應用程序

![Java 說明](../img/Java/01.png)

**.Class文件在每個平台都是相同的，但JVM在每個作業系統或平台當中都是不一樣的。這是為何Java有平台獨立性(platform-independent)。每個平台在安裝Java時，都會下載對應的JVM。**

> .java檔案名稱，須以大寫為開頭

- Main.java

```java
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, world!");
  }
}
```

> 打開命令提是字元(cmd)，cd到放Main.java的目錄打

```shell
javac Main.java
```

![Java 說明](../img/Java/02.png)
![Java 說明](../img/Java/03.png)
![Java 說明](../img/Java/04.png)


## 基本語法

### 基本介紹

**函數(Functions. Methods)**

f(x) = 3x+6

f(x): 函數名稱
x: 輸入(input)
3x+6: 輸出(output)

會有一個函數名稱，一個輸入和輸入，根據輸入的不同會得到不同的輸出。此外，一個函數應該只返回一個值(如果一個input導致兩個不同的output，那麼f(x)就不是一個函數。)

同樣的概念也是用於Java函數。在Java函數中，我們可以提供或不提供任何input；然後，我們從該函數或的一個output

**Class 規則**

1. Class名稱一定要跟文件名稱相同
2. Class名稱一定要大寫英文字母當開頭
3. public static void main(String[] args)會被執行。這是Java的規定，每個字都不能少。

> 若打 `psvm`就會出現`public static void main(String[] args)`

![基本語法](../img/Java/05.png)

> 打`sout`+Tab鍵會直接出現`System.out.println()`

![基本語法](../img/Java/06.png)

![基本語法](../img/Java/07.png)

### 變量和賦值

變數(variable)和賦值(assignment)是任何程式語言中的一些基本概念。變數就像我們存儲值的容器。由於變數內部的值可以不斷改變，它被稱之為『變數』。

Java 當中的等號與數學中使用的等號概述不同!!在Java中，等號是"賦值"，意思是把等號右邊的數據放在等號左邊；因此，我們可以這樣做

```
x=5,x=x+1
```

經過執行後，x的值會變成6


```Java
public class Main{
  public static void main(String[] args){
    int x = 5; // variables x data type => integer
    // x = x + 1;
    x += 1;
    System.out.println(x);
  }
}
```

![基本語法](../img/Java/08.png)

**語法糖是將x=x+1更改為x+=1。這在Java中極為常見。**

**變數名稱可由英文、數字、底線以及$構成，但不能由數字當開頭，變數名稱不能為Java關鍵字(reserved words)。**

#### 常量(constants)

我們可以定義不能改變的量，稱為常量(constants)。在Java的variable declaration當中加入final keyword，就可以把設定constant variable。另外，寫程式者習慣(非強迫性)的會把constants全部用大寫英文字母表示。

其他命名規範或是習慣包含:

1. ClassName uses camelCase if needed and starts with an uppercase letter.
2. variables use camelCase if needed and start with a lowercase letter.
3. CONSTANTS uses all uppercase letter and use _ if needed. For example, MAX_VALUE.

![基本語法](../img/Java/09.png)

**Java 當中有內見的常數**


### Data Type

> Java 當中常見的資料類型(Data Type)有以下幾類:

- var: 可用於任何資料類型
- int: Integer整數。使用32bits儲存數據
- long: 整數，但使用64bits儲存數據
- double: 帶有小數點的數。使用64bits儲存數據，因此，精準度較float更高。
- float: 帶有小數點的數。使用32bits儲存數據。
- char: Character 單一字母(單引號)。
- String: a sequence of characters 字串(雙引號)。
- boolean: true或false。

**使用var有兩個限制:1.不能用在fields；2.不能在沒有初始值的ㄅ變數上使用。**

**Primitive(原始) 資料類型**

Primitive類型由Java預先定義並由保留關鍵字命名。Primitive值不與其他Primitive值共享狀態。Java語言支持的八種原始數據類型是: byte, short,int,long,float,double,boolean,char。除此之外的鎖有資料類型都是Non-primitive!

常見的Non-primitives資料類型包含: String,Array,Arraylist,Class

注意!!在Java當中的Non-primitive資料類型都是大寫開頭，Primitive類型都是由小寫開頭，因此，我們可以透過第一個字母的大小寫來判斷資料的性質!

### String Operation

**method**

1. length()

```java

public class Main{
  public static void main(String[] args){
    String name = "Wilson";
    System.out.println(name.length());  
  }
}

```

![基本語法](../img/Java/10.png)

2. 轉換大小寫

```java

public class Main{
  public static void main(String[] args){
    String name = "Wilson";
    System.out.println(name.toLowerCase());  
  }
}

```

![基本語法](../img/Java/11.png)

```java

public class Main{
  public static void main(String[] args){
    String name = "Wilson";
    System.out.println(name.toUpperCase());  
  }
}

```

![基本語法](../img/Java/12.png)

3. index索引: for any String , index: 0,1,2,3...,(n-1)

```java

public class Main{
   public static void main(String[] args){
      String name = "Wilson";
      System.out.println(name.charAt(0));
      System.out.println(name.charAt(name.length()-1));
   }
}

```

![基本語法](../img/Java/13.png)

4. 反向尋找index

```java

public class Main{
   public static void main(String[] args){
      String name = "Wilson";
      System.out.println(name.indexOf('s'));
   }
}

```

![基本語法](../img/Java/14.png)

```java

public class Main{
   public static void main(String[] args){
      String name = "Wilson";
      System.out.println(name.indexOf("il"));
   }
}

```

![基本語法](../img/Java/15.png)

> 只會顯示開始的值

5. 字串轉文字

```java

public class Main{
   public static void main(String[] args){
      String age = "25";
      System.out.println(Integer.parseInt(age)); //Java built-in method
   }
}

```

![基本語法](../img/Java/16.png)

### 關係 條件運算符

### Arithmetic Operator

### if statement

### Array and ArrayList

### 2D Array

### For Loop

### while Loop

### Nested Loops 巢狀迴圈

### break continue

### Java 圖形用戶介面

### Loop Lab

### Java Method

### Return Keyword

### Method Overloading