## 目錄

- [了解為什麼需要 env](#前言-為什麼需要-env)
- [Vite 使用步驟](#Vite-使用步驟)
  - [.env 檔案](#Vite-env-檔案)
  - [.env.development](#Vite-envdevelopment)
  - [.env.production](#Vite-envproduction)
  - [更改 vite.config.js 裡的設定](#更改-viteconfigjs-裡的設定)
  - [更改 router 資料夾裡的 index.js 檔案裡的設定](#更改-router-資料夾裡的-indexjs-檔案裡的設定)
- [Nuxt3 使用步驟](#Nuxt3-使用步驟)
  - [.env 檔案](#Nuxt3-env-檔案)
  - [.env.development](#Nuxt3-envdevelopment)
  - [.env.production](#Nuxt3-envproduction)
  - [更改 nuxt.config.ts 裡的設定](#更改-nuxtconfigts-裡的設定)
- [更改 nginx.conf 裡的設定](#更改-nginxconf-裡的設定)
- [下篇請看 nginx.md](./nginx.md)

# env 使用方式

## 前言:為什麼需要 env

- env 檔案可以消除資安疑慮，讓機密資訊不會洩漏在網頁上
- env 檔案可以自由變更開發環境和正式環境的設定

## Vite 使用步驟

**1. 先在根目錄新增三個檔案**

- .env
- .env.development
- .env.production

> `說明:<br>
.env: 為空用檔案，不管是在開發環境還是正式環境都會使用到<br>
.env.development: 為測試環境使用的檔案<br>
.env.production: 為正式環境使用的檔案`<br>

**2. 把這三個檔案添加到.gitignore 裡，避免把機密資訊上傳到 github 上**

在.gitignore 裡添加

```shell
.env._ # 忽略所有 .env. 开头的文件
.env._.local # 忽略所有 .env.\*.local 文件
.env
.env.development
.env.production
```

**3. Vite 設置.env 的規則**

根據 Vite 官方解釋，只有以 VITE\_ 為前綴的變數才會暴露給經過 Vite 處理的代碼。

例如，若在.env 檔案裡設置

```shell
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

在 main.js 檔案裡打印出來會得出這樣的結果

```shell
console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
```

- 注意事項

  - 環境變數解析:如上所示，VITE_SOME_KEY 是一個數字，但在解析時會返回一個字符串。布林類型的環境變數也會發生同樣的情況。在代碼中使用時，請確保轉換為所需的類型。
  - 如果想要在環境變數中使用 $ 符號，則必須使用 \ 來對其進行轉義。

```shell
KEY=123
NEW_KEY1=test$foo   # test
NEW_KEY2=test\$foo  # test$foo
NEW_KEY3=test$KEY   # test123
```

**4. 在專案中的使用方式**

### Vite .env 檔案

首先先在.env 寫入 TOKEN 或其他機密資訊

```shell
TOKEN = '9SS666(7kb]4|G/d,>$'
REFRESH_TOKE = '|902W7.N0K#!~dzz'
```

### Vite .env.development

**給開發環境使用**

```shell
# 環境
VITE_BASE_PATH = '/'

#開發環境HOST和PORT
VITE_HOST = '192.168.xxx.xxx'  #開發著電腦的ip
VITE_PORT = 8080               #開發著電腦的port

#開發環境的API
VITE_FONT_API = 'http://192.168.X.XX:8080/admin/font'
VITE_API = 'http://192.168.X.XX:8080/api'
```

### Vite .env.production

**給正式環境使用**

```shell
# 正式環境
VITE_BASE_PATH = '/login'

#正式環境HOST和PORT
VITE_HOST = '192.168.x.xx'  #正式環境電腦的ip
VITE_PORT = 80              #正式環境電腦的port

#正式環境API
VITE_FONT_API = 'http://192.168.X.XX:8080/admin/font'
VITE_API = 'http://192.168.X.XX:8080/api'
```

### 更改 vite.config.js 裡的設定

```shell
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // 加載當前環境（mode）下的 .env 文件(開發環境或正式環境)
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // 你可以在這裡使用 env沒有加 VITE\_的變數
    define: {
      TOKEN: JSON.stringify(env.TOKEN),
      REFRESH_TOKE: JSON.stringify(env.REFRESH_TOKE),
    },
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
    base: env.VITE_BASE_PATH, //router/index.js要使用
    server: {  //可以根據環境不同執行不同的.env檔案
      host: env.VITE_HOST,
      port: env.VITE_PORT,
      proxy: {
        '/font/api': {
          target: env.VITE_FONT_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/font\/api/, ''),
        },
        '/api': {
          target: env.VITE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

  };
});

```

> 這樣就可以在 Vite 專案裡面拿到 .env 檔案的值，可以在 main.js 裡輸入下面兩行做測試

```shell
console.log(TOKEN)
console.log(REFRESH_TOKE)
console.log(env.VITE_HOST)
```

### 更改 router 資料夾裡的 index.js 檔案裡的設定

```shell
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  //這樣正式環境的PATH才換跳到'/login'上
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  routes,
});

export default router

```

## Nuxt3 使用步驟

**1. 下載 dotenv**

```shell
npm install dotenv
```

**2. 先在根目錄新增三個檔案**

- .env
- .env.development
- .env.production

> `說明:<br>
.env: 為空用檔案，不管是在開發環境還是正式環境都會使用到<br>
.env.development: 為測試環境使用的檔案<br>
.env.production: 為正式環境使用的檔案`<br>

**3. 把這三個檔案添加到.gitignore 裡，避免把機密資訊上傳到 github 上**

在.gitignore 裡添加

```shell
.env._ # 忽略所有 .env. 开头的文件
.env._.local # 忽略所有 .env.\*.local 文件
.env
.env.development
.env.production
```

**4. Nuxt 設置.env 的規則**

```shell
# 這裡可以寫註解
SECRET_KEY=YOURSECRETKEYGOESHERE # 行內註解
SECRET_HASH="something-with-a-#-hash" # 如果字串值包含井字號 # 可以用雙引號包起來
```

在 其他的.vue 檔案裡打印出來會得出這樣的結果

```shell
console.log(process.env.SECRET_KEY)
console.log(process.env.SECRET_HASH)
```

**5. 在專案中的使用方式**

### Nuxt3 .env 檔案

首先先在.env 寫入 TOKEN 或其他機密資訊

```shell
TOKEN = '9SS666(7kb]4|G/d,>$'
REFRESH_TOKE = '|902W7.N0K#!~dzz'
```

**一般執行指令也會執行**

### Nuxt3 .env.development

**給開發環境使用**

```shell
# 環境
BASE_PATH = '/'

#開發環境HOST和PORT
HOST = '192.168.xxx.xxx'  #開發著電腦的ip
PORT = 8080               #開發著電腦的port

#開發環境的API
FONT_API = 'http://192.168.X.XX:8080/admin/font'
API = 'http://192.168.X.XX:8080/api'
```

**執行指令**

```shell
npx nuxi dev --dotenv .env.development
```

### Nuxt3 .env.production

**給正式環境使用**

```shell
# 正式環境
BASE_PATH = '/login'

#正式環境HOST和PORT
HOST = '192.168.x.xx'  #正式環境電腦的ip
PORT = 80              #正式環境電腦的port

#正式環境API
FONT_API = 'http://192.168.X.XX:8080/admin/font'
API = 'http://192.168.X.XX:8080/api'
```

**執行指令**

```shell
npx nuxi dev --dotenv .env.production
```

### 更改 nuxt.config.ts 裡的設定

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  imports: {
    dirs: ['stores'],
  },

  // 加載環境變數
  runtimeConfig: {
    // 私有變數，只在伺服器端可用
    secretKey: process.env.NUXT_SECRET_KEY || '',
    token: process.env.TOKEN || '',
    refreshToken: process.env.REFRESH_TOKE || '',
    // 公共變數，伺服器端與客戶端都可用
    public: {
      isProduction: process.env.NODE_ENV === 'production',
      nitroEnvironment: process.env.NITRO_ENV || 'local',
      basePath: process.env.BASE_PATH || '/',
      fontApi: process.env.FONT_API || '',
      api: process.env.API || '',
    },
  },

  app: {
    baseURL: process.env.BASE_PATH || '/', // 設定應用程式的基本路徑
  },

  nitro: {
    devProxy: {
      '/font/api': {
        target: process.env.FONT_API || 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/font\/api/, ''),
      },
      '/api': {
        target: process.env.API || 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },

  vite: {
    server: {
      proxy: {
        '/VsWeb/api': {
          target: 'https://www.vscinemas.com.tw/',
          changeOrigin: true,
        },
      },
    },
  },

  server: {
    host: process.env.VITE_HOST || 'localhost',
    port: Number(process.env.VITE_PORT) || 3000,
  },
});
```

> vite 裡的 server 是 dev(local)也能用

[說明文件](https://ithelp.ithome.com.tw/articles/10325134)

## 更改 nginx.conf 裡的設定

**要記得在 server 裡加入反向代理設置，這樣在正式環境時才會跳到此 api**

```shell
  # 反向代理設置（如果需要）
    location ^~ /font/api {
        proxy_pass http://192.168.X.XX:8080/admin/font;  #正式環境(.env.production)的(VITE_)FONT_API
    }
    location ^~ /api {
        proxy_pass http://192.168.X.XX:8080/api;  #正式環境(.env.production)的(VITE_)API
    }
```

# [下篇請看 nginx.md](./nginx.md)
