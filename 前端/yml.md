# 目錄

- [前言](#前言)
  - [Deployment](#Deployment)
    - [說明](#說明-D)
      - [基本架構](#基本架構-D)
      - [規範部分](#規範部分-D)
      - [Pod 模板](#Pod-模板-D)
    - [完整程式碼](#完整程式碼-D)
    - [總結](#總結-D)
  - [Ingress](#Ingress)
    - [說明](#說明-I)
      - [基本架構](#基本架構-I)
      - [規範部分](#規範部分-I)
      - [規則部分](#規則部分-I)
    - [完整程式碼](#完整程式碼-I)
    - [總結](#總結-I)
  - [Service](#Service)
    - [說明](#說明-S)
      - [基本架構](#基本架構-S)
      - [規範部分](#規範部分-S)
      - [規則部分](#規則部分-S)
    - [完整程式碼](#完整程式碼-S)
    - [總結](#總結-S)
- [全部合在一起的程式碼](#全部合在一起的程式碼)
- [若沒有 https](#若沒有-https)
  - [Ingress 更改](#Ingress-更改])
  - [Service 更改](#Service-更改])

# 前言

> .yml 檔案全部字母都要小寫，不接受底線

## Deployment

### 說明 D

#### 基本架構 D:

1. apiVersion: apps/v1

> 定義使用的 API 版本，apps/v1 是用來處理 Deployment 的版本。

2. kind: Deployment

> 指定這是一個 Deployment 資源，負責管理和部署應用的工作負載。

3. name: project-name

> Deployment 的名稱為 project-name，用於唯一識別這個 Deployment。

#### 規範部分 D:

1. spec

> 定義 Deployment 的具體行為和配置。

2. revisionHistoryLimit: 5

> 保留的歷史版本數量限制為 5，超過的將被清理。

3. minReadySeconds: 25

> 指定 Pod 必須在啟動後運行至少 25 秒且健康，才會被視為已準備就緒。

4. replicas: 1

> 配置需要的副本數量，這裡指定只有 1 個副本運行。

5. strategy

- type: RollingUpdate
  - 滾動更新策略，逐步替換舊的 Pod 為新的版本，確保不中斷服務。
- rollingUpdate
  - maxSurge: 1
    - 更新過程中允許的最大新增 Pod 數量為 1。
  - maxUnavailable: 1
    - 更新過程中允許的最大不可用 Pod 數量為 1。

#### Pod 模板 D:

1. selector

> matchLabels:定義 Deployment 如何選擇 Pod，這裡的標籤是 app: project-name。

2. template

> 定義 Pod 的模板，所有的 Pod 都會根據這個模板生成。

3. metadata

> labels: Pod 的標籤設置為 app: project-name，用於與 selector 配對。

4. spec

> 定義 Pod 的具體配置。

5. imagePullSecrets

> 定義用於從私有 Docker Registry 拉取映像的 Secret，這裡的 Secret 名稱是 docker-repo。

6. containers

- 配置容器的清單，Deployment 中的每個 Pod 包含以下容器：
  - name: project-name
    - 容器的名稱為 project-name。
  - image: ip:port/project-name:latest
    - 指定容器的映像版本，從 ip:port 的 Docker Registry 中拉取名為 project-name 的映像，版本是 latest。
  - ports
    - 暴露的埠配置：
      - 容器內部服務運行在 80 埠。

### 完整程式碼 D

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: project-name
spec:
  revisionHistoryLimit: 5
  minReadySeconds: 25
  replicas: 1
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: project-name
  template:
    metadata:
      labels:
        app: project-name
    spec:
      imagePullSecrets:
        - name: docker-repo
      containers:
        - name: project-name
          image: ip:port/project-name:latest
          ports:
            - containerPort: 80
```

### 總結 D

這個 YAML 文件配置了一個應用的 Deployment，包含以下主要功能：

1. 滾動更新機制，保障高可用性。
2. 限制歷史版本數量為 5。
3. 配置私有 Docker Registry 的拉取 Secret。
4. 定義一個 Pod 包含一個容器，該容器暴露 HTTP 埠（80），並使用指定映像進行部署。

---

## Ingress

### 說明 I

#### 基本架構 I

1. apiVersion: apps/v1

> 使用的 API 版本，networking.k8s.io/v1 是配置 Ingress 的標準版本。

2. kind: Ingress

> 指定這是一個 Ingress 資源，用於管理 HTTP 和 HTTPS 的進入流量。

3. metadata

- name: project-name-ingress
  - Ingress 的名稱是 project-name-ingress，用於唯一識別這個 Ingress。
- annotations
  - 配置 Ingress 的行為，使用 nginx.ingress.kubernetes.io/rewrite-target: /，將匹配的 URL 重寫為 /，這常用於反向代理後端服務。

#### 規範部分 I

1. spec

> 定義 Ingress 的具體行為和配置。

2. ingressClassName: nginx

> 指定使用 nginx 作為 Ingress 的類型，這需要 Ingress Controller 支援。

3. tls

> [要和 jenkinsfile 裡的名稱相同](./Jenkinsfile/windows.md#2-環境變數-environment)

- 配置 HTTPS 支援。
  - hosts
    - 配置需要使用 TLS 的主機名（域名），這裡指定為 domain-name。
  - secretName: project-screct-key-name
    - 配置儲存 TLS 憑證的 Secret 名稱，這裡指定為 project-screct-key-name。

#### 規則部分 I

1. rules

> 定義進入流量的規則。

2. host: domain-name

> 配置需要處理的主機名（域名），這裡指定為 domain-name。

3. http

> 配置 HTTP 流量的處理。

4. paths

- 配置 URL 路徑的映射規則。
  - path: /
    - 處理以 / 開頭的所有路徑，這裡是根路徑的匹配規則。
  - pathType: Prefix
    - 使用前綴匹配模式，任何以 / 開頭的路徑都將被匹配。
  - backend
    - 定義後端服務：
      - service
        - 指向的 Kubernetes 服務。
        - name: project-name-svc => 後端服務的名稱是 project-name-svc。
        - port
          - number: 80 => 後端服務的埠號是 80。

### 完整程式碼 I

```yml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: project-name-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - domain-name
      secretName: project-screct-key-name
  rules:
    - host: domain-name
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: project-name-svc
                port:
                  number: 80
```

### 總結 I

這個 YAML 文件配置了一個 Ingress 資源，主要功能包括：

1. 域名管理：支援通過 domain-name 訪問服務。
2. HTTPS 配置：使用 project-screct-key-name Secret 配置 TLS 憑證，支援 HTTPS 連線。
3. 路徑映射：將所有以 / 開頭的流量導向名為 project-name-svc 的服務，並使用該服務的 80 埠。
4. 重寫目標：重寫 URL 路徑為 /，簡化後端服務的路徑處理邏輯。

---

## Service

### 說明 S

#### 基本架構 S

1. apiVersion: apps/v1

> 使用的 API 版本，v1 是配置 Service 的標準版本。

2. kind: Ingress

> 指定這是一個 Service 資源，用於暴露應用服務。

3. metadata

- 定義 Service 的元數據。
  - name: project-name-svc => Service 的名稱是 project-name-svc，用於唯一識別這個服務。

#### 規範部分 S

1. spec

> 定義 Service 的具體行為和配置。

2. selector

- 指定這個 Service 會選取哪些 Pod 來處理流量。
  - app: project-name
    - 會選取具有標籤 app=project-name 的 Pod。
    - 與 Deployment 中定義的 Pod 標籤對應，確保流量路由到正確的目標。

3. ports

> [定義端口映射，將外部流量轉發到選定 Pod 的端口。

4. protocol: TCP

> 使用的協議是 TCP（常見的應用層協議）。

5. port: 80

> 定義 Service 暴露給外部的端口號，這裡是 80。

6. targetPort: 80

> 定義流量的目標端口，即選定 Pod 的端口，這裡是 80

#### 工作流程 S

1. 流量進入：

> 當外部或集群內的服務通過 Service 訪問 project-name-svc:80 時，流量會進入此 Service。

2. Pod 選取：

> Service 根據 selector 的條件（標籤 app=project-name）選擇匹配的 Pod。

3. 端口映射：

> 將接收到的流量從 Service 的 port: 80 映射到匹配 Pod 的 targetPort: 80。

### 完整程式碼 S

```yml
apiVersion: v1
kind: Service
metadata:
  name: project-name-svc
spec:
  selector:
    app: project-name
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

### 總結 S

# 全部合在一起的程式碼

> 三個檔案的對應名稱都要一致，不然會錯誤

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: project-name
spec:
  revisionHistoryLimit: 5
  minReadySeconds: 25
  replicas: 1
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: project-name
  template:
    metadata:
      labels:
        app: project-name
    spec:
      imagePullSecrets:
        - name: docker-repo
      containers:
        - name: project-name
          image: ip:port/project-name:latest
          ports:
            - containerPort: 80
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: project-name-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - domain-name
      secretName: project-screct-key-name
  rules:
    - host: domain-name
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: project-name-svc
                port:
                  number: 80
---
apiVersion: v1
kind: Service
metadata:
  name: project-name-svc
spec:
  selector:
    app: project-name
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

# 若沒有 https

**沒有 https 時，記得 jenkinsFile 也要一起更改，把跟 ssl 有關的都拿掉**<br>

## Ingress 更改

> 直接拿到 Ingress 因為已經沒有 https，所以不需要控制

## Service 更改

1. 在 spec 下面新增 type: NodePort
   > 指定 Service 的類型為 NodePort，表示將流量通過所有節點的特定端口暴露到外部：
   - `每個節點的 NodePort 號碼（30902）會對外開放。`
   - `外部用戶端可通過任意節點的 <NodeIP>:30902 訪問服務。`
2. 在 ports 下面新增 nodePort

- `定義在每個節點上暴露的固定端口，這裡是 30902。`
- `外部用戶端可以通過節點 IP 和這個端口訪問服務，例如 http://<NodeIP>:30902。`

```yml
apiVersion: v1
kind: Service
metadata:
  name: project-name-svc
spec:
  type: NodePort
  selector:
    app: project-name
  ports:
    - protocol: TCP
      port: 81
      targetPort: 81
      nodePort: 30902
```
