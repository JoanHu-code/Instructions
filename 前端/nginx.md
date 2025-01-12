## 目錄

- [程式碼解釋](#程式碼解釋)
- [小結](#小結)
- [完整的程式碼](#完整的程式碼)
- [下篇請看 yml.md](./yml.md)

# 程式碼解釋

**指定 Nginx 服務以 nginx 使用者身份執行。**

```shell
user nginx;
```

**設定 Nginx 自動根據 CPU 的核心數量決定 worker processes 的數量，提升性能。**

```shell
worker_processes auto;
```

**事件區塊**

```shell
events {
  worker_connections 15000;
}
```

> 每個 worker process 能處理的最大連線數，設定為 15000。

**HTTP 區塊**

```shell
http {
  include /etc/nginx/mime.types;  #導入檔案類型定義，讓 Nginx 能根據檔案副檔名設置正確的 MIME 類型。
  default_type application/octet-stream; #當無法匹配檔案類型時，預設為二進制流。
  access_log /var/log/nginx/access.log; #設定存放訪問日誌的檔案路徑。
  #第一個伺服器區塊
  server {
    server_name www.myFirstWebsite; #設定伺服器的域名為 www.myFirstWebsite。
    #根目錄及首頁設定
     location / {
        root /usr/share/nginx/html; #指定伺服器的根目錄。
        index index.html index.htm; #設定預設首頁檔案
        try_files $uri $uri/ /index.html; #檢查請求的 URI 是否存在，若不存在，則回退至 index.html。
    }
    #反向代理設置（如果需要）
    location ^~ /font/api {
        #將這些請求代理到內部伺服器
        proxy_pass http://192.168.X.XX:8080/admin/font;  #正式環境(.env.production)的VITE_FONT_API
    }
    #錯誤頁面處理
    error_page 500 502 503 504 /500;
    location = /500 {
        internal;
        default_type "text/html; charset=utf-8";
        return 500 '
            <html>
            <head><title>500 伺服器錯誤</title></head>
            <body>
                <div style="text-align: center;">
                    <h1>伺服器錯誤</h1>
                    <h3>很抱歉，發生錯誤，請重新利用<span style="color: red;">簡訊網址</span>登入!謝謝!</h3>
                </div>
            </body>
            </html>
        ';
    }

    error_page 404 /404;
    location = /404 {
        internal;
        default_type "text/html; charset=utf-8";
        return 404 '
            <html>
            <head><title>404 網頁不存在</title></head>
            <body>
                <div style="text-align: center;">
                    <h1>網頁不存在</h1>
                    <h3>很抱歉，發生錯誤，請重新利用<span style="color: red;">簡訊網址</span>登入!謝謝!</h3>
                </div>
            </body>
            </html>
        ';
    }
  }
```

**第二個伺服器區塊（自動跳轉 HTTPS）**

```shell
server {
    #監聽 HTTP 連接（80 埠）
    listen 80;
    server_name www.myFirstWebsite;
    #將所有 HTTP 請求重新導向到 HTTPS（443 埠）。
    rewrite ^(.*)$ https://$host$1;
    location / {
        index index.html index.htm;
    }
}
```

## 小結

**這段 Nginx 配置檔案主要用於：**

> 提供靜態檔案服務。<br>
> 支援反向代理 API。<br>
> 定義自定義錯誤頁面。<br>
> 自動將 HTTP 請求重定向到 HTTPS。<br>
> 配置適合靜態網站與 API 代理的組合使用場景。<br>

# 完整的程式碼

```shell
user nginx;
worker_processes auto;

events {
  worker_connections 15000;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;
  access_log /var/log/nginx/access.log;


server {

    server_name www.myFirstWebsite;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # 反向代理設置（如果需要）
    location ^~ /font/api {
        #將這些請求代理到內部伺服器
        proxy_pass http://192.168.X.XX:8080/admin/font;  #正式環境(.env.production)的VITE_FONT_API
    }


    error_page 500 502 503 504 /500;
    location = /500 {
        internal;  # 這使得頁面僅能由 Nginx 處理
        default_type "text/html; charset=utf-8";   # 設置返回的內容類型為 HTML

        return 500 '
            <html>
            <head><title>500 伺服器錯誤</title></head>
            <body>
                <div style="text-align: center;">
                    <h1>伺服器錯誤</h1>
                    <h3>很抱歉，發生錯誤，請重新利用<span style="color: red;">簡訊網址</span>登入!謝謝!</h3>
                </div>
            </body>
            </html>
        ';
    }


    error_page 404 /404;
    location = /404 {
        internal;  # 這使得頁面僅能由 Nginx 處理
        default_type "text/html; charset=utf-8";   # 設置返回的內容類型為 HTML

        return 404 '
            <html>
            <head><title>404 網頁不存在</title></head>
            <body>
                <div style="text-align: center;">
                    <h1>網頁不存在</h1>
                    <h3>很抱歉，發生錯誤，請重新利用<span style="color: red;">簡訊網址</span>登入!謝謝!</h3>
                </div>
            </body>
            </html>
        ';
    }


    error_page 403 /403;
    location = /403 {
        internal;  # 這使得頁面僅能由 Nginx 處理
        default_type "text/html; charset=utf-8";   # 設置返回的內容類型為 HTML

        return 403 '
            <html>
            <head><title>403 沒有權限訪問</title></head>
            <body>
                <div style="text-align: center;">
                    <h1>沒有權限訪問</h1>
                    <h3>很抱歉，發生錯誤，請重新利用<span style="color: red;">簡訊網址</span>登入!謝謝!</h3>
                </div>
            </body>
            </html>
        ';

    }

}
server {
    listen 80;
    server_name www.myFirstWebsite;
    rewrite ^(.*)$ https://$host$1;
    location / {
        index index.html index.htm;
    }
}

}
```

# [下篇請看 yml.md](./yml.md)
