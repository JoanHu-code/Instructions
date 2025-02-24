# 目錄

- [第一章 JS 簡介](#第一章-JS簡介)

# 第一章 JS 簡介

**什麼是 JavaScript?**

> JavaScript 程式語言最初的創建是為了"讓網頁活起來"。這種語言的程序稱為腳本(script)。

> JavaScript 可以直接被寫在網頁的 HTML 中，並在頁面加載時自動運行

> JavaScript 本身跟 Java 關連不大。創建 JavaScript 時，他最初有另一個名稱"LiveScript"。但當時 Java 非常流行，因此決定將此新語言定義為 JavaScript。但隨者時間過去與發展，JavaScript 成為一種完全獨立的語言，擁有自己的規範，稱為 ECMAScrip(European Computer Manufactures Association Scrip)，現在他與 Java 完全沒有關係。如同狗跟熱狗的關係。

> Vanilla JavaScript 是指使用純 JavaScript 而不需要任何額外的 library 或框架。常見的 JavaScript library 有 jQuery。因為 JavaScript 本身支援的語法眾多且功能強大，越來越多網站選擇使用純 JavaScript 來製作。

> 每個瀏覽器有自己的 JavaScript 引擎，用來讀取並編譯 JavaScript 程式碼。若要確認某個瀏覽器的 JavaScript 引擎是否有支援某種功能，可參考:https://caniuse.com

**`<script>`放在哪裡?**

> 通常來說，`<script>`會被放在 HTML 頁面的最下方，與 CSS 的`<link>`不同。這是因為將 JavaScript 放在 HTML 正文的底部時，他會在任何 JavaScript 加載之前讓 HTML、CSS 有時間加載。`<script>`被放在 HTML 頁面最下方所以會最後加載

> 先讓瀏覽器可以加載 HTML、CSS，用戶無需等待 JavaScript 被解析完成，即可在網頁中看到某些內容，許多網頁使用者點進網站後，看到內容是空白，持續幾秒的話還是空白就會離開!若想留下更多的使用者，就先讓他們看見文字或圖片，JavaScript 的功能可以慢慢 load up!
