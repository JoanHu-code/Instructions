# HTML

## 目錄

- [第一章 HTML 簡介](#第一章-HTML-簡介)
- [第二章 第一個網頁製作](#第二章-第一個網頁製作)
- [第三章 p,h1,h2 標籤與 html validator](#第三章-ph1h2-標籤與-html-validator)
- [第四章 物件導向 Object-Oriented](#第四章-物件導向-Object-Oriented)
- [第五章 HTML Skeleton](#第五章-HTML-Skeleton)
- [第六章 head 標籤](#第六章-head-標籤)
- [第七章 Html 常用的標籤](#第七章-Html-常用的標籤)
  - [h1-h6](#h1-h6)
  - [anchor tag](#anchor-tag)
  - [img 絕對路徑 相對路徑](#img-絕對路徑-相對路徑)
  - [ul ol 標籤](#ul-ol-標籤)
- [第八章 block and inline](#第八章-block-and-inline)
- [第九章 基本表格製作](#第九章-基本表格製作)
- [第十章 基本表單製作](#第十章-基本表單製作)
  - [checkbox email file](#checkbox-email-file)
  - [number password](#number-password)
  - [radio range](#radio-range)
  - [button selection option datalist textarea](#button-selection-option-datalist-textarea)
- [第十一章 其他資訊](#第十一章-其他資訊)

# 第一章 HTML 簡介

HTML(HyperText Markup Language):超文本標記語言，最主要的功能是表述並定義網頁的內容

HyperText: 相對比之前的一般文字檔案會有更多的功能，例如:超連結(從某個網頁連結到其他網頁)

Markup: HTML 使用標記來詮釋頁面 => 表示 HTML 並不是一個程式語言，只是一種標記語言(原始碼)，本身並不存在任何的邏輯運算

目前版本: HTML5

- HTML:定義網頁內容
- CSS:定義網頁外觀
- JavaScript: 定義網頁功能

# 第二章 第一個網頁製作

**在 VSCode 裡面只要打`p+tab`就會出現`<p></p>`**

p: 段落

```HTML
<p>這是一個段落</p>
```

[範例](前端/HTML/01.html)

# 第三章 p,h1,h2 標籤與 html validator

一個 HTML 標籤包含四個部分:

1. 起始標籤(opening tag): 它包含了元素的名字，夾在一對`<`和`>`(brackets)之間。表示元素從何時開始生效

2. 結束標籤(closing tag):和起始標籤長得差不多，只是前面多一條斜線(forward slash)，表示結束的地方

3. 內容(content): 元素的內容

4. 元素(element): 以上三者加起來就是元素，所以通常會說標籤是 HTML element。

**`<img>、<base>、<meta>`為 self-closing tag，為自己本身為 opening tag 和 closing tag (有些東西並不需要放入 content)**

> 下面這行是 HTML 元素

```HTML
<!--起始標籤-->   <!--結束標籤-->
  <p>這是一個段落</p>
    <!--內容-->
```

## 巢狀元素(Nesting elements)

> 把元素放到另一個元素裡面這叫做`巢套(nesting)`，例如: p，tag 內部可以放入 strong tag。

```html
<p>
  國立故宮博物院，簡稱<strong>臺灣故宮或臺北故宮（博物院）</strong>，別名中山博物院，為臺灣最具規模的博物館以及臺灣八景之一，也是古代中國藝術史與漢學研究機構。館舍位於臺北市士林區，一年可接待超過614萬人次的參訪旅客，曾位列2015年全球參觀人數第六多的藝術博物館。
</p>
```

**W3C 提供 HTML Validator 可以確認 HTML 程式碼的正確性**

[W3C 的 HTML Validator](https://validator.w3.org/)

# 第四章 物件導向 Object-Oriented

> Object-Oriented Programming(OOP)

HTML 標籤的設計方式是採用物件導向的想法，物件包含兩個部分:

1. 屬性(Attributes/Property)

2. 行為(Methods)

例如:

- 人
  - 屬性(Attributes/Property): 名字、年齡、身高、性別
  - 行為(Methods): 跑、跳、走

**每個 HTML Element 都有可以各自設定的屬性和行為**

> style 就是 HTML Element 裡面其中的一個屬性

> onclick 就是 HTML Element 裡面的行為

```html
<p style="color:red;" onclick="alert('你剛剛按下了p標籤。')">
  國立故宮博物院，簡稱<strong>臺灣故宮或臺北故宮（博物院）</strong>，別名中山博物院，為臺灣最具規模的博物館以及臺灣八景之一，也是古代中國藝術史與漢學研究機構。館舍位於臺北市士林區，一年可接待超過614萬人次的參訪旅客，曾位列2015年全球參觀人數第六多的藝術博物館。
</p>
```

# 第五章 HTML Skeleton

- HTML Skeleton:
  - 定義: 基本的 是建構每個 HTML 網頁所需的一組標籤
  - 功能: 告訴瀏覽器它正在讀取什麼類型的文件

**結論:沒有 Skeleton 的 HTML 文件將無法在 Web 瀏覽器中正卻呈現**

- HTML Skeleton 會分成最重要的兩個部分:
  - 頭: <head></head>
  - 身體:<body></body>

> 即使我們網頁沒有寫`<head></head>`和`<body></body>`瀏覽器依舊會自動幫我們加上

> 標準 HTML Skeleton 的樣式

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
</html>
```

`<!DOCTYPE html>` : document type is html

`<head></head>`: 用於包含有關網頁的特定資訊(information about the page)，通常是 meta data。這些資訊包括文檔標題<title> tag(這是強制性的)、script 或 css 文件等內容。

`<body></body>`: 網頁使用者可看見的內容，定義文檔的正文

`lang屬性`: 可以設定網頁的語言，[html lang attribute](https://www.w3schools.com/tags/ref_language_codes.asp)

    > Chinese (Traditional) :`zh-Hant`

`<!---->`: HTML 的註解寫法
`<meta charset="UTF-8" />`: 要放在<head></head>標籤裡面的最上面；charset:character set 的意思，文字編碼使用`UTF-8`

`meta`:是用來定義這個網頁本身的資訊

` <meta name="viewport" content="width=device-width, initial-scale=1.0" />` : viewport=>視窗，內容:設備寬度，網頁初始放大程度:原始大小，不放大也不縮小

    - 用 chorme 按 F12 可以看出`initial-scale=1.0"`的效果

```html
<!DOCTYPE html>
<html>
  <head>
    <title>我第一個製作的網頁</title>
  </head>
  <body>
    <h1>國立故宮博物院</h1>
    <h2>簡介：</h2>
    <p>
      國立故宮博物院，簡稱<strong>臺灣故宮</strong>或臺北故宮（博物院），別名中山博物院，為臺灣最具規模的博物館以及臺灣八景之一，也是古代中國藝術史與漢學研究機構。館舍位於臺北市士林區，一年可接待超過614萬人次的參訪旅客，曾位列2015年全球參觀人數第六多的藝術博物館。
      國立故宮博物院是隸屬於中華民國行政院的中央二級機關，故宮院長為特任官，視同部會首長。它的前身是成立於京兆地方（今北京）紫禁城外廷的古物陳列所，1925年10月10日在紫禁城內廷另外組織了故宮博物院，後來因為抗日戰爭爆發輾轉遷移至南京市和四川省等地，古物陳列所於第二次世界大戰後裁撤併入國立中央博物院籌備處。隨後第二次國共內戰衝突導致時局再陷動盪，包括國立北平故宮博物院在內的6個機構於是在1948年11月10日決定遷往臺灣，幾經改組易名，最終由國立北平故宮博物院和國立中央博物院籌備處合併為國立故宮博物院，1965年11月12日在臺北現址復院開幕。此後，博物館致力打造成為文化創意產業加值應用的虛擬博物館，館舍也歷經多次整修擴建。
    </p>
    <h2>故宮文物：</h2>
    <p>
      國立故宮博物院典藏為數近70萬件文物與藝術作品，大部分是原先國立北平故宮博物院、國立中央博物院籌備處和國立北平圖書館等機構所藏來自紫禁城、盛京行宮、避暑山莊、頤和園、靜宜園和國子監等處皇家舊藏；另有部分是編列預算購置，接收自第二次世界大戰結束日本歸還部分文物，以及透過各界捐贈和徵集而來。藏品時間跨度涵蓋新石器時代至今長達8,000年，各類藏品分別交由器物處、書畫文獻處和南院處等3個策展部門管理，當中以長篇銘文的青銅器、古代早期的名家書畫、善本古籍和官窯瓷器等蒐藏最具影響力。展廳內是按照文物類別以編年方式系統性地陳設7,000件展品，器物類展件相隔半年至2年輪換一次，書畫和圖書文獻類展件為每3個月定期更換。
      院區： 北部院區、南部院區
      故宮三寶：故宮三寶一般是指臺北國立故宮博物院蒐藏的范寬〈谿山行旅圖〉、郭熙〈早春圖〉和李唐〈萬壑松風圖〉等三幅北宋巨碑式水墨畫。近年亦有將〈翠玉白菜〉、〈肉形石〉和〈毛公鼎〉合稱之說法。
    </p>
  </body>
</html>
```

**在 vscode 裡面，只要打`!`就可以跳出 HTML Skeleton**

```html
<!DOCTYPE html>
<!--lang屬性可以設定網頁的語言-->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>國立故宮博物院</h1>
    <h2>簡介：</h2>
    <p>
      國立故宮博物院，簡稱<strong>臺灣故宮</strong>或臺北故宮（博物院），別名中山博物院，為臺灣最具規模的博物館以及臺灣八景之一，也是古代中國藝術史與漢學研究機構。館舍位於臺北市士林區，一年可接待超過614萬人次的參訪旅客，曾位列2015年全球參觀人數第六多的藝術博物館。
      國立故宮博物院是隸屬於中華民國行政院的中央二級機關，故宮院長為特任官，視同部會首長。它的前身是成立於京兆地方（今北京）紫禁城外廷的古物陳列所，1925年10月10日在紫禁城內廷另外組織了故宮博物院，後來因為抗日戰爭爆發輾轉遷移至南京市和四川省等地，古物陳列所於第二次世界大戰後裁撤併入國立中央博物院籌備處。隨後第二次國共內戰衝突導致時局再陷動盪，包括國立北平故宮博物院在內的6個機構於是在1948年11月10日決定遷往臺灣，幾經改組易名，最終由國立北平故宮博物院和國立中央博物院籌備處合併為國立故宮博物院，1965年11月12日在臺北現址復院開幕。此後，博物館致力打造成為文化創意產業加值應用的虛擬博物館，館舍也歷經多次整修擴建。
    </p>
  </body>
</html>
```

# 第六章 head 標籤

[head 標籤說明](https:/htmlhead.dev)

` <meta name="description" content="這是一個簡單介紹故宮博物院的網站" />`: 加這行有助於 SEO，幫助人們更容易找到這個網站；搜尋引擎下面的文字介紹也會來自這裡的`content`
`<meta name="robots" content="index,follow" />`:讓搜尋引擎能較容易找到網頁
`<meta name="googlebot" content="index,follow" />`:讓 GOOGLE 的搜尋引擎能更容易地找到你的網頁
`<meta name="author" content="Jaon Hu" />`:可以設定網頁的作者是誰

# 第七章 Html 常用的標籤

### h1-h6

- <h1>到<h6>標籤用於定義HTML標題。<h1>是最重要的~<h6>是最不重要的
- HTML 裡面沒有<h7>標籤

**注意:每頁只使用一個<h1>，這應該代表整個頁面的主業標題/主題**

**特別注意:<h1>~<h6>的標籤並不是拿來調整文字大小，文字大小應該使用 css 做修改，HTML 標籤的任務是定義整個網頁架構，因此並須正確的使用 HTML 標籤，才可以讓網頁做到 SEO(Search Engine Optimization)**

### anchor tag

- `<p>`標籤定義了一個段落。瀏覽器會自動在每個`<p>`元素之前和之後添加一行空行
- `<a>`標籤(anchor tag):用於網頁的超連結，用於在連結其他網頁或同一網頁的某些部份

  - 屬性:

  1. `href`(hypertext reference)=>`<a href=""></a>`，他用於提供 absolute linking 或 relative linking 作為其'href'的值
  2. `target`: 用來決定新頁面是否會開啟新的瀏覽器分頁
     - `_self`(預設): 顯示的地方為目前的網頁
     - `_blank`: 會開啟新的分頁顯示
     - `_blank`: 會開啟新的分頁顯示

  - 也可以用`<base>`標籤來定義所有`<a>`標籤的 target

  ```html
  <head>
    <base target="_blank" />
    <!--讓預設變target="_blank"-->
  </head>
  ```

```html
<!-- 相對連結 -->
<a href="https://www.npm.gov.tw/" target="_self">故宮網站連結</a>
<a href="https://www.npm.gov.tw/" target="_blank">故宮網站連結</a>
<!-- 相對連結 -->
<a href="./html.md">html說明文件</a>
```

### img 絕對路徑 相對路徑

- `<img>`標籤用於 HTML 頁面中嵌入圖像，`src`(source)是圖片來源，`alt`(alternative)是圖片無法顯示時使用的替代文字

- `<img>、<base>、<meta>`為 self-closing tag，為自己本身為 opening tag 和 closing tag (有些東西並不需要放入 content)

  1.絕對路徑(absolute linking/path):使用完整的 URL 當作連結對象，如果要連結不在伺服器內的資源時就要使用絕對路徑

  2.相對路徑(relative linking/path):可以連結到相對目前文件所在位置的檔案

        - `.`:代表目前HTML文件所在資料夾位置
        - `..`:代表上層資料夾位置
        - `/`:可以從根目錄向下連結

**注意:文件與檔案名稱不建議中間留空白，不然路徑很容易抓不到!!**

```html
<!-- 鄉對路徑 -->
<img
  width="600"
  height="300"
  src="./範例/故宮範例/img/故宮圖片1.jpeg"
  alt="無法顯示"
/>
<!-- 絕對路徑 -->
<img
  width="600"
  height="300"
  src="https://upload.wikimedia.org/wikipedia/commons/b/b4/NationalPalace_MuseumFrontView.jpg"
  alt="無法顯示"
/>
```

### ul ol 標籤

- `<ul>`:代表 unordered list，沒有順序性的列表
- `<ol>`:代表 ordered list，有順序性的列表
- `<li>`:`<ul>`和`<ol>`裡面的東西，有幾個東西就要放幾個`<li>`

```html
<h2>故宮院區</h2>
<ul>
  <li>北部院區</li>
  <li>南部院區</li>
</ul>
```

```html
<h2>故宮三寶</h2>
<ol>
  <li>范寬〈谿山行旅圖〉</li>
  <li>郭熙〈早春圖〉</li>
  <li>李唐〈萬壑松風圖〉</li>
</ol>
```

**[<ol>是可以設定改變排序樣式的屬性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol)**

```html
<h2>故宮三寶</h2>
<ol type="i">
  <li>范寬〈谿山行旅圖〉</li>
  <li>郭熙〈早春圖〉</li>
  <li>李唐〈萬壑松風圖〉</li>
</ol>
```

**[<ul>是可以設定改變排序樣式的屬性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul)**

- type:
  - circle
  - disc
  - square

**預設是:disc**

**注意:這些屬性都可以用 css 來設計，建議用 css 來做**

```html
<h2>故宮三寶</h2>
<ol type="disc">
  <li>范寬〈谿山行旅圖〉</li>
  <li>郭熙〈早春圖〉</li>
  <li>李唐〈萬壑松風圖〉</li>
</ol>
```

**也可以使用巢狀元素(Nesting elements)的形式**

```html
<h2>故宮三寶</h2>
<ol>
  <li>范寬〈谿山行旅圖〉</li>
  <li>郭熙〈早春圖〉</li>
  <li>李唐〈萬壑松風圖〉</li>
  <li>
    另外三寶
    <ol>
      <li>〈翠玉白菜〉</li>
      <li>〈肉形石〉</li>
      <li>〈毛公鼎〉</li>
    </ol>
  </li>
</ol>
```

```html
<h2>故宮三寶</h2>
<ol>
  <li>范寬〈谿山行旅圖〉</li>
  <li>郭熙〈早春圖〉</li>
  <li>李唐〈萬壑松風圖〉</li>
  <li>
    另外三寶
    <ul>
      <li>〈翠玉白菜〉</li>
      <li>〈肉形石〉</li>
      <li>〈毛公鼎〉</li>
    </ul>
  </li>
</ol>
```

# 第八章 block and inline

**在 HTML 中有兩種重要元素的類別:**

- block elements(區塊級元素):

  - 定義: 在頁面中組成一個可見區塊，會單獨佔據一行，前後內容都將以一個換行分隔
  - 作用: 傾向作為於頁面上的結構化元素(structural elements)

    - 段落: <p>
    - 列表: <ul>、<ol>
    - 導航選單(navigation menus)
    - 頁尾(footers)
    - <body>
    - <div>

  - 注意: block element 不會巢套在 inline elements 中，但有可能會巢套其他 block element 中。例如:<div>(division)，但 inline elements 可以巢套在 block element 之中。

- inline-block: 留到 css box model 再解釋

- inline elements:
  - 定義: 放在 block elements 之中的內容，這些元素只由文件內容的一小部分組成，而非由完整的段落或群組式內容組成
  - 用法呈現: 當好幾個 inline elements 放一起，會以並排的方式呈現
    - <a>
    - <span>

# 第九章 基本表格製作

**製作表格必須使用以下這幾種標籤:**

- `<table>` : 定義了整個表格
- `<tr>`(table row) : 用於建構每一行
- `<th>`(table head) : 定義 HTML 表格中的標題單元格
- `<td>`(table data): 定義實際數據

**注意:<td>和<th>並不會重複使用**

**製作表格常用屬性:**

- `colspan`: 定義表格單元格應跨越的列數
- `rowspan`: 定義表格單元格應跨越的行數

```html
<table>
  <tr>
    <th colspan="3">國立故宮博物院</th>
  </tr>
  <tr>
    <th>所屬部門</th>
    <th>員額</th>
    <th>授權法源</th>
  </tr>

  <tr>
    <td>行政院</td>
    <td>502人(2020年)</td>
    <td><<行政院組織法>> <<國立故宮博物院組織法>></td>
  </tr>
</table>
```

**選擇性使用的標籤:(語意上的標籤對外觀沒有任何影響)**

- `<thead>`: 定義表格的表頭部分，通常包含標題列（header row），用於描述表格的每一列的含義。

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>City</th>
    </tr>
  </thead>
</table>
```

- `<tbody>`: 定義表格的主要內容部分（body），通常用於存放多行數據

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>25</td>
      <td>New York</td>
    </tr>
    <tr>
      <td>Jane</td>
      <td>30</td>
      <td>San Francisco</td>
    </tr>
  </tbody>
</table>
```

- `<tfoot>`:定義表格的表尾部分，通常用於顯示總結或附加資訊。

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>25</td>
      <td>New York</td>
    </tr>
    <tr>
      <td>Jane</td>
      <td>30</td>
      <td>San Francisco</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Total: 2 entries</td>
    </tr>
  </tfoot>
</table>
```

# 第十章 基本表單製作

**表單目的和作用: 前端 HTML 表單內的資料會被傳到後端伺服器，而伺服器會把收到的資料存放到資料庫，再回傳一個回應給客戶端**

**<From>標籤的屬性:**

- action: 定義了在 HTML 文檔中提交表單時將表單數據發送到何處
- method: 告訴瀏覽器如何將表單數據發送到伺服器(沒有做預設的值會是 GET)
  - GET:
    - 方法:from data 會被附加到 action 指定的 URL，並且用`?`分隔數據。
    - 用途: 通常用來向伺服器發送非隱密資料，或向伺服器請求資料
  - POST:
    - 方法: 會把資料隱藏起來，不會出現在 URL 裡面，必須在 DevTools 才能看見資料
    - 用途: 通常用來向伺服器寄出隱密資料(例如密碼)，或用來向伺服器送出需要被儲存或處理的資料

**注意:在<from>標籤內的所有內容，有設定 name 屬性的資料才會被送到後端伺服器**

> 可從網址查看

**常見<input>標籤屬性:**

- type:
  - text
  - checkbox
  - email
  - file
  - number
  - password
  - radio
  - range
- checked
- max
- min
- maxlength
- minlength
- placeholder
- required
- value

**<button>標籤若放在<from>標籤內，則預設的 type 是 submit**

**跟<input>常用的搭配為<label>，<label>有一個屬性叫`for`，若這屬性和<input>裡的`id`屬性名稱相同的話，就可以再點 label 時<input>同時被聚焦**

```html
<label for="name">name</label> <input id="name" type="text" name="name" />
```

[input 說明文件](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

### checkbox email file

1. checkbox:

- checkbox 的 label 標籤大多會放在 input 的後面，label 的 for 和 id 名稱要一樣,這樣在點 label 的文字時才會憶起跟著打勾
- 要記得在 input 標籤裡面增加 name 的屬性，submit 才會把資料給後端
- 如果沒有特別設定 input 裡面的 value 屬性的話，打勾預設為 on，沒有打勾就不會送東西給後端
- input 裡面直接加屬性 checked 預設就會是打勾的
- type 為 text，value 是使用者所決定，但 checkbox 的 value 是由前端工程師所決定

```html
<input
  type="checkbox"
  id="newspaper"
  name="newspaper"
  value="subscribe"
  checked
/>
<label for="newspaper">order newspaper?</label>
```

**小題外話: 行為經濟學:有關器官捐贈問題，可以預設打勾，不要再把勾勾拿掉**

2. email:

- email 外表跟 type 設定 text 沒什麼不同，差別只差在他會檢查格式是否符合 email，若不符合是不會讓使用者提交表單，他會跑一個警告告訴使用者請填入 email 格式

- input 有個屬性叫 required，意思是強制讓使用者輸入這格欄位，若沒填入欄位是不可以提交表單

```html
<input
 <label for="email">email</label>
<input type="email" name="email" id="email" required />
```

3. file:

- 可以讓使用者上傳文件到後端

```html
<input type="file">請上傳檔案</input>
```

### number password

4. number:

- 只能輸入數字，並且有上下箭頭可以選

- 如果想讓使用者預設有值，可以在後面加上 value 這個屬性，並且賦予它值

- 年齡有特別的屬性: min(最小值)和 max(最大值)

- step 屬性:

  - 可以設定按上下一次跳多少數字間隔，但只有整數，如果不寫預設值為 1
  - 若 step 設定為整數就只能填整數，若設定為小數點可以填包含小數點的值

```html
<label for="age">age:</label>
<input
  type="number"
  name="age"
  id="age"
  min="0"
  max="125"
  step="2"
  step="0.1"
/>
```

5. password:

- 輸入的東西會成為 `*` ，不會直接被看到
- minlength: 限制最短長度
- maxlength: 限制最長長度
- placeholder: 在沒有填值的情況下預設會出現的東西

```html
<label for="password">password</label>
<input type="password" id="password" name="password" minlength="6" />

<input type="checkbox" id="showPassword" />
<label for="showPassword">show password</label>

<script>
  let showPassword = document.queryselector("#showPassword");
  let password = document.queryselector("#password");
  showPassword.addElementListener("click", () => {
    if (password.type === "text") {
      password.type = "password";
    } else {
      password.type = "text";
    }
  });
</script>
```

**min 和 max 是給數字使用 minlength 和 maxlength 是給輸入文字(text、password)使用**

### radio range

6. range

- 設定屬性 type 為 range 和 type 為 number 其實是一樣的，只不過一個是輸入，一個是用拖拉決定值
- 可以在 input 的前後面加數字，可以設定範圍

```html
<label for="height">height:</label> 0<input
  type="range"
  name="height"
  id="height"
  min="0"
  max="250"
  step="50"
/>250
```

7. radio

- 與 checkbox 不一樣的點在於 在一個選項集合裡面 checkbox 可以多選，但 radio 是單選
- 由 name 來控制是否是一個 set，屬性 name 名稱一樣代表是一組 set
- checked 一樣可以預設勾選的選項
- 若要強制填寫要在相同 name 的 其中一個 input tag 裡面加上 required

```html
<input type="radio" id="male" value="male" name="gender" />
<label for="male">male</label>
<input type="radio" id="female" value="female" name="gender" required />
<label for="female">female</label>
<input type="radio" id="other" value="other" name="gender" />
<label for="other">other</label>
```

# button selection option datalist textarea

**其他的標籤:**

1. button:

- 如果放在 form 標籤裡面，預設的值會是 submit
- 有三種不同的 type
  - submit: 如果放在表單裡面，點擊時就會把表單的資料給交出去給後端
  - reset: 所有的值都會被重新設定
  - button: 預設的 type，前提是不要放在 form 裡面

2. selection: 下拉是選單，裡面會包含 option tag

3. option: 為下拉式選單的選項，value 屬性為會送給後端的值，content 內容則是顯示給使用者的文字

- 若要清除預設，可以加一個空白的 option，為了避免傳空白的值記得在 select 標籤裡面新增 required 屬性

```html
<label for="gender">gender</label>
<select name="gender" id="gender" required>
  <option></option>
  <option value="male">male</option>
  <option value="female">female</option>
  <option value="other">other</option>
</select>
```

4. datalist

- 可以幫 input tag 完成自動填入的功能

- 方法: input tag 的屬性 list 值要填上跟 datalist tag id 一樣的名稱，這樣在 input 輸入有相似的字，就會自動跑出選項

- datalist 裡的選項也是使用 option 去包裹，用法和 select 裡的 option 一樣

```html
<label for="area">地區</label>
<input list="area_list" type="text" id="area" name="area" />
<datalist id="area_list">
  <option value="Taipei">Taipei City</option>
  <option value="New Taipei">New Taipei City</option>
  <option value="Taoyuan">Taoyuan City</option>
  <option value="Taichung">Taichung City</option>
  <option value="Tainan">Tainan City</option>
  <option value="Kaohsiung">Kaohsiung City</option>
</datalist>
```

5. textarea

- 可以讓使用者自動拖拉設定大小的輸入框
- 有兩個屬性可以設定大小
  1. cols: 行的數量
  2. rows: 列的數量

```html
<label for="suggestion"></label>
<textarea
  name="suggestion"
  cols="30"
  rows="10"
  id="suggestion"
  placeholder="Write some suggestion"
></textarea>
```

# 第十一章 其他資訊

1. HTML 中的注註解以`<!--`開頭並以`-->`結尾

- 功用:
  - 過一個月或一年以後回來看自己的程式碼看得懂
  - 跟別人憶起工作的時候，讓別人看得懂

2. <br> 標籤: 插入一個換行符號。

- 使用時機: 想換行但不想要開始一個新<p> 標籤的時候，例如:寫詩或寫住址

```html
<p>
  Shall I compare thee to a summer’s day?<br />
  Thou art more lovely and more temperate:<br />
  Rough winds do shake the darling buds of May,<br />
  And summer’s lease hath all too short a date:<br />
  Sometime too hot the eye of heaven shines,<br />
  And often is his gold complexion dimm’d; <br />
  And every fair from fair sometime declines, <br />
  By chance, or nature’s changing course untrimm’d; <br />
  But thy eternal summer shall not fade, <br />
  Nor lose possession of that fair thou ow’st, <br />
  Nor shall death brag thou wander’st in his shade, <br />
  When in eternal lines to time thou grow’st: <br />
  So long as men can breathe, or eyes can see, <br />
  So long lives this, and this gives life to thee.<br />
</p>
```

3. <hr>(horizontal rule) 標籤: 水平規則，段落之間的主題中斷

- 例如: 故事中場景變化，或章節內的主題轉移

4. HTML entity: 可以使用與號(&)開頭並以分號(;)結尾
   [HTML entity](https://www.htmlsymbols.xyz/)

5. index.html 是伺服器在目錄中查找的默認文件，打 domain name 連過來就會先找 index.html

6. self-closing tag 和所有其他標籤之間的重要區別是自閉合標籤，代表 void element。img 和 br 等 void element 不能包含任何 content。所有其他標籤可能(但不是必須)包含 content。

7. Favicon 是 favorites icon 的縮寫，瀏覽器可以將 favicon 顯示於瀏覽器的網址列中，也可置於書籤列表的網站名前，通常來說 icon 的名稱會設定為 favicon.ico

```html
<link rel="icon" href="./故宮範例/img/favicon.ico" />
```
