# 目錄

- [JavaScript 引擎](#JavaScript-引擎)
- [NaN 和 Infinity](#NaN-和-Infinity)
- [Spread Syntax and Rest Parameters](#Spread-Syntax-and-Rest-Parameters)
- [Primitive, Reference Data Types](#Primitive-Reference-Data-Types)
- [JavaScript String Comparison](#JavaScript-String-Comparison)
- [進階 Array Methods](#進階-Array-Methods)
- [第七章 Codeing Convention and Restrictions](#第七章-Codeing-Convention-and-Restrictions)
- [第八章 JavaScript Function](#第八章-JavaScript-Function)
- [第九章 Loop 迴圈](#第九章-Loop-迴圈)
- [第十章 Nested Loop 巢狀迴圈](#第十章-Nested-Loop-巢狀迴圈)
- [第十一章 Array 陣列](#第十一章-Array-陣列)
- [第十二章 Object 物件](#第十二章-Object-物件)
- [第十三章 Math Object](#第十三章-Math-Object)

# JavaScript 引擎

> JavaScript 並不是由任何程式語言所寫成。它只是一個由歐洲電腦製造協會(ECMA)所訂的標準。瀏覽器內部的 JavaScript 程式碼，讓 JavaScript 程式碼可以運作

> JavaScript 最有名的標準更新在 2015 年，被稱為 ECMA2015 或是 ES6

# NaN 和 Infinity

> 在 JavaScript 的數字當中，兩個最特別的分別是 NaN 以及 Infinity。兩個的資料類型都是 number。

- NaN 屬性表示 Not-A-Number 的值。當我們嘗試使用 String 或其他資料類型進行一些數學計算時，若無法計數值，就會出現 NaN。

- Infinity 值(正無窮大)大於其他任何數值。負無窮大則是-Infinity。任何乘以 Infinity 的正整數都是 Infinity， 除以 Infinity 的任何數都是 0

  ```js
  console.log(typeof Infinity); //number
  ```

# Spread Syntax and Rest Parameters

- Spread Syntax 允許在需要零個或多個參數(例如,function invocation)或元素(例如,array 的內部元素)的地方，去擴展 array 內部的元素

  - 語法:

    ```pseudocode
    myFunction(a,...iterableObj,b)
    [1,...iterableObj,'4','five',6]
    ```

  - 用法:

    - 複製 array

      ```js
      const arr = [1, 2, 3];
      const arr2 = [...arr]; // copy by value
      arr2.push(4);
      console.log(arr);
      console.log(arr2);
      ```

    - 合併 array

      ```js
      const arr = [1, 2, 3];
      const arr2 = [4, 5, 6];
      let result = [...arr, arr2];
      console.log(result);
      ```

    - 也可以用在 傳入 function 參數上面(function invocation)

      ```js
      function sum(x, y, z) {
        return x + y + z;
      }
      let arr = [1, 2, 3];
      console.log(sum(...arr)); //6
      ```

      ```js
      function sum(a, b, c, x, y) {
        return x + y + z;
      }
      let arr = [1, 2, 3];
      console.log(sum(10, ...arr, 5)); //21
      ```

    - 多個 Array 合併

      - ❌

        ```js
        let arr1 = [1, 2, 3];
        let arr2 = [4, 5, 6];
        console.log(arr1 + arr2); //1,2,34,5,6

        let result = arr1 + arr2;
        console.log(typeof result); //String
        ```

      - ✅

        - 第一種做法:

          ```js
          let arr1 = [1, 2, 3];
          let arr2 = [4, 5, 6];
          let result = [...arr1, ...arr2];
          console.log(result);
          ```

        - 第二種做法:

          ```js
          let arr1 = [1, 2, 3];
          let arr2 = [4, 5, 6];
          let result = arr1.concat(arr2);
          console.log(result);
          ```

- Rest Parameters 語法幾乎和 Spread Syntax 一樣。然而,Spread Syntax 是擴展 array 中的元素，而 Rest Parameters 是收集多個元素並將他們「壓縮」為單個 JS array。

  - 語法

    ```pseudocod
     function f(a,b,...theArgs){
        //...
     }
    ```

  - 用法:(function definition)
    ```js
    function sum(...theArgs) {
      let result = 0;
      theArgs.forEach((item) => {
        result += item;
      });
      return result;
    }
    console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
    ```

# Primitive, Reference Data Types

> 在 JavaScript 的 Primitive Data Type 代表著他們不是 Object，每個 Primitive Data Types 都沒有自己的 attributes 和 methods。此外，裝有 Primitive Data Types 的 variable 確實擁有數值，而不僅僅是對其數值得記憶體位置的 reference。

> Object 和 Array 都是 Reference Data Type。Reference Data Type 變數中，儲存的值是 Reference，也就是記憶體的位置，指向儲存真實內容的記憶體區塊的位置。

**Primitive Coercion**

- 既然 Primitive Data Type 沒有自己的 attributes 和 methods，為何我們可以使用`.length`或是`.toFixed()`呢?

- 當 Primitive Data Type 使用 attributes 和 methods 時，JavaScript 將值自動把數值裝箱到 wrapper object 中，並改為訪問該 wrapper object 上的屬性。

- 例如:`"foo".includes("f")`會把`"foo"`放到 new String("foo")當中，並且執行 new String("foo")，從 String 繼承而來的 String.protoype.include()。

- 這種自動裝箱行為在 JavaScript 代碼中是不可觀察的。這就叫做 Primitive Coercion。

- 如果我們願意，可以在創建 String 的時候，就使用 wrapper object 來製作。但這樣做會造成 RAM 的非必要耗損，且 wrapper object 所製作的時間要遠大於 primitive data type，code 完成時間會被拖延，所以 MDN 強烈不推薦使用這種寫 code 的方式。

- ✅ 推薦: 因為 javaScript 會自動轉成下面那種，讓我們可以使用 attributes 和 methods。

  ```js
  let myName = "Wilson";
  console.log(typeof myName); //string
  ```

- ❌ 不推薦: 要把所有有關這物件的 attributes 和 methods 都導入，會花較久的時間

  ```js
  let myName = new String("Wilson");
  console.log(typeof myName); //object
  ```

```js
const { performance } = require("perf_hooks"); // node.js

let stratTime = performance.now();

for (let i = 0; i < 1000000000; i++) {
  let a = new String("test");
}

let endTime = performance.now();
let timeDiff = endTime - stratTime;
console.log("Object performance" + timeDiff); //Object performance 12595.5022

let stratTime = performance.now();
for (let i = 0; i < 1000000000; i++) {
  let a = "test";
}
let endTime = performance.now();
let timeDiff = endTime - stratTime;
console.log("String performance" + timeDiff); //String performance 551.7667999999994
```

![performance](../../img/javascript/19.png)

# JavaScript String Comparison

> JavaScript 如同大部分的程式語言一樣，String 之間的比較都是採用 compared lexicographically(字典式的比較法)。在英文字典中，排序單詞的順序是先按照第一格字母以升序排列(即 a、b、c....z 的順序)；如果第一個字母一樣，那麼比較第二個、第三個乃至後面的字母

- JavaScript 的 String 之間的比較中，在字典順序中較後面者會大於較前面者，所以:

  - "z">"y">...>"b">"a"
  - "9">"8">...>"2">"1"

  ```js
  console.log("abandon" < "apple"); //true
  console.log("12" < "2"); //true
  ```

# 進階 Array Methods

- arr.map(callbackFn): 創建一個新 array，其中填充了在 arr 中的每個元素上調 callbackFn 的結果。每次 callbackFn 執行時，返回的值都會添加到新 array 內部

  ```js
  let languages = ["Python", "Java", "C++", "PHP", "JS"];
  let result = languages.map((lang) => lang.toUpperCase());
  console.log(result); //[ 'PYTHON', 'JAVA', 'C++', 'PHP', 'JS' ]
  ```

  ```js
  const languages = [
    { name: "Python", rating: 9.5, popularity: 9.7, trending: "super hot" },
    { name: "Java", rating: 9.4, popularity: 8.5, trending: "hot" },
    { name: "C++", rating: 9.2, popularity: 7.7, trending: "hot" },
    { name: "PHP", rating: 9.0, popularity: 5.7, trending: "decreasing" },
    { name: "JS", rating: 8.5, popularity: 8.7, trending: "hot" },
  ];
  let result = languages.map((lang) => lang.name.toUpperCase());
  console.log(result); //[ 'PYTHON', 'JAVA', 'C++', 'PHP', 'JS' ]
  ```

- arr.find(callbackFn): 返回 arr 中滿足 callbackFn 條件的第一個元素(也就是第一個使 callbackFn 做 return true 的元素)。如果沒有值滿足 callbackFn 條件，則返回 undefined。

  ```js
  const languages = [
    { name: "Python", rating: 9.5, popularity: 9.7, trending: "super hot" },
    { name: "Java", rating: 9.4, popularity: 8.5, trending: "hot" },
    { name: "C++", rating: 9.2, popularity: 7.7, trending: "hot" },
    { name: "PHP", rating: 9.0, popularity: 5.7, trending: "decreasing" },
    { name: "JS", rating: 8.5, popularity: 8.7, trending: "hot" },
  ];
  let result = languages.find((lang) => lang.popularity > 9.5);
  console.log(result); //{ name: 'Python', rating: 9.5, popularity: 9.7, trending: 'super hot' }

  result = languages.find((lang) => lang.popularity > 9.8);
  console.log(result); //undefined
  ```

- arr.filter(callbackFn): 過濾出在給定 arr 中通過在 callbackFn 會 return true 的元素。Return value 是 A shallow copy of a portion of arr。

  ```js
  const languages = [
    { name: "Python", rating: 9.5, popularity: 9.7, trending: "super hot" },
    { name: "Java", rating: 9.4, popularity: 8.5, trending: "hot" },
    { name: "C++", rating: 9.2, popularity: 7.7, trending: "hot" },
    { name: "PHP", rating: 9.0, popularity: 5.7, trending: "decreasing" },
    { name: "JS", rating: 8.5, popularity: 8.7, trending: "hot" },
  ];
  let result = languages.filter((lang) => lang.rating >= 9.2);
  console.log(result); //[{name: 'Python',rating: 9.5,popularity: 9.7,trending: 'super hot'},{ name: 'Java', rating: 9.4, popularity: 8.5, trending: 'hot' },{ name: 'C++', rating: 9.2, popularity: 7.7, trending: 'hot' }]

  result = languages.find((lang) => lang.popularity > 9.8);
  console.log(result); //[]
  ```

- arr.some(callbackFn): 給定 callbackFn，測試 arr 中是否至少有一個元素，通過 callbackFn 的測試(是否至少有一元素會 return true)。some()的 return type 是 boolean。

  ```js
  const languages = [
    { name: "Python", rating: 9.5, popularity: 9.7, trending: "super hot" },
    { name: "Java", rating: 9.4, popularity: 8.5, trending: "hot" },
    { name: "C++", rating: 9.2, popularity: 7.7, trending: "hot" },
    { name: "PHP", rating: 9.0, popularity: 5.7, trending: "decreasing" },
    { name: "JS", rating: 8.5, popularity: 8.7, trending: "hot" },
  ];
  let result = languages.some((lang) => lang.rating >= 9.2);
  console.log(result); //true
  result = languages.some((lang) => lang.popularity > 9.8);
  console.log(result); //false
  ```

- arr.every(callbackFn): 給定 callbackFn，測試 arr 中是否所有的元素都通過 callbackFn 的測試(是否所有元素都會 return true)。every()的 return type 是 boolean。

  ```js
  const languages = [
    { name: "Python", rating: 9.5, popularity: 9.7, trending: "super hot" },
    { name: "Java", rating: 9.4, popularity: 8.5, trending: "hot" },
    { name: "C++", rating: 9.2, popularity: 7.7, trending: "hot" },
    { name: "PHP", rating: 9.0, popularity: 5.7, trending: "decreasing" },
    { name: "JS", rating: 8.5, popularity: 8.7, trending: "hot" },
  ];
  let result = languages.every((lang) => lang.rating >= 9.2);
  console.log(result); //fasle
  result = languages.every((lang) => lang.popularity > 8.0);
  console.log(result); //false
  result = languages.every((lang) => lang.popularity > 5.0);
  console.log(result); //true
  ```

## Map vs. ForEach

[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

| 特性           | `map()`                                    | `forEach()`                                    |
| -------------- | ------------------------------------------ | ---------------------------------------------- |
| **回傳值**     | ✅ 產生新陣列（返回修改後的值）            | ❌ `undefined`（不回傳新陣列）                 |
| **用途**       | 適用於需要返回新陣列的情境                 | 適用於單純迭代執行副作用                       |
| **可鏈式呼叫** | ✅ 可繼續 `.filter()`、`.reduce()` 等      | ❌ 無法鏈式呼叫，因為回傳 `undefined`          |
| **修改原陣列** | ❌ 不會改變原陣列                          | ❌ 不會改變原陣列                              |
| **適用場景**   | 需要轉換陣列內容時，如調整數值、提取欄位等 | 只執行迴圈處理，如 `console.log()`、累加變數等 |

| Feature                     | `map()`                                                                     | `forEach()`                                                                     |
| --------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Return Value**            | ✅ Creates a new array (returns modified values)                            | ❌ `undefined` (does not return a new array)                                    |
| **Purpose**                 | Used when a new transformed array is needed                                 | Used for performing side effects only                                           |
| **Chaining**                | ✅ Can be chained with `.filter()`, `.reduce()`, etc.                       | ❌ Cannot be chained since it returns `undefined`                               |
| **Modifies Original Array** | ❌ No                                                                       | ❌ No                                                                           |
| **Use Case**                | When modifying array elements, such as changing values or extracting fields | When performing operations like `console.log()` or modifying external variables |
