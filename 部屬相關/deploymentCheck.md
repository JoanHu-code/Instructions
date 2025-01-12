# 目錄

- [部屬前須在本地進行測試](#部屬前須做的事項)
  - [開啟本地的 kubernetes](#開啟本地的kubernetes)
  - [建立 secret](#建立secret)
    - [建立 repo 的 key](#建立-repo-的-key)
    - [建立本專案的 ingress key](#建立本專案的-ingress-key)
  - [可能發生的錯誤](#可能發生的錯誤)

# 部屬前須做的事項

### 1. 開啟本地的 kubernetes

**電腦為 windows 作業系統:**

> 安裝 docker -> 在 docker 中安裝 kubernetes (設定(點擊右上角齒輪)) -> 勾選 enable kubernets

### 2. 建立 secret

#### 建立 repo 的 key

步驟:

1. 開啟終端機

2. 檢查 repo 的 key 是否存在

```script

kubectl get secret

```

- 若存在要先刪除

```script

kubectl delete secret ${dockerRegistryService}

```

- 不存在則直接建立

```script

kubectl create secret docker-registry ${name} docker-server=${dockerRegistryService} docker-username='$USERNAME' docker-password='$PASSWORD'

```

> ${name}:自己取
> docker-server:為庫的 ip 和 port
> docker-username:設定的庫的名稱
> docker-password: 設定的密碼名稱

#### 建立本專案的 ingress key

步驟:

1. 開啟終端機

2. 尋找.yml 檔案所在的資料夾

3. 在資料夾裡點擊右鍵開啟終端機

4. 檢查 ingress key 是否存在

```script

kubectl get secret

```

- 若存在要先刪除

```script

kubectl delete secret ${ingres_name}

```

- 不存在則直接建立

```script

kubectl create secret tls ${ingres_name} --cert=$SSL_PATH/${SSL_URL}.crt --key=$SSL_PATH/${SSL_URL}.key

```

> ${ingres_name} 要和 .yml 裡的 kind: Ingress 裡的 tls 的 secretName 一樣

- 部屬 ingress

```script

kubectl apply -f .

```

> 如果沒有到 .yml 目錄下，apply -f 後面就須自己打網址不能打. <br>
> .是表示執行此目錄下所有的.yml 檔案

- 重啟 svc

```script

kubectl rollout restart deployment/${svc_name}

```

**不知道 svcName 時打下面的指令**

```script

kubectl get svc

```

- 確認是否有真的跑起來

```script

kubectl get pod

```

> STATUS 要顯示 RUNNING 才是正確執行

### 3. 可能發生的錯誤

1. Error response from daemon: Get "https://192.168.x.xx:xxxx/xx/": http: server gave HTTP response to HTTPS client

> 打開 docker -> 設定 -> Docker Engine -> 打下列指令進去

```script

{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "insecure-registries": [
    "庫的ip:庫的port"
  ]
}

```

2. 觀察 fail 在哪個步驟

```script

kubectl describe pod ${podName}

```
