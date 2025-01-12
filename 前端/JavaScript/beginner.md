# 目錄
- [第一章 零基礎關鍵灌輸篇](#第一章-零基礎灌輸篇)
- [第二章 開發好用工具篇](#第二章-開發好用工具篇)
- [第三章 javascript新手須知篇](#第三章-javascript新手須知篇)
- [第四章 邏輯判斷篇](#第四章-邏輯判斷篇)
    - [判斷式 if](#判斷式-if)
    - [判斷式 switch](#判斷式-switch)
- [第五章 DOM物件與事件篇](#第五章-DOM物件與事件篇)
    - [獲取DOM物件](#獲取DOM物件)
    - [function介紹](#function介紹)
    - [onclick事件](#onclick事件)
    - [操作DOM屬性](#操作DOM屬性)
    - [操作DOM style](#操作DOM-style)
    - [innerHTML & innerText](#innerhtml--innertext)
    - [常用的window方法](#常用的window方法)
    - [onmouseover & onmouseout](#onmouseover--onmouseout)
    - [照片牆展示](#照片牆展示)
- [第六章 迴圈入門篇](#第六章-迴圈入門篇)
    - [while迴圈](#while迴圈)
    - [for迴圈](#for迴圈)
    - [全域變數與區域變數](#全域變數與區域變數)
- [第七章 複雜資料庫陣列入門篇](#第七章-複雜資料庫陣列入門篇)
    - [一般資料類型和複雜資料類型](#一般資料類型和複雜資料類型)
    - [陣列](#陣列)
- [第八章 陳列迴圈組合篇](#第八章-陳列迴圈組合篇)
- [第九章 class的應用](#第九章-class的應用)
- [第十章 時間計時器](#第十章-時間計時器)
    - [計時器](#計時器)
    - [照片牆自動撥放](#照片牆自動撥放)

---

# 第一章 零基礎關鍵灌輸篇

### 前端程式語言分成三個:  HTML,CSS,javascript

**W3C: 統合網路平台技術不相同的問題**

## HTML、CSS 和 JavaScript 的功能對比  

| **項目**      | **類比**          | **功能描述**                          | **是否能直接理解**         |  
|---------------|-------------------|---------------------------------------|----------------------------|  
| **HTML**      | 骨架              | 定義網頁的結構與內容，例如文字、圖像等 | 原始碼（可直接知道意思）    |  
| **CSS**       | 外觀              | 設定網頁的樣式，例如顏色、字體、排版  | 原始碼（可直接知道意思）    |  
| **JavaScript**| 大腦              | 為網頁增加交互性與邏輯處理，例如按鈕點擊、數據處理等 | 程式（無法直接知道意思，需要執行後觀察效果） |  



**HTML**

```HTML
<h1>這是原始碼</h1>
```

**CSS**

```CSS
h1{
    font-size:20px
}
```
  
**javascript**

```js
var n=1;
if(n==1){
    console.log('這是程式');
}
```

### jQuery vs javascript

> jQuery 是一種 javascript 的涵式庫，基本上 javascript能做到  jQuery 也能做到


### ESMAScript

**現在通用版本:ES5(2009本版)**

> 如果用不同的版本，要小心瀏覽器不支援的問題

--- 

# 第二章 開發好用工具篇

### vscode

1. 先下載VScode

2. 在VScode裡安裝下列套件:                              
    - chinese (中文翻譯套件)
    - Monokai Dark Soda (顏色樣式主題)
    - Live Server (簡易localhost伺服器)
    - AutoFileName (路徑選擇套件)
    - vscode-icons (文件圖示)
    - Copy filename (復製擋案名)
    - Bracket Pair Colorizer (括號顏色高亮)
    - Color Highlight (色碼高亮)
    - Babel ES6/ES7 (高版本 Js 提示)
    - gitignore (不要加入版本控管 )

### Chorme 開發著工具

- F12

- 滑鼠右鍵 -> 檢查

# 第三章 javascript新手須知篇

### alert介紹

> 在JS裡面最後尾巴式()結尾的話為執行命令

```js
alert(0);
```
> alert會把所有執行續卡住，一定要按確定才會往下走 

> 程式碼是由上往下執行

```js
alert(0);
alert(1);
alert(2);
alert(3);
```

結果: 0 -> 1 -> 2 ->3

### DOM的載入順序和onload事件

**請不要寫在同一個HTML檔案裏面!!應該把.JS檔案獨立出來並且使用引入的方式**

```html
<script scr="./js-path.js"></script>
```

> script 一定要擺在下面，因為要等DOM元素載完才呼叫JS，不然程式會壞掉

解決方法:把程式碼放入window.onload裡面

```js
//等畫面元素下載完成後才執行，例如圖片
window.onload = function()(
    alert(1);
)
```

> 可在開發者工具的Network查看是否有效!

### Debug Console.log()

```js
window.onload = function()(
   console.log("我到畫面上了");
)
```

> 訊息在開發者工具的console面板查看

```js
window.onload = function()(
   console.error("發生錯誤了");
)
```

> 訊息在開發者工具的console面板查看(有紅色錯誤的警戒)

> 其他方法可在gooogle打 js console查看

### 變數和保留字

**宣告變數**

```js
window.onload = function()(
  var a = 1;
  console.log(a);
)
```
> a為1

**保留字**
- 不能拿javascript以有的api命名
- 不能命名為中文
- 不能數字在前面
- 大小寫是不同的東西

**變數類型**

```js
// 三種基本型別： 布林(Boolean)、數值(Number)、字串(String)
var number = 1;
var string = "HISKIO";
var boolean = true;
        
// 兩種複合的型別：陣列(Array)、物件(Object)
var array = [];
var object = {};
        
// 兩種簡單型別：空值(null)、未定義(undefined)
var Null = null;
var Undefined;

// 特殊型別：函式(Function)
var fu = function(){};


// 不可以命名變數用原本js的api當成變數，大小寫有分
// var null = "123";
```

**變數運算**

```js
 var num1 = 1 + 1;
 console.log(num1); //2
 var num2 = 5 - 2;   
 console.log(num2); //3
 var num3 = 2 * 2;
 console.log(num3); //4
 var num4 = 10 / 3;
 console.log(num4); //3.3333...

 // 特殊運算子轉型
 var test1 = "5" + 1;
 console.log(test1); //51
 var test2 = "6" - 1;
 console.log(test2); //5
 var test3 = 1 + "2";
 console.log(test3); //12
 var test4 = 5 - "2";
 console.log(test4); //3
```

> 要小心變數類別，字串和數字相加會有問題!

--- 

# 第四章 邏輯判斷篇

## 判斷式 if

**等於的意義**

- 一個等於是指派(assign)

```js
 var weather = "下雨";
```

> 把下雨指派到weather這個變數裡面

- 兩個等於是判斷值是否相同

```js
 var weather = "下雨";
 console.log(weather == "下雨")
```
>  當weather為下雨時會console出true，反之為false


- 三個等於不只判斷值是否相同，也判斷類型是否相同

```js
 var num = 1;
 console.log(num === "1") //false
 console.log(num == "1") //true
```

=> 為了嚴謹一點，建議都寫三個等於

**if用法**

```js
 var weather = "下雨";

 if(weather == "下雨"){
    alert("今天要帶傘");
 }
```

**if else用法**

```js
 var weather = "下雨";
 if(weather == "下雨"){
    alert("今天要帶傘");
 }else{
    alert("今天不要帶傘");
}
```

**多個if else用法**

```js
 var breakfast = "麥香雞肉堡";

if(breakfast == "麥香雞肉堡"){
    alert("收你30元");
}else if(breakfast == "厚切豬排堡"){
    alert("收你85元");
}else if(breakfast == "總匯蛋餅"){
    alert("收你50元");
}else if(breakfast == "玉米濃湯"){
    alert("收你35元");
}else if(breakfast == "捷克厚牛芝加哥堡"){
    alert("收你75元");
}else{
    alert("其它一律收你55元");
}

```

## 判斷式 switch

```js
 var breakfast = "玉米濃湯";

switch (breakfast) {
    case "麥香雞肉堡":
        alert("收你30元");
        break;
    case "厚切豬排堡":
        alert("收你85元");
        break;
    case "總匯蛋餅":
        alert("收你50元");
        break;
    case "玉米濃湯":
        alert("收你35元");
        break;
    case "捷克厚牛芝加哥堡":
        alert("收你75元");
        break;
    default:
        alert("其它一律收你55元");
        break;
    }
```

> 判斷速度比if else還快，若有多條需判斷，建議使用 switch

---

# 第五章 DOM物件與事件篇

### 獲取DOM物件

**拿取到id**

> 使用document.getElementById()

```html
<body>
    <div id="app">
        <h1>HISKIO</h1>
        <a id="Btn" href="javascript:;"> > 馬上觀看最新課程</a>
    </div>

    <script>
        console.log(document.getElementById("Btn"));
    </script>

</body>
```
> id為唯一值，所以拿到時只有一個

**拿取到class**

> 使用document.getElementsByClassName()

```html
<body>
    <div id="app">
        <h1>HISKIO</h1>
        <a class="Btn" href="javascript:;"> > 馬上觀看最新課程</a>
    </div>
    <script>
        console.log(document.getElementsByClassName("Btn")[0]);
    </script>
</body>
```

>class不是唯一值，所以拿到時可能有很多個，會以array的方式表現，所以後面要指定哪一個

> 程式碼都是由0開始算起，因此`document.getElementsByClassName("Btn")[0]`為拿第一個

**拿取到Tag**

> 使用document.getElementsByTagName()

```html
<body>
    <div id="app">
        <h1>HISKIO</h1>
        <a class="Btn" href="javascript:;"> > 馬上觀看最新課程</a>
    </div>
    <script>
        console.log(document.getElementsByTagName("h1")[0]);
    </script>
</body>
```

> tag原理和class一樣，只不過這次是拿值

### function介紹

```js
function logHello(){
    alert("歡迎光臨　HISKIO");
}

logHello();
```

### onclick事件

> 點擊btn時執行fun

```html
<body>
    <div id="app">
        <h1>HISKIO</h1>
        <a id="Btn" href="javascript:;"> > 馬上觀看最新課程</a>
    </div>
    <script>
        
        function Welcone(){
            alert("目前尚無最新課程");
        }
        
        document.getElementById("Btn").addEventListener("click", Welcone);


    </script>
</body>
```

### 操作DOM屬性

> 點擊btn時新開一個新的頁面

```html
<body>
    <div id="app">
        <h1>HISKIO</h1>
        <a id="Btn" href="javascript:;"> > 馬上觀看最新課程</a>
    </div>
    <script>
        
        function Welcone(){
            document.getElementById("Btn").target = "_blank";
            document.getElementById("Btn").href = "https://hiskio.com/courses";
        }
        
        document.getElementById("Btn").addEventListener("click", Welcone);

    </script>
</body>
```

### 操作DOM style

```html
<body>
    <div id="app">
        <h1 id="title">HISKIO</h1>
        <div class="btnbox">
            <a id="fontSizeBig_btn" href="javascript:;">放大</a>
            <a id="fontSizeSmall_btn" href="javascript:;">縮小</a>
            <a id="fontSizeNormal_btn" href="javascript:;">正常</a>
        </div>
    </div>
</body>

```

有三種方法:

1. 不匿名涵式

``` js
 var title = document.getElementById("title");

    function fontSizeBig(){
        title.style.fontSize = "200px";
    }
    function fontSizeSmall(){
        title.style.fontSize = "100px";
    }
    function fontSizeNormal(){
        title.style.fontSize = "150px";
    }

    document.getElementById("fontSizeBig_btn").addEventListener("click", fontSizeBig);
    document.getElementById("fontSizeSmall_btn").addEventListener("click", fontSizeSmall);
    document.getElementById("fontSizeNormal_btn").addEventListener("click", fontSizeNormal);
```

2. 匿名涵式

``` js
   var title = document.getElementById("title");        

    document.getElementById("fontSizeBig_btn").addEventListener("click", function(){
        title.style.fontSize = "200px";
    });
    document.getElementById("fontSizeSmall_btn").addEventListener("click", function(){
        title.style.fontSize = "100px";
    });
    document.getElementById("fontSizeNormal_btn").addEventListener("click", function(){
        title.style.fontSize = "150px";
    });
```

3. onclick寫法

```js
var title = document.getElementById("title");        
        
    document.getElementById("fontSizeBig_btn").onclick = function(){
        title.style.fontSize = "200px";
    }
    document.getElementById("fontSizeSmall_btn").onclick = function(){
        title.style.fontSize = "100px";
    }
    document.getElementById("fontSizeNormal_btn").onclick = function(){
        title.style.fontSize = "150px";
    }

```

**建議不要使用onclick寫法，onclick寫法本身就是.addEventListener，有add就有remove，因此建議使用.addEventListener**

### innerHTML & innerText

1. innerHTML

```html

<body>
    <div id="app">
        <a id="Btn" href="javascript:;">HiSKIO 是什麼？</a>
        <p id="tit"></p>
    </div>
    <script>
        var title = document.getElementById('tit');
        var txt = "HiSKIO是一個專注於提供學習方向與內容的<a href='https://hiskio.com/' target='_blcnk'>線上課程平台</a>，目前以程式設計為主軸。我們希望讓更多想透過網路自學的妳/ 你，能更簡單、更效率、更有興趣地學習 !"
        document.getElementById("Btn").addEventListener("click", function(){
            // title.innerText = txt;
            title.innerHTML = txt;
        });
    </script>
</body>

```

2. innerText

```html

<body>
    <div id="app">
        <a id="Btn" href="javascript:;">常用的window方法?</a>
        <p id="tit2"></p>
    </div>
    <script>
        var title = document.getElementById('tit2');
        var text =  "window.alert()	        //跳出一個警告訊息窗。\n" +
                    "window.close()	        //關閉瀏覽器視窗。\n" +
                    "window.confirm()	    //跳出一個有確認與取消按鈕地確認框。\n" +
                    "window.createPopup()	//建立一個彈出視窗。\n" +
                    "window.focus()	        //取得焦點。\n" +
                    "window.blur()	        //移除該視窗焦點。\n" +
                    "window.moveBy()	    //以相對位置移動視窗。\n" +
                    "window.moveTo()	    //移動視窗到指定位置。\n" +
                    "window.open()	        //開啟一個新的瀏覽器視窗。\n" +
                    "window.print()	        //輸出目前窗口內容。\n" +
                    "window.prompt()	    //跳出可輸入訊息的對話。 \n" +
                    "window.setInterval()	//計時器。\n" +
                    "window.setTimeout()    //計時器。\n" +
                    "window.clearInterval()	//取消由setInterval()設定的計時器。\n" +
                    "window.clearTimeout()	//取消由setTimeout()方法設定的計時器。\n" +
                    "window.resizeBy()	    //調整視窗大小。\n" +
                    "window.resizeTo()	    //調整視窗大小。\n" +
                    "window.scrollBy()	    //滾動內容。\n" +
                    "window.scrollTo()	    //滾動內容。\n";
        document.getElementById("Btn").addEventListener("click", function(){
            console.log(text);
            title.innerText = "F12 查看 console.log()";
        });

    </script>
</body>

```

> innerText相對innerHTML來說比較安全

### onmouseover & onmouseout

``` html

<body>
    <div id="app">
        <a id="Btn" href="javascript:;">開始滑動</a>
        <p id="tit2">mouseover & mouseout 事件?</p>
    </div>
    <script>
        var title = document.getElementById('tit2');
        document.getElementById("Btn").addEventListener("mouseover", function(){
            title.innerText = "我滑鼠滑進來啦!!!";
        });
        document.getElementById("Btn").addEventListener("mouseout", function(){
            title.innerText = "然後滑鼠又離開啦!!!";
        });
    </script>
</body>

```

### 照片牆展示
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title> 照片牆展示切換 1 </title>
    <link rel="stylesheet" href="./css/normalize.css">
    <link rel="stylesheet" href="./css/05-13.css">
</head>
<body>
    <div id="app">
        <div id="contentPhone"></div>
        <div class="menu">
            <nav>
                <a id="a1"><img src="../images/05/small/a1.jpg" alt=""></a>
                <a id="a2"><img src="../images/05/small/a2.jpg" alt=""></a>
                <a id="a3"><img src="../images/05/small/a3.jpg" alt=""></a>
                <a id="a4"><img src="../images/05/small/a4.jpg" alt=""></a>
                <a id="a5"><img src="../images/05/small/a5.jpg" alt=""></a>
            </nav>
        </div>
    </div>
    <!-- <script src="./js/05-13.js"></script> -->
     <!-- <script src="./js/05-14.js"></script> -->
      <!-- <script src="./js/05-15.js"></script> -->
       <!-- <script src="./js/05-16.js"></script> -->
</body>
</html>

```
1. 05-13.js

```js
window.onload = function(){

    var a1 = document.getElementById("a1");
    var a2 = document.getElementById("a2");
    var a3 = document.getElementById("a3");
    var a4 = document.getElementById("a4");
    var a5 = document.getElementById("a5");
    var phone = document.getElementById("contentPhone");

    a1.addEventListener("click", function(){
        phone.style.backgroundImage = 'url("../images/05/big/a1.jpg")';
    });

    a2.addEventListener("click", function(){
        phone.style.backgroundImage = 'url("../images/05/big/a2.jpg")';
    });

    a3.addEventListener("click", function(){
        phone.style.backgroundImage = 'url("../images/05/big/a3.jpg")';
    });

    a4.addEventListener("click", function(){
        phone.style.backgroundImage = 'url("../images/05/big/a4.jpg")';
    });

    a5.addEventListener("click", function(){
        phone.style.backgroundImage = 'url("../images/05/big/a5.jpg")';
    });

}

```

2. 05-14.js

```js
window.onload = function(){
    
    var a1 = document.getElementById("a1");
    var a2 = document.getElementById("a2");
    var a3 = document.getElementById("a3");
    var a4 = document.getElementById("a4");
    var a5 = document.getElementById("a5");
    var phone = document.getElementById("contentPhone");

    a1.addEventListener("click", showPhoto);
    a2.addEventListener("click", showPhoto);
    a3.addEventListener("click", showPhoto);
    a4.addEventListener("click", showPhoto);
    a5.addEventListener("click", showPhoto);

    function showPhoto(){
        if(this.id == "a1"){
            phone.style.backgroundImage = 'url("../images/05/big/a1.jpg")';
        }else if(this.id == "a2"){
            phone.style.backgroundImage = 'url("../images/05/big/a2.jpg")';
        }else if(this.id == "a3"){
            phone.style.backgroundImage = 'url("../images/05/big/a3.jpg")';
        }else if(this.id == "a4"){
            phone.style.backgroundImage = 'url("../images/05/big/a4.jpg")';
        }else if(this.id == "a5"){
            phone.style.backgroundImage = 'url("../images/05/big/a5.jpg")';
        }
    }

}

```

3. 05-15.js

```js
window.onload = function(){
    
    var a1 = document.getElementById("a1");
    var a2 = document.getElementById("a2");
    var a3 = document.getElementById("a3");
    var a4 = document.getElementById("a4");
    var a5 = document.getElementById("a5");
    var phone = document.getElementById("contentPhone");

    a1.addEventListener("click", showPhoto);
    a2.addEventListener("click", showPhoto);
    a3.addEventListener("click", showPhoto);
    a4.addEventListener("click", showPhoto);
    a5.addEventListener("click", showPhoto);

    function showPhoto(){
        phone.style.backgroundImage = 'url("../images/05/big/' + this.id +'.jpg")';
    }

}

```

4. 05-16.js

```js
window.onload = function(){
    
    var a1 = document.getElementById("a1");
    var a2 = document.getElementById("a2");
    var a3 = document.getElementById("a3");
    var a4 = document.getElementById("a4");
    var a5 = document.getElementById("a5");
    var phone = document.getElementById("contentPhone");
    
    var angleleft = document.getElementById("angleleft");
    var angleright = document.getElementById("angleright");
    var pageIdx = 1;

    a1.addEventListener("click", showPhoto);
    a2.addEventListener("click", showPhoto);
    a3.addEventListener("click", showPhoto);
    a4.addEventListener("click", showPhoto);
    a5.addEventListener("click", showPhoto);
    angleleft.addEventListener("click", angleleftFn)
    angleright.addEventListener("click", anglerightFn)

    function showPhoto(){
        pageIdx = Number(this.id.substr(1));
        phone.style.backgroundImage = 'url("../images/05/big/' + this.id +'.jpg")';
    }

    function angleleftFn(){
        pageIdx = pageIdx - 1;
        if(pageIdx < 1){
            pageIdx = 5;
        }
        phone.style.backgroundImage = 'url("../images/05/big/a' + pageIdx +'.jpg")';
    }
    function anglerightFn(){
        pageIdx = pageIdx + 1;
        if(pageIdx > 5){
            pageIdx = 1;
        }
        phone.style.backgroundImage = 'url("../images/05/big/a' + pageIdx +'.jpg")';
    }



}

```

**substr的說明**

> string.substr(start, length)

參數說明:

1. start（起始位置）：

    - 從字串中開始提取的索引位置（以 0 為起始索引）。
    - 如果是負數，會從字串的末尾開始計算位置。

2. length（可選，提取的長度）：

    - 要提取的字串長度。
    - 如果省略，則從起始位置開始一直提取到字串結尾。


範例:

``` js
let str = "Hello, world!";
console.log(str.substr(7, 5)); // "world"
```

> 解釋：從索引 7 開始，提取 5 個字符，結果是 "world"。

``` js
console.log(str.substr(7)); // "world!"
```

> 解釋：從索引 7 開始，一直到字串的結尾。

``` js
console.log(str.substr(-6, 5)); // "world"
```

> 解釋：-6 表示從字串末尾往前數第 6 個字符開始提取，提取 5 個字符。

---

# 第六章 迴圈入門篇

### while迴圈

```js
 var n = 0;
    var html = "";
    var app = document.getElementById('app');
    while (n < 50) {
        n++;
        html += '<h1 class="box">'+n+'</h1>';
    }
    app.innerHTML = html;

```

### for迴圈

1. 改變形狀

``` js
 var app = document.getElementById('app');
 var html = "";
 for(var i = 0; i < 51; i++){
    html += '<div class="Ball" style="border-radius:'+ i +'px;">' + i + '</div>'
 }
 app.innerHTML = html;
```

2. 改變背景和字的顏色

```js
  var app = document.getElementById('app');
  var html = "";
  var Idx = 0;
  var bigNum = 51;
  for(var i = 0; i < bigNum; i++){
    html += '<div id="a'+i+'" class="Ball" style="border-radius:'+ i +'px;">' + i + '</div>'
  }
   app.innerHTML = html;

  for(var s = 0; s < bigNum; s++){
    document.getElementById('a'+s).addEventListener('click', clickBoxFn)
    }
  function clickBoxFn(){
        this.style.backgroundColor = 'red';
        this.style.color = '#fff';
    }

```

###  全域變數和區域變數

> 區域變數只有fun內部才可用，全域變數全部都可用

```js
    var a = 1;
    function abc(){
        var a = 100;
    }
    abc();
    console.log(a);
```

--- 

# 第七章 複雜資料庫陣列入門篇

### 一般資料類型和複雜資料類型

- 陣列(array)用:[]
- 物件(object)用:{}

```js
    var arr = [];
    // var arr = new Array();
        
    var obj = {};
    // var obj = new Object();;
```

### 陣列

1. 基本顯示

```js
   var arr = ['mike', 'jacky', 'andy', 'scars'];

        console.log(arr[0]);
        console.log(arr[1]);
        console.log(arr[2]);
        console.log(arr[3]);

```

2. 用陣列寫出照片輪播功能

```html
 <body>

    <div id="app">
        <a id="angleleft"><i class="fas fa-angle-left fa-5x"></i></a>
        <img id="photo" src="../images/05/small/a1.jpg" alt="">
        <a id="angleright"><i class="fas fa-angle-right fa-5x"></i></a>
        <h2 id="pagination">1/5</h2>
    </div>

    <script>       
        var arr = [
            '../images/05/small/a1.jpg',
            '../images/05/small/a2.jpg',
            '../images/05/small/a3.jpg',
            '../images/05/small/a4.jpg',
            '../images/05/small/a5.jpg',
        ];
        var angleleft = document.getElementById('angleleft');
        var angleright = document.getElementById('angleright');
        var photo = document.getElementById('photo');
        var pagination = document.getElementById('pagination');
        var pageIdx = 0;

        angleleft.addEventListener('click', function(){
            pageIdx--;
            if(pageIdx < 0){
                pageIdx = 4;
            }
            handImgChange();
        })

        angleright.addEventListener('click', function(){
            pageIdx++;
            if(pageIdx > 4){
                pageIdx = 0;
            }
            handImgChange();
        })

        function handImgChange(){
            photo.src = arr[pageIdx];
            pagination.innerText = (pageIdx + 1) + "/" + arr.length;
        }


    </script>
</body>

```

3. push用法

``` js
 var arr = [];
 arr.push("mike");
 console.log(arr);
 arr.push("jacky");
 console.log(arr);
 arr.push("andy");
 console.log(arr);
 arr.push("scars");
 console.log(arr);
```

> 從最後一個開始新增

3. unshift用法

``` js
 var arr = [];
 arr.unshifth("mike");
 console.log(arr);
 arr.unshift("jacky");
 console.log(arr);
 arr.unshift("andy");
 console.log(arr);
 arr.unshift("scars");
 console.log(arr);
```

> 從第一個開始新增

4. pop用法

``` js
    var arr = ['mike', 'jacky', 'andy', 'scars'];
   console.log(arr);
   arr.pop();
   console.log(arr);
   arr.pop();
   console.log(arr);
   arr.pop();
   console.log(arr);
   arr.pop();
   console.log(arr);
```

> 從最後一個開始刪除

4. shift用法

``` js
    var arr = ['mike', 'jacky', 'andy', 'scars'];
    console.log(arr);
    arr.shift();
    console.log(arr);
    arr.shift();
    console.log(arr);
    arr.shift();
    console.log(arr);
    arr.shift();
    console.log(arr);
```

> 從第一個開始刪除

5. 清空 array

```js
    var arr = ['mike', 'jacky', 'andy', 'scars'];
    console.log(arr);
    arr = [];
    console.log(arr);
```

---

# 第八章 陳列迴圈組合篇

``` HTML
<body>
    <header></header>
    <div id="app">
        <h1>即時新聞</h1>
        <ul id="list">
            <!-- <li><a href="javascript:;"></a></li>-->
        </ul>
        <a class="More" href="javascript:;">More ></a>
    </div>
    <footer></footer>
    <script>
        //請試著用我們所學到的知識，用for迴圈對應title和url並且用innerHTML遷入到HTML裡面
        var html = '';
        var title = [
            "會計年度最後一個月 美國防部狂花1.4億買蝦蟹...",
            "大逆轉！情侶照1.5萬變16萬 當事人道歉了...",
            "台南是民主聖地？謝龍介：變民主很火大...",
            "槓王選立委！韓笑回他長大了 潘恆旭尷尬回應...",
            "捷運西門站藥妝搶駐！日藥妝210萬標下6店面...",
            "她全身麻醉動刀 苦求男友陪！遭嗆：我要上班...",
            "自閉症青年音樂家亞洲巡迴 精彩演出獲好評...",
            "小黃司機遭3人挾持30公里！傳LINE求救逃脫...",
        ];
        var url = [
            "https://news.ebc.net.tw/News/Article/155505",
            "https://news.ebc.net.tw/News/Article/155504",
            "https://news.ebc.net.tw/News/Article/155503",
            "https://news.ebc.net.tw/News/Article/155502",
            "https://news.ebc.net.tw/News/Article/155501",
            "https://news.ebc.net.tw/News/Article/155500",
            "https://news.ebc.net.tw/News/Article/155499",
            "https://news.ebc.net.tw/News/Article/155497",
        ];
        for(var i = 0; i < title.length; i++){
            html+= '<li><a href="'+url[i]+'" target="_blank">'+title[i]+'</a></li>'
        }
        document.getElementById("list").innerHTML = html;

    </script>
</body>
```
---

# 第九章 class的應用

1. 新增和移除class

``` css
*{
    box-sizing: border-box;
}
html, body{
    width: 100%;
    height: 100%;
    font-family: "Microsoft JhengHei","Heiti TC","sans-serif";
}
#app{
    position: relative;
    width: 100%;
    height: 100%;
}
#app > .content{
    width: 100%;
    height: 100%;
    background-image: url("../../images/bg3.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
#app > a.menuBtn{
    cursor: pointer;
    position: absolute;
    color: #fff;
    z-index: 10;
    top: 50px;
    right: 50px;
}
#app > .menu{
    position: fixed;
    top: 0;
    right: -350px;
    width: 350px;
    height: 100%;
    z-index: 20;
    background-color: #fff;
    transition: right .3s;
}
#app > .menu.open{
    right: 0px;
}
#app > .menu > a.closeBtn{
    cursor: pointer;
    position: absolute;
    right: 50px;
    top: 50px;
}
#app > .menu > ul.nav{
    position: absolute;
    width: 100%;
    height: 300px;
    top: 50%;
    margin-top: -150px;
    padding: 0;
}
#app > .menu > ul.nav > li{
    display: block;
    width: 100%;
    height: 25%;
}
#app > .menu > ul.nav > li > a{
    cursor: pointer;
    display: block;
    width: 100%;
    height: 100%;
    padding-left: 50px;
    line-height: 300%;
    font-size: 22px;
}

```

```html
<body>
    <div id="app">
        <a class="menuBtn"><i class="fas fa-bars fa-3x"></i></a>
        <div class="content">
            <img src="../images/logo2.png" alt="">
        </div>

        <div class="menu ">
            <a class="closeBtn"><i class="fas fa-times fa-3x"></i></a>
            <ul class="nav">
                <li><a>abous</a></li>
                <li><a>content</a></li>
                <li><a>user</a></li>
                <li><a>address</a></li>
            </ul>
        </div>
    </div>
    <script>
        var menu = document.getElementsByClassName('menu')[0];
        var menuBtn = document.getElementsByClassName('menuBtn')[0];
        var closeBtn = document.getElementsByClassName('closeBtn')[0];
        

        menuBtn.addEventListener('click', function(){
            menu.classList.add('open');
        })

        closeBtn.addEventListener('click', function(){
            menu.classList.remove('open');
        })

    
    
    </script>
</body>
```

 2. 切換class

 ```css
 *{
    box-sizing: border-box;
}
html, body{
    width: 100%;
    height: 100%;
    font-family: "Microsoft JhengHei","Heiti TC","sans-serif";
}
#app{
    position: relative;
    width: 100%;
    height: 100%;
}
#app > .content{
    position: absolute;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    background-image: url("../../images/bg3.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: left .3s;
}
#app.open > .content{
    left: -350px;
}
#app.open > a.menuBtn > .open{
    display: none;
}
#app.open > a.menuBtn > .close{
    display: block;
}
a.menuBtn{
    cursor: pointer;
    position: absolute;
    color: #fff;
    z-index: 100;
    top: 50px;
    right: 50px;
}
a.menuBtn > .open{
    color: #fff;
}
a.menuBtn > .close{
    display: none;
    color: #000;
}


#app > .menu{
    position: fixed;
    top: 0;
    right: -350px;
    width: 350px;
    height: 100%;
    z-index: 20;
    background-color: #fff;
    transition: right .3s;
}
#app.open > .menu{
    right: 0px;
}
#app > .menu > ul.nav{
    position: absolute;
    width: 100%;
    height: 300px;
    top: 50%;
    margin-top: -150px;
    padding: 0;
}
#app > .menu > ul.nav > li{
    display: block;
    width: 100%;
    height: 25%;
}
#app > .menu > ul.nav > li > a{
    cursor: pointer;
    display: block;
    width: 100%;
    height: 100%;
    padding-left: 50px;
    line-height: 300%;
    font-size: 22px;
    opacity: 0.6;
    transition: opacity .2s;
    font-weight: bold;
}
#app > .menu > ul.nav > li > a:hover{
    opacity: 1;
}
 ```

 ```html
 <body>
    <div id="app">
        <a class="menuBtn">
            <span class="open">
                <i class="fas fa-bars fa-3x"></i>
            </span>
            <span class="close">
                <i class="fas fa-times fa-3x"></i>
            </span>
        </a>

        <div class="content">
            <img src="../images/logo2.png" alt="">
        </div>

        <div class="menu ">
            <ul class="nav">
                <li><a>abous</a></li>
                <li><a>content</a></li>
                <li><a>user</a></li>
                <li><a>address</a></li>
            </ul>
        </div>
    </div>
    <script>
      
        var app = document.getElementById('app');
        var menu = document.getElementsByClassName('menu')[0];
        var menuBtn = document.getElementsByClassName('menuBtn')[0];
        
        menuBtn.addEventListener('click', function(){
            app.classList.toggle('open');
        })

    </script>
</body>

 ```

 3. 檢查class

 ``` js
   clickWatch.addEventListener('click', function(){
            
    //寫法 1
    if(app.classList.contains('open') === false ){
        window.open('https://hiskio.com/professions/1');
    }

    //寫法 2
        /*
        if(app.classList.contains('open') !== true ){
            window.open('https://hiskio.com/professions/1');
        }
        */
            
        //寫法 3
        /*
            if(!app.classList.contains('open')){
                window.open('https://hiskio.com/professions/1');
            }
        */
        });

 ```

 4. 選取狀態切換


 ``` html
 <body>
    <div id="app">
        <div>      
            <img id="logo" src="../images/logo2.png" alt="">
            <ul class="navBox">
                <li><a id="n1" class="nav active">首頁 > </a></li>
                <li><a id="n2" class="nav">關於我們 > </a></li>
                <li><a id="n3" class="nav">連絡客服 > </a></li>
                <li><a id="n4" class="nav">最新課程 > </a></li>
                <li><a id="n5" class="nav">最新消息 > </a></li>
                <li><a id="n6" class="nav">課程公告 > </a></li>
                <li><a id="n7" class="nav">成為老師 > </a></li>
            </ul>
        </div>
    </div>

    <script>
        var navBtn = document.getElementsByClassName('nav');

        for(var i = 0; i < navBtn.length; i++){
            navBtn[i].addEventListener('click', menuClcik);
        }
        
        function menuClcik(){
            for(var s = 0; s < navBtn.length; s++){
                navBtn[s].classList.remove('active');
            }
            this.classList.add('active');
        }


    </script>
</body>
 ```

5. 選取狀態切換更升級

```html
<body>
    <div id="app">
        <div class="left">     
            <div>
                <img id="logo" src="../images/logo2.png" alt="">
                <ul class="navBox">
                    <li><a id="n1" class="nav active">首頁 > </a></li>
                    <li><a id="n2" class="nav">關於我們 > </a></li>
                    <li><a id="n3" class="nav">連絡客服 > </a></li>
                    <li><a id="n4" class="nav">最新課程 > </a></li>
                    <li><a id="n5" class="nav">最新消息 > </a></li>
                    <li><a id="n6" class="nav">課程公告 > </a></li>
                    <li><a id="n7" class="nav">成為老師 > </a></li>
                </ul>
            </div> 
        </div>
        <div class="right">
            <div id="p1" class="page"># 首頁</div>
            <div id="p2" class="page"># 關於我們</div>
            <div id="p3" class="page"># 連絡客服</div>
            <div id="p4" class="page"># 最新課程</div>
            <div id="p5" class="page"># 最新消息</div>
            <div id="p6" class="page"># 課程公告</div>
            <div id="p7" class="page"># 成為老師</div>
        </div>
    </div>

    <script>
        
        var navBtn = document.getElementsByClassName('nav');
        var page = document.getElementsByClassName('page');
        var pageIdx = 0;

        page[0].style.display = 'flex';

        for(var i = 0; i < navBtn.length; i++){
            navBtn[i].addEventListener('click', menuClcik);
        }
        
        function menuClcik(){
            for(var s = 0; s < navBtn.length; s++){
                navBtn[s].classList.remove('active');
                page[s].style.display = 'none';
            }
            this.classList.add('active');
            pageIdx = Number(this.id.substr(1));
            page[pageIdx-1].style.display = 'flex';
        }
        
        
    </script>
</body>
```

---

# 第十章 時間計時器

### 計時器

1. 數到十秒的計時器

```js
 var idx = 0;
 var time = document.getElementById('time');
     time.innerText = idx;   
 var go = setInterval(function(){
     idx++;
     time.innerText = idx;

     if(idx >= 10){
        clearInterval(go); //讓計時器暫停
     }
 },1000);
```

2. 計時器是同時進行

``` js
    var time = document.getElementById('time');
        time.innerText = '3秒後開始';
    setTimeout(function(){
        time.innerText = '開始!';
    },3000);

    setTimeout(function(){
        time.innerText = 'END';
    },6000);

```

3. 寫一個播放、暫停、重新的計時器

``` html
<body>
    <div>
        <h1 id="timeTxt">0</h1>
        <div class="btn">
            <a id="play" class="">播放</a>
            <a id="stop">暫停</a>
            <a id="reset">重新</a>
        </div>
    </div>

    <script>
        //寫一個播放、暫停、重新的計時器
        var timeTxt = document.getElementById('timeTxt');
        var play = document.getElementById('play');
        var stop = document.getElementById('stop');
        var reset = document.getElementById('reset');

        var playTime = null;
        var time = 0;
        var isStop = false;

        play.addEventListener("click", playFn);
        stop.addEventListener("click", stopFn);
        reset.addEventListener('click', resetFn)

        
        function playFn(){
            play.removeEventListener("click", playFn);
            TimeGo();
            resetActive();
            this.classList.add('active');
        }
        
        function stopFn(){
            play.addEventListener("click", playFn);
            clearInterval(playTime);
            resetActive();
            this.classList.add('active');
        }

        function resetFn(){
            play.removeEventListener("click", playFn);
            time = 0;
            timeTxt.innerText = time;
            resetActive();
            this.classList.add('active');
            clearInterval(playTime);
            setTimeout(function(){
                resetActive();
                play.addEventListener("click", playFn);
            }, 1500);
            
        }

        function TimeGo(){
            playTime = setInterval(function(){
                time++;
                timeTxt.innerText = time;
            }, 1000);
        }

        function resetActive(){
            play.classList.remove('active');
            stop.classList.remove('active');
            reset.classList.remove('active');
        }



    </script>
    
</body>
```

4. 寫一個自動輪播圖片的js

```js
window.onload = function(){
    
    var pageidx = 1;
    var time = null;
    var a1 = document.getElementById("a1");
    var a2 = document.getElementById("a2");
    var a3 = document.getElementById("a3");
    var a4 = document.getElementById("a4");
    var a5 = document.getElementById("a5");
    var phone = document.getElementById("contentPhone");

    a1.addEventListener("click", showPhoto);
    a2.addEventListener("click", showPhoto);
    a3.addEventListener("click", showPhoto);
    a4.addEventListener("click", showPhoto);
    a5.addEventListener("click", showPhoto);

    function showPhoto(){
        pageidx = Number(this.id.substr(1));
        phone.style.backgroundImage = 'url("../images/05/big/' + this.id +'.jpg")';
        reset();
        clearInterval(time);
        timeGo();
    }
    
    function timeGo(){
        time = setInterval(function(){
            pageidx++;
            if(pageidx > 5){
                pageidx = 1;
            }
            phone.style.backgroundImage = 'url("../images/05/big/a' + pageidx +'.jpg")';
            reset();
        }, 3000);
    }

    function reset(){
        for(var i = 1; i < 6; i++){
            document.getElementById('a'+ i).style.opacity = 0.5;
        }
        document.getElementById('a'+ pageidx).style.opacity = 1;
    }

    timeGo();
    document.getElementById('a'+pageidx).style.opacity = 1;
    

}
```