# 目錄

- [Git 介紹](#Git介紹)
- [win10 系統環境準備](#win10-系統環境準備)
- [mac 系統環境準備](#mac-系統環境準備)
- [Git 基本原理介紹](#Git-基本原理介紹)
- [Git 分支和 HEAD](#Git-分支和-HEAD)
- [Git diff](#Git-diff)
- [Git checkout 和 git restore](#Git-checkout-和-git-restore)
- [Git branch 和 git merge](#Git-branch-和-git-merge)

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
      ```shell
      git checkout <SHA1>
      ```
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
