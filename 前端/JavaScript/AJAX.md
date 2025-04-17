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

- Ajax: 即「Asynchronous JavaScript and XML」(非同步的JavaScript與XML技術)，指的是一套綜合了多項技術的瀏覽器端網頁開發技術。

- AJAX在客戶端使用各種Web技術來創建異步(asynchronous) Web應用程序。應用程序可以在背景從服務器發送和獲得數據，而不干擾現有頁面的顯示和行為。通過將數據交換層與表示層分離，Ajax允許網頁以及擴展的Web應用程序動態地更改內容，而無須重新加仔整個頁面。在實踐中，數據的傳送通常使用JSON而不是XML。

- 常見的Ajax應用的例子是，我們在Youtube或是Google搜尋時，網站會根據我們前面打的幾個字，猜想我們要搜尋的關鍵字是什麼。這就是不干擾現有頁面的顯示和行為的情況下，從服務器發送和獲得數據，並且更新網頁的方法。

![AJAX](../../img/AJAX/01.png)

# 同步與異步

- 在電腦裡，異步(asynchronous)代表著一個process獨立於其他process運行，而同步(synchronous)代表著一個process僅在某個其他process完成或移交而運行

![AJAX](../../img/AJAX/02.png)

- 通常來說，JavaScript的特性是single-threaded synchronous，代表JavaScript是個一次只會做一件事情的程式語言。然而，JS有內建的asynchronous function，例如setTimeout()。setTimeout() function設置一個計時器，一旦計時器時間到，該計時器就會執行一個函數或指定的一段代碼。setTimeout()的語法為:

```js
setTimeout(code, delay);
```

- Code 是 delay結束時要執行的程式碼，delay是在執行指定的函數或代碼之前計時器應等待的時間(以毫秒為單位)。如果省略此參數，則使用值0，表示"立即"執行。

```js
console.log('start');
setTimeout(()=>{                                  
  console.log('Here is the code.');
},2000)
console.log('end');
```

> 上面這段程式碼執行的結果是:

1. start
2. end
3. Here is the code.

# Promise 物件

- Promise是現代JavaScript中異步編程的基礎。Promise是由一個asynchronous function所return的物件,主要功能是, Promise會代理一個建立時不用預先得知結果的值。

- Promise使我們能夠接續著發動非同步操作後,最終的成功值(success value)獲失敗訊息(failure reason)的處理函式(handlers)。我們向伺服器傳送request之後,因為需要等待response的時間,所以我們會先的到一個Promise,而這個Promise目前的狀態是「擱置」(pending)

- 一個Promise物件處於以下三種狀態:
1. 擱置(pending): 初始狀態，並不是fulfilled與rejected。
2. 實現(fulfilled): 表示操作成功地完成
3. 拒絕(rejected): 表示操作失敗

Promise在pending後的幾秒之內,狀態可能變成fulfilled或是rejected。一個處於擱置(pending)狀態的Promise，若操作成功，能夠將狀態變成fulfilled，或是因為某些原因或錯誤，變成拒絕(rejected)狀態。當上述任一狀態轉換發生時，那些透過then方法所連結的callback就會被調用。

> promise物件裡面有兩個method，一個是then()，另一個是catch()，裡面需放callback function用於接住fulfilled的結果或rejected結果，在pending時是不會啟動的

![AJAX](../../img/AJAX/03.png)

```js
let promiseObject = fetch(URL);
promiseObject.then((data)=>{
  console.log(data);
})
```
>Javascript Fetch API allows us to send HTTP resquests.
> 這段程式碼中，當promiseObject從pending變成fulfilled之後,`.then()`內部的callback function就會被javascript自動執行,執行時,帶入的參數就是從URL獲得的HTTP Response內容

![AJAX](../../img/AJAX/04.png)
![AJAX](../../img/AJAX/05.png)

> onFulfillment, onRejection are all callback functions. 另外reject後面通常是使用.catch()來接onRejection

❌
```js
let promiseObject = fetch(URL);
fetchpromise.then((response)=>{
  let jsonPromise = response.json(); // response=>json
  //.json() method is also 
  //return promise object
  console.log(jsonPromise) //pending
})
```

✅
```js
let promiseObject = fetch(URL);
fetchpromise.then((response)=>{
  response.json().then(data=>{
    console.log(data);
  })
})
```

> 很容易發生callback hell所以要改一下寫法


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

為了支持錯誤處理, Promise 物件提供了一個catch() 方法, 跟then()很像。我們調用.catch()時，傳入一個callback function當作參數。傳遞給catch()的處理函數在異步操作失敗時會自動被JavaScript調用。catch()內部的callback function被調用時，參數會被放入錯誤訊息，通常以變數e或是err代表錯誤(error)。

當串聯多個`.then`語句時，後一個`.then()`內部的callback function被執行時，所用的參數是前一個`.then()`中的callback function索回傳的值

如果將catch()添加到Promise Chain的末尾,那麼當任何異步函數調用失敗時都會調用到它。

```js
let fetchPromise = fetch(url);
fetchPromise
  .then((res)=>res.json())
  .then((data)=>{
    console.log(data);
  })
  .catch((e)=>{
    console.log(e);
  });
```