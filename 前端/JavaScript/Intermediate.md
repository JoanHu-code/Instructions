# 目錄
- [第一章 陣列與物件](#第一章-陣列與物件)
    - [什麼是物件?](#什麼是物件)
    - [物件常用的使用方式](#物件常用的使用方式)
    - [資料格式](#資料格式)
        - [陣列包物件](#陣列包物件)
        - [物件包陣列](#物件包陣列)
        - [資料格式](#資料格式)
        - [函式回傳](#函式回傳)
- [第二章 進階字串處理](#第二章-進階字串處理)
- [第三章 非同步處理](#第三章-非同步處理)
- [第四章 共用組件](#第四章-共用組件)
- [第五章 網址兩三事篇](#第五章-網址兩三事篇)
- [第六章 正規表達式入門](#第六章-正規表達式入門)
- [第七章 ES6升級指南篇](#第七章-ES6升級指南篇)
- [第八章 Javascript 模組入門篇](#第八章-Javascript-模組入門篇)
- [第九章 Javascript 矯正篇](#第十章-Javascript-矯正篇)


---

# 第一章 陣列與物件

### 什麼是物件?

以人來比喻:

```js
ver human = {
    name:"Joan",
    age:12,
    sex:"female"
}
console.log(human);
```

**物件和陣列的差別:在於一個有key一個沒有key**

> object有key，array沒有key，所以array只能用索引(index)來取值

```js
ver obj = {
    name:"Joan",
    age:12,
    sex:"female"
}

var arr = ['Joan',12,'female']

//兩個取得是同樣的東西
console.log(obj.name);
console.log(arr[0]);
```

> 因為array是用索引取值，因此裡面的位置很重要，一旦位置改變取出來的值就不同，但object並沒有這個問題



> 網頁中任何一個元素都是物件，哪怕是一個 p標籤都是物件

```html
<html>
<body>
    <a id="alink" href="javascript:;" target="_blank">點我超連結</a>
    <script>
        var attr = document.getElementById('alink');
        alink.href = "https://github.com/renew-key/Instructions/blob/main/%E5%89%8D%E7%AB%AF/JavaScript/intermediate.md";
        console.log(link.href);
    </script>
</body>
</html>
```

### 物件常用的使用方式

```js
var obj={
    name:"joan",
    age:12
}
console.log(obj.name);
console.log(obj.age);
obj.sex="female";
console.log(obj.sex);

console.log(obj['name']); //如果直接放key在中括號裡可以取得內容
obj['sex'] = "boy";

```

**用 `[]` 取得和 `.` 取得有神麼不同?**

1. 如果用`[]`，可以用變數的方式替換key值

```js
var obj={
    name:"joan",
    age:12
}
var text = "name";
console.log(obj[text]);

```

### 資料格式

#### 陣列包物件

| firstName | Seniority | position | salary |
|-------|-------|-------|-------|
| Mike | 3 | 前端工程師 | 22000 |
| Jacky | 4 | 網頁設計師 | 76000 |
| Andy | 6 | 全端工程師 | 80000 |
| Scars | 10 | 前端技術總監 | 85000 |
| Alice | 5 | 互動設計師 | 78000 |

```js
var data=[
    {
        firstName:"Mike",
        Seniority:3 ,
        position: "前端工程師",
        salary: 22000
    },
    {
        firstName:"Jacky",
        Seniority:4 ,
        position: "網頁設計師",
        salary: 76000
    },
    {
        firstName:"Andy",
        Seniority:6 ,
        position: "全端工程師",
        salary: 80000
    },
    {
        firstName:"Scars",
        Seniority:10 ,
        position: "前端技術總監",
        salary: 85000
    },
    {
        firstName:"Alice",
        Seniority:5 ,
        position: "互動設計師",
        salary: 78000
    },
    
]

```

#### 物件包陣列

**使用時機:使用對應的key，把不只一個內容渲染上去**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>陣列迴圈應用</title>
    <link rel="stylesheet" href="./css/normalize.css">
    <link rel="stylesheet" href="./css/02-5.css">
</head>
<body>

    <div class="mid">
        <input class="search" type="text" value="線上課程">
        <p>最近熱門搜尋:  
            <a class="tag" href="javascript:;" >媽祖</a>、
            <a class="tag" href="javascript:;">地震</a>、
            <a class="tag" href="javascript:;" >館長</a>、
            <a class="tag" href="javascript:;" >線上課程</a>
        </p>
        <div class="search_list">
        </div>
    </div>
    <script>
        var searchData = {
            "媽祖":[
                {
                    title: '台灣媽祖信仰- 维基百科，自由的百科全书',
                    link: 'https://zh.wikipedia.org/zh-tw/台灣媽祖信仰',
                    text: '媽祖信仰是臺灣普遍民間信仰。早期移民多自華南渡海，心驚膽顫，且台灣四面環海，海上活動頻繁，海神媽祖婆成臺灣人重要精神託付。臺灣有媽祖廟510座以上，有 ...',
                },
                {
                    title: '媽祖的介紹',
                    link: 'www.ntcu.edu.tw/edison/otm/__1.html',
                    text: '媽祖就是「天上聖母」，我們一般通稱「媽祖」或「媽祖婆」。 媽祖是古時候的宋朝人，她的本名叫「林默娘」，從小就相當相當聰明，讀經書過目不忘。 媽祖十三歲的時後 ...',
                }
            ],
            "地震":[
                {
                    title: '地震 - 中央氣象局',
                    link: 'https://www.cwb.gov.tw/V7/earthquake/',
                    text: '資料來源：美國地質調查所主動發布之全球地震自動定位資訊，透過EMAIL方式通報.本網頁僅展示地震規模大於6之全球地震初步訊息，欲查詢詳細地震資訊請 ...',
                }
            ],
            "館長":[
                {
                    title: '館長成吉思汗- YouTube',
                    link: 'https://www.youtube.com/channel/UCnnp2fWa77PP2h08T7WAzzw',
                    text: '健身格鬥者的天堂成吉思汗健身俱樂部進化綜合格鬥中心https://www.facebook.com/mmagym.tw?ref=bookmarks 惡名昭彰全新 ',
                },
                {
                    title: '陳之漢- 维基百科，自由的百科全书',
                    link: 'https://zh.wikipedia.org/zh-tw/陳之漢',
                    text: '陳之漢（1979年3月12日－），原名陳思翰，臺灣知名部落客、直播主、網路名人、企業家、運動員、健身教練、散打武術家，曾任志願役軍人，後為連鎖健身房創辦人兼執行長、「中華民國健力協會」顧問、服飾品牌創辦人。生於臺北蘆洲（今新北市蘆洲區），籍貫宜蘭，人稱「館長」。',
                }
            ],
            "線上課程":[
                {
                    title: '現代 JavaScript 職人之路｜入門篇',
                    link: 'https://hiskio.com/courses/244',
                    text: '現代 JavaScript 職人之路學程，明確的學程定位帶您往前端工程師的技術門檻前進！深厚的 JavaScript 觀念 + 大量的實戰講義 + 情境實作範例，唯一目標就是帶您取得前端工程師的入門券！',
                },
                {
                    title: '現代 JavaScript 職人之路｜中階實戰篇',
                    link: 'https://hiskio.com/courses/245',
                    text: '您需要一位在業界打滾多年、在教學界經驗豐富又懂得如何帶您成長的導師，帶您從基礎起飛，成為進擊的前端工程師。',
                },
                {
                    title: '職人必修的 RWD 網頁入門班',
                    link: 'https://hahow.in/cr/responsive-design',
                    text: '從零開始打好基礎建立觀念，帶入實作，用業界常常遇到的問題當舉例，教你如何解決很多因為行動裝置而產生破版，還有如何利用百分比的切版技巧來減少修改的時間',
                }
            ]
        }
        var searchBar = document.getElementsByClassName('search')[0];
        var searchValue = searchBar.value;
        var tag = document.getElementsByClassName('tag');
        var searchList = document.getElementsByClassName('search_list')[0];
        var searchArr = [];
        var html="";
        // console.log(searchValue);

        function clickToShow(){
         searchValue = this.innerText;
         document.getElementsByClassName('search')[0].value = searchValue
         DomRender();
         
        }
        function DomRender (){
            html="";  
            searchArr=searchData[searchValue];
            for(let i=0;i<searchArr.length;i++){
                html+= '<div class="item">';
                html+='<a href='+searchArr[i].link+'target="_blank" class="title">'+searchArr[i].title+'</a>';
                html+='<a href="'+searchArr[i].link+';" target="_blank" class="link">'+searchArr[i].link+'</a>'
                html+= '<p>'+searchArr[i].text+'</p>';
                html+= '</div>';
                }
         searchList.innerHTML=html;
        }

        function keyUp(){
            searchValue = this.value;
            // console.log(this.value);
            if(searchData[searchValue]){
                DomRender();
            }else{
                html="";
                searchList.innerHTML=html;
            }
           
        }

        function inputValue(){
            if(this.value){
                searchValue = this.value;
                const keys = Object.keys(searchData);
                // console.log(searchValue);
      
                for(let i=0;i< keys.length;i++){
                    if(keys[i].includes(searchValue)){
                        // console.log("111")
                        searchValue = keys[i];
                        DomRender();
                    }
                }
            }
            else{
                html="";
                searchList.innerHTML=html;
            }
            
        }

        for(let i=0;i<tag.length;i++){
            tag[i].addEventListener("click",clickToShow);
        }
        searchBar.addEventListener("input",inputValue)
        // searchBar.addEventListener("keyup",keyUp);
        DomRender();

    
    
    </script>
</body>
</html>
```

#### 資料格式

**1. 陣列**

```js
var arr = [1,2,3,4,5,6,7,8,9,10]
```

> 用索引去查找值

**2. 物件**

```js
var obj ={
    name: "mike",
}
```

> 用key去查找值

**3. 陣列包陣列**

```js
var arrArr = [
    {
        "2019/01/01",
        "http://www.cwb.gov.tw/v?/earthquake/",
    },
    {
        "2019/01/02",
        "http://www.cwb.gov.tw/v?/earthquake/",
    }
]
```

> 如果資料是不管順序性和關聯性，沒有要相互對印可以用陣列包陣列的用法，例如:圖片、內容

**4. 陣列包物件**

```js
var arrObj = [
    {
        data:"2019/01/01",
        url:'http://www.cwb.gov.tw/v?/earthquake/',
    },
    {
        data:"2019/01/02",
        url:'http://www.cwb.gov.tw/v?/earthquake/',
    },
    {
        data:"2019/01/03",
        url:'http://www.cwb.gov.tw/v?/earthquake/',
    },
]
```

**5. 嵌套式**

```js
var nested ={
    idx: "1",
    data: "2019/01/01",
    userList:{
        {name:"Mike"},
        {name:"Jacky"},
        {name:"Andy"},
        {name:"Alice"},
        {name:"Joan"},
    }
}
```

> 可以用來作相對複雜的處理，例:會員資料、註冊資料

**注意事項:如果是中文key值要使用`''`來包裹**

```js
var nested ={
    '索引': "1",
    '資料': "2019/01/01",
    '列表':{
        {'名字':"Mike"},
        {'名字':"Jacky"},
        {'名字':"Andy"},
        {'名字':"Alice"},
        {'名字':"Joan"},
    }
}
```

#### 函式回傳

```js
```