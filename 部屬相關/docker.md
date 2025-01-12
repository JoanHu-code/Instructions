# 目錄

- [docker 指令](#docker-指令)
  - [推送 映像檔(image)](#推送-映像檔image)
  - [拉取 映像檔(image)](#拉取-映像檔image)
  - [推送 compose](#推送-compose)
    - [例子解釋:(以代購為例)](#例子解釋以代購為例)
  - [拉取 compose](#拉取-compose)
    - [例子解釋:(王大明取貨為例)](#例子解釋王大明取貨為例)

# docker 指令

- `<SOURCE_IMAGE>：源映像檔的名稱，這是你本地已有的映像檔，會包含<SOURCE_IMAGE_NAME>:<SOURCE_TAG_NAME> 。`

- `<TARGET_IMAGE>：目標映像檔的名稱，這是你給映像檔添加的標籤，可以包括倉庫地址、倉庫名稱和標籤，會包含<TARGET_IMAGE_NAME>:<TARGET_TAG_NAME>。`

- `<IMAGE_NAME>：這是鏡像的名稱，可以是 Docker Hub 上的公共鏡像名稱（例如 nginx、ubuntu）或者私有倉庫的鏡像名稱（例如 192.168.0.19:5000/server）。`

- `<TAG>：這是鏡像的版本標籤，指定要下載的具體版本。每個鏡像可以有多個標籤，通常使用 latest 標籤來表示最新版本。你也可以指定其他版本標籤（如 1.0、v1.0、stable 等）。`

## 推送 映像檔(image)

```shell
docker login ip:port
docker tag <SOURCE_IMAGE> <TARGET_IMAGE>
docker push <TARGET_IMAGE>
```

### 例子和解釋:

- docker login : 登入 docker
- docker tag : 給 Docker 映像檔（鏡像）添加一個標籤。通過為映像檔打上標籤，你可以方便地將它推送（push）到一個特定的 Docker 倉庫，例如 Docker Hub、私有倉庫或本地倉庫。

- docker push: 推送到特定的 Docker

> 以包裹寄去美國為舉例: docker login(先填寫美國地址) -> docker tag(把要寄送的東西打包做成一箱，並在上面寫上名稱，名稱包含美國地址/物品名稱:寄送次數->docker push(郵差或航空公司幫你寄去)

1.  ```shell
    docker login 192.168.0.19:5000
    ```

    > 登入 192.168.0.19:5000 的 docker

2.  ```shell
    docker tag server:latest 192.168.0.19:5000/server:latest
    ```

    > 將本地的 server:latest 映像檔打上新的標籤 192.168.0.19:5000/server:latest，準備將它推送到 192.168.0.19:5000 的 Docker。

3.  ```shell
    docker push 192.168.0.19:5000/server:latest
    ```
    > 這條命令的作用是把 192.168.0.19:5000/server:latest 推送到 192.168.0.19:5000。

## 拉取 映像檔(image)

```shell
docker login ip:port
docker pull <IMAGE_NAME>:<TAG>
```

例子和解釋:

- docker login : 登入 docker
- docker pull : 從指定的私有 Docker 倉庫中下載。

> 以拿包裹為例:docker login(進去指定的小 7) ->docker pull(跟店員講包裹名稱拿到專屬的包裹)

```shell
   docker pull 192.168.0.19:5000/server:latest
```

> 這條命令的作用是拿取 192.168.0.19:5000/server:latest。

## 推送 compose

**1. 先建立 docker-compose.yml**

    舉例:

    ```shell
    version: '3'
    services:
      app:
        build: ./app
        image:  192.168.0.19:5000/app:latest
      db:
        image: postgres:latest
    ```

> 在這個文件中，我們有兩個服務：app 和 db。app 服務是從本地 ./app 目錄構建的，並且會被標記為 192.168.0.19:5000/app:latest；db 服務則使用了 postgres 的官方鏡像，標籤是 latest。

> build：用來構建自定義的鏡像，通常會指定一個 Dockerfile 目錄，Docker Compose 會根據這個目錄中的 Dockerfile 文件來構建鏡像。<br>
> image: 用來指定服務所使用的鏡像。這個鏡像可以是已經存在的本地鏡像，也可以是從 Docker Hub 或私有倉庫中拉取的現有鏡像。

**2. 登入指定 docker**

    ```shell
       docker login ip:port
    ```

**3. 構建鏡像指令**

_要先 cd 到 docker-compose.yml 存在的路徑才能執行_

    ```shell
      docker-compose build
    ```

**4. 推送鏡像**

    ```shell
    docker-compose push
    ```

### 例子解釋:(以代購為例)

**1.先建立 docker-compose.yml(先建立清單)**

```shell
    購買次數: '3'
    王大明:
      衣服:
        店家: NET
        註記: 小七地址/紅色衣服:最新款
      文具:
        註記: 小七地址/鉛筆:最新款
```

> 賣家跟小七合作，他發現衣服目前小七沒有須從 NET 本店代購，而文具小七有所以無須進貨

**2. 登入指定 docker(王大明指定小七地址)**

**3. 構建鏡像指令(賣家根據清單準備貨物)**

_要先 cd 到 docker-compose.yml 存在的路徑才能執行_

> 需要看著清單準備貨物，沒有清單無法準備貨物

**4. 推送鏡像(賣家把貨物寄給小七)**

## 拉取 compose

**1. 登入指定 docker**

```shell
   docker login ip:port
```

**2. 將專案的 docker-compose.yml 檔案放在目標路徑**

_如果 docker-compose.yml 有 volume 目錄 需要先將目錄放在該路徑下_

**3.cd 到 docker-compose.yml 目錄，打拉取指令並執行**

```shell
  docker-compose pull
  docker-compose up -d
```

### 例子解釋:(王大明取貨為例)

**1. 登入指定 docker(前往指定的小七)**

**2. 將專案的 docker-compose.yml 檔案放在目標路徑**

> 先準備好事前訂購的清單，準備對包裹

**3. cd 到 docker-compose.yml 目錄，打拉取指令並執行**

> 在小七裡拿取到符合的包裹後，打開包裹開心使用
