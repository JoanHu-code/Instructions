# 目錄

- **前置作業**
  - [如果出現沒有 ssh 的指令](#如果出現沒有-ssh-的指令)
- **步驟**
  - [遠端主機(操控著的電腦)使用指令建立 keys](#遠端主機操控著的電腦使用指令建立-keys)
  - [建立 keys 後的步驟](#建立-keys-後的步驟)
  - [連線指令](#連線指令)
  - [目標主機(被操控的電腦)修改 sshd-config 文件](#目標主機被操控的電腦修改-sshd-config-文件)
- **做錯時需下的指令**
  - [清除指令](#清除指令)

# 如果出現沒有 ssh 的指令

目標主機(被操控的電腦) > 設定 > 系統 > 選用功能 > 新增 open ssh server

遠端主機(操控著的電腦)

1. 設定 > 系統 > 選用功能 > 檢視功能 > 新增 open ssh server
2. 服務 > OpenSSH Authentication Agent 修改為自動 並啟動

環境變數 Path 添加 :

```shell

C:\WINDOWS\System32\OpenSSH\

```

# 遠端主機(操控著的電腦)使用指令建立 keys

**STEP:**

1. 指令:

   ```shell

   ssh-keygen -t rsa -b 4096 -C "ip 位置"

   ```

2. 決定儲存目錄及檔名

   ```shell

   C:\Users\${username}\.ssh\{ip 位置}\id_rsa

   ```

3. 輸入密碼(passphrase)

# 建立 keys 後的步驟:

**STEP:**

1. 遠端主機(操控著的電腦)決定儲存目錄的資料夾內部會有私鑰'id_rsa' 和公鑰 'id_rsa.pub'

2. 在 C:\Users\\${username}\.ssh 的位置，新增一個名為 config 的檔案，附檔名什麼都不用加

   ```shell

   C:\Users\${username}\.ssh

   ```

   **若 config 已經存在就不用增加，直接跳步驟三**

3. 用記事本開啟，並且在此文件中添加剛剛新增 key 的資訊 HOST(以後要啟動時輸入的名稱) HOSTNAME(剛剛設定的 ip) 目標主機(被操控的電腦)的登入帳號
   例:

   ```shell

   Host prod1
     HostName 192.168.5.30
     User fecorpit

   ```

4. 將公鑰檔案放到目標主機(被操控的電腦)的 C:\\Users\\USER\\.ssh 中 並且改名為 authorized_keys， 若檔案存在的話需打開檔案，在最後一行添加新的公鑰

   ```shell

   C:\Users\USER\.ssh

   ```

   ```shell

   authorized_keys

   ```

# 連線指令:

**STEP:**

1. 把私鑰加入進去

   ```shell

   ssh-add id_rsa

   ```

2. 查看私要是否有被加進去

   ```shell

   ssh-add -l

   ```

3. 連線指令 ssh (在 config 設定的 HOST)

   例:

   ```shell

   ssh prod1

   ```

# 目標主機(被操控的電腦)修改 sshd-config 文件

**STEP:**

1. 路徑: C:\ProgramData\ssh， 找到 sshd-config 文件

   ```shell

   C:\ProgramData\ssh

   ```

2. 用記事本打開，修改下面的文字:

   > PubkeyAuthentication yes<br>
   > PasswordAuthentication no

   #以下兩行改為註解 (通常在最底部)

   > `#Match Group administrators` <br>
   > `#AuthorizedKeysFile **PROGRAMDATA**/ssh/administrators_authorized_keys`

**若沒權限則把檔案放在桌面上更改，改完後再放進去原本為位置覆蓋掉**

# 清除指令:

清除所有的 ssh 檔案

```shell

ssh -D

```
