## 目錄

- [SPA](#SPA)
- [React](#React)

# SPA

> 若我們有一個後端的網路服務(Web Service)已經能夠正常運作且受到保護，只有經過身分驗證和授權的用戶才能調用這個API，則我們可以使用網頁前端的框架來架設網站，並且連結到此API。

> 在大多數的網站上，當我們點擊連結或提交表單時，瀏覽器會向伺服器發出request並下載一個完整的新頁面。我們通常會看到白色閃爍，因為當前頁面消失並加載了新頁面。若使用AJAX技術，我們可以編寫一些在瀏覽器上運行的JavaScript。JavaScript將向伺服器發出request，接收response並使用數據更新當前HTML頁面。正個過程中，只有數據通過網路傳輸，而不是一個全新的HTML頁面。

> 像這樣的頁面，就被稱為Single Page Application(SPA)。

- 優點:

1. 我們減少了伺服器的負載。為每個request生成一個HTML頁面需要大量的處理能力。如果我們的服務器的CPU太忙，我們的網站就會變慢，並可能變成反應遲鈍使我們的網站關閉。在使用網頁瀏覽器時，大多數客戶的CPU(可能有8個或更多)都處於空嫌狀態。因此，我們可以將數據傳到客戶端，讓客戶端的CPU驅動瀏覽器來渲染(render)頁面。

> Client-side rendering

2. 我們還減少了需要通過網路傳輸的數據量，因為只發送新數據，而不是完整的HTML頁面。

**雖然SPA有很多優點，但這並不意味每個網站都應該是SPA。SPA的缺點有:**

1. SPA非常複雜，SPA越大，添加功能越多時，會變得越複雜。最終，複雜性會影響我們網站的性能，並增加BUG出現的機率。

2. 搜索引擎優化(SEO)會出現問題。谷歌和其他搜索引擎自動掃描程式。但是，這些自動掃描程式不會運行JS帶碼來加載數據。因此。搜索引擎無法正確定為我們的網站。

> 市面上有幾個熱門框架可以製作SPA，包括React.js(由Meta開發和使用)、Angular.js(由Google的Angular團隊以及社群共同領導)和Vue.js。

# React

> React(也稱為React.js或ReactJS)是一個免費和開源的前端JavaScript框架，用UI組件來架構使用者介面，它由Meta(以前的Facebook)和個人開發人員社區維護。React可用作於開發SPA網頁。React的基本原理是，用JavaScript來生成HTML。

**React Native是一個Facebook研發的開放原始碼的應用程式框架。React Native開發的程式可用於IOS和Android手機平台。**

**React常與另一個框架Next.js合作使用。**

**因為React還是個相對年輕的框架(初始版本在2013年9越發部)，所以功能上、語法上、套件上都會不斷更新。**

> 使用React好處

1. 可重複使用的組件(Reusable Components)- Component是React的核心架構；使用React建構的每個應用程序的UI，都可以分解為彼此獨立的小部分。這些小部分稱為Components。每一個Components中都有自己的程式邏輯，可以單獨編輯，然而在最終的UI中合併到一起，這使得創建應用程序UI的任務更簡單，更易於管理。Component也可以在其他頁面和應用程序上重複使用，從而節省大量編寫程式的時間。

2. React最有用的特性之一是它能夠更改網站上的Components，而無須更新整個DOM。這是通過虛擬DOM(virtual DOM)完成。虛擬DOM是DOM的虛擬表示(virtual representation)或副本(copy)。

> 每當用戶執行操作時，例如點擊按鈕，React都會更新虛擬DOM，將更新後的與之前的版本進行比較，檢測差異，然後只更新受影響的物件而不是刷新整個DOM。這使的網站反應速度更快、性能更高。

3. JSX代表JavaScript XML，是JavaScript的語法擴展，它允許寫程式的人在JavaScript代碼中，遷入類似HTML語法的程式碼。React的工作就是將JSX換成DOM元素。

## 製作react專案

```shell
npx create-react-app <project-name>
```
- npx: Node Package Execution，是npm內建的功能。Npx是一個npm package運行程序，可以從npm拿到package並且直接執行，甚至無須在電腦上安裝該package。

**現在並不推薦，現在比較推薦的是使用next.js**

- 資料夾與檔案基本的用途如下
  - public folder: 內部放置靜態文件，例如:index.html、JavaScript文件、圖片、favicon.ico和其他檔案等等
    - public資料夾內部的index.html文ˋ建非常重要。用React所製作的Single Page Application當所使用的單一頁面就是這個index.html文件。
  - src folder: 是React應用程序的核心資料夾，包含Components、index.js、App.js等等文件功能
    - index.js文件的功能是將最主要的   