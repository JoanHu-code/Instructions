# css

## 目錄

- [第一章 CSS 簡介](#第一章-CSS-簡介)
- [第二章 CSS 放置位置](#第二章-CSS-放置位置)
- [第三章 CSS 顏色設定](#第三章-CSS-顏色設定)
- [第四章 Selectors](#第四章-Selectors)
- [第五章 Pseudo class,element](#第五章-Pseudo-classelement)
- [第六章 CSS 重點概念](#第六章-CSS-重點概念)
- [第七章 CSS 單位](#第七章-CSS-單位)
- [第八章 font 設定](#第八章-font-設定)
- [第九章 背景設定](#第九章-背景設定)
- [第十章 Box Model 基本認識](#第十章-Box-Model-基本認識)
- [第十一章 width,height 和 overflow](#第十一章-widthheight-和-overflow)
- [第十二章 content-box and border-box](#第十二章-content-box-and-border-box)
- [第十三章 inline-block](#第十三章-inline-block)
- [第十四章 position](#第十四章-position)
- [第十五章 sticky 和 fix 的比較](#第十五章-sticky-和-fix-的比較)
- [第十六章 stacking context,cursor,table](#第十六章-stacking-contextcursortable)
- [第十七章 Transform](#第十七章-Transform)
- [第十八章 Animation](#第十八章-Animation)

# 第一章 CSS 簡介

**DOM Tree (Document Object Model 文件物件模型)**

是加載到瀏覽器中的網頁的樹狀表示，在 DOM Tree 的 Parent Node 可被稱為 Child Node 的父元素(Parent Element)，反之，Child Node 可稱為 Parent Node 的子元素(child Element)。

瀏覽器加仔網頁時，它會創建該頁面的 DOM Tree。

<html>標籤是<head>標籤和<body>標籤的父元素(Parent Element)，反之<html>標籤的子元素(child Element)是<head>標籤和<body>標籤。

```html
<html>
  <head></head>
  <body></body>
</html>
```

**CSS(Cascading Style Sheet) 階層式的樣式表**
被用來設定網頁的樣式及布局。舉例來說，改變字體、顏色、尺寸以及擺放您的內容、拆分為多欄，或是添加動畫效果和其他的裝飾

注意!! 沒有必要了解所有世界上存在的 CSS 屬性!只要認識常用的以及實用的屬性即可!

CSS comment 語法為`/**/`

```html
<style>
  /*selector*/
  h1 {
    color: red;
  }
  h2 {
    color: green;
  }
</style>
```

# 第二章 CSS 放置位置

可以放置三個不同的地方:

1. inline styling

   - 優點: 優先層級最高
   - 缺點: 只能對特定的標籤設定樣式

   ```html
   <h1 style="color: red;">This is h1</h1>
   ```

2. internal styling

   - 優點: 方便撰寫
   - 缺點: 多個 HTML 頁面會難以維護

   ```html
   <html>
     <head>
       <style>
         h1 {
           color: red;
         }
         h2 {
           color: green;
         }
       </style>
     </head>
     <body>
       <h1>This is h1</h1>
       <h2>This is h2</h2>
     </body>
   </html>
   ```

3. external styling(最常用)
   - 優點: 易維護

**style.css**

```css
h1 {
  color: red;
}
h2 {
  color: green;
}
```

**index.html**

```html
<html>
  <head>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <h1>This is h1</h1>
    <h2>This is h2</h2>
  </body>
</html>
```

# 第三章 CSS 顏色設定

1. Color Keywords: 這些為 CSS 預定保留的關鍵字，例如: red,black,purple,green,coral 等等。

```css
h1 {
  color: red;
}
h2 {
  color: green;
}
```

2. rgb: 依照光學三原色，分別設定紅、綠、藍三色彩，數值範圍是 0 到 255, 共 256 種不同選擇。每個 color channel 使用 1 byte 來儲存。

```css
h1 {
  color: rgb(0, 0, 0);
}
h2 {
  color: rgb(255, 255, 255);
}
h3 {
  color: rgb(255, 255, 0);
}
```

3. rgba: 同 rgb，但使用多一個叫 alpha 的 channel 來儲存透明度。透明度範圍是 0 到 1。

```css
h1 {
  color: rgba(0, 0, 0, 0.2);
}
h2 {
  color: rgba(255, 255, 255, 0.5);
}
h3 {
  color: rgba(255, 255, 0, 0.7);
}
```

4. hex: 使用十六進制的數字來代表顏色。十六進制數字範圍是 0、1、2、...、9、A、B、...、F。

```css
h1 {
  color: #000000;
}
h2 {
  color: #ffffff;
}
h3 {
  color: #fff000;
}
```

5. HSL: 即色相、飽和度、亮度(英文: Hue,Saturation,Lightness)。這種表示法試圖做到比基於笛卡爾座標系的幾何結構 RGB 更加直觀。

[HSL 與 hex 系統互換](https://coloors86.netlify.app/)

[css 顏色參考](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color)

| Bit 數 | 可能的組合                             | 種類數量 |
| ------ | -------------------------------------- | -------- |
| 1 bit  | 0, 1                                   | 2 種     |
| 2 bits | 00, 01, 10, 11                         | 4 種     |
| 3 bits | 000, 001, 010, 011, 100, 101, 110, 111 | 8 種     |
| n bits | 2 的 n 次方種                          | 2ⁿ 種    |

8 bits => 1 byte

RAM 8GB (8 Gigabyte)
1 gigabyte = 10 億 bytes

# 第四章 Selectors

- Universal Selector: `*`

  - 匹配任何類型的 HTML element

  ```css
  * {
    color: blue;
  }
  ```

- Element Selector:

  - 可選擇特定的 HTML element

    ```css
    h1 {
      color: blue;
    }
    ```

- ID Selector:

  - 可選擇特有特定 ID 屬性的 HTML element
  - ID 一定要是唯一，不能在一個 HTML 檔案裡有重複

    ```html
    <button id="btnId">click me</button>
    ```

    ```css
    #btnId {
      color: blue;
    }
    ```

- Class Selector:

  - 可選擇特有特定 Class 屬性的 HTML element
  - 可重複利用，一個 HTML 檔案可以有多個重複的 Class
  - 一個標籤裡面可以有多個 class

    ```html
    <button class="btnClass FontSize">click me 1</button>
    <button class="btnClass">click me 2</button>
    ```

    ```css
    .btnClass {
      color: blue;
    }
    .FontSize {
      font-size: 32px;
    }
    ```

- Grouping Selector:

  - 可一次選擇所有數個 HTML 元素，並以逗號分隔

    ```html
    <h1>This is h1</h1>
    <h2>This is h2</h2>
    <h3>This is h3</h3>
    ```

    ```css
    h1,
    h2,
    h3 {
      color: red;
    }
    ```

- Descendant Selector:

  - 由兩個或多個用空格分隔的選擇器組成

    ```html
    <div class="link1">
      <a href="https://www.google.com">Google首頁</a>
      <a href="https://www.youtube.com">Youtube首頁</a>
    </div>
    <div class="link2">
      <a href="../HTML/範例/故宮範例/表單.html">表單</a>
    </div>
    ```

    ```css
    div.link1 a {
      color: red;
    }
    div.link2 a {
      color: green;
    }
    ```

- Attribute Selector:

  - 選擇所有具有相同屬性的 HTML element

    ```html
    <label for="name">name:</label>
    <input type="text" id="name"></input>
    <label for="phone">phone:</label>
    <input type="text" id="phone"></input>
    ```

    ```css
    input[type="text"] {
      color: red;
    }
    ```

**Element Selector 和 Class Selector 可以並用**

```html
<button class="btnClass FontSize">click me 1</button>
<button class="btnClass">click me 2</button>
<a class="FontSize"> This is a link</a>
```

```css
a.FontSize {
  font-size: 10px;
}
```

# 第五章 Pseudo class,element

- Pseudo-class: 用於指定所選元素的特殊狀態

  - hover: 可用於在用戶滑鼠懸停在標籤上時更改標籤的樣式。
  - active: 可用於在用戶滑鼠點擊標籤上時更改標籤的樣式。
  - focus: 可用於在用戶滑鼠點擊<input>標籤上時更改<input>標籤的樣式
  - nth-child(): 可用來選擇第 n 個元素

    ```html
    <label for="name">name:</label>
    <input type="text" id="name"></input>
    <label for="phone">phone:</label>
    <input type="text" id="phone"></input>
    ```

    ```css
    input[type="text"] {
      color: red;
    }
    input[type="text"]:hover {
      color: lightgreen;
    }
    input[type="text"]:active {
      color: blue;
    }
    input[type="text"]:focus {
      color: yellow;
    }
    ```

- Pseudo-element: 添加到選擇器的關鍵字，可讓我們設置所選元素的特定部分的樣式

  - first-line: 可用於更改段落第一行的字體。
  - before: 在標籤前面新增東西。
  - selection:可以改變被選取到的文字的樣式。

    ```html
    <p>This is p1</p>
    <p>This is p2</p>

    <!--lorem+字數+TAB 生成沒有意義的文字-->
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor voluptas
      molestias quis ab nemo ullam rem aspernatur laboriosam at dolorem nisi
      totam, vero quaerat et dicta saepe cupiditate aliquid animi adipisci
      corporis optio quibusdam. Nisi est ipsa perspiciatis inventore consectetur
      eos beatae temporibus facere itaque facilis. At facere inventore quidem
      voluptatum sunt est maxime officia optio error, veniam nulla, nihil
      corporis perspiciatis veritatis reprehenderit! Ut mollitia voluptatibus
      porro, aut minima nam quis earum cum et pariatur veniam corporis eos
      consequuntur placeat quos ratione, dolorem deserunt ea officia dicta!
      Alias impedit animi quis delectus magnam error quos atque ut odio
      aspernatur distinctio deleniti, temporibus dolorem quidem. Corrupti
      reprehenderit laboriosam dolorem nemo quam accusamus. Repellendus maxime
      magni odio, deserunt accusantium totam molestiae reprehenderit ea
      praesentium eum similique esse sunt quaerat consectetur ad magnam mollitia
      soluta nihil, illum eveniet non. Tenetur dolore officia blanditiis maxime
      dolorem doloribus inventore dicta enim rem quisquam labore ut, aperiam
      aliquid ex voluptatum, quaerat quis numquam quasi reprehenderit corrupti
      repellat! A, voluptate. Pariatur ut iste laboriosam quasi illo omnis,
      quidem illum asperiores obcaecati, et quo, soluta sint eaque excepturi
      minima tempora molestiae quaerat harum! Ea temporibus voluptatem alias
      omnis tempora ab id facilis mollitia cumque! Iure optio facilis ut
      repellat sint veniam voluptate odit necessitatibus cum fugit, sed quod?
      Expedita temporibus consequatur et, animi necessitatibus nemo, quidem
      porro voluptate quas laudantium voluptatum minima nesciunt officia? Quae
      non nulla quaerat laboriosam architecto quia? Eaque, eligendi eveniet
      quaerat ipsa animi error non aliquid quis consequuntur laudantium quas,
      exercitationem quod. Explicabo quia repudiandae nemo, libero praesentium
      non quam provident! Molestiae dolor ut eaque? Ab pariatur dolore cum
      provident laboriosam quis suscipit! Numquam in enim nemo, asperiores amet
      accusantium debitis quos omnis sunt architecto! Error voluptatibus sit qui
      impedit sunt dolorum, rerum voluptas consequatur exercitationem,
      explicabo, reprehenderit consequuntur accusantium minus autem ut.
    </p>
    ```

    ```css
    p::before {
      content: ">>";
      color: blue;
    }
    *::selection {
      background-color: lightgreen;
    }
    ```

**Pseudo-element(偽元素)的目的在於創造一個 DOM 當中不存在 HTML 元素，我們知道第一行並沒有被任何 TAG 包住，但`::first-line`選取的過程中，就像是用了一個看不到的 TAG 把第一行包住，所以才能選到這行。這就是 pseudo-element(偽元素)的命名原因**

# 第六章 CSS 重點概念

**Cascading Style Sheet**

- Inheritance:

  - Parants and Children - 在 HTML 當中的 DOM Tree 中，Parant Node 可被稱為 Child Node 的父元素，反之，Child Node 可稱為 Parant Node 的子元素。
  - Inheritance and Non-inheritance Propetries: CSS 當中的某些屬性會被子元素繼承，而某些不會
  - 會繼承的屬性:

    - color
    - font-family
    - font-size
    - font-weight
    - list-style-type
    - text-align
    - [更多相關屬性請查閱](https://www.w3.org/TR/CSS21/propidx.html)

    ```html
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
        故宮三寶：故宮三寶一般是指臺北國立故宮博物院蒐藏的范寬〈谿山行旅圖〉、郭熙〈早春圖〉和李唐〈萬壑松風圖〉等三幅北宋巨碑式水墨畫。近年亦有將〈翠玉白菜〉、〈肉形石〉和〈毛公鼎〉合稱之說法。
      </p>
    </body>
    ```

    ```css
    body {
      color: red;
    }
    ```

  - 注意優先度，user agent styling > inheritance，所以要注意瀏覽器的預設樣式可能會覆蓋繼承的屬性
    - <a> tag 的顏色通常需要額外設定

- Conflicting Styling:

  - 由於一個 HTML 文件可以連結到數個 CSS Stylesheet，且單一 Stylesheet 內部可能出現重複設定樣式的情況，所以 css 程式碼之間可能存在衝突
  - 衝突處理原則有:

        - Priority(優先度)

          - 根據 W3C 的標準，網頁連覽器的預設樣被稱為 user agent stylesheet，而網頁瀏覽器連結的 stylesheet 被稱為 user stylesheet。Pority 優先即順序為:

          1.  inline Styling
          2.  User Stylesheet(內部順序由 Specificity 決定)
          3.  User Agent Stylesheet
          4.  Inheritance

        - Specificity(特定度)

          - CSS Selector 有不同的 Specificity(特定度)，當一個標籤有兩個具體度不同的 CSS Selectoor 時，它會取更 specific(具體)的樣式並套用於標籤上面，而不考慮順序前後

          > 1 被放在前面越重要，放後面越不重要

          1.  id -specificty(1,0,0)
          2.  class -specificty(0,1,0)
          3.  tag -specificty(0,0,1)

          - specific(具體)程度: id>class>tag

        - Order Rule(順序性)
          - 當我們有相同specificty的選擇器時，後寫的選擇器樣式會覆蓋前面寫的樣式。
          - 放在比較後面的<link> stylesheet會複寫放在前面的<link> stylesheet

**user styling(stylesheet) 和 user agent styling(stylesheet)**

- user styling: 程式設計師對網頁設計的樣式
- user agent styling: 瀏覽器預設樣式，非程式設計師設計的

**cascading styleseet: 下面的設定會覆蓋到上面的設定**

```css
h1 {
  color: red;
}
h2 {
  color: red;
}
h1 {
  color: blue;
}
```
