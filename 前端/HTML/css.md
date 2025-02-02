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
