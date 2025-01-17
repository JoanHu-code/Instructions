# 目錄

- [第一章 Vue 基礎語法](#第一章-vue基礎語法)
  - [setup() 函數](#setup-函數)
  - [ref 和 reactive](#ref和reactive)
  - [資料雙向綁定](#資料雙向綁定)
  - [v-on 事件綁定](#v-on-事件綁定)
  - [readonly](#readonly)
  - [v-for 列表渲染](#v-for-列表渲染)
  - [v-if 與 v-show](#v-if-與-v-show)
  - [v-bind 屬性綁定](#v-bind-屬性綁定)
  - [computed](#computed)
  - [資料篩選 data Filter](#資料篩選-data-filter)
  - [資料監控](#資料監控)
    - [watch](#watch)
    - [watchEffect](#watcheffect)
  - [Lifecycle Hooks 生命週期](#lifecycle-hooks-生命週期)
  - [axios 處理](#axios處理)
    - [取得時間點](#取得時間點)
    - [選染資料](#選染資料)
    - [邏輯處理](#邏輯處理)
    - [loading](#loading)
  - [範例 拼圖遊戲製作](#範例-拼圖遊戲製作)
  - [事件修飾符](#事件修飾符)
  - [關於 ref 跟 reactive 以及 watch 與 deep](#關於-ref-跟-reactive-以及-watch-與-deep)
- [第二章 Vue 常見的表單元件處理](#第二章-vue常見的表單元件處理)
  - [FormBindings](#formbindings)
  - [Checkbox](#checkbox)
  - [下拉式選單](#下拉式選單)
  - [registered 會員註冊](#registered會員註冊)
  - [v-model Modifiers 修飾符](#v-model-modifiers修飾符)
  - [Vue 表單自動暫存](#vue表單自動暫存)

---

# 第一章 Vue 基礎語法

### setup() 函數

```html
<body>
  <div id="app"></div>
  <!--無法使用vue語法-->
  <a href=""></a>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp } = Vue;
    createApp({
      setup() {
        return {};
      },
    }).mount("#app");
  </script>
</body>
```

**vue 可以控制的範圍就在 `<div id="app"></div>`裡面，如果寫在外面，那就不能用 Vue**

### ref 和 reactive

**1. ref**

```html
<body>
  <div id="app">
    <!--一秒過去後依舊是Hello Vue!-->
    <h1>{{test}}</h1>
    <!--一秒過去後變Hi world!!-->
    <h1>{{test2}}</h1>
  </div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, ref, reactive } = Vue;
    createApp({
      setup() {
        //畫面上的資料不會同步
        let test = "Hello Vue!";
        setTimeout(() => {
          test = "Hi world!";
          console.log(test);
        }, 1000);

        //畫面上的資料會同步
        const test2 = ref("Hello Vue!");
        setTimeout(() => {
          test2.value = "Hi world!";
          console.log(test2.value);
        }, 1000);

        return {
          test,
          test2,
        };
      },
    }).mount("#app");
  </script>
</body>
```

**一般的變數宣告在 vue 裡面不會被綁定，要綁定必須要使用`ref`和`reactive`等 vue 相關的方法做綁定**

> 使用`ref`時會返回一個被 vue 包裝過的物件，因此要用物件的方式`.value`的方式，把裡面的值取出來

> 用解構的方式把`ref`取出來，就不用再寫 let test2 = vue.ref("Hello Vue!");這樣的形式了

**2. reactive**

> reactive 涵式只接受 `物件` 和 `陣列`

```html
<body>
  <div id="app">
    <p>姓名:{{message.name}}</p>
    <p>年齡:{{message.age}}</p>
    <p>性別:{{message.sex}}</p>
  </div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, reactive } = Vue;
    createApp({
      setup() {
        const message = reactive({
          name: "Mike",
          age: 18,
          sex: "male",
        });
        return { message };
      },
    }).mount("#app");
  </script>
</body>
```

**ref 和 reactive 要如何選擇?**

```html
<body>
  <div id="app"></div>
  <script scr="./js/vue.js"></script>
  <script>
    const { ref, reactive } = Vue;
    const App = {
      setup() {
        const text = ref("Hello Vue!");
        const message = reactive({
          name: "Mike",
          age: 18,
          sex: "male",
        });
        return {
          text,
          message,
        };
      },
    };

    Vue.createApp(App).mount("#app");
  </script>
</body>
```

| 特性             | `ref`                                                 | `reactive`                                        |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------- |
| **定義資料型別** | 可以定義任何型別的資料（包括基本型別、物件、陣列等）  | 只能定義物件和陣列，不能定義基本型別              |
| **監聽屬性變動** | 不會對物件或陣列內部的屬性變動作監聽                  | 會對物件或陣列內部的屬性變動作深層監聽            |
| **訪問資料方式** | 訪問資料需要使用 `.value`（例如 `ref.value`）         | 訪問資料時不需要 `.value`，直接使用物件或陣列名稱 |
| **監聽深度**     | 只會對 `ref` 本身的變動做監聽，對物件內部屬性無法監聽 | 會對物件的每一層屬性變動都進行監聽                |
| **適用場景**     | 適合用於單一變數，或物件與陣列等資料的直接操作        | 適用於需要深層監聽的物件或陣列                    |

### 資料雙向綁定

**當輸入時內容會自動變動**

> 原本的模式:

1. 監聽`input`

2. 取得取得輸入的值

3. 同步到 html 裡面

```html
<body>
  <h1 id="test1">Hello Vue!</h1>
  <input id="input1" />
  <br />
  <br />
  <br />
  <br />
  <h1 id="test2">Joan</h1>
  <input id="input2" />

  <script>
    let test1 = document.getElementById("test1");
    let test2 = document.getElementById("test2");
    let input1 = document.getElementById("input1");
    let input2 = document.getElementById("input2");

    input1.addEventListener("input", (e) => {
      test1.innerText = e.target.value;
    });

    input2.addEventListener("input", (e) => {
      test2.innerText = e.target.value;
    });
  </script>
</body>
```

> vue 的模式: 直接使用`v-model`進行綁定，一旦輸入了值也可以跟著改變

```html
<body>
  <div id="app">
    <h1>{{text}}</h1>
    <input v-model="text" />
    <br />
    <br />
    <br />
    <br />
    <h1>{{message.name}}</h1>
    <input v-model="message.name" />
  </div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, ref, reactive } = Vue;
    createApp({
      setup() {
        const text = ref("Hello Vue!");
        const message = reactive({ name: "Joan" });
        return {
          text,
          message,
        };
      },
    }).mount("#app");
  </script>
</body>
```

### v-on 事件綁定

```html
<body>
  <div id="app">
    <h1>{{num}}</h1>
    <button v-on:mouseover="add">Add</button>
    <button v-on:click="add">Add</button>
    <button @mouseover="sub">Sub</button>
    <button @click="sub">Sub</button>
    <br />
    <br />
    <h1>{{test.idx}}</h1>
    <button v-on:mouseover="add">Add</button>
    <button v-on:click="add">Add</button>
    <button @mouseover="sub">Sub</button>
    <button @click="sub">Sub</button>
  </div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, ref, reactive } = Vue;
    createApp({
      setup() {
        const num = ref(0);
        const test = reactive({ idx: 0 });
        const add = () => {
          num.value++;
          test.idx++;
        };
        const sub = () => {
          num.value--;
          test.idx--;
        };
        return {
          test,
          num,
          add,
          sub,
        };
      },
    }).mount("#app");
  </script>
</body>
```

> v-on 的縮寫是`@`
> ref 需要`.value`做運算，reactive 並不需要，可以直接運作

### readonly

```html
<body>
  <div id="app">
    <h1>{{num}}</h1>
    <button v-on:mouseover="add">Add</button>
    <button v-on:click="add">Add</button>
    <button @mouseover="sub">Sub</button>
    <button @click="sub">Sub</button>
    <br />
    <br />
    <h1>{{test.idx}}</h1>
    <button v-on:mouseover="add">Add</button>
    <button v-on:click="add">Add</button>
    <button @mouseover="sub">Sub</button>
    <button @click="sub">Sub</button>
  </div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, ref, reactive, readonly } = Vue;
    createApp({
      setup() {
        const num = ref(0);
        const copyNum = readonly(num);
        const test = reactive({ idx: 0 });
        const copyNum2 = readonly(test);
        const add = () => {
          num.value++;
          test.idx++;
          console.log(num.value);
          console.log(copyNum.value);

          Text(); //會報錯Set operation on key "value" failed: target is readonly.
        };
        const sub = () => {
          num.value--;
          test.idx--;
        };
        const Text = () => {
          copyNum.value++;
          copyNum2.idx = 2;
        };
        return {
          test: readonly(test),
          num,
          add,
          sub,
        };
      },
    }).mount("#app");
  </script>
</body>
```

### v-for 列表渲染

**v-for 可以放兩個參數，第一個放資料(arrry 裡的 object)，第二個放索引**

**v-show 的語法是透過增加 css 的 display:none 來做控制，若是 true 就會打開，false 則會關閉**

```html
<body>
  <div id="app">
    <ul>
      <li
        v-for="(list, idx) in listArr"
        v-bind:key="list.name"
        v-show="list.show"
      >
        {{idx + 1}}. {{list.name}}
      </li>
    </ul>
  </div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const {createApp,ref, reactive,readonly} = Vue;
      createApp({
      setup() {
        const listArr = reactive([
          { name: "2020 Vue3 專業職人 | 入門篇", show: true },
          { name: "2020 Vue3 專業職人 | 加值篇", show: false },
          { name: "2020 Vue3 專業職人 | 進階篇", show: true },
          { name: "現代 JavaScript 職人之路｜入門篇", show: true },
          { name: "現代 JavaScript 職人之路｜中階實戰篇", show: false },
        ]);
        return {
          listArr,
        };
      },
    });.mount("#app");
  </script>
</body>
```

**v-for 裡面 key 值的重要性**

> 為什麼要 key 值；在 DOM 元素渲染完資料後，若某筆資料被改動就要重新全部再渲染一次，但如果有 key 值，就可以動態的綁定資料和 DOM 元素，如果只改變其中一個資料並不會全部重新渲染，只會渲染改變的資料

**key 注意事項:**

- 必須是資料裡面的唯一值

- 不能用 index 作為 key: index 會跟隨資料變動，會導致渲染錯誤的可能

### v-if 與 v-show

**v-show: 使用 css 控制 diplay**

**v-if: 直接把 DOM 元素刪除或加入**

| 特性         | v-if                                   | v-show                                   |
| ------------ | -------------------------------------- | ---------------------------------------- |
| **渲染**     | 一開始為 `false` 時不會渲染            | 一開始即渲染，即使為 `false`             |
| **效能消耗** | 在切換時會進行元素的進出操作           | 僅會切換 `display` 屬性，不進行 DOM 操作 |
| **使用場景** | 適用於條件渲染或不頻繁切換的情境       | 適用於頻繁切換顯示/隱藏的情境            |
| **初始加載** | 初次渲染較慢，因為不會渲染被隱藏的元素 | 初次渲染較快，所有元素一開始都渲染       |
| **使用建議** | 適用於像是權限控制等初始不可見的元素   | 不建議用於需要頻繁切換的情境（例如 Tab） |
| **效能評估** | 會增加渲染效能                         | 會增加切換的效能                         |

### v-bind 屬性綁定

**希望可以透過資料的狀態，去塞入 class**

> 只要是 html 裡的屬性(attribute)都可以透過 v-bind 去做 css 的修改
> v-bind 的縮寫是`:`

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>v-bind:attribute</title>
    <style>
      .red {
        color: red;
      }
      .blue {
        color: blue;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <ul>
        <li
          v-for="(list, idx) in listArr"
          v-bind:key="list.name"
          :class="list.status"
        >
          {{idx + 1}}. {{list.name}}
        </li>
      </ul>
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
      const {createApp,ref, reactive,readonly} = Vue;
        createApp({
        setup() {
          const listArr = reactive([
           { name: "2020 Vue3 專業職人 | 入門篇", status: "red" },
            { name: "2020 Vue3 專業職人 | 加值篇", status: "blue" },
            { name: "2020 Vue3 專業職人 | 進階篇", status: "red" },
            { name: "現代 JavaScript 職人之路｜入門篇", status: "red" },
            { name: "現代 JavaScript 職人之路｜中階實戰篇", status: "blue" },
          ]);
          return {
            listArr,
          };
        },
      });.mount("#app");
    </script>
  </body>
</html>
```

**class 透過 v-bind 切換案例**

> 透過`open`這 class 的增加和移除來控制開和關

> 如果想用 v-bind 控制 class，要加入 css 物件，如果 isOpen 為 true 就會加入，反之為 false 就會移除

```html
v-bind:class="{open: isOpen}"
```

> 也可以把 class 混在一起，可以用 array 包起來

```html
:class="['box', {open: isOpen}]"
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>handleClassAttribute</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      html,
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: slategray;
      }
      #app {
        width: 400px;
        overflow: hidden;
        border: 1px solid #42b983;
        border-radius: 10px;
      }
      .title {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        background-color: #42b983;
        font-weight: bold;
        color: darkslategray;
        font-size: 20px;
        border-bottom: 1px solid #d2d2d2;
      }
      .box {
        display: block;
        width: 100%;
        height: 0;
        background-color: snow;
        transition: height 0.4s;
      }
      .box.open {
        height: 200px;
      }
      .box > li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #d2d2d2;
        font-size: 12px;
        color: darkslategray;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <a @click="handleListShow" class="title">課程列表</a>
      <ul :class="['box', {open: isOpen}]">
        <li v-for="(list, idx) in listArr" :key="list.name">
          {{idx + 1}}. {{list.name}}
        </li>
      </ul>
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
      const { createApp, ref, reactive, readonly } = Vue;
      createApp({
        setup() {
          const isOpen = ref(true);
          const listArr = reactive([
            { name: "2020 Vue3 專業職人 | 入門篇" },
            { name: "2020 Vue3 專業職人 | 加值篇" },
            { name: "2020 Vue3 專業職人 | 進階篇" },
            { name: "現代 JavaScript 職人之路｜入門篇" },
            { name: "現代 JavaScript 職人之路｜中階實戰篇" },
          ]);

          const handleListShow = () => {
            isOpen.value = !isOpen.value;
          };

          return {
            isOpen,
            listArr,
            handleListShow,
          };
        },
      }).mount("#app");
    </script>
  </body>
</html>
```

### computed

**當資料變動時，computed 可以重新計算**

> 三元判斷式: 條件 ? true 會執行的指令 : flase 會執行的指令

**computed 和 function 的差異**

1. computed 會依據計算的資料進行緩存，只要你的資料沒有重新被更改，你的 computed 就不會被重新執行

   - 計算 DOM 元素的高度
   - 重新組合資料，不引響原本資料的內容
   - 使用 computed 的資料時也要`.value`

2. function 不會進行緩存，每次都會重新執行，但是可以傳入參數進行處理

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Computed</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      html,
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: slategray;
      }
      #app {
        width: 400px;
        overflow: hidden;
        border: 1px solid #42b983;
        border-radius: 10px;
      }
      .title {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        background-color: #42b983;
        font-weight: bold;
        color: darkslategray;
        font-size: 20px;
        border-bottom: 1px solid #d2d2d2;
      }
      .box {
        display: block;
        width: 100%;
        height: 0;
        background-color: snow;
        transition: height 0.4s;
      }
      .box > li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #d2d2d2;
        font-size: 12px;
        color: darkslategray;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <a @click="HandListShow" class="title">課程列表</a>
      <ul class="box" :style="{height: BoxHeight}">
        <li v-for="(list, idx) in ItemArr" :key="list">{{list}}</li>
      </ul>
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
      const { ref, reactive, computed } = Vue;
      const App = {
        setup() {
          const isOpen = ref(true);
          const listArr = reactive([
            { name: "2020 Vue3 專業職人 | 入門篇", money: 3200 },
            { name: "2020 Vue3 專業職人 | 加值篇", money: 100 },
            { name: "2020 Vue3 專業職人 | 進階篇", money: 500 },
            { name: "現代 JavaScript 職人之路｜入門篇", money: 300 },
            { name: "現代 JavaScript 職人之路｜中階實戰篇", money: 1600 },
            { name: "職人必修的RWD 網頁入門班", money: 900 },
            { name: "HTML5+Animate CC 網頁動畫與遊戲互動", money: 2000 },
            { name: "現代 JavaScript 職人之路｜面試篇", money: 1800 },
          ]);

          const ItemArr = computed(() => {
            const map = listArr.map((item, idx) => {
              return `${idx + 1}. ${item.name} => ${item.money}`;
            });
            return map;
          });

          const BoxHeight = computed(() => {
            return isOpen.value ? `${ItemArr.value.length * 40}px` : "0px";
          });

          const HandListShow = () => {
            isOpen.value = !isOpen.value;
          };

          return {
            isOpen,
            ItemArr,
            HandListShow,
            BoxHeight,
          };
        },
      };
      Vue.createApp(App).mount("#app");
    </script>
  </body>
</html>
```

### 資料篩選 data Filter

**當 v-if 和 v-for 一起執行時，v-if 的優先順序會高於 v-for**

> v-for 跟 v-if 不能同時使用

**解決方法**

1. v-if 改成 v-for: 問題是索引會不對，`Element`不是沒有渲染，只是被`display:none`起來

2. 先透過 computed 運算結果，把結果運算出來後再去跑 v-for

### 資料監控

#### watch

**當資料被改變時可以透過 watch 來知道資料被改變**

1. watch 涵式可以傳兩個參數，第一個參數要傳入`監控的值`，第二個要放入當值備感變時會觸發的涵式

2. watch 觸發的涵式會回傳兩個東西，第一個是被改變的新值，地案個是舊值

**watch 的值監控 ref 資料**

```html
<div id="app"></div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
      const { ref} = Vue;
      const App = {
        setup() {
        const idx = ref(0);


        watch(idx, (newIdx, oldIdx)=>{
            console.log('被更改後的值:',newIdx,"舊的值:",oldIdx);
        })

          setInterval(()=>{
              idx.value++;
          },1000)
          return {

          };
        },
      };
      Vue.createApp(App).mount("#app");

```

**watch 的值監控 reactive 的資料**

> recative 不能直接去監控，要拿裡面單一的 key 做監控才有用

> watch 是一個必須被讀取的值

```js
const { reactive } = Vue;
const App = {
  setup() {
    const data = recative({ idx: 0 });

    //這拿到的值會一樣
    watch(data, (newIdx, oldIdx) => {
      console.log("被更改後的值:", newIdx, "舊的值:", oldIdx);
    });

    //這樣才有用
    watch(
      () => data.idx, //return key才能被監控
      (newIdx, oldIdx) => {
        console.log("被更改後的值:", newIdx, "舊的值:", oldIdx);
      }
    );

    setInterval(() => {
      data.idx++;
    }, 1000);
    return {};
  },
};
Vue.createApp(App).mount("#app");
```

**ref 和 reactive 用 watch 的比較**

| ref                                    | reactive                                                                                                          |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 可以直接監聽整個參數，甚至不用加 value | 可以監聽整個變數，但無法去判斷裡面回傳的值，需要監控裡面單一的 key 值才知道被改變的值；需要用箭頭涵式的方式回傳值 |
| watch(idx,(newIdx,oldIdx)=>{})         | watch(()=>data.idx,(newIdx,oldIdx))                                                                               |

**若是使用 ref 指派 object 和 array 的話，無法做深度監聽**

> 在監聽整個物件時只有 reactive 有被監聽到，ref 是不會被監聽到的

> 只是不能監控 ref 整個物件，如果只是想監控裡面單一的 key 值還是可以做到的

```js
const { reactive, ref } = Vue;
const App = {
  setup() {
    const refObj = ref({ idx: 0 });
    const recativeObj = recative({ idx: 0 });

    //無法被監控(整個物件)
    watch(refObj, (newIdx, oldIndx) => {
      console.log("newIdx: ", newIdx, "oldIndx", oldInx);
    });

    //還是可以被監控到(值)
    watch(
      () => refObj.idx,
      (newIdx, oldIndx) => {
        console.log("newIdx: ", newIdx, "oldIndx", oldInx);
      }
    );

    //可以被監控(整個物件)
    watch(recativeObj, (newIdx, oldIndx) => {
      console.log("newIdx: ", newIdx, "oldIndx", oldInx);
    });

    setInterval(() => {
      refObj.value.idx++;
      recativeObj.idx++;
    }, 1000);
    return {};
  },
};
Vue.createApp(App).mount("#app");
```

**深度資料監控**

> watch 可以放入第三個參數，第三個參數是設定值的概念，可以在(物件)裡面新增一個叫`deep`的值，可以幫助 ref 做深層監控

**注意:`deep`會針對每個 key 去做掃描，因此效能耗費較大**

1. 如果用`ref`包物件的話，請針對單一的 key 去做監控，不要整個去做監控

2. 只有在大範圍需要掃描時，才用`deep`做深度監控會比較好

```js
const { reactive, ref } = Vue;
const App = {
  setup() {
    const data = ref({ user: {} });

    watch(
      data,
      (newVal) => {
        console.log(newValue);
      },
      { deep: true }
    );

    setInterval(() => {
      data.value.user["name"] = "mike";
    }, 1000);

    return {};
  },
};
Vue.createApp(App).mount("#app");
```

#### watchEffect

1. 不需要傳入任何需要監控的資料
2. watchEffect 在初始化時就會先被執行
3. 如果想用 watchEffect 做監聽，就要在裡面放入要監聽的值
   - 例如:conosle.log(需要被監聽的值)
4. watchEffect 是可以被中斷停止的

```js
      const {  reactive,ref,watchEffect  } = Vue;
      const App = {
        setup() {
          const num = ref(0);
          const numData = reactive({idx:0});
          let timer = null
          //只有在watch裡面被吊用到才會執行，因此numData並不會被監聽
          const stop = watchEffect{()=>{
            console.log(num.value);
            if(num.value>=4){
              stop(); //變數是自己命名=>這樣就可以關閉watchEffect
              clearInterval(timer); //把setInterval給停止
            }
          }}

          const timer = setInterval(()=>{
              num.value++;
              numData.idx++;
          },1000)

          return {};
        },
      };
      Vue.createApp(App).mount("#app");
```

**watch 和 watchEffect 的差別**

|                      | watch  | watchEffect                          |
| -------------------- | ------ | ------------------------------------ |
| 參數                 | 需傳入 | 不需要，只要在涵式裡面放入監聽值即可 |
| 是否能停止           | 否     | 是                                   |
| 初始化時是否會被執行 | 否     | 是                                   |

### Lifecycle Hooks 生命週期

> 生命週期:每個應用程式在不同的階段會去執行的東西

[官網說明](https://cn.vuejs.org/api/composition-api-lifecycle)

```js
const {
  ref,
  onBeforeCreate,
  onCreated,
  onBeforeMount,
  onMounted,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} = Vue;
const App = {
  setup() {
    const idx = ref(0);
    console.log("當vue掛載到app上面後執行!!"); // 1
    setTimeout(() => {
      idx.value = 1;
      console.log(idx.value);
    }, 3000);

    const intervalId = setInterval(() => {
      idx.value++;
    });

    onBeforeMount(() => {
      console.log("DOM 渲染前"); //2
    });

    onMounted(() => {
      console.log("DOM 渲染完成後"); //3
    });

    onUpdate(() => {
      //資料更改導致virtual DOM 重新渲染後調用
      console.log("DOM 渲染更改後"); //4
    });
    onUnmounted(() => {
      clearInterval(intervalId);
    });

    return {};
  },
};
Vue.createApp(App).mount("#app");
```

### axios 處理

```js
const App = {
  setup() {
    axios.get("https://vue-lessons-api.vercel.app/photo/list").then((res) => {
      console.log(res);
    });

    return {};
  },
};
Vue.createApp(App).mount("#app");
```

#### 取得時間點

> setup 是在 createApp 階段執行，DOM 渲染可能還未載完成，最好是等 DOM 元素載完再要資料

```js
const App = {
  setup() {
    //DOM 元素都渲染完成才執行
    onMounted(() => {
      axios.get("https://vue-lessons-api.vercel.app/photo/list").then((res) => {
        console.log(res);
      });
    });

    return {};
  },
};
Vue.createApp(App).mount("#app");
```

#### 選染資料

```html
<div id="app">
  <div class="box">
    <div>
      <img
        v-for="(item,index) in imgArr.arr "
        :key="item.url"
        class="img"
        :src="item.url"
        alt=""
      />
    </div>
    <div class="btnbox">
      <a href="javascript:;">上一張</a>
      <a href="javascript:;">下一張</a>
    </div>
  </div>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
  const { createApp, onMounted, reactive } = Vue;
  createApp({
    setup() {
      const imgArr = reactive({ arr: [] });
      onMounted(() => {
        axios
          .get("https://vue-lessons-api.vercel.app/photo/list")
          .then((res) => {
            imgArr.arr = res.data;
            console.log(res.data);
          });
      });
      return {
        imgArr,
      };
    },
  }).mount("#app");
</script>
```

#### 邏輯處理

```html
<body>
  <div id="app">
    <div class="box">
      <div>
        <img
          v-for="(item,index) in imgArr.arr"
          v-show="imgIndx === index"
          :key="item.url"
          class="img"
          :src="item.url"
          alt=""
        />
      </div>
      <div class="btnbox">
        <a href="javascript:;" @click="prePage()">上一張</a>
        <a href="javascript:;" @click="nextPage()">下一張</a>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, reactive, onMounted, ref } = Vue;
    createApp({
      setup() {
        const imgIndx = ref(0);
        const imgArr = reactive({ arr: [] });
        const prePage = () => {
          if (imgIndx.value <= 0) {
            imgIndx.value = imgArr.arr.length - 1;
          } else {
            imgIndx.value--;
          }
        };
        const nextPage = () => {
          if (imgIndx.value < imgArr.arr.length - 1) {
            imgIndx.value++;
          } else {
            imgIndx.value = 0;
          }
        };
        onMounted(() => {
          axios
            .get("https://vue-lessons-api.vercel.app/photo/list")
            .then((res) => {
              imgArr.arr = res.data;
              console.log(imgArr.arr);
            });
        });
        return {
          prePage,
          nextPage,
          imgArr,
          imgIndx,
        };
      },
    }).mount("#app");
  </script>
</body>
```

#### loading

```html
<body>
  <div id="app">
    <div class="box" v-if="!isLoading">
      <div>
        <img
          v-for="(item,index) in imgArr.arr"
          v-show="imgIndx === index"
          :key="item.url"
          class="img"
          :src="item.url"
          alt=""
        />
      </div>
      <div class="btnbox">
        <a href="javascript:;" @click="prePage()">上一張</a>
        <a href="javascript:;" @click="nextPage()">下一張</a>
      </div>
    </div>
    <div v-else>
      <img class="load" src="./images/load.gif" />
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, reactive, onMounted, ref } = Vue;
    createApp({
      setup() {
        const isLoading = ref(true);
        const imgIndx = ref(0);
        const imgArr = reactive({ arr: [] });

        const prePage = () => {
          if (imgIndx.value <= 0) {
            imgIndx.value = imgArr.arr.length - 1;
          } else {
            imgIndx.value--;
          }
        };
        const nextPage = () => {
          if (imgIndx.value < imgArr.arr.length - 1) {
            imgIndx.value++;
          } else {
            imgIndx.value = 0;
          }
        };

        const handleLoading = (data) => {
          let i = 0;
          data.forEach((item) => {
            const newImg = new Image();
            //非同步處理
            newImg.src = item.url;
            newImg.onload = () => {
              i++;
              // console.log(i);
              if (i == data.length) {
                imgArr.arr = data;
                isLoading.value = false;
              }
            };
          });
        };

        onMounted(() => {
          axios
            .get("https://vue-lessons-api.vercel.app/photo/list")
            .then((res) => {
              imgArr.arr = res.data;
              handleLoading(imgArr.arr);
              console.log(imgArr.arr);
            });
        });
        return {
          prePage,
          nextPage,
          imgArr,
          imgIndx,
          isLoading,
        };
      },
    }).mount("#app");
  </script>
</body>
```

**圖片的 loading 處理**

```js
const isLoading = ref(true);
const handleLoading = (data) => {
  let i = 0;
  data.forEach((item) => {
    const newImg = new Image();
    //非同步處理
    newImg.src = item.url;
    newImg.onload = () => {
      i++;
      // console.log(i);
      if (i == data.length) {
         imgArr.arr = data; //要記得塞回原本的資料
        isLoading.value = false;
       
      }
    };
  });
};
```
