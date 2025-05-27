# 目錄

- [AJAX 簡介](#AJAX-簡介)
- [同步與異步](#同步與異步)
- [Promise 物件](#Promise-物件)
- [json 與 fetch 補充](#json-與-fetch-補充)
- [Catching Errors](#Catching-Errors)
- [Combining Multiple Promise](#Combining-Multiple-Promise)
- [Async and Await](#Async-and-Await)
- [Nodejs Event Loop](#Nodejs-Event-Loop)
- [Race Condition](#Race-Condition)
- [Mutex 製作原因](#Mutex-製作原因)
- [Promise Based API](#Promise-Based-API)
- [連接到外部 API](#連接到外部-API)

# AJAX 簡介

Asynchronous JavaScript

- Ajax: 即「Asynchronous JavaScript and XML」(非同步的 JavaScript 與 XML 技術)，指的是一套綜合了多項技術的瀏覽器端網頁開發技術。

- AJAX 在客戶端使用各種 Web 技術來創建異步(asynchronous) Web 應用程序。應用程序可以在背景從服務器發送和獲得數據，而不干擾現有頁面的顯示和行為。通過將數據交換層與表示層分離，Ajax 允許網頁以及擴展的 Web 應用程序動態地更改內容，而無須重新加仔整個頁面。在實踐中，數據的傳送通常使用 JSON 而不是 XML。

- 常見的 Ajax 應用的例子是，我們在 Youtube 或是 Google 搜尋時，網站會根據我們前面打的幾個字，猜想我們要搜尋的關鍵字是什麼。這就是不干擾現有頁面的顯示和行為的情況下，從服務器發送和獲得數據，並且更新網頁的方法。

![AJAX](../../img/AJAX/01.png)

# 同步與異步

- 在電腦裡，異步(asynchronous)代表著一個 process 獨立於其他 process 運行，而同步(synchronous)代表著一個 process 僅在某個其他 process 完成或移交而運行

![AJAX](../../img/AJAX/02.png)

- 通常來說，JavaScript 的特性是 single-threaded synchronous，代表 JavaScript 是個一次只會做一件事情的程式語言。然而，JS 有內建的 asynchronous function，例如 setTimeout()。setTimeout() function 設置一個計時器，一旦計時器時間到，該計時器就會執行一個函數或指定的一段代碼。setTimeout()的語法為:

```js
setTimeout(code, delay);
```

- Code 是 delay 結束時要執行的程式碼，delay 是在執行指定的函數或代碼之前計時器應等待的時間(以毫秒為單位)。如果省略此參數，則使用值 0，表示"立即"執行。

```js
console.log("start");
setTimeout(() => {
  console.log("Here is the code.");
}, 2000);
console.log("end");
```

> 上面這段程式碼執行的結果是:

1. start
2. end
3. Here is the code.

# Promise 物件

- Promise 是現代 JavaScript 中異步編程的基礎。Promise 是由一個 asynchronous function 所 return 的物件,主要功能是, Promise 會代理一個建立時不用預先得知結果的值。

- Promise 使我們能夠接續著發動非同步操作後,最終的成功值(success value)獲失敗訊息(failure reason)的處理函式(handlers)。我們向伺服器傳送 request 之後,因為需要等待 response 的時間,所以我們會先的到一個 Promise,而這個 Promise 目前的狀態是「擱置」(pending)

- 一個 Promise 物件處於以下三種狀態:

1. 擱置(pending): 初始狀態，並不是 fulfilled 與 rejected。
2. 實現(fulfilled): 表示操作成功地完成
3. 拒絕(rejected): 表示操作失敗

Promise 在 pending 後的幾秒之內,狀態可能變成 fulfilled 或是 rejected。一個處於擱置(pending)狀態的 Promise，若操作成功，能夠將狀態變成 fulfilled，或是因為某些原因或錯誤，變成拒絕(rejected)狀態。當上述任一狀態轉換發生時，那些透過 then 方法所連結的 callback 就會被調用。

> promise 物件裡面有兩個 method，一個是 then()，另一個是 catch()，裡面需放 callback function 用於接住 fulfilled 的結果或 rejected 結果，在 pending 時是不會啟動的

![AJAX](../../img/AJAX/03.png)

```js
let promiseObject = fetch(URL);
promiseObject.then((data) => {
  console.log(data);
});
```

> Javascript Fetch API allows us to send HTTP resquests.
> 這段程式碼中，當 promiseObject 從 pending 變成 fulfilled 之後,`.then()`內部的 callback function 就會被 javascript 自動執行,執行時,帶入的參數就是從 URL 獲得的 HTTP Response 內容

![AJAX](../../img/AJAX/04.png)
![AJAX](../../img/AJAX/05.png)

> onFulfillment, onRejection are all callback functions. 另外 reject 後面通常是使用.catch()來接 onRejection

❌

```js
let promiseObject = fetch(URL);
fetchpromise.then((response) => {
  let jsonPromise = response.json(); // response=>json
  //.json() method is also
  //return promise object
  console.log(jsonPromise); //pending
});
```

✅

```js
let promiseObject = fetch(URL);
fetchpromise.then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});
```

> 很容易發生 callback hell 所以要改一下寫法

✅

```js
let promiseObject = fetch(URL);
fetchpromise.then((response)=>return response.json())
.then(data=>{
    console.log(data);
})
```

# json 與 fetch 補充

根據 MDN，在 JavaScript 內建的 fetch() 函式的定義是「starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available. The promise resolves to the Response object representing the response to your request.」

這段的中文意思是指，fetch() 本身的功能是寄送 HTTP request。其中，fetch 會 return 一個 promise 物件。這個 promise 物件在 HTTP response 被接收到時會從 pending 轉變成 fulfilled。另外，如果對 fetch() 所 return 的 promise 物件做 .then(callback) 時，JavaScript 自動帶入 callback 的參數會是一個「Response Object」。

（這個 Response Object 是 JavaScript 內建的一種物件，用來代表 HTTP response。）

其中需要特別注意的是，截圖中的第三段有提到規則「A fetch() promise only rejects when a network error is encountered (which is usually when there's a permissions issue or similar). A fetch() promise does not reject on HTTP errors (404, etc.). Instead, a then() handler must check the Response.ok and/or Response.status properties.」

這段的中文意思是指，如果遇到 HTTP status code 是 404 的情況，fetch() 的 promise 並不會出現 rejected 狀態，而是會變成 fulfilled 狀態。但我們可以用使用 Response Object 的 status 或 ok 等屬性來確定我們得到的 HTTP response 的狀態是 200 OK 還是 404 Not Found。

那麼，在什麼樣的情況下，fetch() Promise 才會變成 rejected 呢？其實在 MDN 這頁有說明：「The promise will only reject on network failure or if anything prevented the request from completing.」

這段的中文意思是指「只有當網路故障或有任何原因阻止請求完成時，該 Promise 才會變成 rejected。」在後面課程 Combining Multiple Promises 的影片中，我們就可以看到實際一個例子。當我們的網址是完全亂打時，因為沒有相對應的伺服器可以回傳 HTTP Response，所以會產生「TypeError: NetworkError when attempting to fetch resource."」由此可知這裡發生了網路錯誤，導致 Promise 就變成 rejected 狀態了。

最後，我補充一下 .json() method 的功能。.json()是 JavaScript Response Object 可用的 instance method。根據 MDN 的描述，.json() method 的功能是「The json() method of the Response interface takes a Response stream and reads it to completion. It returns a promise which resolves with the result of parsing the body text as JSON. Note that despite the method being named json(), the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.」

翻譯成中文就是：「.json() 讀取 Response Object 直到完成。此 method 會 return 一個 promise 物件，而該 promise 物件會帶有將 body text 解析為 JSON 的結果。儘管此 method 的名稱為 json()，但此 promise 物件帶有的結果是 JavaScript Object。」所以，我們使用 .json() 就可以將 fetch(URL) 所回傳的 Response Object 內部的文本資料取出。

例如，以「上一隻影片」的例子來說，我們執行 fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json") 時會發送一個 HTTP request 出去。收到的 HTTP response 的內容包含 header 以及 message section 兩個部分：

```shell
HTTP/1.1 200 OK
Content-Length: 300
Content-Type: text/json; charset=UTF-8

[{name: "bake beans", price: 0.4, image:"beans.jpg"}, {name: "hot dogs", price: 1.99, image:"hotdogs.jpg"}, ...]

```

以上的這個 HTTP response 會被 JavaScript 製作成上面有提到過的「Response Object」：

![AJAX](../../img/AJAX/06.png)

但我們只能看到跟 header 有關的資訊，例如 status code 是 200、okay 是 true 等等，而無法看到 HTTP response 中的 message section 中的數據。因此，我們需要使用 JavaScript 中 Response Object 的 .json() method，將 message section 中的文字透過 .json() 轉換成 JavaScript 物件後才能夠使用。這就是使用 .json() 的目的。

[mdn](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

# Catching Errors

為了支持錯誤處理, Promise 物件提供了一個 catch() 方法, 跟 then()很像。我們調用.catch()時，傳入一個 callback function 當作參數。傳遞給 catch()的處理函數在異步操作失敗時會自動被 JavaScript 調用。catch()內部的 callback function 被調用時，參數會被放入錯誤訊息，通常以變數 e 或是 err 代表錯誤(error)。

當串聯多個`.then`語句時，後一個`.then()`內部的 callback function 被執行時，所用的參數是前一個`.then()`中的 callback function 索回傳的值

如果將 catch()添加到 Promise Chain 的末尾,那麼當任何異步函數調用失敗時都會調用到它。

```js
let fetchPromise = fetch(url);
fetchPromise
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });
```

# Combining Multiple Promise

當我們的操作由多個異步函數組成時,我們需要用到 promise chaining,讓我們在開始下一個函數之前完成前一個函數。這種情況下,每個 Promise 都互相依賴。

有時,我們需要所有 Promise 都被 fulfilled,但它們並不相互依賴。在這種情況下,將它們全部一起啟動,然後在它們全部 fulfilled 時收到通知會更有效。JavaScript 當中,提供了 Promise.all()這個 static method,它接受一個 promise array 並返回一個 promise。

Promise.all() 返回的 promise 是:

1. fulfilled: 如果所有在 array 當中的 promisses 都變成 fulfilled,則 Promised.all()所 return 的 promise 狀態會變成 fulfilled。`.then()`被 JavaScript 調用時,參數是 array of response,順序跟 Promise.all()參數的 array of promises 的順序相同。

2. rejected: 當任一個 array 當中的 promises 變成 rejected,則 Promise.all()所 return 的 promise 狀態會變成 rejected。此時,`.catch()`被 JavaScript 調用時,參數會是被 rejected 的 promises 的錯誤訊息。

```js
const fetchPromise1 = fetch(url1);
const fetchPromise2 = fetch(url2);
const fetchPromise3 = fetch(url3);
Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((responses) => {
    responses.forEach((response) => {
      console.log(response.url, response.status);
    });
  })
  .catch((e) => {
    console.log(e);
  });
```

有時,我們可能需要履行一組 Promise 中的任何一個,而不關心哪一個,那我們就需要使用 Promise.any()。只要 Promise array 中的任何一個變成 fulfilled,就執行.then(),或者如果所有 promises 都被拒絕,則執行.catch()

# Async and Await

Async 關鍵字為我們提供了一種更簡單的方式來處理基於 async promise 的代碼

```js
async function myFunction() {
  //This is an async function
}
```

在 asynchoronous function 中，您可以在調用 return promise 的函數之前使用 await 關鍵字。這使得代碼在該點等待值到 Promise 被 fulfilled 或是 rejected。

**await 關鍵字只能放在 async function 內部!!**

**特別注意!!JavaScript 設定所有的 async function 都一定會 return 一個 Promise Object，不論我們在 async function 內 return 什麼值!!在 async function 內部 return 的任何值，在 async function 所 return 的 Promise 變成 fulfilled 時，執行`.then()`的 callback function 內部自動變成參數。**

```js
async function myFunction() {
  return 10;
}
let promise = myFunction();
promise.then((data) => {
  console.log(data);
});
```

> `console.log`的 data 會是 10

特別注意，若程式碼是:

```js
async function fetchSomething() {
  const response = await fetch(URL);
}
```

> 在這裡我們調用了 await fetch()，response 並不會是一個 Promise! 使用了 await 關鍵字，我們會獲得 URL 回應完整的 Response Object，就像 fetch()是一個同步函數(synchronous)一樣!

> 我們在 asynchronous function 內部甚至可以使用`try...catch`塊進行錯誤處理，就像代碼是同步的一樣

```js
const function fetchProduct(){
  try{
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
  }catch(e){
    console.log(e)
  }
}
fetchProduct();
```

# Nodejs Event Loop

在 Node.js 當中,將凡事有任何等待結果的、請求外部資源才能進行的涵式，都會被放到 Event Loop 中等待。

當運算結果出來了或是資源載入完成後，這些正在等待被執行的涵式，都會被 Node.js 依序執行。如此一來，Node.js 可以保持忙碌且維持高效率。

**Node.js 的 Event Loop 與瀏覽器的 Event Loop 不盡相同。Event Loop 的結果也跟 JavaScript 引擎的版本有官**

再認識 Event Loop 之前,先來認識一種資料結構 - Queue。Queue 與 Stack 是兩個相似但源則相反的資料結構。Queue 是一種列隊式的結構,採用先進先出(First In First Out, FIFO)為原則。 Stack 則是推狀的結構,採用後進先出(Last In First Out, LIFO)為原則。

![AJAX](../../img/AJAX/07.png)

![AJAX](../../img/AJAX/08.png)

> 在 Node.js 的 Event Loop 當中，大致可分成以下幾種 Queue:

1. 優先級別: nextTick queue 以及 mircoTask Queue。
2. 普通級別: macrotask queue (或叫做 task queue)。其中,macrotask queue 又有 timers, pending callbacks, Idle, prepare, polling, check, and close callbacks 這六種。

- nextTick Queue: 優先程度最高 queue。給定的 process.nextTick(callbackFn)的 callbackFn 都會背放入這個 queue 內部。

- mircoTack Queue: 優先程度第二高的 queue。當 promise object 的狀態,由 pending 轉變成 fulfilled 或 rejected 時,`.then`(callbackFn)或`.catch`(callbackFn)所執行的 callbackFn 都會被排在這個 queue。

以下的都是 marcoTack queue:

- timers: 當 setTimeout(callbackFn)跟 setInterval(callbackFn)所設定的時間到屬完畢時,callbackDn 會被放來這裡等待執行

- Pending callbacks: 給作業系統做使用的 queue,例如 socket 連線時的錯誤,或是傳輸控制協定層出現錯誤，相關的 callback functions 會被放到這邊來。

- Idle, prepare: 給 Node.js 內部座使用的 queue，可以略過

- Polling: 當 I/O 有 callback function 時使用的 queue。例如: `.on('data',callbackFn)`當中 callbackFn 就會被放入 polling。

- Check: 給 setImmediate()的 callback function 使用的 queue。

- Close Callbacks: 當 socket 或是檔案被關閉或是突然中斷連線時，使用的關閉動作 callback 會被放在這裡。

**Node.js 運行程式碼的順序是:**

1. 將整份程式碼先掃描一次。若遇到同步涵式，就馬上執行。

2. 若遇到異步函式，則將 callback function 分配到各字歸屬的 queue 內部。例如，setImmediate()的 callback function 就會被放到 Check。

3. 當整份程式碼完成掃描後，Node.js 會重複 event loop。只要 queue 還有 callbackg 尚未被觸發，Node.js 就會一直循環下去。例如，setTimeout()有 callback function，但需要幾秒後才觸發，那這之間的時間 event loop 就會不斷循環。當然，這中間的幾秒也有可能有其他的 callback function 被放入 queue。

4. 循環至某個 queue 時，發現 callback 可以被執行了，就把 queue 內部的 callback 依照先進先出原則處理

5. 如果在循環的過程中，若 nextTick Queue 有涵式可以執行，則優先將 nextTick Queue 清空

6. mircotack Queue 也是同樣操作，若 mircotask Queue 當中有涵式可以執行，則優先將 mircotask Queue 清空。

```js
console.log("start");

process.nextTick(function () {
  console.log("nextTick1");
});

setTimeout(function () {
  console.log("setTimeout");
}, 0);

// call the constructor 是一個sync function
new Promise(function (resolve, reject) {
  console.log("promise");
  resolve("resolve");
}).then(function (result) {
  console.log("promise then");
});

//IIFE
(async function () {
  console.log("async");
})();

setImmediate(function () {
  console.log("setImmediate");
});

process.nextTick(function () {
  console.log("nextTick2");
});

console.log("end");
```

1. start
2. promise
3. async
4. end
5. nextTick1
6. nextTick2
7. promise then
8. setTimeout
9. setImmediate

![AJAX](../../img/AJAX/09.png)

# Race Condition

在電腦科學中，進程(process)是正在執行的程式，執行緒(thread)是可以由程序調度員(scheduler，一個作業系統內的功能)獨自管理的輕量級進程。一個 process 內部可以有多個 threads。

由於絕大多數的時間，我們電腦許多 CPU 都是閒置的狀態(因為 threads 可能會需要等待 I/O，或者是可能發生 CPU 正在忙碌，其他的 CPU 卻閒得發慌的情況)，因此，我們可以寫出內部含有多個 threads 的程式，讓 threads 被多個 CPU 並聯執行，善用 CPU 資源，提高效率。這就是許多程式語言都支援的 multi-threaded programming。

> 可以查看電腦的工作管理員，就知道現在有多少程式或軟體在同時進行

當兩個以上的 thread 訪問的一個共享資源(shared resource)時，就會發生 race condition。Race condition 發生時，有可能造成難以預期的狀況或 bug。

> 例如:演唱會門票購買，餐廳線上訂位等等，都可能造成 race condition 的發生

要避免 Race Condition 的發生，我們可以透過劃分 critical region。程式當中，訪問 shared resource 的部分，被稱為 Critical Region。每當我們要進去 Critical Region 之前，我們可以先把共享資源上鎖。上鎖期間，任何其他的 thread 都無法訪問這個共享資源。離開 Critical Region 之後，再去做解鎖。

**Lock 也稱為 mutex(mutual exclusion lock)。在進入 Critical Region 之前,mutex 會檢查我們是否可以進入。Mutex 另一個名字是 binary semaphore。**

在 Node.js 當中，製作 mutex 的方式很簡單。

```js
let mutex =Promise.resolve();
async function doing SomethingCritical(){
  mutex = mutex.then(()=>{
    // ... do stuff on the critical path
  }).catch(()=>{
    // ...manage errors on the critical path
  })
  return mutex;
}
```

> 這個想法是每次我們調用 doingSomethingCritical()函數時，我們都在使用 mutex.then()有效地「排隊」執行 critical region 的代碼。mutex = Promise.resolve()會回傳給我們一個 fulfilled promise(這是 Promise class 的一個 static method。)這是屬於同步動作，在 Node.js 會直接執行。

> 每次的 mutex = mutex.then()會 return 一個 pending promise。當 Promise.all()執行多次時，每次 mutex.then()內部的 callback function 能否被執行，都取決於前次的 promise 是否已經進入 fulfilled。只有當前一個 promise 進入 fulfilled 時，程式才會繼續執行，所以可以避免發生 race condition。

```js
let balance = 0; // shared resource
let mutex = Promise.resolve(); // returns a fulfilled Promise object

const randomDelay = () => {
  // returns a Promise that resolves after a random delay (0s to 0.1s)
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
};

async function loadBalance() {
  await randomDelay(); // wait for a random 0s–0.1s delay
  return balance;
}

async function saveBalance(value) {
  await randomDelay();
  balance = value;
}

async function sellGrapes() {
  mutex = mutex
    .then(async () => {
      const balance = await loadBalance();
      console.log(`Before selling grapes, balance is: ${balance}`);
      const newBalance = balance + 50;
      await saveBalance(newBalance);
      console.log(`After selling grapes, balance is: ${newBalance}`);
    })
    .catch((e) => {
      console.log(e);
    });
  return mutex;
}

async function sellOlives() {
  mutex = mutex
    .then(async () => {
      const balance = await loadBalance();
      console.log(`Before selling olives, balance is: ${balance}`);
      const newBalance = balance + 50;
      await saveBalance(newBalance);
      console.log(`After selling olives, balance is: ${newBalance}`);
    })
    .catch((e) => {
      console.log(e);
    });
  return mutex;
}

async function main() {
  await Promise.all([
    sellGrapes(),
    sellOlives(),
    sellOlives(),
    sellOlives(),
    sellGrapes(),
    sellGrapes(),
    sellGrapes(),
  ]);
  const balance = await loadBalance();
  console.log(`Final balance after selling grapes and olives is: $${balance}`);
}

main();
```

> 每次的 mutex = mutex.then()會 return 一個 pending promise。當 Promise.all()執行多次 sellOlives 與 sellGrapes 時，每次 mutex.then()內部的 callback function 能否被執行，都取決於前次的 promise 是否已經進入 fulfilled。只有當前一個 promise 進入 fulfilled 時，程式才會繼續執行，所以可以避免發生 race condition。

# Mutex 製作原因

> 另一種寫法

```js
let balance = 0; // shared resource
let mutex = Promise.resolve(); // return fulfilled Promise object

const randomDelay = () => {
  // return value is a Promise
  // and the time for this promise changing from pending to fulfilled
  // is random (0s-0.1s)
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
};

async function loadBalance() {
  await randomDelay(); // 等個隨機的0s~0.1s
  return balance;
}

async function saveBalance(value) {
  await randomDelay();
  balance = value;
}

async function sellGrapes() {
  const balance = await loadBalance();
  console.log(`賣葡萄前，帳戶金額為: ${balance}`);
  const newBalance = balance + 50;
  await saveBalance(newBalance);
  console.log(`賣葡萄後，帳戶金額為: ${newBalance}`);
}

async function sellOlives() {
  const balance = await loadBalance();
  console.log(`賣橄欖前，帳戶金額為: ${balance}`);
  const newBalance = balance + 50;
  await saveBalance(newBalance);
  console.log(`賣橄欖後，帳戶金額為: ${newBalance}`);
}

async function main() {
  await sellGrapes();
  await sellOlives();
  await sellOlives();
  await sellOlives();
  await sellGrapes();
  await sellGrapes();
  await sellGrapes();

  console.log("we will be doing some work here...");
}

main();
```

🔍 問題說明
你有兩個關鍵的 async 函數 sellGrapes() 和 sellOlives()，它們都會：

讀取 balance（透過 loadBalance()，這會有隨機延遲）

將讀取到的 balance 加上 50

寫回 balance（透過 saveBalance()，也有隨機延遲）

看起來這是共享資源的讀-改-寫操作，這本質上是一個 critical section（臨界區段），但你現在的程式中：

👉 這些操作是沒有鎖的！

雖然你用了 await 把它們串起來，但這只保證順序性，不保證原子性。

🧠 為什麼會有問題？
因為 randomDelay() 會讓讀跟寫時間不固定，可能導致 race condition（競爭條件）：

假設：

sellGrapes() 讀到 balance = 0

sellOlives() 也讀到 balance = 0（還沒來得及更新）

sellGrapes() 寫入 balance = 50

sellOlives() 寫入 balance = 50（把剛剛的結果覆蓋掉了）

最後結果應該是 100，但實際會是 50！

![AJAX](../../img/AJAX/10.png)

```js
async function main() {
  sellGrapes();
  sellOlives();
  sellOlives();
  sellOlives();
  sellGrapes();
  sellGrapes();
  sellGrapes();
  console.log("we will be doing some work here...");
}
```

![AJAX](../../img/AJAX/11.png)

不用 await 的好處:

1. 可以不用等 await function 跑完就可以執行下面程式碼，但會產生 race condition 的問題
2. 順序如果沒有差別，那其實可以不用 await 確定先後關係

什麼時候要用 await?

1. 當你要還傳值，值需要被下一段程式碼使用(順序有關聯)，就需要用 await

**那什麼時候要用 mutex?**

function 裡面的值被共用，但每個 function 的先後順序沒有關係，這時就會使用 mutex

# Promise Based API

API(Application Programming Interface)的中文是應用程式介面。
Application 是指任何具有功能的程式，Interface(接口)可以背認為是兩個程式之間的服務契約。該合約定義了兩個程式之間如何互相通信。例如:當程式甲需要程式乙幫他做某件事情，或是取得某些資料的時候，程式乙會定義一套的標準或接口，告訴任何想要程式乙提供服務的對象，如何跟程式乙溝通。這套標準就是 API。

這時程式甲並不需要知道程式乙做了什麼，怎麼做的。程式甲只需要知道三件事情:

1. API 上面要求要提供什麼資料,才能向程式乙溝通?
2. 成功的話，程式乙會回覆給我什麼?
3. 失敗的話，程式乙會回覆給我什麼?

API 上面會把這些情況寫得明明白白。至於哪些機構或機關有提供 API,讓大家獲取服務呢？如 Facebook、Google，或是政府機關網站（像是故宮博物院）都會有對應的 API 規則文件可以參考

透過 API，我們可以連結到其他程式所提供的服務，大多數的 API 都需要先申請註冊，申請 API Key 才能使用，甚至有些向 google 的 api 超過一定的次數還需要付錢。所以使用之前，還是需要先查詢官方網站查看；資料回傳結構，也需查看此官網的 api 網站

若我們想要製作一個 API，而 API 中的 function 會 return promise object，使的調用這些 function 時，可以使用`.then()`,`.catch()`等語法，那我們就必須使用 Promise class 的 constructor。Promise cinstructor 接受一個函數作為參數。我們將這個函數稱為 executor。

executor 函數本身有兩個參數，它們都是函數，通常稱為 resolve 和 reject。如果異步函數成功，則調用 resolve，如果失敗，則調用 reject。Resolve 以及 Reject 這兩個函數的 argument 只有一個，並且可以是任何的 data type。

```html
<input type="text" id="name" />
<input type="number" id="delay" />
<button id="set-alarm">設定鬧鐘</button>
<div id="output"></div>

<script src="./app.js"></script>
```

> app.js

- 一般寫法

```js
const name = document.querySelector("#name");
const delay = document.querySelector("#delay");
const button = document.querySelector("#set-alarm");
const output = document.querySelector("#output");

function alarm(person, delay) {
  setTimeout(() => {
    output.innerHTML = person + " wakes up!!";
  }, delay);
}

button.addEventListener("click", (e) => {
  alarm(name.value, delay.value);
  // console.log("Click Button");
});
```

- Promise 寫法

```js
const name = document.querySelector("#name");
const delay = document.querySelector("#delay");
const button = document.querySelector("#set-alarm");
const output = document.querySelector("#output");

//return Promise object
//delay of pending => fulfilled
//if delay < 0 => rejected
function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      reject("delay is not able to less 0.");
    } else {
      setTimeout(() => {
        resolve(person + " wakes up!!");
      }, delay);
    }
  });
}

button.addEventListener("click", () => {
  let promiseObject = alarm(name.value, delay.value);
  promiseObject
    .then((message) => {
      output.innerHTML = message;
    })
    .catch((e) => {
      output.innerHTML = e;
    });
});
```

> 從寫成 async 方式

```js
button.addEventListener("click", async () => {
  try {
    let result = await alarm(name.value, delay.value);
    output.innerHTML = result;
  } catch (e) {
    output.innerHTML = e;
  }
});
```

![AJAX](../../img/AJAX/12.png)

# 連接到外部 API

[joke API](https://sv443.net/jokeapi/v2/)

```html
<button id="new-joke">Create Joke</button>
<div id="output"></div>
```

```js
let output = document.querySelector("#output");
async function hello() {
  try {
    let result = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?type=single"
    );
    let data = await result.json();
    console.log(data);
    output.innerText += data.joke + "\n";
  } catch (e) {
    console.log(e);
  }
}

let button = document.querySelector("#new-joke");
button.addEventListener("click", () => {
  hello();
});
```

![AJAX](../../img/AJAX/13.png)
![AJAX](../../img/AJAX/14.png)
