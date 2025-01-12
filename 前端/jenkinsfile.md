## 目錄

- [不需要遠端操作](#不需要遠端操作)

  - [解釋各功能](#解釋各功能)
    - [1. Pipeline 概述](#1-Pipeline-概述)
    - [2. 環境變數 (environment)](#2-環境變數-environment)
    - [3. 工具 (tools)](#3-工具-tools)
    - [4. 各階段詳解](#4-各階段詳解)
    - [5. 自定義函數](#5-自定義函數)
  - [完整程式碼](#完整程式碼)

- [需要遠端操作](#需要遠端操作)

  - [解釋各功能](#解釋各功能R)
    - [1. Pipeline 概述](#1-Pipeline-概述R)
    - [2. 環境變數 (environment)](#2-環境變數-environmentR)
    - [3. 工具 (tools)](#3-工具-toolsR)
    - [4. 各階段詳解](#4-各階段詳解R)
    - [5. 自定義函數](#5-自定義函數R)
  - [完整程式碼](#完整程式碼R)

- [程式語法額外補充](#程式語法額外補充)
  - [引用機密文件的寫法](#引用機密文件的寫法)
  - [遠端的連線指令](#遠端的連線指令)

# 前置步驟:

**1. 上傳好機密文件到 Jenkins，若還沒請看[Jenkins.md 檔案](../../jenkins.md)**<br>
**2. 請先寫好 yml 檔案，若還沒請看[yml.md 檔案](../yml.md)**

# 不需要遠端操作

## 解釋各功能

### 1. Pipeline 概述

整個 Pipeline 定義了多個階段，分別執行：

1. 確認檔案為最新版本（從版本控制系統檢出）。
2. 安裝專案依賴。
3. 設置環境變數和配置檔案。
4. 構建與推送 Docker 映像。
5. 部署到 Kubernetes。
6. 確認部署狀態。

---

### 2. 環境變數 (environment)

定義了工作中需要的靜態變數：

- 與 Docker 相關：

  - DOCKER_IMAGE_VERSION：Docker 映像的版本。
  - DOCKER_REGISTRY / DOCKER_REGISTRY_PORT / DOCKER_REGISTRY_URL：Docker Registry 的位址與路徑。
  - DOCKER_CREDENTIAL：在 Jenkins 中設定的 Docker 憑證 ID，用於登入 Docker Registry。
  - DEPLOYMENT_NAME: 這個是 kubectl svc 的名稱，要和.yml 檔案裡的 Service->spec->selector 裡的名稱一樣

- 與 Kubernetes 相關：

  - SSL
    - SSL_NAME: 要和 .yml 檔案裡 ingress -> spec -> tls -> secretName 一致(全部都要小寫)
    - SSL_CRT、SSL_KEY : 在 Jenkins 中設定的憑證 SSL_CRT、SSL_KEY
    - SSL_URL: 網域名稱，要和 .yml 檔案裡 ingress -> spec -> tls -> hosts 一致
    - SSL_PATH :希望放在部屬電腦的位置
  - env
    - ENV_FILE:在 Jenkins 中設定的 ENV_FILE
    - ENV_PROD=在 Jenkins 中設定的 ENV_PROD
  - SSH_CRED = 在 Jenkins 中設定的遠端憑證的 KEY
  - YML
    - YML_PATH: 希望放在部屬電腦的位置
      YML_FILE: yml 檔案名稱 ，要與專案裡的 yml 檔案同名

---

### 3. 工具 (tools)

定義了工作環境中使用的工具：

- nodejs：Node.js 用於安裝依賴與構建專案。
- dockerTool：Docker 工具用於構建與推送映像。

---

### 4. 各階段詳解

**Stage 1: 確認檔案為最新版本**<br>
透過 checkout scm，從版本控制系統檢出最新的專案代碼。<br>

**Stage 2: 下載與安裝依賴**<br>
執行 npm install 以安裝專案的開發依賴，這裡使用 PowerShell 指令。<br>

**Stage 3: 新增 env 檔案**<br>

1. 使用 copyFile 自定義函數將 .env.production 和 .env 檔案複製到部屬電腦的專案目錄。
2. 創建 sslConfig 資料夾，並將 SSL 憑證檔案複製到該目錄。

**Stage 4: Build & Docker Image**<br>

1. 執行 npm run build，構建專案。
2. 調用 buildAndPushDockerImage 函數：
   - 連接 Docker Registry。
   - 構建兩個 Docker 映像：一個包含版本標籤，一個標記為 latest。
   - 推送映像到 Registry。

**Stage 5: 部署至 Kubernetes**<br>
執行 deployToKubernetes 函數：

1. 確保 ingress-nginx 已經部署。
2. 如果存在舊的 TLS secret，嘗試刪除並重新創建。
3. 部署 Kubernetes 所需的資源（透過 kubectl apply -f kube/.）。
4. 重啟對應的 Deployment。
5. 錯誤處理：每個步驟都進行了錯誤處理，確保過程中出現的錯誤能夠被捕獲並停止執行。

**Stage 6: 部署確認**<br>
調用 confirmDeploymentStatus 函數：

1. 執行 kubectl rollout status 檢查部署狀態，並設置 180 秒超時。
2. 輸出部署的狀態。

---

### 5. 自定義函數

**1. copyFile**<br>
用於從 Jenkins 憑證存儲中提取檔案並複製到指定目錄。<br>

**2. ymlFile**<br>
複製本地的 YAML 配置文件到指定目錄。<br>

**3. buildAndPushDockerImage**<br>
負責構建並推送 Docker 映像至指定的 Docker Registry。<br>

**4. deployToKubernetes**<br>
處理 Kubernetes 的部署: <br>

1.  HandleIngress:安裝 ingress-nginx。
2.  createNexusRepoAccount:新增 docker-repo 的 key
3.  createTLS: 更新 TLS 憑證。
4.  部署 YAML 定義的 Kubernetes 資源。

**5. confirmDeploymentStatus**<br>
檢查 Kubernetes 部署的狀態，並回報是否成功。

---

## 完整程式碼

```shell
pipeline {
    agent any

    environment {
        DOCKER_IMAGE_VERSION = '1.0.0'
        DOCKER_REGISTRY = '192.168.x.xx'
        DOCKER_REGISTRY_PORT = 'xxxxx'
        DOCKER_CREDENTIAL = 'Repo-Account'
        DEPLOYMENT_NAME = 'MyfirstDep'
        SSL_NAME = 'myfirstWebsite' //全部都要小寫
        SSL_CRT = 'sslcrt'
        SSL_KEY = 'sslKey'
        SSL_URL ='domainName'
        SSH_CRED ='SSH'
        ENV_FILE='Env'
        ENV_PROD='Production'
        SSL_PATH = 'C:\\Users\\user\\Desktop\\MyfirstWebsite\\Frontend\\sslConfig'
        YML_PATH ='C:\\Users\\user\\Desktop\\MyfirstWebsite\\Frontend'
        YML_FILE='MyfirstWebsite.yml' //要與專案裡的yml檔案同名
    }

    tools {
        nodejs 'nodejs'
        dockerTool 'Docker'
    }

    stages {
        stage('確認檔案為最新版本') {
            steps {
                checkout scm
            }
        }

        stage('下載與安裝依賴') {
            steps {
                powershell 'npm install -D vite'
            }
        }

        stage('新增 env 檔案') {
            steps {
                script {
                    echo "正在建立存放ssl的資料夾..."
                    powershell 'New-Item -Path "${SSL_PATH}" -ItemType Directory -Force'

                    echo "複製env檔案到部屬電腦裡..."
                    copyFile(env.ENV_PROD, './.env.production')
                    copyFile(env.ENV_FILE, './.env')

                    echo "複製SSL檔案到部屬電腦裡..."
                    copyFile(SSL_CRT, "${SSL_PATH}\\${SSL_URL}.crt")
                    copyFile(SSL_KEY, "${SSL_PATH}\\${SSL_URL}.key")
                }
            }
        }

        stage('Build & Docker Image') {
            steps {
                powershell 'npm run build'
                script {
                    buildAndPushDockerImage()
                }
            }
        }

        stage('部署至 Kubernetes') {
            steps {
                script {
                    deployToKubernetes()
                }
            }
        }

        stage('部署確認') {
            steps {
                script {
                    confirmDeploymentStatus()
                }
            }
        }
    }
}

def copyFile(credentialsId, destPath) {
    try {
        withCredentials([file(credentialsId: credentialsId, variable: 'EnvFile')]) {
            powershell "Copy-Item -Path \$Env:EnvFile -Destination '$destPath' -Force"
        }
    } catch (Exception e) {
        error "複製檔案失敗: ${e.message}"
    }
}

def buildAndPushDockerImage() {
    try {
        def dockerRegistryUrl = "http://${DOCKER_REGISTRY}:${DOCKER_REGISTRY_PORT}"
        echo "連結Docker帳號: ${dockerRegistryUrl}"

        docker.withRegistry(dockerRegistryUrl, DOCKER_CREDENTIAL) {
            def version = docker.build("${DEPLOYMENT_NAME}:${DOCKER_IMAGE_VERSION}", "-f Dockerfile .")
            echo "推送Docker image 版本為: ${DOCKER_IMAGE_VERSION}"
            version.push()

            def latest_version = docker.build("${DEPLOYMENT_NAME}:latest", "-f Dockerfile .")
            echo "推送最新版本的Docker image"
            latest_version.push()
        }
    } catch (Exception e) {
        error "建立Docker or 推送文件失敗: ${e.message}"
    }
}

def deployToKubernetes() {
    try {
        echo "正在部屬到Kubernetes..."

        // 處理 處理ingress
        HandleIngress()

        // 處理 Docker secret
        try {
            echo "刪除已經存在的 TLS secret"
            powershell " kubectl delete secret kingxia "

        } catch (Exception e) {
            echo "刪除失敗，繼續執行..."
        }

        echo "新增新的docker-repo secret"
        def dockerRegistryService = "${DOCKER_REGISTRY}:${DOCKER_REGISTRY_PORT}"
        createNexusRepoAccount( DOCKER_CREDENTIAL,dockerRegistryService)

        // 處理 TLS secret
        createTLS()

        // 部屬Kubernetes
        echo "應用Kubernetes設定"
        powershell "kubectl apply -f kube/."

        echo "重啟執行 ${DEPLOYMENT_NAME}"
        powershell "kubectl rollout restart deployment/${DEPLOYMENT_NAME}"

    } catch (Exception e) {
        error "執行Kubernetes失敗: ${e.message}"
    }
}
def HandleIngress(){
 // 檢查是否有 ingress-nginx 並且若沒有則嘗試使用 GitHub YAML 配置
    echo "正在處理ingress-nginx"
    def ingressStatus = powershell(script: "kubectl get pods -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --no-headers", returnStatus: true)

    if (ingressStatus != 0) {
        echo "找不到Ingress-nginx. 嘗試執行本地的YAML檔案..."
        try {
            ymlFile("${YML_FILE}")
            echo "應用本地的 Kubernetes "
            powershell "kubectl apply -f kube/${YML_FILE}"
        } catch (Exception e) {
            error "應用本地的YAML失敗，失敗原因: ${e.message}"
        }
    } else {
         echo "找到Ingress-nginx."
    }
}

def createNexusRepoAccount(credentialsId, dockerRegistryService) {
    try {
        // 使用 Jenkins 憑證來取得 Docker Registry 的使用者名稱與密碼
        echo "Docker secret"
        withCredentials([usernamePassword(credentialsId: credentialsId, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
            // PowerShell 指令執行區
            powershell """
                # 檢查是否已存在名為 docker-repo 的 Secret
                if (kubectl get secret docker-repo -o name | Select-String 'docker-repo') {
                    echo "已存在 docker-repo Secret，將刪除。"
                    kubectl delete secret docker-repo
                } else {
                    echo "Secret docker-repo 不存在，無需刪除。"
                }

                # 建立新的 docker-registry Secret
                kubectl create secret docker-registry docker-repo `
                --docker-server=${dockerRegistryService} `
                --docker-username=${USERNAME} `
                --docker-password=${PASSWORD} `
            """
        }
    } catch (Exception e) {
        // 捕捉例外並回報錯誤
        error "操作失敗: 無法建立或刪除 Docker Secret。錯誤訊息: ${e.message}"
    }
}

def createTLS(){
  echo "處理TLS secret"
         powershell """
                # 檢查是否已存在名為 ${SSL_NAME} 的 Secret
                 if (kubectl get secret $SSL_NAME -o name | Select-String '${SSL_NAME}') {
                    echo "已存在 ${SSL_NAME} Secret，將刪除。"
                    kubectl delete secret $SSL_NAME
                } else {
                    echo "Secret  ${SSL_NAME} 不存在，無需刪除。"
                }

                echo "建立新的 ${SSL_NAME} Secret"

                kubectl create secret tls $SSL_NAME --cert="${SSL_PATH}/${SSL_URL}.crt" --key="${SSL_PATH}/${SSL_URL}.key"

                 """
}

def ymlFile(fileName) {
    // 複製本地的 YAML 配置文件到指定目錄
    powershell "scp kube/$fileName $YML_PATH"
}

def confirmDeploymentStatus() {
    try {
        echo "確認執行狀態..."

        // 使用 PowerShell 執行 kubectl 指令並獲取結果
        def status = powershell(
            script: "kubectl rollout status deployment/${DEPLOYMENT_NAME} --timeout=180s",
            returnStdout: true
        ).trim()

        echo "執行狀態: ${status}"

        // 檢查狀態是否包含成功的訊息
        if (!status.contains('successfully rolled out')) {
            error "執行失敗，或未完成: ${status}"
        }
    } catch (Exception e) {
        error "確認執行狀態失敗: ${e.message}"
    }
}

```

# 需要遠端操作

> 當 jenkins 和部屬電腦為不同台時就需要遠端

## 解釋各功能 R

### 1. Pipeline 概述 R

整個 Pipeline 定義了多個階段，分別執行：

1. 確認檔案為最新版本（從版本控制系統檢出）。
2. 安裝專案依賴。
3. 設置環境變數和配置檔案。
4. 構建與推送 Docker 映像。
5. 部署到 Kubernetes。(連線到遠端)
6. 確認部署狀態。(連線到遠端)

---

### 2. 環境變數 (environment)

定義了工作中需要的靜態變數：

- 與 Docker 相關：

  - DOCKER_IMAGE_VERSION：Docker 映像的版本。
  - DOCKER_REGISTRY / DOCKER_REGISTRY_PORT / DOCKER_REGISTRY_URL：Docker Registry 的位址與路徑。
  - DOCKER_CREDENTIAL：在 Jenkins 中設定的 Docker 憑證 ID，用於登入 Docker Registry。
  - DEPLOYMENT_NAME: 這個是 kubectl svc 的名稱，要和.yml 檔案裡的 Service->spec->selector 裡的名稱一樣

- 與 Kubernetes 相關：

  - SSL
    - SSL_NAME: 要和 .yml 檔案裡 ingress -> spec -> tls -> secretName 一致(全部都要小寫)
    - SSL_CRT、SSL_KEY : 在 Jenkins 中設定的憑證 SSL_CRT、SSL_KEY
    - SSL_URL: 網域名稱，要和 .yml 檔案裡 ingress -> spec -> tls -> hosts 一致
    - SSL_PATH :希望放在部屬電腦的位置
  - REMOTE_HOST : 遠端電腦的 ip
    REMOTE_USER : 遠端電腦的 userName
  - env
    - ENV_FILE:在 Jenkins 中設定的 ENV_FILE
    - ENV_PROD=在 Jenkins 中設定的 ENV_PROD
  - SSH_CRED = 在 Jenkins 中設定的遠端憑證的 KEY
  - YML
    - YML_PATH: 希望放在部屬電腦的位置
      YML_FILE: yml 檔案名稱 ，要與專案裡的 yml 檔案同名

---

### 3. 工具 (tools)

定義了工作環境中使用的工具：

- nodejs：Node.js 用於安裝依賴與構建專案。
- dockerTool：Docker 工具用於構建與推送映像。

---

### 4. 各階段詳解

**Stage 1: 確認檔案為最新版本**<br>
透過 checkout scm，從版本控制系統檢出最新的專案代碼。<br>

**Stage 2: 下載與安裝依賴**<br>
執行 npm install 以安裝專案的開發依賴，這裡使用 PowerShell 指令。<br>

**Stage 3: 新增 env 檔案**<br>

使用 copyEnvFile 自定義函數將 .env.production 和 .env 檔案複製到部屬電腦的專案目錄。

**Stage 4: Build & Docker Image**<br>

1. 執行 npm run build，構建專案。
2. 調用 buildAndPushDockerImage 函數：
   - 連接 Docker Registry。
   - 構建兩個 Docker 映像：一個包含版本標籤，一個標記為 latest。
   - 推送映像到 Registry。

**Stage 5: 部署至 Kubernetes**<br>
執行 deployToKubernetes 函數：

1. 先用 SSH 連線到遠端要部屬的電腦
2. 複製 SSL 的 KEY 和證書到遠端要部屬的電腦
3. 確保 ingress-nginx 已經部署。
4. 新增 secret。(repo，ssl)
5. 部署 Kubernetes 所需的資源（透過 kubectl apply -f kube/.）。
6. 重啟對應的 Deployment。
7. 錯誤處理：每個步驟都進行了錯誤處理，確保過程中出現的錯誤能夠被捕獲並停止執行。

**Stage 6: 部署確認**<br>
調用 confirmDeploymentStatus 函數：

1. 執行 kubectl rollout status 檢查部署狀態，並設置 180 秒超時。
2. 輸出部署的狀態。

---

### 5. 自定義函數

**1. copyEnvFile**<br>
用於從 Jenkins 憑證存儲中提取檔案並複製到指定目錄。<br>

**2. buildAndPushDockerImage**<br>
負責構建並推送 Docker 映像至指定的 Docker Registry。<br>

**3. deployToKubernetes**<br>
處理 Kubernetes 的部署：<br>

1. 用 ssh 遠端連線到要部屬的電腦
2. HandleIngress:安裝 ingress-nginx。
3. createNexusRepoAccount:新增 docker-repo 的 key
4. createTLS: 更新 TLS 憑證。
5. 部署 YAML 定義的 Kubernetes 資源。

**4. confirmDeploymentStatus**<br>
檢查 Kubernetes 部署的狀態，並回報是否成功。

---

## 完整程式碼 R

```shell
pipeline {
    agent any

    environment {
        DOCKER_IMAGE_VERSION = '1.0.0'
        DOCKER_REGISTRY = 'xxx.xxx.x.xx'
        DOCKER_REGISTRY_PORT = 'xxxx'
        DOCKER_CREDENTIAL = 'Repo-Account'
        DEPLOYMENT_NAME = 'MyfirstDep'
        REMOTE_HOST = '192.168.x.xx'
        REMOTE_USER = 'user'
        SSL_NAME = 'myfirstWebsite' //全部都要小寫
        SSL_CRT = 'sslcrt'
        SSL_KEY = 'sslKey'
        SSL_URL ='domainHost'
        SSH_CRED ='SSH'
        ENV_FILE='Env'
        ENV_PROD='Env_Production'
        SSL_PATH = 'C:\\Users\\user\\Desktop\\myfirstWebsite\\Website\\ssl'
        YML_PATH ='C:\\Users\\user\\Desktop\\myfirstWebsite\\Website'
        YML_FILE='myfirstWebsite.yml'
    }

          tools {
        nodejs 'nodejs'
        dockerTool 'Docker'
    }

    stages {
        stage('確認檔案為最新版本') {
            steps {
                checkout scm
            }
        }

        stage('下載與安裝依賴') {
            steps {
                powershell 'npm install -D vite'
            }
        }

        stage('新增 env 檔案') {
            steps {
                script {
                    copyEnvFile(ENV_PROD, './.env.production')
                    copyEnvFile(ENV_FILE, './.env')
                }
            }
        }

        stage('Build & Docker Image') {
            steps {
                powershell 'npm run build'
                script {
                    buildAndPushDockerImage()
                }
            }
        }

        stage('部署至 Kubernetes') {
            steps {
                script {
                    deployToKubernetes()
                }
            }
        }

        stage('部署確認') {
            steps {
                script {
                    confirmDeploymentStatus()
                }
            }
        }
    }
}

def copyEnvFile(credentialsId, destPath) {
    withCredentials([file(credentialsId: credentialsId, variable: 'EnvFile')]) {
        powershell "Copy-Item -Path \$Env:EnvFile -Destination '$destPath' -Force"
    }
}


def buildAndPushDockerImage() {
    docker.withRegistry("http://$DOCKER_REGISTRY:$DOCKER_REGISTRY_PORT", DOCKER_CREDENTIAL) {
        def version = docker.build("${DEPLOYMENT_NAME}:${DOCKER_IMAGE_VERSION}", "-f Dockerfile .")
        version.push()
        def latest_version = docker.build("${DEPLOYMENT_NAME}:latest", "-f Dockerfile .")
        latest_version.push()
    }
}

def deployToKubernetes() {
    try {
        withCredentials([
            file(credentialsId: SSL_KEY, variable: 'sslKey'),
            file(credentialsId: SSL_CRT, variable: 'sslcrt'),
            sshUserPrivateKey(credentialsId: SSH_CRED, usernameVariable: 'SSH_USER', keyFileVariable: 'SSH_KEY', passphraseVariable: 'SSH_PASSPHRASE'),
            usernamePassword(credentialsId: DOCKER_CREDENTIAL, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')
        ]) {
            // 設定 SSH 連接設定
            def remote = [
                name           : "${REMOTE_USER}",
                host           : "${REMOTE_HOST}",
                allowAnyHosts  : true,
                user           : SSH_USER,
                identityFile   : SSH_KEY,
                passphrase     : SSH_PASSPHRASE
            ]

            // 傳送 SSL 檔案
            echo "正在建立存放ssl的資料夾..."
            sshCommand remote: remote, command: "powershell -Command \"New-Item -Path '${SSL_PATH}' -ItemType Directory -Force\""
            echo "傳送 SSL 檔案到遠端伺服器..."
            sshPut remote: remote, from: sslcrt, into: "$SSL_PATH/${SSL_URL}.crt"
            sshPut remote: remote, from: sslKey, into: "$SSL_PATH/${SSL_URL}.key"

            // 檢查並部署 ingress-nginx
            echo "檢查並部署 ingress-nginx..."
            def ingressStatus = sshCommand(remote: remote, command: """
                kubectl get pods -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --no-headers || echo "not_found"
            """).trim()

            if (ingressStatus == "not_found") {
                echo "找不到 Ingress-nginx，嘗試執行本地的 YAML 檔案..."
                sshPut remote: remote, from:  "kube/${YML_FILE}", into: "$REMOTE_HOST:$YML_PATH"
                sshCommand remote: remote, command: "kubectl apply -f kube/${YML_FILE}"
            } else {
                echo "找到 Ingress-nginx."
            }

            // 新增 docker-repo Secret
            echo "新增新的 docker-repo Secret"
            def dockerRegistryService = "${DOCKER_REGISTRY}:${DOCKER_REGISTRY_PORT}"
            sshCommand remote: remote, command: """
                if kubectl get secret docker-repo -o name; then
                    echo "已存在 docker-repo Secret，將刪除。"
                    kubectl delete secret docker-repo
                else
                    echo "Secret docker-repo 不存在，無需刪除。"
                fi
                kubectl create secret docker-registry docker-repo \\
                    --docker-server=${dockerRegistryService} \\
                    --docker-username='$USERNAME' \\
                    --docker-password='$PASSWORD'
            """

            // 處理 TLS secret
            echo "新增${SSL_NAME} secret..."
            sshCommand remote: remote, command: """
                kubectl delete secret ${SSL_NAME} || true
                kubectl create secret tls ${SSL_NAME} --cert=$SSL_PATH/${SSL_URL}.crt --key=$SSL_PATH/${SSL_URL}.key
            """

            // 部署 Kubernetes 設定
            echo "部署 Kubernetes 設定..."

            sshPut remote: remote, from:  "kube/${YML_FILE}", into: "$REMOTE_HOST:$YML_PATH"
            sshCommand remote: remote, command: "kubectl apply -f $YML_PATH/${YML_FILE}"
            sshCommand remote: remote, command: "kubectl rollout restart deployment/${DEPLOYMENT_NAME}"
        }
    } catch (Exception e) {
        error "執行 Kubernetes 部署失敗: ${e.message}"
    }
}


def scpEnvFile(fileName) {
    powershell "scp \$Env:$fileName $REMOTE_HOST:$SSL_PATH"
}

def confirmDeploymentStatus() {
    withCredentials([sshUserPrivateKey(credentialsId: SSH_CRED, usernameVariable: 'SSH_USER', keyFileVariable: 'SSH_KEY', passphraseVariable: 'SSH_PASSPHRASE')]) {
        def remote = [:]
        remote.name = "${REMOTE_USER}"
        remote.host = "${REMOTE_HOST}"
        remote.allowAnyHosts = true
        remote.user = SSH_USER
        remote.identityFile = SSH_KEY
        remote.passphrase = SSH_PASSPHRASE

        // 部署狀態確認
        def status = sshCommand remote: remote, command: "kubectl rollout status deployment/${DEPLOYMENT_NAME} --timeout=180s"
        echo "部署狀態: ${status}"
    }
}



```

# 程式語法額外補充

## 引用機密文件的寫法:

```shell
withCredentials([
    file(credentialsId: SSL_KEY, variable: 'sslKey'),
    file(credentialsId: SSL_CRT, variable: 'sslcrt'),
    sshUserPrivateKey(credentialsId: SSH_CRED, usernameVariable: 'SSH_USER', keyFileVariable: 'SSH_KEY', passphraseVariable: 'SSH_PASSPHRASE'),
    usernamePassword(credentialsId: DOCKER_CREDENTIAL, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')
]){
    //引用後要做的事情
}
```

## 遠端的連線指令

```shell
 withCredentials([sshUserPrivateKey(credentialsId: SSH_CRED, usernameVariable: 'SSH_USER', keyFileVariable: 'SSH_KEY', passphraseVariable: 'SSH_PASSPHRASE')]) {
        def remote = [:]
        remote.name = "${REMOTE_USER}"
        remote.host = "${REMOTE_HOST}"
        remote.allowAnyHosts = true
        remote.user = SSH_USER
        remote.identityFile = SSH_KEY
        remote.passphrase = SSH_PASSPHRASE

        sshCommand remote: remote, command: "指令"

    }
```

# linux

1.把所有的 `powershell` 全都換成 `sh`
2.所有的網址路徑都需要換成linux的網址路徑