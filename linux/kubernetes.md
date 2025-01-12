# 目錄

- [安裝 containerd](#安裝-containerd)
- [安裝 kubectl、kubeadm、kubelet 步驟](#安裝-kubectlkubeadmkubelet-步驟)
  - [執行 kubelet](#執行-kubelet)
  - [設定 kubectl](#設定-kubectl)
  - [應用 kubeadm](#應用-kubeadm)
  - [安裝完成後執行的指令](#安裝完成後執行的指令)
  - [遇到錯誤時才需要做的事情(可選指令)](#遇到錯誤時才需要做的事情可選指令)
- [可能遇到的問題](#可能遇到的問題)

# 安裝 containerd

**1. 安裝所需要的依賴庫:**

```shell
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl
```

**2. 安裝指令:**

```shell
sudo apt install -y containerd
```

**3. 產生預設配置 可能需要管理權限:**

```shell
sudo containerd config default > /etc/containerd/config.toml
```

**4. 修改配置:**

1. 打開文件指令:

```shell
sudo nano /etc/containerd/config.toml
```

2. 文件以下部分要修改

> [plugins."io.containerd.grpc.v1.cri".containerd] <br>
> //新增允許 http(有層級關係)
> [plugins."io.containerd.grpc.v1.cri".registry.mirrors."這邊放 IP 跟 Port"] <br>
> endpoint = ["http://這邊放 IP 跟 Port"] <br>
> ... <br> > [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc] <br>
> SystemdCgroup = true <<<這裡改成 true <br>
> ...

3. 修改完成後按 ctr+O 之後直接按 enter 即可

**5. 重啟 containerd:**

```shell
sudo systemctl restart containerd
```

**6. 查看是否修改成功:**

```shell
sudo containerd config dump | grep SystemdCgroup
```

# 安裝 kubectl、kubeadm、kubelet 步驟

- kubectl: 執行工具
- kubeadm: 管理執行的東西，也就是管理 kubelet
- kubelet: 執行的東西

**1. 安裝所需要的依賴庫:**

```shell
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
```

**2. 金鑰指令:**

```shell
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.31/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
```

**3. 新增儲存庫:**

```shell
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.31/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

**4. 更新、下載、驗證:**

```shell
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

## 執行 kubelet

**1. 先啟動 kubelet，並且更新設定:**

```shell

sudo systemctl enable kubelet
sudo nano /var/lib/kubelet/config.yaml

```

修改文件:

> cgroupDriver: systemd << 修改為 systemd

**2. 重新啟動 kubelet，讓 kubelet 能使用新的設定:**

```shell

sudo systemctl daemon-reload
sudo systemctl restart kubelet

```

## 設定 kubectl

```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

## 應用 kubeadm

**1. 初始化管理 plane:**

```shell

sudo kubeadm init --pod-network-cidr=10.244.0.0./16

```

**初始化結束後 會出現一個金鑰 需要記住 類似**

> --kubeadm join 192.168.5.30:6443 --token ad5rrn.b91ouk4o90ratlmj \
>  --discovery-token-ca-cert-hash sha256:c705adc917da0c9a6977513b37981d68bf137d393afaa37465d293c1a4d8bb94

**2. 修改文件:**

```shell

sudo nano /var/lib/kubelet/kubeadm-flags.env

```

```shell
  --container-runtime-endpoint=unix:///run/containerd/containerd.sock
```

## 安裝完成後執行的指令

**安裝網路插件**

```shell
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
```

**管理節點原本不能當作工作節點，執行以下程式碼才可變成工作節點**

```shell
kubectl taint nodes <your-control-plane-node> node-role.kubernetes.io/control-plane:NoSchedule-

kubectl label nodes <your-control-plane-node> kubernetes.io/role=worker
```

## 遇到錯誤時才需要做的事情(可選指令)

**1. 重置現有的配置:**

```shell
sudo kubeadm reset
```

**2. 清理其他可能遺留的文件:**

```shell
sudo rm -rf /etc/kubernetes/
sudo rm -rf /var/lib/kubelet/
sudo rm -rf /var/lib/etcd/
sudo rm -rf $HOME/.kube/
```

**3. 停止 kubelet:**

```shell
sudo systemctl stop kubelet
```

# 可能遇到的問題

1. kubernetes 中 pvc 掛載 pv 後出現 Permission denied 權限錯誤

- 處理方法:

  - 將 pv 掛載目錄擁有者改為 service 預設使用者 (指令中 200:200 的部分)

  ```shell
    sudo chown -R 200:200 /path/to/pvc
  ```

  - 並將/patj/to/pvc 的目錄權限改為 755

  ```shell
    sudo chmod 755 /path/to/pvc
  ```
