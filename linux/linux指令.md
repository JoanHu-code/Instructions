# linux 指令教學

**編輯檔案**

```shell
nano 檔名
```

**查看檔案**

```shell
cat 檔名
```

**列出資料夾裡的檔案**

```shell
ls
```

**查看所有檔案的權限**

```shell
ls -l
```

**換目錄**

```shell
cd C:\Users
```

```shell
cd ~/ .ssh
```

**換目錄(上一層)**

```shell
cd ..
```

**換目錄(上上一層)**

```shell
cd ../..
```

**用管理權限執行**

```shell
sudo nano /etc/containerd/config.toml
```

**更改權限**

```shell
chmod 600 /etc/containerd/config.toml
```

- r(讀): 4
- w(寫): 2
- x(執行): 1

> 600:最高執行者(可讀可寫) 群組(沒有權限) 用戶(沒有權限)

**移除**

```shell
sudo rm  /etc/kubernetes/
```

**強制移除此目錄下的所有檔案，包含此目錄**

```shell
sudo rm -rf /etc/kubernetes/
```

- r: 移除此目錄下的所有檔案
- f: 強制

**移除資料夾**

```shell
sudo rmdir /etc/kubernetes/
```

**建立資料夾**

```shell
sudo mkdir /etc/kubernetes/
```
