# 網路的基本原理

## 目錄

- [第一章 www 和 HTTP](#第一章-www和HTTP)
- [第二章 伺服器與用戶端](#第二章-伺服器與用戶端)
- [第三章 DNS 和瀏覽器比較](#第三章-DNS-和瀏覽器比較)
- [第四章 W3C](#第四章-W3C)
- [推薦網站](#推薦網站)

# 第一章 www 和 HTTP

- internet(網際網路):全世界的電腦都藉由海底電纜(Submarine Cable)連接，透過網路協定來互相連結溝通

  - [Submarine Cable Map](https://www.submarinecablemap.com/)

- www: World Wide Web(全球資訊網)的簡寫，是一種資訊系統，是建築在網際網路的服務之一

- HTTP: 兩台電內之間，或電腦內部的溝通規格，若不同裝置進行溝通就需要先定義好交換的格式和規則，這樣的格式和規則就是所謂的溝通協定

  - 常見的通訊協定:
    - HTTP(HyperText Transfer Protocol):超文本傳輸協定，網頁傳輸的協定
      - HTTPS，當中的`s`代表 secure，傳輸的資訊經由 RSA 演算法加密，可確保資訊安全
    - SMTP(simple mail transfer protocol):簡單的郵件傳遞，定義 email 傳遞的方法
    - FTP(File Transfer Protocal): 文件傳輸協議

# 第二章 伺服器與用戶端

- 連接到網路的電腦稱為用戶端(client)和伺服器端(server)

ex: 用自己的手機連到 youtube，手機為用戶端(client)，youtube 為伺服器端(server)

- 用戶端(client): HTTP Get Request 給伺服器端(server)

- 伺服器端(server): HTTP Response with HTML Codes 給用戶端(client)

# 第三章 DNS 和瀏覽器比較

- DNS(Domain Name Servers)網域名稱系統: 轉換 IP 與 URL 的服務

  - 網址是無法連到網站上面去的，必須靠 DNS 轉成 IP 才可以以連到
  - 例: youtube 的 IP 位置為: 208.65.153.238，不透過 DNS 要直接打 `208.65.153.238`，但如果打`https://www.youtube.com`就必須透過 DNS 轉址成`208.65.153.238`

  - 在瀏覽器輸入網址按下 Enter 得時候

    1. 瀏覽器去 DNS 伺服器尋找託管網站的伺服器
    2. 瀏覽器像伺服器傳送 HTTP 請求，請求伺服器向用戶端傳送網站程式碼
    3. 伺服器如果允許，就會傳送『200 ok』訊息，並開始對瀏覽器船資料和檔案
    4. 瀏覽器收到後，就可以把資料呈現在畫面上

- 瀏覽器:主要有兩大功能
  1. 排版引擎(latout engine)，將網頁的 HTML 文檔和其他資源(原始碼)轉換為用戶可看懂好用的介面
  2. JavaScript 引擎，專門處理 JavaScript(程式碼)的機器

|                | 排版引擎 | JavaScript 引擎 | 主要優點        | 主要缺點               |
| -------------- | -------- | --------------- | --------------- | ---------------------- |
| Firefox        | Gecko    | SpiderMonkey    | 強大開發功能    | RAM 大量占用           |
| Chorme         | Blink    | V8              | 主流熱門瀏覽器  | RAM 大量占用           |
| Microsoft Edge | Blink    | Chakra          | 優畫板的 Chrome | RAM 大量占用           |
| Safari         | WebKit   | JavaScriptCore  | Mac 效能佳      | 單一平台               |
| Opera          | Blink    | Carakan         | 不容易受到攻擊  | 內置擴展功能不容易找到 |

# 第四章 W3C

W3C(World Wide Web Consortium): 全球資訊網協議又稱 W3C 理事會，為了統整網路應用中不同平台、技術帶來的不相容問題，而產生的辦自治非政府組織

W3C 所制定的標準:

- HTML
- CSS
- DOM
- SVG
- XML

# 推薦網站

[MDN Web Docs](https://developer.mozilla.org/zh-TW/)
[w3c](https://www.w3.org/TR/)
[Css tricks](https://css-tricks.com/)
[stack overflow](https://stackoverflow.com/)
[free code camp](https://www.freecodecamp.org/)
[w3c school](https://www.w3schools.com/)
