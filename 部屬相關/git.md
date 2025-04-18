# 目錄

- [Git 介紹](#Git介紹)
- [win10 系統環境準備](#win10-系統環境準備)
- [mac 系統環境準備](#mac-系統環境準備)
- [Git 基本原理介紹](#Git-基本原理介紹)
- [Git 分支和 HEAD](#Git-分支和-HEAD)
- [Git diff](#Git-diff)
- [Git checkout 和 git restore](#Git-checkout-和-git-restore)
- [Git branch 和 git merge](#Git-branch-和-git-merge)
- [Git remote](#Git-remote)
- [Git Local and Git Remote](#Git-Local-and-Git-Remote)
- [Git fetch and Git pull](#Git-fetch-and-Git-pull)
- [Git pull 詳細解說](#Git-pull-詳細解說)
- [帶衝突 conflict 的 git pull 演示](#帶衝突-conflict-的-git-pull-演示)
- [git push](#git-push)
- [git remote 總結](#git-remote-總結)
- [補充](#補充)
- [pull request](#pull-request)
- [git SSH Key](#git-SSH-Key)
- [git Tags](#git-Tags)
  - [版本號命名方法](#版本號命名方法)
  - [Tag Operation](#Tag-Operation)
- [git Hook](#git-Hook)

# Git 介紹

為什麼我們要使用 git?

1. 版本管理
2. 多人開發、合作共享和協助

**[Git vs. Subversion](https://archive.kernel.org/oldwiki/git.wiki.kernel.org/index.php/GitSvnComparison.html)**

|                                           | Git    | Subversion |
| ----------------------------------------- | ------ | ---------- |
| Speed                                     | Faster | Slower     |
| Distributed management                    | ✅     | ❌         |
| Clone entire repository including history | ✅     | ❌         |

# win10 系統環境準備

1. 到 git 官網下載 git

![下載 git](../img/git/01.png)
![下載 git](../img/git/02.png)
![下載 git](../img/git/03.png)

2. 打開 git bash 或是打開 window PowerShell(終端機)，輸入

```shell
git --version
```

> 版本號有出來表示安裝成功
> ![下載 git](../img/git/04.png)

3. 下載 vscode，安裝下面兩個 extendions

- GitLens -- Git supercharged
- Git History

4. 介紹 powershell 一些常見命令

- clear: 可以清除介面，並且回到螢幕上方

```shell
clear
```

- pwd(present working directory): 顯示當前所在的完整路徑

```shell
pwd
```

- ls: 顯示當前資料夾底下所擁有的目錄

```shell
ls
```

- cd: 切換目錄

```shell
cd D:\USERS\Desktop
```

- mkdir: 創建資料夾

```shell
mkdir git-test
```

- `code .`: 在此目錄下開啟 vscode

```shell
code .
```

# mac 系統環境準備

1. 到 git 官網下載 git
   ![下載 git](../img/git/05.png)
   ![下載 git](../img/git/06.png)
   ![下載 git](../img/git/07.png)
   ![下載 git](../img/git/08.png)

2. 打開 treminal(終端機)或 [iterm](https://iterm2.com/)，輸入:

   ```shell
   git --version
   ```

   ![下載 git](../img/git/09.png)
   ![下載 git](../img/git/10.png)
   ![下載 git](../img/git/11.png)

3. 下載 vscode，安裝下面兩個 extendions

- GitLens -- Git supercharged
- Git History

  ![下載 git](../img/git/12.png)

4. 介紹 mac 一些常見命令

- pwd(present working directory): 顯示當前所在的完整路徑

```shell
pwd
```

- ls: 顯示當前資料夾底下所擁有的目錄

```shell
ls
```

- cd: 切換目錄

```shell
cd D:\USERS\Desktop
```

- mkdir: 創建資料夾

```shell
mkdir git-test
```

# Git 基本原理介紹

- 初始化的配置

  1. 配置身分: 若修改代碼的化，必須知道誰修改這代碼，所以需要配置身分

  - 設定用戶名稱:

  ```shell
  git config --global user.name "your name"
  ```

  - 設定用戶 email

  ```shell
  git config --global user.email "your email"
  ```

  - **設定完後可以去當前資料夾內尋找.gitconfig 裡面配置的東西是否為剛剛我們輸入的，或是直接輸入下面指令查看**

  ```shell
  git config --list
  ```

  或

  ```shell
  git config --l
  ```

- 如何在本地初始化第一個存放庫(repository)

  1. 建立新的資料夾

  ```shell
  mkdir git-demo
  ```

  2. 進入資料夾裡面

  ```shell
  cd git-demo
  ```

  3. 初始化存放庫

  ```shell
  git init
  ```

  - **新增一個隱藏`.git`的資料夾**

  ![git init](../img/git/13.png)

  - 文件說明

    - config: 裡面有基礎配置，跟剛剛配置不同處在於，一個是 global(全域)配置 另一個只對本地當前資料夾有效；若本地配置和 global 配置有衝突，會優先選擇本地的配置

      - 查看文件內部

        ```shell
        cat config
        ```

        ![git init](../img/git/14.png)

      - 當前資料夾的 git 的全部配置，也可以看到全域配置

        ```shell
        cat config -l
        ```

        ![git init](../img/git/15.png)

      - 所以也可以改本地的配置，輸入和 global 不一樣的名稱

        ```shell
        git config user.name "your name"
        ```

        ```shell
        git config user.email "your email"
        ```

      - 在用下面指令查看，就可以看到 name 和 email 已被加入

        ```shell
        cat config
        ```

        ![git init](../img/git/16.png)

        ```shell
        git config -l
        ```

        - **會在最下面，要按`enter`鍵到最下面，按`q`離開**

    - object 文件:

      - `git add`在做甚麼?

        1.  新增一個文件

        ![add file](../img/git/17.png)

        2.  查看當前文件在 git 裡的狀態，可以知道哪些有被加入工作區，那些沒有

        ```shell
        git status
        ```

        ![add file](../img/git/18.png)

        3.  新增`hello.txt`到緩存區(Staging Area)裡面

        ```shell
        git add hello.txt
        ```

        - **可以比對一下運行前有多少個目錄看文件夾**

        ```shell
        tree .git
        ```

        ![add file](../img/git/19.png)

        - **如果有兩個內容一樣的檔案，不會新增新的檔案，會用同一個**

      - git 提供三個有關 object 的命令

        - **這些文件是用哈希演算法 SHA-1(secure hash algorithm 1)加密過的文件**

        - 查看文件類型

          ```shell
          git cat-file -t "前六位數(包含最一開始資料夾)"
          ```

          ![add file](../img/git/20.png)

          - **blob 用來儲存文件內容**

        - 查看文件內容

          ```shell
          git cat-file -p "前六位數(包含最一開始資料夾)"
          ```

          ![add file](../img/git/21.png)

        - 查看文件字元數:
          ```shell
          git cat-file -s "前六位數(包含最一開始資料夾)"
          ```
          ![add file](../img/git/22.png)

      - 哈希演算法: 將任意長度的輸入（通常稱為消息或數據）通過雜湊算法轉換為固定長度的輸出（稱為雜湊值或哈希值）。這個過程是不可逆的，即無法從哈希值還原原始輸入。

        - [MD5 128bit](https://passwordsgenerator.net/md5-hash-generator) - 不安全已被破解(原本用來驗證文件完整性)
        - [SHA1 160bit](https://passwordsgenerator.net/sha1-hash-generator) - 不安全已被破解(在 git 裡面使用)
          - [google sha1 collision](https://shattered.io/)
        - [SHA256 256bit](https://passwordsgenerator.net/sha256-hash-generator) - docker 的 container id 和 docker image
        - [SHA512 512bit](https://passwordsgenerator.net/sha512-hash-generator)

      - 總結: Git object 產生的文件包含目錄名的哈希值會包含三個東西:
        1. 檔案類型
        2. 檔案內容
        3. 檔案大小

windows 可以用

```shell
Get-FileHash .\hello.txt
```

- Working directory and Staging Area(index)

  - 由上述可知，object 裡的文件只存儲文件內容、文件類型和文件大小，那文件名去哪裡了呢?
  - 文件名主要都存放在了 Staging Area(index)，也就是.git 檔案裡面的 index
    ![git index](../img/git/28.png)

    - 查看文件

    ```shell
    git ls-file
    ```

    - 查看文件更多資訊

    ```shell
    git ls-files -s
    ```

    - 結果說明:
      - 100644: 文件的權限
      - 8d0e41234f24b6da002d962a26c2495ea16a425f: 文件所對應的 blob object
      - hello.txt: 文件名稱

  - **Staging Area(index): 是用來連接 Working directory 和 Git Repository 的中繼站，裡面包含不只是文件本身，也有文件的狀態**

  - 把程式碼同步到 git Repository，使用 git commit

    ```shell
    git commit -m "your msg"
    ```

  - 執行完 git commit 會發生什麼?
    ![git index](../img/git/29.png)

    - master: 目前所在分支
    - 1d0b740: 代表一次 commit，叫 root commit
    - ![git index](../img/git/30.png)
    - ![git index](../img/git/31.png)
      - 1741655921 +0800: 時間戳
      - tree 07ed5a: commit 生成的第二個 object 文件
      - ![git index](../img/git/32.png)
      - ![git index](../img/git/33.png)
      - 當前 master 分支最新的 commit 是 1d0b740e6660dd37c9e3d9a554b70c6474c6566d
      - ![git index](../img/git/34.png)
      - HEAD 可以理解為指向，永遠指向當前的分支

  - 總結:
    - commit 文件包含兩個東西
      1. 指向哪個 tree，tree 也是對象，包含哪些文件，文件有各自 blob 的對象，可以查看並且找尋各自的內容
      2. 關於作者一些基本資訊包含時間戳
    - 若修改了文件後再重新 add 和 commit 上來會呈現下面那樣
      - ![git index](../img/git/35.png)
      - 文件只要跟著變化 tree 就跟著變了
      - ![git index](../img/git/36.png)
      - 這次 commit 會有一個 parent commit 指向原先的 commit(root commit)，並且這次 commit 會產生一個新的 tree，tree 下面會有一個新產生的 blob object
    - 在 git 裡面空文件夾不算有任何的改變，必須要新增文件才算
    - commit 不會生成 blob object 只會生成 tree object 和 commit object
    - 若是文件夾包含檔案，會產生 tree 包 tree 的 object 的結果
      - ![git index](../img/git/40.png)
      - ![git index](../img/git/39.png)

- Git 的文件狀態:

  1. Untracked: 在 Working directory 新創建一個文件時(當前不在 Staging Area(index)裡面)，使用 git add 可以讓狀態變成 Staged
  2. Modified: 文件已是 staged 狀態(在 Staging Area(index)裡)，但卻在 Working directory 裡面進行修改，導致 Staging Area(index)和 Working directory 裡的文件不同步，需要重新使用 git add 可以讓狀態再變成 Staged
  3. Staged: orking directory 和 resporsity 之間的狀態
  4. Unmodified:讓程式碼用 git commit 指令，從 Staging Area(index)同步到 resporsity
     ![狀態](../img/git/42.png)

  - 逆向推回 untracked 狀態:

    1. rm: 把文件從 Staging Area(index)裡面刪除

    - 從 Staged 變成 Untracked

      ```shell
      git rm --cached hello.txt
      ```

      - ![狀態](../img/git/44.png)

      之後還是要用`git restore`指令，把 Working directory，只動 Staging Area(index)變成同步

    2. 如果 Modified 或 Untracked 已經變成 Staged，但想反悔的話，有兩種方法

       - 去修改 Working directory 的文件，把他變成跟修改前的一樣，在重新推上去
       - 不去動 Working directory，只動 Staging Area(index) 的指向，把它只回上一個 blob object，那就會回到之前的狀態，而在 Working directory 也保留了之前的修改

         ```shell
         git restore --staged hello.txt
         ```

       - 上面因為在 Working directory 保留了之前的修改，因此可以用下列指令來讓 Working directory 和 Staging Area(index)進行同步

         ```shell
         git restore  hello.txt
         ```

         - ![狀態](../img/git/43.png)
         - ![狀態](../img/git/45.png)

- Git 的 log 查看提交歷史

  - 查看所有 commit 的歷史: 由新到舊顯示

    ```shell
    git log
    ```

    ![git log](../img/git/46.png)

  - 每個 commit 通過一行去顯示

    ```shell
    git log --oneline
    ```

    ![git log](../img/git/47.png)

  - 限制 log 顯示的數量，例如想看最近兩次

    ```shell
    git log -2
    ```

    ![git log](../img/git/48.png)

    ```shell
    git log --oneline -2
    ```

  - 看指定時間

    ```shell
    git log --after='2025-03-10'
    ```

    > 包含輸入的日期

    ![git log](../img/git/49.png)

    ```shell
    git log --before='2025-03-10'
    ```

    > 不包含輸入的日期

  - 按照作者進行總結

    ```shell
    git shortlog
    ```

    ![git log](../img/git/50.png)

  - 顯示更多內容

    ```shell
    git log --stat
    ```

    ![git log](../img/git/51.png)

  - 更多使用指令

    ```shell
    git help
    ```

## 總結

- Git Basic Commands:
  - git init: initialize an emoty git reposity
  - git status: show the working tree status
  - git add: add file contents to the index
  - git rm: remove files from the working tree and from the index
  - git restore: restire working tree files
  - git commit: records the changes to repository
  - git log: show commit logs
- Git Low Level Commands
  - git cat-file `<SHA1>`
    - `-t`: git object type
    - `-s`: git object size
    - `-p`: git object content
  - git ls-files
    - `-s`: show staged content' mode bits, object name and stage number in the output

# Git 分支和 HEAD

- 到底什麼是分支?
  - 分支是一個有名字的指針，會指向特定的 commit(Branches are named pointers to commits)
    ![git init](../img/git/52.png)
  - 因為 commit 是一串亂碼，由 SHA1 產生不好記，所以才特定幫他們取了名字，而這名字就是分支，分支必須永遠指向最新的 commit 這樣會產生兩個問題：
    - 需要有地方存儲分支當前指向哪個 commit
    - 有不同的分支就需要有切換分支的功能，在切換之前需要先標示當前在哪個分支
- Master branch and HEAD
  - Master 是一個預設分支，會自動在 git init 後生成(Master is a branch, the canonical mainline branch by default)
  - HEAD 是一個特別的指針(HEAD is a special pointer)，他有兩個功能
    - 永遠指向最新的 commit (Always point to the latest commit)
    - 顯示當前所在的分支名稱 (Related with current active branch)
      ![git init](../img/git/53.png)
  - 實作  
     ![git init](../img/git/54.png)
- Git Branch

  - git branch: list and branches we have
    - `*`: 為當前在的分支
      ![git branch](../img/git/55.png)
  - git branch `<branch_name>`: create a branch with branch_name, if there already have branch with the name you want to create, it will return error.
    ![git branch](../img/git/56.png)
    ![git branch](../img/git/57.png)

    > dev 碰巧也是指向相同的 commit 所以才會顯示出來

    - dev 到底存在哪裡呢？它會存在`.git/refs/heads/`裡面
      ![git branch](../img/git/58.png)
    - 目前在 master 分支
      ![git branch](../img/git/59.png)

  - git checkout: change the current active branch
    ![git branch](../img/git/60.png)

    - git checkout 不只可以切換分支，也可以切換到特定的 commit，這種切換叫做 detached HEAD

    ![git branch](../img/git/66.png)
    ![git branch](../img/git/67.png)
    ![git branch](../img/git/68.png)

    - 如果在非分支的 commit 進行修改，要保存的話有兩個方法
      - 用`git switch -c <new-branch-name>`來創立新的分支並再做任何的修改與 commit
        ![git branch](../img/git/70.png)
        ![git branch](../img/git/71.png)
      - 用`git checkout -b <new-branch-name>`來建立新的分支後再做任何的修改與 commit
        ![git branch](../img/git/69.png)

  - git branch -D `<branch_name>`: delete branch, cannot delete current active branch or branch not existing
    ![git branch](../img/git/62.png)
    - `-d`或`--delete`: 非強制刪除，若沒合併會報錯
      ![git branch](../img/git/63.png)
    - `-D`: 強制刪除，不會報任何的錯誤，會強制刪除
      ![git branch](../img/git/64.png)
    - 若刪除後，那在此分支上建立還沒合併的檔案是不會被刪除的
      ![git branch](../img/git/65.png)
  - git checkout -b `<branch_name>`: checkout a branch, will create that branch if it doesn't exist.
    ![git branch](../img/git/75.png)
  - git switch -c `<branch_name>` : checkout a branch, will create that branch if it doesn't exist
    ![git branch](../img/git/76.png)
  - git branch -m `<old_name>` `<new_name>`: rename branch with new name
    ![git branch](../img/git/77.png)

- 新增新的 commit 的操作
  ![git branch](../img/git/61.png)

- **在 git 裡面所做的操作，例如分支的刪除，指是刪除了指向某個特定 commit 的指針而已，本身文件並沒有被刪除，因此如果不小心誤刪了，指要找回原本的 commit 即可復原**

  - 要如何找到誤刪的分支呢？
    - 可以去 object 檔案，用`git cat-file -p <SHA1>`一個個去查看（很笨的方法）
    - 使用`git reflog`查看之前的操作，包括之前刪除的分支
      ![git branch](../img/git/72.png)
      ![git branch](../img/git/73.png)
      ![git branch](../img/git/74.png)

- 分支的刪除，到底刪除了什麼？
  - 刪除了`.git/refs/heads/`裡面的分支名稱檔案
  - 刪除了`.git/logs/refs/heads`裡面的分支名稱檔案

# Git diff

> 可看文檔差別

- 比對 Working directory 和 Staging Area(index)的不同

```shell
git diff
```

- 如何對比區別？

  - 對比 index(索引) blob object，來看是否有區別
    ![git branch](../img/git/78.png)

  - 9001211: Staging Area（Index）中 dev.txt 的版本
  - 199284c:屬於在本地（Working directory）中 dev.txt 的版本
  - `-`: 代表 Staging Area(index)
  - `+`: 代表 Working directory
  - `@@ -1 +1,3 @@`: 顯示 Staging Area(index)）版本的第一行，在 Working directory 版本的第一行後面數三行內容
    ![git branch](../img/git/79.png)

- 比對當前 Staging Area(index)和存放庫(repository)的不同

```shell
git diff --cached
```

![git branch](../img/git/80.png)

- 9001211 Staging Area（Index）中 dev.txt 的版本
- 199284c HEAD（Repository 中最新 Commit）的版本
- `-`: 代表 Staging Area(index)
- `+`: 代表 HEAD（Repository 中最新 Commit）的版本
- `@@ -1 +1,3 @@`: 顯示 Staging Area(index)）版本的第一行，在 HEAD（Repository 中最新 Commit）版本的第一行後面數三行內容
  ![git branch](../img/git/79.png)

# Git checkout 和 git restore

- git restore: 可以回溯到檔案未改的階段
  ![git branch](../img/git/81.png)
- git checkout: 也可以回溯到檔案未改的階段
  ![git branch](../img/git/82.png)

# Git branch 和 git merge

- Nobody should work on Master branch directly.
- We work on our own branch, that branch could be a feature branch or a bugfix branch.
- Always try to merge your own branch to master branch when you think your job is done.

## Git Merge - Fast Forward

1. 切換到被合併的分支

```shell
git checkout <margerdBranch>
```

2. 之後打以下指令就可以把，branchName 給合併進來

```shell
git merge <branchName>
```

![git branch](../img/git/87.png)
![git branch](../img/git/86.png)

- 例如我們要把 dev 的分支給合併到 master 裡面

1. 先切換到 master 分支

```shell
git checkout master
```

2. 輸入指令，把 dev 分支合併進來

```shell
git merge dev
```

![git branch](../img/git/85.png)

3. 結果: 會在`.git`裡面新增加一個較 ORIG_HEAD 的檔案，他會保留 master 合併前所指向的 commit，以防我們 merge 錯誤還可以回溯

### Fast Forward 條件:

1. 目標分支沒有新的提交：目標分支（例如 master）的提交紀錄完全沒有被其他提交改動過，並且源分支（例如 feature）的提交可以被視為目標分支的延伸。
2. 源分支是目標分支的祖先：這表示在進行合併時，源分支的所有提交歷史可以直接“覆蓋”目標分支，不需要進行合併處理。

![git branch](../img/git/102.png)

### Git Merge - 3 way merge

3 way merge: 當要 merge 的分支的 commit 不是指向前一個分支時，就需要用到 3 way merge
![git branch](../img/git/88.png)
![git branch](../img/git/91.png)

- 如果在這種情況下直接使用`git merge <branch>`指令，會發現多新增了一個 commit， dev 沒有變化，但 master 卻跑到了新產出的 commit 上

![git branch](../img/git/89.png)

![git branch](../img/git/90.png)

- 新產生的 commit 有兩個 parent tree， 其中一個是 dev 目前的 commit，而另一個是 master 之前的 commit

- 若同時修改兩個 parent tree 裡的相同文件，會產生衝突，這時就需要人工介入去解決此衝突

#### 3 way merge with conflict

![git branch](../img/git/92.png)
![git branch](../img/git/93.png)
![git branch](../img/git/94.png)
![git branch](../img/git/95.png)

> 發生衝突後，索引存了三個文件，此索引為版本，現在有三個版本

![git branch](../img/git/96.png)

- 修改衝突的方法有以下三種
  - 進去文檔裡面修改衝突
  - 通過 vscode 去修改衝突
    - Accept Current Changes
    - Accept Incoming Changes
    - Accept Both Changes
    - Compare Changes
      ![git branch](../img/git/97.png)
- 若選擇 Accept Both Changes 後，按存檔，就會發現衝突已解決
  ![git branch](../img/git/98.png)
- 之後要 commit 的時候不需要加文字說明，因為之前已經加過了，所以直接打

```shell
git commit
```

- 打完後就會進入到編輯器裡面
  ![git branch](../img/git/99.png)
- 同意的話按`:wq`保存退出
  ![git branch](../img/git/100.png)
  ![git branch](../img/git/101.png)

#### 整理

| Attribute           | Fast Forward Merge    | 3-Way Merge                           |
| ------------------- | --------------------- | ------------------------------------- |
| **Merge Type**      | Linear merge          | Fork and merge                        |
| **Branch History**  | Hidden branch changes | Visible branch changes                |
| **Characteristics** | Clearer history       | Easier to understand branch structure |

### Git Merge - rebase

rebase : 當已經產生 3 way merge 時，但又不想讓樹狀圖呈現分支，就會使用`rebase`來進行合併

合併邏輯: 先讓分支指向最新的 master 所指向的 commit，而分支的 SHA1 值會被重寫，讓使其滿足 Fast Forward 條件，之後就可以進行合併

**在執行 rebase 時也可能會發生衝突，所以也需要解決衝突的問題**

- 產生的問題

1. 會修改原先 commit 的 SHA1 值，如果原本的 commit 已經 push 到 gitHub(遠端存放庫)，若運行完 rebase 後再去進行 push 的話會出錯
2. 若分支在進行 rebase 之前已經 push 到 github(遠端存放庫)，而這分支被別人拉下來，他在本地進行工作，但自己這邊卻進行了 rebase，並且強制 push 到遠端存放庫，這樣會對別的開發者產生不好的影響

**適用於這分支指有自己在用的時候，就可以強制 push，若有別人在使用不建議使用 rebase**

**一般 rebase 並不會使用在 master 分支上面！！**
![git branch](../img/git/103.png)
![git branch](../img/git/104.png)

> rebase 過去後會發現最新的一筆生成時間比第二筆還早

> 這時 bugfix 分支和 master 分支已經在一條線上，因此在進行 merge 時，就會採用 Fast Forward 方式進行合併

![git branch](../img/git/105.png)

# Git remote

- 為什麼需要 git remote?
- 因為我們需要多人協作，如果不需要多人其實用本地的即可

![git branch](../img/git/106.png)

|           | local repository | remote repository |
| --------- | ---------------- | ----------------- |
| tree      | ✅yes            | ❌no              |
| .git file | ✅yes            | ✅yes             |

- 程式碼託管服務
  - Bitbucket
  - GitHub
  - GitLab

## GitHub: 是通過 Git 進行版本控制的程式代碼託管平台

### push

- 若本地已經有存放庫，那要如何 push 到 rmote 存放庫裡呢?

1. 在 GitHunb 裡面創建一個新的存放庫

2. 選擇是使用 https 還是 ssh，要使用 ssh 的話需要先把 ssh key 給配置好，沒有的話就使用 https

3. 設定遠端存放庫

```shell
git rmote add origin <your-rmote-reposity-url>
```

![git branch](../img/git/107.png)

4. 把本地的存放庫資料提交到遠端存放庫

```shell
git push -u origin <your-rmote-reposity-branch>
```

![git branch](../img/git/108.png)

- 解釋:

  - 查看我們.git/object 有多少個，這裡顯示有 20 個
  - 幫我們把 object 的文件做壓縮，並且推到我們的遠端存放庫
  - 同時他也幫我們新建一個分支叫做 master

  ![git branch](../img/git/109.png)
  ![git branch](../img/git/110.png)

  > 在本地的`.git`資料夾裡面，多新增了四個資料夾和兩個檔案

  - logs:
    - remote(資料夾)
    - origin(資料夾)
    - master(文件)
  - refs:

    - remote(資料夾)
    - origin(資料夾)
    - master(文件)

    ![git branch](../img/git/111.png)

    > 本地和遠端指向同一個 commit

5. 此時去 gitHub 上面刷新當前的遠端存放庫頁面，即可看到 push 上去的資料

6. 若之後在本地修改的話，需要和遠端同步，此時只需要用下面指令即可

```shell
git push origin <your-rmote-reposity-branch>
```

![git branch](../img/git/112.png)
![git branch](../img/git/113.png)
![git branch](../img/git/114.png)

**注意:只有第一次的時候需要加`-u`之後 push 都不用加**

**GitHub 的默認分支從 2020 年開始從 master 改成了 main，但 git 依舊是 master**

> 可以去 GitHub->Setting->Repository 改掉

### clone

> 如何從遠端存放庫 clone 到本地電腦

1. 要先擁有遠端存放庫的 url

2. 打下面指令

```shell
git clone <remote-repository-url>
```

![git branch](../img/git/115.png)

> 也可以重新命名新的存放資料夾的名稱

```shell
git clone <remote-repository-url> <folderName>
```

![git branch](../img/git/116.png)

**只要有 url 就可以 clone 所有存在 GitHub 的檔案**

# Git Local and Git Remote

- Git remote commands
  - `git clone <repository URL>`: clone a remote repository to local disk
  - `git push origin <branch_name>`: push local branch `<branch_name>` to remote branch dev, if `dev` branch does not exist remotely, it would be created.(`--delete` to delete a remote branch)
  - `git branch -a`: list all branches both local and remote
  - `git fetch`: download objects and refs from remote repository
  - `git pull`: fetch from remote and integrate with local branch.
  - `git push origin <tag_name>`: push local tag to github
  - `git push origin --delete <tag_name>`: to delete github tag

## Origin

![git branch](../img/git/117.png)

> Origin 為 Remote Repository 默認名稱

一個 Local Repositiory 可以關聯很多個 Remote Repository，默認只關於一個，這個 Remote Repository 就叫 origin

- 有兩種方式可以讓 remote Repository 和 Local Repositiory 建立起關聯

  - 使用 clone，把 remote Repository clone 到 Local Repositiory
  - 使用`git remote add orgin <remote Repository URL>`

- 查看遠端存放庫的名稱

```shell
git remote
```

![git remote](../img/git/118.png)

- 查看更多有關遠端存放庫的資訊

```shell
git remote -v
```

- fetch: 把遠端存放庫的東西拉取到本地
- push: 把本地的東西 push 到遠端存放庫

![git remote](../img/git/119.png)

![git remote](../img/git/120.png)

![git remote](../img/git/121.png)

- 我們多了一個 remotes 的資料夾，裡面可以有多個 remote，現在只有一個預設 origin，裡面的 HEAD 是一個指針，指向目前的 commit

### 如何修改 Remote Repository 的默認名稱

1. 先在本地刪除想要改名的 Remote Repository

```shell
git remote remove <Remote-Repository-name>
```

![git remote](../img/git/122.png)

> 之前 remotes 裡面有個叫 origin 的資料夾不見了

```shell
git remote add <your-setting-name> <remote Repository URL>
```

![git remote](../img/git/123.png)
![git remote](../img/git/124.png)

> 目前只是添加存放庫，並沒有跟遠端存放庫有任何關連，所以 Remotes 資料夾裡面還沒有任何的東西
> 所以需要新增或修改東西，然後在推上去

![git remote](../img/git/125.png)

```shell
git push <your-setting-name> <branch-name>
```

![git remote](../img/git/126.png)

> 可以看到 Remotes 裡面就出現了一個我們新建立的 Remote Repository 的名稱

![git remote](../img/git/127.png)

### 如何修改遠端存放庫的默認分支

1. 登入 GitHub，並且進入當前需要修改的 repository 裡

2. 需先創立一個新的分支

![git remote](../img/git/128.png)

![git remote](../img/git/129.png)

3. Settings -> General -> Default branch

![git remote](../img/git/130.png)
![git remote](../img/git/131.png)
![git remote](../img/git/132.png)
![git remote](../img/git/133.png)

![git remote](../img/git/134.png)

> 本地分支只有 dev 沒有 master

```shell
git branch
```

> 此指令僅限於查看本地分支，並不會顯示遠端存放庫的分支，要查看遠端存放庫的分支，必須使用

```shell
git branch -a
```

![git remote](../img/git/135.png)

> 只想查看遠端分支：

```shell
git branch -r
```

![git remote](../img/git/139.png)

- 這會產生以下兩個問題

1. 遠端存放庫分支和本地分支如何同步?

2. 本地倉庫的程式碼和遠程倉庫的程式碼該如何進行同步?

###　遠端存放庫分支和本地分支如何同步?

> 使用`tree .git /f`查看會發現，怎麼沒有顯示 master 呢？

![git remote](../img/git/136.png)

> 原因是因為他被壓縮打包在了　.git/packed-refs 裡面

![git remote](../img/git/137.png)
![git remote](../img/git/138.png)

> 上面顯示的 origin/master，是儲存在本地的，因此有可能不是最新的，所以需要同步，同步可以通過:

```shell
git fetch
```

> 先檢查本地的遠端存放庫分支的情況，並且對於每個分支進行代碼的同步

> 檢查遠端存放庫和本地分支的關聯情況

```shell
git remote show <rmote-repository-name>
```

![git remote](../img/git/140.png)

> tracked: 關聯的

####　實作

1. 在 GitHub 上面修改文件並且 commit 後，要如何和本地同步？

![git remote](../img/git/141.png)
![git remote](../img/git/142.png)

> 可以發現本地的 master 並沒有被同步

![git remote](../img/git/143.png)

> 通過`git fetch`的命令去同步

![git remote](../img/git/144.png)
![git remote](../img/git/145.png)

> 可以得知做了 fetch 之後，packed-refs 並沒有改變，但 refs/remotes/origin/master 已經同步了

![git remote](../img/git/146.png)

> 用 git log 查看會發現已經看不到 remote 的部分，因為 remote 分支已經超前了我們本地的分支

2. 在遠端存放庫（GitHub）新建分支後，要如何和本地同步？

> 先查看遠端存放庫分支的情況

```shell
git remote show origin
```

![git remote](../img/git/147.png)
![git remote](../img/git/148.png)
![git remote](../img/git/149.png)
![git remote](../img/git/150.png)

3. 在遠端存放庫（GitHub）刪除分支後，要如何和本地同步？

![git remote](../img/git/151.png)

**git fetch 並不會幫我們把本地分支做刪除去同步遠端分支**

![git remote](../img/git/152.png)

> 有兩個方法可以同步

1. 使用他上面推薦的指令

```shell
git remote prune
```

2. 或者在`git fetch`後面新增參數

```shell
git fetch --prune
```

![git remote](../img/git/153.png)
![git remote](../img/git/154.png)
![git remote](../img/git/155.png)

> 分支已經同步

- 查看本地和遠端分支還有另一個指令

```shell
git branch -vv
```

![git remote](../img/git/156.png)

> 上圖顯示目前本地的 master 分支是落後於遠端的 master 分支，並且顯示落後一個內容

```shell
git merge origin/master
```

> 透過 merge 指令去做合併
> 合併完後就同步了

![git remote](../img/git/157.png)

# Git fetch and Git

- fast forword

  ![Git fetch and Git pull](../img/git/158.png)

  1. Someone pushed a new commit to github

  ![Git fetch and Git pull](../img/git/159.png)

  2. Use git fetch to sync remote master

  ![Git fetch and Git pull](../img/git/160.png)

  3. git merge origin/master

  ![Git fetch and Git pull](../img/git/161.png)

  **Step 2 and 3 can be done through just one command: `git pull`**

- 3 way merge

  ![Git fetch and Git pull](../img/git/162.png)

  1. Someone pushed a new commit to github

  ![Git fetch and Git pull](../img/git/163.png)

  2. Create a new commit on local msater

  ![Git fetch and Git pull](../img/git/164.png)

  3. git fetch

  ![Git fetch and Git pull](../img/git/165.png)

  4. git merge origin/master

  ![Git fetch and Git pull](../img/git/166.png)

  5. git push to remote origin/master

  ![Git fetch and Git pull](../img/git/167.png)

  **Step 3 and 4 can be done through just one command: `git pull`**

  ## 發生衝突的情況

  ![Git fetch and Git pull](../img/git/168.png)
  ![Git fetch and Git pull](../img/git/169.png)

  - 再人工介入去修改後，再 commit

  ![Git fetch and Git pull](../img/git/170.png)

## 什麼是 FETCH_HEAD

- 若 object 檔案太多可以使用下面指令進行壓縮

```shell
git gc
```

- 壓縮完後再用`tree .git /f`查看

- 再遠端存放庫新增一個分支後透過`git fetch`指令拉取下來會產生一個 FETCH_HEAD 的文件

  ![Git fetch and Git pull](../img/git/171.png)

- FETCH_HEAD 裡面包含 remote 遠端分支的資訊，其中兩個都是屬於 commit 類型文件，一個是 master 目前指向最新的 commit，另一個則是 dev

  ![Git fetch and Git pull](../img/git/172.png)

- 我們在本地創建 dev 分支，並且切換到 dev 分支去做`git fetch`，此時 FETCH_HEAD 就會有變化
  ![Git fetch and Git pull](../img/git/173.png)
  ![Git fetch and Git pull](../img/git/174.png)

![Git fetch and Git pull](../img/git/175.png)

### 總結

- FETCH HEAD 的第一行，是我們本地分支所對應的遠程分支，如果不執行`git fetch`，那麼 FETCH HEAD 裡的文件就不會變動，如果切換不同分支而去做`git fetch`的話，此所在的分支就會是第一個呈現

- FETCH HEAD 有什麼用？實際上是去讓 git pull 做使用的

# Git pull 詳細解說

- 查看更多有關 git fetch 的內容

```shell
git fetch -v
```

![Git fetch and Git pull](../img/git/176.png)

- 查看是否跟遠端同步

```shell
git branch -vv
```

![Git fetch and Git pull](../img/git/177.png)

## 實際操作

1. 在 dev 分支上些改文件

2. 使用`git pull -v`，把遠端的文件拉到本地並且合併

![Git fetch and Git pull](../img/git/178.png)

3. 如果拉錯了可以通過 ORIG_HEAD 做 reset

![Git fetch and Git pull](../img/git/179.png)

```shell
git reset --hard ORIG_HEAD
```

> 打上面這指令可以回到還未 merge 之前的狀態

4. 若想繼續合併也可以手動 merge

![Git fetch and Git pull](../img/git/180.png)

# 帶衝突 conflict 的 git pull 演示

1. 先在本地修改文件，並且 add 和 commit 到 staging store

![Git fetch and Git pull](../img/git/181.png)

2. 修改遠端存放庫的文件，要跟本地修改的文件一樣，但輸入不同的東西

3. 進行`git pull`製造衝突

![Git fetch and Git pull](../img/git/182.png)

4. 進到 vscode 選擇解決衝突的辦法

![Git fetch and Git pull](../img/git/183.png)

5. 在本地去 add 和 commit

```shell
git commit -a
```

> 會自動把 merge 給寫出來，之後輸入`:wq`保存退出即可

![Git fetch and Git pull](../img/git/184.png)

- 此時本地的 commit 超前了遠端 commit 兩次
  - 第一次: 在本地修改
  - 第二次: 合併衝突

![Git fetch and Git pull](../img/git/185.png)

6. 讓遠端和本地同步

```shell
git push origin dev
```

![Git fetch and Git pull](../img/git/186.png)

# git push

**目的:**

1. 可以把本地分支推送到遠端存放庫，若此分支不存在在遠端存放庫那就會去創建分支

1.1. 在本地創建一個新的分支

![Git fetch and Git pull](../img/git/188.png)

1.2 在本地創建新的文件，做提交

![Git fetch and Git pull](../img/git/189.png)

1.3 透過 git push 推送到 github

**注意: 如果直接打`git push`是不行的!!因為這個分支目前跟遠端並沒有任何的關聯**

![Git fetch and Git pull](../img/git/190.png)

**需要打指定的 branch**

```shell
git push origin <your new branch>
```

![Git fetch and Git pull](../img/git/191.png)

![Git fetch and Git pull](../img/git/192.png)

> 此時這新的分支已經被推上去了，但會有一個問題，本地跟遠端的這個同名分支並沒有任何的關聯(tracked)

![Git fetch and Git pull](../img/git/193.png)

**因此在 push 的時候，若還未關聯應該要使用**

```shell
git push --set-upstream origin <your new branch>
```

或是

```shell
git push --u origin <your new branch>
```

**`-u`為`-upstream`的簡寫**

> 刪除遠端存放庫的分支

```shell
git push origin -d <your branch>
```

![Git fetch and Git pull](../img/git/194.png)

**之後若有改動的話只要打`git push`即可**

![Git fetch and Git pull](../img/git/195.png)

## 刪除分支

1. 先刪除遠端分支

```shell
git push origin -d <your branch>
```

2. 再刪除本地分支

![Git fetch and Git pull](../img/git/196.png)

# git remote 總結

- `git remote add/remove <name> <url>`: add/remove a remote,default name is origin
- `git remote`: get remote name,origin be default, `-v`(--verbose) display more information like remote URL
- `git remote show origin`: show remote origin tracking information, need connect to internet
- `git remote prune origin`: delete local origin branch whitch does not existing in remote

- Git remote branch

  - Branch Creation:
    - Github web page
    - `git push -u origin <branch_name>`: push local branch `<branch_name>` to remote branch dev, if `<branch_name>` branch does not exist remotely, it would be created.
  - Branch Deletion
    - Github ewb page
    - `git branch -d <branch_name>`: delete local branch
    - `git push origin -d <branch_name>`: delete remote branch
  - List all local and Remote Branch
    - `git branch -a`: list all branches both local and remote
    - `git branch -r`: list all remote origin branches
    - `git branch -vv`: list all local branches tracking information
  - Sync remote branches
    - `git fetch`: downloand objects and refs from remote repository `--prune` Before fetching, remove any remote-tracking references that no longer exist on the remoote
    - `git pull`: fetch and merge origin to local tracking branch.

# 補充

```shell
git show-ref
```

> 可以打印出來本地存放庫所有 reference 指針所指向的雜湊值

![Git fetch and Git pull](../img/git/197.png)

**執行此指令可以先執行`git fetch`確保遠端和本地分支是同步的!!**

> 此指令也可以選擇特定分支來才看

```shell
git show-ref <branch-name>
```

![Git fetch and Git pull](../img/git/198.png)

## 遠端作者和本地作者的差別

![Git fetch and Git pull](../img/git/199.png)

> 本地作者為一開始的配置，可以打以下指令來查看

```shell
git config -l
```

> 使用 `cat .git/config`可以查看設置

![Git fetch and Git pull](../img/git/200.png)

> 可以設置單個專案的 username 和 useremail，設置後就會優先使用，若不存在就會選取全局配置來使用

![Git fetch and Git pull](../img/git/201.png)

# pull request

> `pull request` 是在 github 裡面的概念，相同的概念在 gitLab 裡面稱為`merge request`

1. 什麼是`pull request`?

> Can you push code to a repository which does not to a repository whitch does not belong to you on GitHub?
> NO!並沒有權限修改別人的程式碼

- 但如果你修改別人的東西話

  - 會先複製(fork)這份程式碼到你個人的存放庫裡，會顯示是從哪個存放庫 fork 過來的，fork 過來時會幫你取一個同樣名字的項目，之後修改完再用`pull request` 拉到你 fork 的個人遠端存放庫裡

    ![pull request](../img/git/202.png)

    ![pull request](../img/git/203.png)

  - 創建完之後用 `git clone`指令，先 clone 到本地再推上去

    ![pull request](../img/git/204.png)
    ![pull request](../img/git/205.png)
    ![pull request](../img/git/206.png)

2. 如何創建`pull request`?
   ![pull request](../img/git/208.png)
   ![pull request](../img/git/209.png)
   ![pull request](../img/git/210.png)

   - 管理員多了 merge 的選項
     ![pull request](../img/git/211.png)

![pull request](../img/git/212.png)
![pull request](../img/git/213.png)
![pull request](../img/git/214.png)

> merge 完後，會發現管理員比 fork 的用戶還要多一個 merge 的分支，他們是不同步的

- fork 的用戶
  ![pull request](../img/git/215.png)
  ![pull request](../img/git/216.png)

- 管理員
  ![pull request](../img/git/217.png)
  ![pull request](../img/git/218.png)

3. `pull request`可以進行那些操作?

![pull request](../img/git/219.png)

> upstream: 沒有權限對此存放庫 push，須通過 pull request 給管理人員，希望他們同意我們修改程式碼

- 但有可能會遇到不同步的問題，因此我們需要讓本地存放庫，和 upstream 存放庫同步

- Sync with upstream

  - Configure a remote for a fork

    - `git remote add upstream <url>`
    - `git remote -v`: to list current remote

  - Syncing a fork

    - `git fetch upstream`
    - `git merge upstream/master`
    - `git push origin master`
    - 前兩個`git fetch upstream`和`git merge upstream/master`可以只打`git pull upstrem master`

    ![pull request](../img/git/221.png)
    ![pull request](../img/git/222.png)
    ![pull request](../img/git/223.png)
    ![pull request](../img/git/224.png)
    ![pull request](../img/git/225.png)

# git SSH Key

## 什麼是 SSH Key

> ssh: 用來連接遠端電腦或存放庫

> ssh key: 再連接遠端電腦或存放庫時，可以無需需入密碼，用 ssh key 驗證即可

- 優點: 提高安全性，並且可以快速連接不需要需入密碼

![pull request](../img/git/226.png)

```shell
ssh-keygen
```

> 產生 public/private ed25519 key pair

![pull request](../img/git/227.png)

```shell
ssh-copy-id -i id_ed25519.pub <remote-name>
```

> 添加 ssh key 到服務器上面

## github SSH Key 驗證

> 新增剛剛所產生的公鑰匙到 github 裡面

![pull request](../img/git/228.png)
![pull request](../img/git/229.png)
![pull request](../img/git/230.png)
![pull request](../img/git/231.png)

> 更改`.git/config`裡面的 url，並且執行 push

![pull request](../img/git/232.png)
![pull request](../img/git/233.png)

> 可以使用 ssh clone 下來本地

![pull request](../img/git/234.png)

## github SSH ksy 注意事項

> 不同的平台應該要使用不同的 ssh key，這樣其中一個的私鑰被洩漏出去才不會影響到另一個

```shell
ssh-keygen -C "your email"
```

![pull request](../img/git/235.png)
![pull request](../img/git/236.png)

![pull request](../img/git/237.png)
![pull request](../img/git/238.png)

> 更改 ssh 預設，在`.ssh`目錄下新增一個 config 文件，裡面增加以下指令

```shell
Host github.com
IdentifyFile C:\Users\joan\.ssh\github
User Joan

Host gitlab-demon.com
IdentifyFile C:\Users\joan\.ssh\gitlab
User xiaozhe
```

![pull request](../img/git/239.png)

# git Tags

- `Branches` are named pointers to commits(reds)
- `HEAD` is a special pointer
  - Related with current active branch
  - Always point to the latest commit
- `Tagging` is generally used to **capture a point in history** that is used for a marked version release(i.e. v1.0.1).A tag is like a branch that doesn't change. Unlike branches, tags, after being created, have no further history of commits.

![git Tags](../img/git/240.png)

**tag vs. branch**

tag: 是一個靜態的指針，並不會改變，如果要發不同的版本需創建不同的 tag，每個 tag 所指向的都是固定不變

branch: 永遠指向最新的 commit

## 版本號命名方法

> [目前最流行的命名方法](https://semver.org)

- 有三個數字，每個數字都會用`.`分開
  - 第一個數字: 主版本號，當軟體有重大改變時才改
    (MAJOR version when you make incompatible API changes)
  - 第二個數字: 小版本號，改動一些小功能時才改變
    (MINOR version when you add functionality in a backward compatible manner)
  - 第三個數字: 補釘功能，用來修復 bug
    (PATCH version when you make backward compatible bug fixes
    Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.)

## Tag Operation

- Create tag
  - `git tag <tag name>`: create a **Lightweight tag**
    - (i.e. git tag v1.0)
  - `git tag -a <tag name> -m <tag message>`: create **annotated tag** that have all the associated meta-data(like email,data,etc).
    - (i.e. git tag -a v1.0 -m "version 1.0")
  - `git tag -a <tag name> <commit SHA1 value>`: create annotated tag for an older commit
    - (i.e. git tag -a v1.0 236e1ef5d7556aa6789f7f42f421736271be7b82)
- List tags
  - `git tag`
- Delete tags
  - `git tag -d <tag name>`
  - (i.e. `git tag -d v1.0`)

**tag 有兩種類型，一個為`Lightweight tag`，另一個為`annotated tag`**

> Lightweight tag

```shell
git tag <tag name>
```

![Lightweight tag](../img/git/241.png)
![Lightweight tag](../img/git/242.png)
![Lightweight tag](../img/git/243.png)
![Lightweight tag](../img/git/244.png)

> annotated tag(會新增一個類型為`tag`的 object)

```shell
git tag -a <tag name> -m <tag message>
```

![annotated tag](../img/git/245.png)
![annotated tag](../img/git/246.png)
![annotated tag](../img/git/247.png)

**刪除 tag 後 object 並不會被刪除**

> 新增 tag 在指定的 commit

```shell
git tag -a v1.0.0 e11cf6e -m "version 1.0.0"
```

> 會新增一個類型為 tag 的 object

![annotated tag](../img/git/248.png)

**整理**

![annotated tag](../img/git/249.png)

## 在 github 上創建和刪除 tag

> 創建 tag

![git Tags](../img/git/251.png)
![git Tags](../img/git/252.png)
![git Tags](../img/git/253.png)
![git Tags](../img/git/254.png)
![git Tags](../img/git/255.png)

> 刪除 tag

**要先刪除 release 才能刪除 tag**
![git Tags](../img/git/256.png)
![git Tags](../img/git/257.png)

## 本地 tag 和遠端 tag 的同步

- push tag(本地同步到遠端)
  - `git push origin <tag name>`: push tag to remote
    - (i.e. git push origin v1.0)
  - `git push --tags`: push multiple tags simultaneously
- sync tags from remote (遠端同步到本地)
  - `git fetch`
  - ![git Tags](../img/git/261.png)
- Delete tags:
  - `git tag -d <tag name>`
    - (i.e. git tag -d v1.0)
  - `git push --delete origin <tag name>`: delete remote git tag

![git Tags](../img/git/258.png)

> v1.0.0 為 Lightweight tag 而 v1.0.1 為 annotated tag
> Lightweight tag 指向最新的 commit，但 annotated tag 是指向新創見的一個叫 tag 的 commit 因此即使是同意時間 push tag 上去的，他們的時間也會不同

![git Tags](../img/git/259.png)
![git Tags](../img/git/260.png)

# git Hook

> 在觸發 git 的操作之前和之後可以增加 hook 來去做特定的事情

> 可以做一些檢查，檢查不通過就不允許 push

![git Hook](../img/git/262.png)

> 藍色是操作執行完後去執行，而紅色和黃色是在進行操作前執行，所以有可能會阻止我們操作，其中紅色是不能跳過，黃色可以跳過

## pre -commit hook

> 把後面的.sample 拿掉就可以用了

![git Hook](../img/git/263.png)
![git Hook](../img/git/264.png)

> 若在 commit 的時候，文件名出現非 ASCII 的文件名字，那就會回傳 1 並且退出，並且不會執行`git commit`

![git Hook](../img/git/265.png)

> 1 代表錯誤，若改為 0 則即使錯誤也會執行下去

![git Hook](../img/git/266.png)
![git Hook](../img/git/267.png)

## 忽略 hook 強制執行 commit

```shell
git commit -m "your comment" --no-verify
```

## pre-commit 工具

[pre-commit](https://pre-commit.com/)

```shell
pip install pre-commit
```

![git Hook](../img/git/268.png)

![git Hook](../img/git/269.png)

> 檢查版本號

```shell
pre-commit --version
```

> 在.git/hook 裡面創建 pre-commit

```shell
pre-commit --install
```

![git Hook](../img/git/270.png)

> 檢查全部檔案

```shell
pre-commit run --all-file
```

![git Hook](../img/git/271.png)

> 檢查單一類型檔案

```shell
pre-commit run --all-file check-<name-id>
```

![git Hook](../img/git/272.png)

> 發生錯誤時的狀態(import 一個沒有使用到的東西)

![git Hook](../img/git/273.png)

> 執行 git commit 的結果

![git Hook](../img/git/274.png)

> 修改錯誤後的結果

![git Hook](../img/git/275.png)
