# 目錄

- [第一章 JavaScript 引擎](#第一章-JavaScript-引擎)
- [第二章 變數與賦值](#第二章-變數與賦值)
- [第三章 常見 JavaScript 函數和 Lexical Structure](#第三章-常見-JavaScript-函數和-Lexical-Structure)
- [第四章 資料類型 Data Type](#第四章-資料類型-Data-Type)
- [第五章 JavaScript Operators](#第五章-JavaScript-Operators)
- [第六章 if statement](#第六章-if-statement)
- [第七章 Codeing Convention and Restrictions](#第七章-Codeing-Convention-and-Restrictions)
- [第八章 JavaScript Function](#第八章-JavaScript-Function)
- [第九章 Loop 迴圈](#第九章-Loop-迴圈)
- [第十章 Nested Loop 巢狀迴圈](#第十章-Nested-Loop-巢狀迴圈)
- [第十一章 Array 陣列](#第十一章-Array-陣列)
- [第十二章 Object 物件](#第十二章-Object-物件)
- [第十三章 Math Object](#第十三章-Math-Object)

# 第一章 JavaScript 引擎

> JavaScript 並不是由任何程式語言所寫成。它只是一個由歐洲電腦製造協會(ECMA)所訂的標準。瀏覽器內部的 JavaScript 程式碼，讓 JavaScript 程式碼可以運作

> JavaScript 最有名的標準更新在 2015 年，被稱為 ECMA2015 或是 ES6

## NaN 和 Infinity

> 在 JavaScript 的數字當中，兩個最特別的分別是 NaN 以及 Infinity。兩個的資料類型都是 number。

- NaN 屬性表示 Not-A-Number 的值。當我們嘗試使用 String 或其他資料類型進行一些數學計算時，若無法計數值，就會出現 NaN。

- Infinity 值(正無窮大)大於其他任何數值。負無窮大則是-Infinity。任何乘以 Infinity 的正整數都是 Infinity， 除以 Infinity 的任何數都是 0

  ```js
  console.log(typeof Infinity); //number
  ```

## Spread Syntax and Rest Parameters

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
