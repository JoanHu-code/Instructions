# 目錄

- [靜態網頁和動態網頁](#靜態網頁和動態網頁)
- [後端網頁開發工具](#後端網頁開發工具)
- [Module Wrapper](#Module-Wrapper)

# 靜態網頁和動態網頁

- 靜態網頁: 在客戶端若要跟網頁溝通，須給一個 https 的 請求(request)，那伺服器端就會直接返回請求，無需等待
  - 靜態網站(static website)由使用 HTNL，CSS 和 Javascript 創建的網頁組成。靜態網站上的每個頁面都儲存為單個 HTML 文件，該文件完全按原樣從伺服器直接傳送到用戶端。
    - 優點:
      - 更快的頁面加載速度。由於網頁都已預先製作完成，伺服器的工作只是傳送文件，無需從數據庫找資料或在 server side script 做驗證等工作，所以加載速度會比動態網頁快速。由於頁面加載速度是由谷歌評估網站性能的關鍵部分(對 SEO 和排名性能有影響)，這個優點不應該被低估。
      - 創建與部屬快速。靜態網站的創建和發布速度更快，因為他們複雜度較低，並且不需要有組織的連接到資料庫。網頁製作完成後，靜態網頁的部屬較簡單，因為只需要將文件放置到伺服器上即可。相對的，動態網頁需要避免資料庫被駭客入侵、攻擊，設定伺服器端腳本與資料庫都需要額外的工作
      - 安全性較高。靜態網頁不與數據庫連接，也不使用外部套件。數據庫與外部套件都可以成為攻擊的常見入口點。
    - 缺點:
      - 有限的可擴展性。雖然可以使用靜態網頁構件數百個頁面，但這始終是一個緩慢而漫長的過程。網頁因為沒有連接儲存使用者資訊的數據庫，無法針對每個使用者提供客製化的內容
      - 管理效率低。靜態網站的創建速度可能更快，但管理起來可能更耗時。因為需要逐頁編輯靜態網站，並且隨者網站頁面更多，不斷大量更新快速變化的內容耗時又耗力
  - 例子:這家餐廳的服務員(伺服器端)已經存放很多 pizza 客人(顧客端)點 pizza 後直接拿出來即可

![靜態網頁](../img/nodejs/01.png)

- 動態網頁: 客戶端會送一個 https 的 request 到伺服器這邊，伺服器收到後會拿到伺服器端的腳本看是否符合資源後去跟數據庫聯絡，聯絡完後再從數據庫返回資源給伺服器腳本，之後產生資料給伺服器再給客戶端
  - 使用伺服器腳本(serve-side script)和技術建構的動態網站允許根據用戶行為，即時地顯示每個頁面的不同內容，例如，每個人的 YouTube 首頁顯示的推薦影片都不相同，因為 Youtube 會根據數據庫中儲存的使用者的觀察紀錄、習慣、訂閱內容等等的因素改變推薦影片
  - 通常，動態網站用於內容繁重且與用戶互動平凡的網站。假設我們要架設的網站是房地懺網站。我們需要生成數百個頁面來列出數百個房市資訊，且這些頁面上的內容需要反映即時的可用資訊，我們就需要選擇用動態網頁。墊子商務網站、社群網站、在線論壇、會員網站、串流影音平台等等是其他常見的動態網頁類型。
  - 優點:
    - 維護更容易且更快。使用數據庫來儲存資料，每個網頁的製作依賴伺服器端腳本(server-side script)去抓取資訊並且生成網站
    - 可擴展性。若從一開始就沒有計畫建立一個大型網站，動態網站的架構也可以讓我們在必要時進行擴展
    - 更好的用戶體驗。動態網站提供根據用戶需求量身訂製的內容
    - 功能更強大。伺服器端腳本可用更多更強大的演算法來增加網頁功能性
  - 缺點:
    - 需要更多資源才能建立。由於設定數據庫並將其連接到正確頁面所需的額外步驟，動態網站的設置和運行可能會更加複雜，這也意味著成本更高
    - 性能問題，動態網站比靜態網站有更多的處理指令，不斷從數據庫提取資訊以顯示網頁內容都需要時間來處理執行。
  - 例子:這家餐廳的服務員(伺服器)接收到顧客(顧客端)點餐後，須向廚師(伺服器腳本)請示要做什麼，廚師再看是否有符合的食材(數據庫)，有的話在拿出來料理後給服務員，服務員最後再拿給顧客

![動態網頁](../img/nodejs/02.png)

# 後端網頁開發工具

1. PHP、Laravel(PHP Framework)
2. Node.js、Express.js (Server-Side JavaScript)
3. Java、Java Spring Framework
4. Ruby on Rails
5. Python Django、 Flask Framework

**Node.js**

- `Node.js`: 是能夠在伺服器端運行 JavaScript 的開放原始碼、跨平台執行環境。在`Node.js`出現之前，JavaScript 通常做為瀏覽器上的客戶端程式設計語言使用，以 JavaScript 寫出的程式通常能夠在使用者的瀏覽器上執行。Node.js 的出現使 JavaScript 也能用於伺服器端腳本編寫。

- `Node.js`內部採用 V8 JavaScript 執行引擎作為核心引擎

# Module Wrapper

- 在 Node.js 當中，module 是指一組程式碼，組織成簡單或複雜功能，可被用來與外部其他程式碼連結。Module 可以是單個文件，或是多個文件與資料夾的集合

- 在執行 module 的程式碼之前，Node.js 將使用如下所示的函數包裝器來包裝它:

```
(function(export,require,module,__filename,__dirname){
    //Module code actually lives in here.
})
```

> 一個 js 的文件可以為一個 module， 多個 js 的文件也可以稱為 module

**app1.js**

```js
console.log("This is app1.js");
```

```shell
node .\app1.js
```

> 在執行時實際上會長這樣

```js
(function(export,require,module,__filename,__dirname){
   console.log("This is app1.js");
})
```

> 這樣做有什麼好處呢?

1. 讓使用這個 module 的文件中，所使用的 global variable 不會被 module 內部的變數影響

**app2.js**

```js
let num = 10; //global variable
console.log(num);
```

**app1.js**

```js
require("./app2");
let num = 30; //local variable
console.log(num);
```

```shell
node .\app1.js
```

> 在執行時**app1.js**實際上會長這樣

```js
(function(export,require,module,__filename,__dirname){
   let num = 10; //local variable
   console.log(num); //10
})
let num = 30; //global variable
console.log(num); //30
```

2. 讓 module 內部所定義的 global variable 變成 function scope

3. 讓 module 內部的 JS 文件可以使用某些實用的變數，例如:module、exports 可以用來輸出本身 module， 而 require 可以用來獲得其他 module

4. `__filename`, `__dirname` 等等變數在開發上變得方便，因為兩者包含 module 的絕對路徑名稱與資料夾路徑

```js
console.log(__dirname); //d:\USERS\Desktop\Example
console.log(__filename); //d:\USERS\Desktop\Example\app1.js
```

```shell
node .\app1.js
```
