# 目錄

- [OAuth 流程](#OAuth-流程)
- [Google client id 與 secret](#Google-client-id-與-secret)
- [Google 登入頁面](#Google-登入頁面)
- [儲存使用者資訊](#儲存使用者資訊)
- [顯示使用者資訊](#顯示使用者資訊)
- [註冊本地使用者](#註冊本地使用者)
- [登入本地使用者](#登入本地使用者)
- [製作 Post](#製作-Post)
- [RFC 6749 導讀與詳細說明](#RFC-6749-導讀與詳細說明)

## OAuth 流程

我們可以依靠另一方(如Facebook)來驗證某人的真實性，而不是使用密碼。大多數網站讓用戶在本地身分驗證(local authentication)或使用其他服務之間進行選擇。我們可以使用OAuth以幫助新舊用戶簡化註冊/登入過程。假設用戶已經在瀏覽器中登入Facebook， 則用戶只需要單擊一個按鈕即可登入我們的網站，而不需要填寫個人資料表格或是註冊新的密碼。

大多數網站都會使用OAuth來提高轉化率，擊訪問網站者中的註冊百分比。若用戶覺得註冊帳戶非常容易，更多的用戶會傾向註冊帳戶。每個帳戶都有點子郵件地址，網站也可以開始通過電子郵件向用戶進行營銷。

OAuth 2.0是一種安全協議，協議規範能讓第三方應用程式以有限的權限，透果構建資源擁有者與網路伺服器間的許可交互機制，讓第三方應用程式代表資源擁有者訪問伺服器。OAuth常見名詞:

- Resource Owner: 資源擁有者，即網頁的使用者。資源是指網頁使用者的個人資料與授權

- Client: 客戶端，指的是使用第三方應用程式的網站本身。

- Authorization Server: 授權伺服器，指的是Google,Facebook等大型系統，也就是給予授權的伺服器。

- Resource Server: 資源伺服器，指的是Google,Facebook等大型系統中，存放資源擁有者被保護資訊的位置。

![OAuth](../img/OAuth/01.png)

**詳細流程**

1. Site A 到 Site B 註冊自己，並且從Site B 拿到Secret以及一個ID。

2. 當使用者X告訴Site A去存取在Site B上的資料，使用者X會被透過Site A的ID送到Site B，並且告訴Site B說自己同意Site A來獲取自己存在這裡的資訊。

3. Site B 接下來會把使用者X導回Site A，並且附上一個 Authorization Code。

4. Site A接下來把Authorization Code以及在Site B註冊時得到的secret送到Site B。

5. Site B 確認了 Site A給的secret，確認沒有其他網站冒充Site A，並且透過Authorization Code 確認使用者X確實給了Site A授權來存取使用者X的資訊，於是Site B將security token 寄給Site A。

6. Site A接下來拿者 security token 到 Site B去取得所需資料。

**架設流程**

1. 架設一個網站，使用者須先有Google帳號，並且在此網站後點選使用google登入，此時會跳轉畫面請求登入google，登入完後google會給此網站兩組英數字碼；client_id以及secret。登入完後會跳轉到我們設定的redirect URL，此URL是Google驗證使用者完成後，跳轉的地方。

2. 網站需要製作一個anchor tag，連結到`/auth/google`。網頁使用者點即連結，就會被送到Google登入畫面。

3. 網頁使用者登入google後，google會在Authorization Server內部製作一組code，這組code專屬於此網站以及目前的使用者。

4. 此網站先把secret連同剛剛收到的一組code帶到Authorization Server取得token。

5. 取得token後，網站用token向Google Resource Server取得使用者資訊。

6. 認證成功後，Google Authorization Server會用HTTP status code 302把使用者重新導向到我們設置的redirect URL，`https://domainName/auth/google/redirect?code=______`，其中code會是剛剛得到到那一組code，而`/auth/google/redirect?`這個route由網站後端處理。

7. 網站可以在`/auth/google/redirect`這個route中，先確認了使用者已經被驗證了(可以用passport.authenticate('google'))，再將使用者導向登入後頁面，對使用者來說2到6步都是不可見的。

![OAuth](../img/OAuth/02.png)

## Google client id 與 secret

## Google 登入頁面

## 儲存使用者資訊

## 顯示使用者資訊

## 註冊本地使用者

## 登入本地使用者

## 製作 Post

## RFC 6749 導讀與詳細說明