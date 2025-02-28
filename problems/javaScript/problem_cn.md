# 目錄

- [第一題 反轉陣列](#第一題-反轉陣列)
- [第二題 找出最大值](#第二題-找出最大值)
- [第三題 加總數值](#第三題-加總數值)
- [第四題 等差數列](#第四題-等差數列)
- [第五題 九九乘法表](#第五題-九九乘法表)
- [第六題 第一個字母是否為大寫](#第六題-第一個字母是否為大寫)
- [第七題 所有字母是否為大寫](#第七題-所有字母是否為大寫)

# 第一題 反轉陣列

試試看，用課程學過的語法，將一個 array 內部的所有元素反過來!

(禁止使用 Array.prototype.reverse()。另外，考慮時間複雜度，需要在 O(n)內，不能是 O(n^2))

例如:

const friends = ["Harry", "Ron", "Snap", "Mike", "Grace"];

會變成

["Grace", "Mike", "Snap","Ron","Harry"];

[解答](#第一題解答)

---

# 第二題 找出最大值

在這個 coding 練習裡面，你要寫一個函式，他可以接受一個 parameter，參數是一個 array of numbers。這個函式要 return 一個值，也就是 Array 當中最大的數! 若是 input 是一個 empty array，則 return undefined。例如：

findBiggest([15, 20, 22, 16, 7]); // return 22

findBiggest([1, 2, 3, 4, 5, 999]); // return 999

findBiggest([-11, 0, -3, -4, -5, -999]); // return 0

findBiggest([]); // return undefined

[解答](#第二題解答)

---

# 第三題 加總數值

addUpTo() 這個函式有大於 0 的參數 n，n 為一個正整數。 addUpTo() 要 return 1 + 2 + 3 + ..... + n 的值。

例如:

addUpTo(5) = 1 + 2 + 3 + 4+ 5 = 15

addUpTo(100) = 1 + 2 + 3 + 4 + 5 + ....... + 100 = 5050

addUpTo(5); // 15

addUpTo(100); // 5050

addUpTo(5000); // 12502500

addUpTo(100000); // 5000050000

[解答](#第三題解答)

---

# 第四題 等差數列

編寫一個名為“printEvery3()”的函式，它打印出等差數列 1, 4, 7, …, 88。

[解答](#第四題解答)

---

# 第五題 九九乘法表

編寫一個名為 table9to9 的函式，它打印出九九乘法表的內容。

[解答](#第五題解答)

---

# 第六題 第一個字母是否為大寫

編寫一個名為 isUpperCase 的函式，唯一的參數是一個 String，其功能為來檢查參數中 String 的第一個字母是否為大寫。

[解答](#第六題解答)

---

# 第七題 所有字母是否為大寫

編寫一個名為 isAllUpperCase 的函式，唯一的參數是一個 String，其功能為來檢查參數中 String 的所有字母是否為大寫。

[解答](#第七題解答)

---

# 第一題解答

```js
const friends = ["Harry", "Ron", "Snap", "Mike", "Grace"];
let arr = friends;
for (let i = 0; i < arr.length; i++) {
  friends[i] = arr[arr.length - i - 1];
}
console.log(friends);
```

[01](../javaScript/01.js)

---

# 第二題解答

```js
function findBiggest(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
console.log(findBiggest([15, 20, 22, 16, 7]));
console.log(findBiggest([1, 2, 3, 4, 5, 999]));
console.log(findBiggest([-11, 0, -3, -4, -5, -999]));
console.log(findBiggest([]));
```

[02](../javaScript/02.js)

---

# 第三題解答

> 時間複雜度 O(n)

```js
function addUpTo(num) {
  let total = 0;
  for (let i = 0; i <= num; i++) {
    total += i;
  }
  return total;
}
console.log(addUpTo(5));
console.log(addUpTo(100));
console.log(addUpTo(5000));
console.log(addUpTo(100000));
```

[03_1](../javaScript/03_1.js)

> 時間複雜度 O(1)

```js
function addUpTo(num) {
  return ((num + 1) * num) / 2;
}
console.log(addUpTo(5));
console.log(addUpTo(100));
console.log(addUpTo(5000));
console.log(addUpTo(100000));
```

[03_2](../javaScript/03_2.js)

> 計算效能

```js
function addUpTo1(num) {
  return ((num + 1) * num) / 2;
}
let startTime1 = performance();
console.log(addUpTo1(100000));
let endTime1 = performance();
console.log(endTime1 - startTime1);

function addUpTo2(num) {
  let total = 0;
  for (let i = 0; i <= num; i++) {
    total += i;
  }
  return total;
}
let startTime2 = performance();
console.log(addUpTo2(100000));
let endTime2 = performance();
console.log(endTime2 - startTime2);
```

[03_3](../javaScript/03_3.js)

---

# 第四題解答

```js
function printEvery3() {
  for (let i = 1; i <= 88; i += 3) {
    console.log(i);
  }
}
printEvery3();
```

[04_for](../javaScript/04_for.js)

```js
function printEvery3() {
  let i = 1;
  while (i < 88) {
    console.log(i);
    i += 3;
  }
}
printEvery3();
```

[04_while](../javaScript/04_while.js)

```js
function printEvery3() {
  let i = 1;
  do {
    console.log(i);
    i += 3;
  } while (i <= 88);
}
printEvery3();
```

[04_do_while](../javaScript/04_do_while.js)

---

# 第五題解答

```js
function table9to9() {
  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      console.log(i + " x " + j + " = " + i * j);
    }
  }
}
table9to9();
```

[05](../javaScript/05.js)

---

# 第六題解答

```js
function isUpperCase(str) {
  let upperCase = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  for (let i = 0; i < upperCase.length; i++) {
    if (str[0] == upperCase[i]) {
      return true;
    }
  }
  return false;
}

console.log(isUpperCase("ABCD"));
console.log(isUpperCase(""));
console.log(isUpperCase("aBCD"));
```

[06_01](../javaScript/06_1.js)

```js
function isUpperCase(str) {
  if (str.length <= 0) {
    return false;
  } else {
    return str[0] == str[0].toUpperCase();
  }
}
console.log(isUpperCase("ABCD"));
console.log(isUpperCase(""));
console.log(isUpperCase("aBCD"));
```

[06_02](../javaScript/06_2.js)

---

# 第七題解答

```js
function isAllUpperCase(str) {
  let upperCase = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  if (str.length <= 0) {
    return false;
  }
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < upperCase.length; j++) {
      if (str[i] == upperCase[j]) {
        break;
      } else if (upperCase[j] == "Z") {
        return false;
      }
    }
  }

  return true;
}

console.log(isAllUpperCase("ABCD"));
console.log(isAllUpperCase(""));
console.log(isAllUpperCase("ABCDEFGHIJKLm"));
```

[07_01](../javaScript/07_01.js)

```js
function isAllUpperCase(str) {
  if (str.length <= 0) {
    return false;
  } else {
    let counter = 0;
    while (counter < str.length) {
      if (str[counter] == str[counter].toUpperCase()) {
        counter++;
      } else {
        return false;
      }
    }
    return true;
  }
}

console.log(isAllUpperCase("ABCD"));
console.log(isAllUpperCase(""));
console.log(isAllUpperCase("ABCDEFGHIJKLm"));
```

[07_02](../javaScript/07_02.js)

```js
function isAllUpperCase(str) {
  if (str.length <= 0) {
    return false;
  } else {
    for (let i = 0; i < str.length; i++) {
      if (str[i] != str[i].toUpperCase()) {
        return false;
      }
    }
    return true;
  }
}

console.log(isAllUpperCase("ABCD"));
console.log(isAllUpperCase(""));
console.log(isAllUpperCase("ABCDEFGHIJKLm"));
```

[07_03](../javaScript/07_03.js)

```js
function isAllUpperCase(str) {
  if (str.length <= 0) {
    return false;
  } else {
    return str == str.toUpperCase();
  }
}

console.log(isAllUpperCase("ABCD"));
console.log(isAllUpperCase(""));
console.log(isAllUpperCase("ABCDEFGHIJKLm"));
```

[07_04](../javaScript/07_04.js)

---

# 第八題解答

```js

```

[08]()

---

# 第九題解答

```js

```

[09]()

---

# 第十題解答

```js

```

[10]()

---

# 第十一題解答

```js

```

[11]()

---

# 第十二題解答

```js

```

[12]()

---

# 第十三題解答

```js

```

[13]()

---

# 第十四題解答

```js

```

[14]()

---

# 第十五題解答

```js

```

[15]()

---

# 第十六題解答

```js

```

[16]()

---

# 第十七題解答

```js

```

[17]()

---

# 第十八題解答

```js

```

[18]()

---

# 第十九題解答

```js

```

[19]()

---

# 第二十題解答

```js

```

[20]()

---

# 第二十一題解答

```js

```

[21]()

---

# 第二十二題解答

```js

```

[22]()

---

# 第二十三題解答

```js

```

[23]()

---

# 第二十四題解答

```js

```

[24]()

---

# 第二十五題解答

```js

```

[25]()

---

# 第二十六題解答

```js

```

[26]()

---

# 第二十七題解答

```js

```

[27]()

---

# 第二十八題解答

```js

```

[28]()

---

# 第二十九題解答

```js

```

[29]()

---

# 第三十題解答

```js

```

[30]()
