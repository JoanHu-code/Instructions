## 目錄

- [Nuxt3 安裝配置指南](#Nuxt3-安裝配置指南)

- [Nuxt3 專案功能擴充](#Nuxt3-專案功能擴充)

  - [pages](#pages)
  - [layouts](#layouts)
  - [public 與 assets](#public-與-assets)
  - [Components and Auto Imports](#Components-and-Auto-Imports)
  - [Setting Global](#Setting-Global)
  - [Composables and Auto Imports](#Composables-and-Auto-Imports)
  - [plugins](#plugins)
  - [Nuxt3 Server Side Rendering](#Nuxt3-Server-Side-Rendering)
  - [動態 Router 配置](#動態-Router-配置)
  - [useRouter-and-useRoute](#useRouter-and-useRoute)
  - [開發階段啟動 https 憑證](#開發階段啟動-https-憑證)
  - [API 跨網域處理](#API-跨網域處理)
  - [pinia 安裝](#pinia-安裝)

- [統整](#統整)
- [下篇請看 env.md](./env.md)

# Nuxt3 安裝配置指南

**安裝指令**

```shell
npx nuxi@latest init <project-name>
```

- Ok to proceed?(y): y
- Which package manager would you like to use?: npm
- Initialize git repository?: No

**確認專案是否安裝完成**

step1: 在 VSCode 開啟專案

step2: 在專案的終端機內輸入以下指令

```shell
npm run dev
```

# Nuxt3 專案功能擴充

**Nuxt3 是自助餐的形式，要什麼再擴充什麼**

[參考網址](https://nuxt.com/docs/api/commands/add)

## pages

```shell
npx nuxi add page page-name
```

### app.vue 改成

```vue
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

> 如果需要使用 pages/ 新增多個頁面，就需要使用 `<NuxtPage />` 當作網頁的進入點！

### 在 pages 的資料夾裡面，新增 index.vue

```vue
<script setup></script>
<template>
  <div>
    <h1>這是首頁</h1>
  </div>
</template>
<style scoped></style>
```

## layouts

```shell
npx nuxi add layout default
```

> 使用 layouts 就可以把 App.vue 給砍了，因為進入點就會從我們的 App.vue 變成 layouts/default.vue，更方便我們去客製化跟切換樣板。

## public-與-assets

> public => 靜態資源，不需要過編譯的檔案，例如 favicon.ico 或是一些 pdf 等等

> assets => 凡是需要透過編譯過的檔案都需要放在這邊，例如 css、image、svg 等等

**請自行新增一個 assets 的資料夾**

## Components and Auto Imports

```shell
npx nuxi add component Home
```

> 只要放在 components 資料夾底下就會自動引入，完全不需要 import

> 也可以使用資料夾的方式來新增 index.vue 的進入點，作為這個組件的使用

**Components 也可以像 pages 的用法一樣，在資料夾下面放 index.vue，這樣就在引入的時候就會優先找 index.vue 這檔案**

- 如果你的資料夾裡面有其他組件，要使用的話就要加上前面資料夾的名稱跟檔名

  - 例如:footer 資料夾裡的 Btn.vue
  - 引入:`<footerBtn/>`

## Setting Global(用了，其他沒有設定的組件都要自行 import 進去)

**在 nuxt.config.ts 裡加入**

```js
export default defineNuxtConfig({
  components: {
    dirs: [
      {
        path: "~/components/global",
        global: true,
      },
    ],
  },
});
```

## Composables & Auto Imports

```shell
npx nuxi add composable addCount
```

**若是 ts 自行改成 js**

1. 在 composables/addCount.js 的檔案裡

```js
export const useAddCount = () => {
  const count = ref(0);
  const add = () => (count.value += 1);
  return {
    count,
    add,
  };
};
```

2. 在要用的.vue 的檔案裡

```vue
<script setup>
const data = useAddCount();
</script>
<template>
  <div>
    <h1>{{ data.count }}</h1>
    <button @click="data.add">plus</button>
  </div>
</template>
```

> 直接引入即可，不需要 import

## plugins

```shell
npx nuxi add plugin hello
```

**若是 ts 自行改成 js**

### provide

**使用 plugins 注入方法**

1. 在 plugins/hello.js 的檔案裡

```js
export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      hello: (msg) => `Hello ${msg}!`,
    },
  };
});
```

2. 在要用的.vue 的檔案裡

```vue
<script setup>
const { $hello } = useNuxtApp();
</script>
<template>
  <div>
    <h1>
      {{ $hello("Mike") }}
    </h1>
  </div>
</template>
```

### directive

**使用 plugins 自定義模板語法 ( directive )**

1. 下載 dayjs 套件

```shell
npm install dayjs --save
```

2. 在 plugins/timeformat.js 的檔案裡

```js
import dayjs from "dayjs";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("timeformat", {
    mounted(el, binding) {
      const time = dayjs(binding.value).format("YYYY年MM月DD日");
      el.innerText = time;
    },
  });
});
```

3. 在要用的.vue 的檔案裡

```vue
<template>
  <h1 v-timeformat="'2021-09-16T01:52:45.780Z'"></h1>
</template>
```

### use

**使用 plugins 搭配其他第三方 Vue3 套件使用**

1. 安裝套件

```shell
npm install v-calendar@next @popperjs/core
```

2. 在 plugins/calendar.client.js 的檔案裡

```js
import VCalendar from "v-calendar";
import "v-calendar/style.css";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VCalendar);
});
```

3. 在要用的.vue 的檔案裡

```vue
<script setup>
const date = ref(new Date());
</script>
<template>
  <div>
    <ClientOnly>
      <VDatePicker v-model="date" />
    </ClientOnly>
  </div>
</template>
```

### 補充

> 可以在檔名中間使用 .server 或 .client 來決定要 server 端或 client 端載入插件。

- hello.client.js

- hello.server.js

## Nuxt3 Server Side Rendering

### useFetch

```js
const { data } = await useFetch("https://api.nuxtjs.dev/mountains");
```

### useAsyncData

```js
const { data } = await useAsyncData("userInfo", () =>
  $fetch("https://api.nuxtjs.dev/mountains")
);

async function handleFormSubmit() {
  const res = await $fetch("/api/submit", {
    method: "POST",
    body: {
      // My form data
    },
  });
}

const handleFormSubmit = async () => {
  const res = await $fetch("/api/submit", {
    method: "POST",
    body: {
      // My form data
    },
  });
};
```

> key ：唯一的值，防止在 server 端和 client 端觸發兩次資料獲取，可帶可不帶，不帶的話會為自動幫你生成一個對應檔案名和編號的唯一 key，但是會建議都要帶。

**$fetch**

> 以前我們會需要自己使用第三方的套件去處理非同步，現在 Nuxt 整合 ofetch ，提供一個叫做 $fetch 方法，讓我們可以在 server 與 client 處理非同步。

### refresh 刷新資料

**可以透過 useAsyncData 回傳的 refresh 方法來進行刷新。**

- data：回傳的資料。
- pending：一個 Boolean，跟你說非同步是否完成了。
- refresh：可用於刷新函數返回的資料的 function。
- error：如果非同步失敗，回傳錯誤相關的資料。

```vue
<script setup>
const { data, pending, error, refresh } = await useAsyncData("userInfo", () =>
  $fetch("https://api.nuxtjs.dev/mountains")
);
</script>

<template>
  <div>
    <button @click="refresh">refresh</button>
    <h1>
      {{ data }}
    </h1>
  </div>
</template>
```

## 動態 Router 配置

**新增一個[id].vue 的資料夾，也可以是資料夾，下面在加東西**

## useRouter-and-useRoute

[官方網站](https://router.vuejs.org/zh/)

1. useRoute:可以取得所有跟 route 網址有關的所有參數資訊

```vue
<script setup>
const route = useRoute();
console.log(route);
</script>
```

2. useRouter 提供許多函式讓你操作網址像是 push、replace、go 等方法，讓你可以再換頁上面更加方便

```vue
<script setup>
const router = useRouter();

const gotoAndPage = (path) => {
  router.push(path);
};
</script>
<template>
  <div>
    <button @click="gotoAndPage('/about')">go to About</button>
  </div>
</template>
```

## 開發階段啟動 https 憑證

> 更改 package.json 裡下面文字

```js
 "scripts": {
   "dev": "nuxt dev --https --ssl-cert ./https/localhost+2.pem --ssl-key ./https/localhost+2-key.pem",
 },

```

**改完記得新增一個叫 https 的資料夾把 pem 和 key 放進去**

[fake https folder](./Fake_ssl/)

## API 跨網域處理

> 京站威秀 API 為例子

```js
onMounted(async () => {
  const response = await fetch(
    "https://www.vscinemas.com.tw/VsWeb/api/GetLstDicCinema"
  ).then((res) => res.json());
  console.log(response);
});
```

**在 nuxt.config.ts 裡新增下面程式碼**

```js
export default defineNuxtConfig({
  vite: {
    server: {
      proxy: {
        "/VsWeb/api": {
          target: "https://www.vscinemas.com.tw/",
          changeOrigin: true,
        },
      },
    },
  },
});
```

## pinia 安裝

```shell
npm install pinia @pinia/nuxt
```

**如果安裝遇到無法解析的情況請在 package.json 加入以下這段，在重新打上面的指令**

```json
"overrides": {
   "vue": "latest"
},
```

**在 nuxt.config.ts 裡新增下面程式碼**

```js
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  imports: {
    dirs: ["stores"],
  },
});
```

**新增一個 stores 資料夾，裡面新增.js 檔案**

```js
import { defineStore } from "pinia";

export const useNewsStore = defineStore("news", () => {
  const count = ref(0);
  const double = computed(() => count.value * 2);
  const addCount = () => {
    count.value++;
  };
  return { count, double, addCount };
});
```

**在要使用的.vue 檔案裡新增**

```vue
<script setup>
const newsStore = useNewsStore();
</script>
<template>
  <div>
    <h1>最新消息</h1>
    <h2>{{ newsStore.double }}</h2>
    <button @click="newsStore.addCount()">add count</button>
  </div>
</template>
```

## 統整

### 全部指令

```shell
npx nuxi add page page-name
npx nuxi add layout default
npx nuxi add component Home
npx nuxi add composable addCount
npx nuxi add plugin hello
npm install pinia @pinia/nuxt
```

### 完整的 nuxt.config.ts

```js
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  imports: {
    dirs: ["stores"],
  },
  vite: {
    server: {
      proxy: {
        "/VsWeb/api": {
          target: "https://www.vscinemas.com.tw/",
          changeOrigin: true,
        },
      },
    },
  },
});
```

# [下篇請看 env.md](./env.md)
