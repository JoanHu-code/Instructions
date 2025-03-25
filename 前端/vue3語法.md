# 目錄

- [前言](#前言)
- [定義資料 ref、reactive、computed ](#定義資料-refreactivecomputed)
- [components/props/emit](#componentspropsemit)
- [邏輯和資料分離](#邏輯和資料分離)
- [Pinia 的全域資料管理](#Pinia-的全域資料管理)

## 前言

> `一律使用 <script setup> 語法糖(Composition API)`

## 定義資料 ref、reactive、computed

### 1. ref

在 Vue 3 中，ref 是用來創建基本數據類型或單一物件的反應式引用。

**用途：**

- 用於創建基本數據類型（如 string、number、boolean）的反應式引用。
- ref 可以用於存儲原始類型的數據，使其變為反應式（即當它的值改變時，視圖會自動更新）。

```js
import { ref } from 'vue';
const count = ref(0); // 創建一個反應式變量 count，初始值為 0
```

**特點：**

- ref 封裝了一個單一的數據值，並返回一個帶有 .value 屬性的對象。

- 用 count.value 來訪問或修改這個數據：

```js
count.value = count.value + 1; // 修改數值
console.log(count.value); // 讀取數值
```

### 2. reactive

reactive 是 Vue 3 中的另一個反應式 API，主要用於將一個物件（或陣列）轉換為反應式的。

**用途：**

- 用於創建一個深度反應式的物件或陣列，即所有嵌套在物件內的屬性都會變成反應式的，並且視圖會在它們變更時自動更新。

```js
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  user: {
    name: 'Alice',
    age: 25,
  },
});
```

**特點：**

- reactive 使整個物件（或陣列）變得反應式，這意味著對任何屬性的修改都會觸發視圖更新。
  不需要 .value 來存取變量，直接操作物件的屬性：

```js
state.count = 1; // 更新 count 屬性
console.log(state.count); // 讀取 count 屬性
```

- 如果是嵌套物件，內部的屬性也會是反應式的：

```js
state.user.name = 'Bob'; // 更新嵌套屬性
```

### 3. computed

computed 是 Vue 3 中用來創建計算屬性的 API，它使得你能夠創建依賴於其他反應式數據的派生值。

**用途：**

- computed 用於創建基於其他反應式狀態計算出來的值，並且會自動缓存（即只有當依賴的數據發生變更時，才會重新計算）。
- 它非常適合用於創建具有邏輯的變量，或者是需要根據某些值進行派生的數據。

```js
import { computed } from 'vue';

const count = ref(0);

const doubledCount = computed(() => {
  return count.value * 2; // 基於 count 的計算屬性
});
```

**特點：**

- 計算屬性是惰性計算的，即只有當它依賴的反應式數據發生改變時，它才會重新計算。
- 它不像普通函數，當依賴的數據沒有改變時，computed 的值不會重新計算，這有助於提高性能。

```js
console.log(doubledCount.value); // 輸出計算值，即 count 的兩倍
count.value = 2;
console.log(doubledCount.value); // 計算值自動更新為 4
```

### Vue 3: `ref`、`reactive`、`computed` 總結

| 特性                  | `ref`                                                      | `reactive`                              | `computed`                                              |
| --------------------- | ---------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------- |
| **用途**              | 用於創建原始數據類型（數字、字符串、布爾值等）的反應式引用 | 用於創建物件或陣列的反應式狀態          | 用於創建基於其他反應式數據的計算屬性                    |
| **適用場景**          | 單一數據類型（如數字、字符串、布爾值）                     | 複雜的物件或陣列                        | 需要基於其他數據進行計算或處理的派生值                  |
| **數據類型**          | 基本數據類型（例如 `string`、`number`）                    | 物件或陣列                              | 自動計算的屬性，依賴其他反應式數據                      |
| **語法示例**          | `const count = ref(0);`                                    | `const state = reactive({ count: 0 });` | `const doubledCount = computed(() => count.value * 2);` |
| **如何修改**          | 需要使用 `.value` 訪問和修改數據                           | 直接訪問物件屬性來修改                  | 基於其他反應式數據自動計算，無需手動修改                |
| **是否深度反應式**    | 否，需要額外操作處理深度反應                               | 是，物件內所有屬性都是反應式的          | 是，會自動依賴反應式數據進行更新                        |
| **是否自動更新**      | 是，當 `.value` 改變時會觸發更新                           | 是，物件屬性改變時會觸發更新            | 是，依賴的反應式數據改變時會重新計算                    |
| **性能優化**          | 無特殊性能優化                                             | 無特殊性能優化                          | 有自動緩存，僅在依賴變更時重新計算                      |
| **是否需要 `.value`** | 需要                                                       | 不需要                                  | 不需要                                                  |

## components/props/emit

### 1. components

components 是 Vue 中用來聲明組件的機制，允許你在父組件中使用其他子組件。

**範例：**
假設你有兩個組件：Parent.vue 和 Child.vue。

Child.vue (子組件)

```vue
<script setup>
const message = ref('Hello from Parent!');
</script>

<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>
```

Parent.vue (父組件)

```vue
<script setup>
import Child from './Child.vue';
</script>

<template>
  <Child />
</template>
```

### 2. props

props 是用來從父組件向子組件傳遞數據的機制。當父組件的數據發生改變時，子組件也會自動更新。

**範例：**
假設你有兩個組件：Parent.vue 和 Child.vue。

Child.vue (子組件)

```vue
<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true, // 必須傳遞
    default: 'Jack', // 默認值
  },
  age: {
    type: : Number,
    required: true, // 必須傳遞
    default: 20, // 默認值
  },
});
</script>

<template>
  <div>
    <p>Name: {{ props.name }}</p>
    <p>Age: {{ props.age }}</p>
  </div>
</template>
```

Parent.vue (父組件)

```vue
<script setup>
import Child from './Child.vue';
const name = ref('John');
const age = ref(18);
</script>

<template>
  <div>
    <Child :name="name" ; :Age="age" />
  </div>
</template>
```

> 在 Child 組件中，我們使用 defineProps 來定義 name 和 age 兩個 prop。<br>
> props 是一個自動解構的物件，你可以直接訪問 props.name 和 props.age 來獲取父組件傳遞過來的值。<br>
> Parent.vue 中，通過 import 引入 Child 組件並在模板中使用它。Parent.vue 將 name 和 age 傳遞給 Child 組件的 name 和 age 。

### 3. emit

emit 用於從子組件向父組件發送事件。當子組件中的某個操作需要通知父組件時，可以使用 emit 來觸發自定義事件。

**範例：**
假設你有兩個組件：Parent.vue 和 Child.vue。

Child.vue (子組件)

```vue
<script setup>
const emit = defineEmits(['customEvent']);

function handleClick() {
  emit('customEvent', 'Hello from Child!');
}
</script>

<template>
  <button @click="handleClick">Click Me</button>
</template>
```

Parent.vue (父組件)

```vue
<script setup>
import Child from './Child.vue';

const handleCustomEvent = (message) => {
  console.log(message); // 'Hello from Child!'
};
</script>

<template>
  <div>
    <Child @customEvent="handleCustomEvent" />
  </div>
</template>
```

> 在 Child.vue 中，當按鈕被點擊時，handleClick 函數會觸發 emit，向父組件發送一個名為 customEvent 的事件，並傳遞一個訊息 'Hello from Child!'。<br>
> 在 Parent.vue 中，通過 @customEvent 來監聽這個事件，並在事件觸發時執行 handleCustomEvent 方法。<br>

### Vue 3: `components`、`props`、`emit` 小結

| 特性         | `components`                                 | `props`                                                       | `emit`                                                            |
| ------------ | -------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| **用途**     | 用來在父組件中註冊和使用子組件               | 用來從父組件向子組件傳遞數據                                  | 用來從子組件向父組件發送事件，通知父組件狀態更新                  |
| **定義方式** | 直接 `import` 子組件並使用                   | 使用 `defineProps` 定義接收的 `props`                         | 使用 `defineEmits` 定義事件並觸發                                 |
| **示例**     | `import Child from './Child.vue'`            | `const props = defineProps({ message: String })`              | `const emit = defineEmits(['update']); emit('update', newValue);` |
| **說明**     | 在父組件中引入和使用子組件，可以省略顯式註冊 | 在子組件中通過 `defineProps` 定義需要的 `props`，如 `message` | 在子組件中使用 `emit` 觸發事件，父組件監聽並處理                  |

## 邏輯和.vue 檔案分離

有關邏輯，並且會應用在很多的 components，一律寫在 composables 資料夾下方

- 在 src 目錄底下創建 composables 資料夾

- 在裡面創建 .js 檔案

- 應用時，在要應用的.vue 檔案 import

**範例:**

在 components 創建一個名為 useEnToCh.js 的檔案

**useEnToCh.js**

```js
export function useEnToCh() {
  const EnToCh = (str) => {
    if (str == 'name') {
      return '名字';
    } else if (str == 'age') {
      return '年齡';
    }
  };
  return {
    EnToCh,
  };
}
```

**demon.vue**

```vue
<script setup>
import { useEnToCh } from '@/composables/useEnToCh.js';
const { EnToCh } = useEnToCh();
const enString = ref('age');
const chString = computed(() => {
  return EnToCh(enString.value);
});
</script>
<template>
  <p>{{ chString }}</p>
</template>
```

## Pinia 的全域資料管理

如果一開始建立 Vite 有選 Pinia 的話，檔案就會在 stores 裡面

**範例:**

counter.js

```js
import { difineStore } from 'pinia';
import { computed, ref } from 'vue';
export const useCountStore = defineStore('counter', () => {
  const counter = ref(0);

  const doubleCount = computed(() => {
    return count.value * 2;
  });

  const addCount = () => {
    count.value++;
  };

  return {
    counter,
    addCount,
    doubleCount,
  };
});
```

**demon.vue**

```vue
<script setup>
import {storeToRefs} from "pinia";
import { useCountStore } from "@/stores/counter.js";
const countStore = useCountStore();
const {counter} = storeToRefs(countStore)
const { addCount,doubleCount } = countStore;
const addClick = ()=>{
  addCount();
}
const doubleClick = ()=>{
  doubleCount();
}
</script>
<template>
  <p>{{ counter }}</p>
  <button @click="addClick">addClick</button>
  <button @click="doubleClick">doubleClick</button>
</template>
```

**注意事項**

> 當要解構值時需要使用 **storeToRefs**

```shell
import {storeToRefs} from "pinia";
import { useCountStore } from "@/stores/counter.js";

const countStore = useCountStore();
const {valueName} = storeToRefs(countStore);
```

> Pinia 內的資料可以互相引用
