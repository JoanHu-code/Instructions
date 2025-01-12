## 目錄

- [Vite 安裝配置指南](#Vite-安裝配置指南)
- [Vue3 和 Vite 專案功能擴充](#Vue3-和-Vite-專案功能擴充)
  - [vue-router、vue-i18n API 自動引入](#vue-routervue-i18n-api-自動引入)
  - [components 組件自動引入](#components-組件自動引入)
  - [SVG 的處理](#SVG-的處理)
  - [Router 自動生成](#Router-自動生成)
  - [全域資料管理 pinia (已安裝可跳過)](#全域資料管理-pinia-已安裝可跳過)
- [統整](#統整)
- [下篇請看 env.md](./env.md)

# Vite 安裝配置指南

## 安裝 Vite ( 請使用 nodejs 14.x.x 以上 )

**Vue 官方推薦指令**

```shell
npm init vue@next
```

- Project name: 輸入專案名稱
- Add TypeScript: 是否使用 TypeScript(No)
- Add JSX Support: 是否使用 JSX(No)
- Add Vue Router for Single Page Application development: 是否使用 Vue Router(Yes)
- Add Pinia for state management: 是否使用 Pinia(Yes)
- Add Vitest for Unit Testing: 是否要單元測試(No)
- Add an End-to-End Testing Solution: 是否要 E2E 測試(No)
- Add ESLint for code quality: 是否要 ESLint(No)

**一般 Vite 安裝指令**

```shell
npm create vite@latest
```

- Project name: 輸入專案名稱
- Select a framework: 選擇框架(Vue)
- Select a variant: 選擇一般 JS 版本或 TS 版本(Vue)

**選擇結束後，執行下列指令**

```shell

cd 專案名稱
npm install
npm run dev

```

**執行完後請開起專案，做以下的步驟**

# Vue3 和 Vite 專案功能擴充

## vue-router、vue-i18n API 自動引入

**1. 先下載 vue-router、vue-i18n、unplugin-auto-import**

```shell
npm i -S vue-router vue-i18n
npm i -D unplugin-auto-import
```

_若先前在使用 Vue 官方推薦指令 Add Vue Router for Single Page Application development: 是否使用 Vue Router(Yes)則不用再下載 vue-router_

```shell
npm i -S vue-i18n
npm i -D unplugin-auto-import
```

**2. 在 vite.config.js 檔案裡設定**

```shell
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "vue-i18n"],
      dts: "src/auto-imports.js",
    }),
  ],
});

```

> 使用 Veu3 的 API 就不需要再 import 了 <br>
> 例: import { ref } from "vue";就不需要再寫了 <br>
> 因為在專案的根目錄下會自動產生 auto-imports.js 幫你 import 有使用到的 API

## components 組件自動引入

**1. 先下載 unplugin-vue-components**

```shell
npm i -D unplugin-vue-components
```

**2. 在 vite.config.js 檔案裡設定**

```shell
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  plugins: [
    Components({
      // 從 `./src/components/` 路徑查找
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: "src/auto-components.js",
    }),
  ],
});

```

> 可以直接從 ./src/components/ 取得組件，無須再 import<br>
> 一樣會產生一個 auto-components.js 檔案列出你可以自動引入的組件有那些

## SVG 的處理

**1. 先下載 vite-plugin-svg-icons**

```shell
npm i -D vite-plugin-svg-icons
```

**2. 在 vite.config.js 檔案裡設定**

```shell
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

export default defineConfig({

  plugins: [
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
      symbolId: "[dir]/[name]",
    }),
  ],
});


```

**3. 在 main.js 檔案裡新增**

```shell
import "virtual:svg-icons-register";
```

**4. 在 ./src/assets 資料夾裡新增一個 svg 的資料夾，把 svg 檔案放進去**

**5. 在 ./src/components 資料夾中新增一個叫 SvgIcon.vue 的組件**

在 SvgIcon.vue 裡複製貼上以下的程式碼:

```shell
<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
  },
  color: {
    type: String,
    default: "#333",
  },
});
const svgName = computed(() => {
  if (props.name.includes("/")) {
    return `#${props.name}`;
  } else {
    return `#/${props.name}`;
  }
});
const svgClass = computed(() =>
  props.className ? "svg-icon " + props.className : "svg-icon"
);
</script>

<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="svgName" :fill="color" />
  </svg>
</template>

<style>
.svg-icon {
  width: 100%;
  height: 100%;
  max-width: 100px;
  max-height: 100px;
  fill: currentColor;
  overflow: hidden;
}
</style>

```

**6. 之後在.vue 的檔案裡，只要使用 svg 的名稱就可以顯示出 svg 了**

```shell
<template>
 <template #icon>
    <SvgIcon name="IconDocumentation" />
 </template>
</template>
```

## Router 自動生成

**1. 先下載 vite-plugin-svg-icons**

```shell
npm i -D vite-plugin-pages vite-plugin-vue-layouts
```

**2. 在 vite.config.js 檔案裡設定**

```shell

import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts';


export default defineConfig({
  plugins: [
    Pages(),
    Layouts(),
  ],
});

```

**3. 在 router 資料夾裡的 index.js 檔案裡的設定**

```shell
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

```

**4. 在 App.vue 檔案寫入**

```shell
<template>
  <router-view />
</template>
```

> 將 App.vue 作為進入點，放入 router-view

**5. 建立渲染頁面的資料夾**

- 在 src 目錄下
  - 新增 /layouts 資料夾
    - 在此資料夾裡新增 default.vue
      > 所有的頁面都會套用這個模板，渲染頁面，取代原本的 App.vue，但是 App.vue 作為進入點還是要存在
  - 新增 /pages 資料夾
    > 你只要新增一個組件到 pages 裡面，就會自動 import 這個組件，router 為組件的名稱。
    - 新增 index.vue
      > domainName 網址看到的頁面
    - 新增[id].vue
      > 動態網址的使用
  - 刪除原本存在的 views 資料夾

**6. 在 default.vue 寫入**

```shell
<script setup>

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

```

> `網址就會依照你組件的名稱自動去引入，組件名稱為/pages 裡 vue 的檔案名稱 `<br> `<router-link to="/">Home</router-link>` -> src/pages/index.vue <br> `<router-link to="/about">About</router-link>` -> src/pages/about.vue

**7. 在 index.vue 寫入**

```shell
<script setup>
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>


```

**8. 在 about.vue 寫入**

```shell
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>



```

**9. 動態網址的使用**

> 在[id].vue 檔案中寫入

```shell
<script setup>
const route = useRoute();
</script>

<template>
  <h1>{{ route.params.id }}</h1>
</template>
```

> 這樣就可以抓取後面的參數

## 全域資料管理 pinia (已安裝可跳過)

_若先前在使用 Vue 官方推薦指令 Add Pinia for state management: 是否使用 Pinia(Yes)，可以不用看_

**1. 先下載 pinia**

```shell
npm install pinia -S
```

**2. 在 main.js 檔案裡設定**

```shell
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
```

**3. 在 src 資料夾裡新增一個 store 的資料夾，裡面新增一個 counter.js 檔案當作資料存取的地方**

> src/store/counter.js

在 counter.js 寫入以下程式:

```shell
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

```

**4. 在.vue 檔案裡的使用方法**

```shell
<script setup>
  import { useCounterStore } from "@/store/counter.js";
  const counter = useCounterStore();
</script>

<template>
  <h1>{{ counter.fullName }}</h1>
</template>
```

# 統整

**下載指令**

```shell
npm install
npm i -S vue-router vue-i18n
npm i -S vue-i18n
npm i -D unplugin-auto-import
npm i -D unplugin-vue-components
npm i -D vite-plugin-svg-icons
npm i -D vite-plugin-pages vite-plugin-vue-layouts
npm install pinia -S
```

**main.js**

```shell
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');


```

**vite.config.js**

```shell
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    Layouts(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n'],
      dts: 'src/auto-imports.js',
    }),
    Components({
      // 從 `./src/components/` 路徑查找
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/auto-components.js',
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      symbolId: '[dir]/[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});


```

**src 架構圖**

```
src
 ├── assets
 │    ├── svg
 │    │    └── IconDocumentation.svg
 │    ├── base.css
 │    ├── logo.svg
 │    └── main.css
 ├── components
 │    ├── HelloWorld.vue
 │    ├── SvgIcon.vue
 │    ├── TheWelcome.vue
 │    └── WelcomeItem.vue
 ├── layouts
 │    └── default.vue
 ├── page
 │    ├── index.vue
 │    ├── about.vue
 │    └── [id].vue
 ├── router
 │    └── index.js
 ├── stores
 │    ├── counter.js
 ├── App.vue
 └── auto-components.js
 └── auto-imports.js
 └── main.js
```

**執行指令**

- 執行測試環境

```shell
npm run dev
```

- 打包正式環境

```shell
npm run build
```

# [下篇請看 env.md](./env.md)
