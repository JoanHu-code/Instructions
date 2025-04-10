# Instructions

**本庫為學習之使用筆記和心得**

- 前端

  - [vue3 語法](前端/vue3語法.md)
  - [Nuxt3](前端/Nuxt3.md)
  - [Vite](前端/Vite.md)
  - [env](前端/env.md)
  - [nginx](前端/nginx.md)
  - [yml](前端/yml.md)
  - [jenkinsfile](前端/jenkinsfile.md)
  - [DOM](前端/DOM.md)
  - [CSS](前端/css/)
    - [css](前端/css/css.md)
    - [範例](前端/css/範例/)
  - [HTML](前端/HTML)
    - [html](前端/HTML/html.md)
    - [範例](前端/HTML/範例)
  - [JavaScript](前端/JavaScript)
    - [basic](前端/JavaScript/basic.md)
    - [beginner](前端/JavaScript/beginner.md)
    - [Intermediate](前端/JavaScript/Intermediate.md)
    - [vue3](前端/JavaScript/vue3.md)

- 部屬相關
  - [docker](部屬相關/docker.md)
  - [github](部屬相關/github.md)
  - [jenkins](部屬相關/jenkins.md)
  - [development](部屬相關/development.md)
  - [deploymentCheck](部屬相關/deploymentCheck.md)
- 其他
  - [文件命名法則](文件命名法則.md)
  - [intellIJ_IDEA](intellIJ_IDEA.md)
  - [SQL 語法指南](SQL語法指南.md)

**會用到的網頁**

[Unsplash](https://unsplash.com/)

[Icon8](https://icons8.com/icons/)

[Google Font](https://fonts.google.com/)

[Font Awesome](https://fontawesome.com/start)

[Animation](https://storyset.com)

[GSAP](https://gsap.com/)

# 表格統整(前端)
# Vite, React, Nuxt, Next - 設定與程式碼統整

| 框架         | 描述                                      | 創建專案指令                                                   | 主要設定與程式碼範例                                     |
|--------------|-------------------------------------------|---------------------------------------------------------------|----------------------------------------------------------|
| **Vite**     | 快速的前端開發建構工具，支援 Vue、React 等框架 | `npm create vite@latest <project-name> --template react`       | `vite.config.js` 基本配置：<br> ```js import { defineConfig } from 'vite'; export default defineConfig({}); ``` |
| **React**    | 用於構建用戶界面的 JavaScript 庫，專注於構建單頁應用 | 使用 `create-react-app` 或 `Vite` 生成 React 專案           | `App.js` 基本範例：<br> ```jsx import React, { useState } from 'react'; const App = () => { const [color, setColor] = useState('red'); const changeColor = () => { setColor(color === 'red' ? 'blue' : 'red'); }; return (<div><h1>The color is {color}</h1><button onClick={changeColor}>Change Color</button></div>); }; export default App; ``` |
| **Nuxt**     | 基於 Vue 3 的服務端渲染框架，支援靜態生成頁面 | `npx create-nuxt-app <project-name>`                          | `nuxt.config.js` 配置範例：<br> ```js export default { ssr: true, buildModules: ['@nuxtjs/tailwindcss'], }; ``` |
| **Next**     | 基於 React 的服務端渲染框架，支援靜態生成頁面 | `npx create-next-app <project-name>`                           | `pages/index.js` 基本範例：<br> ```jsx import { useState } from 'react'; const Home = () => { const [color, setColor] = useState('red'); return (<div><h1>The color is {color}</h1><button onClick={() => setColor(color === 'red' ? 'blue' : 'red')}>Change Color</button></div>); }; export default Home; ``` |
