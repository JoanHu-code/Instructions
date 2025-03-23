# 目錄

- [Github Action 簡介](#Github-Action-簡介)
  - [Github Action 是什麼?](#Github-Action-是什麼)
  - [The components of GitHub Action](#The-components-of-GitHub-Action)

# Github Action 簡介

## Github Action 是什麼?

- GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your `build`,`test`,and `deployment` pipeline. You can create workflows that build and test every pull request to your repository, or deploy merged pull requests to production.

- GitHub Actions 可以自動幫我們執行 CI/CD 的平台

- What is CI/CD?

  - Continuous Intergation: Developers push code changes every day, multiple times a day. For every push to the repository, you can create a set of scripts to `build` and `test` your application automatically. These scripts help decrease the chances that you introduce errors in your application.
  - Continuous Deliverly(Deployment): is a step beyond Continuous Integration. Not only is your application built and tested each time a code change is pushed to the codebase, the application is also `deployed` continuously.

- 什麼是 CI/CD？

  - 持續整合 (Continuous Integration)：開發人員每天多次推送程式碼變更。對於每次推送到儲存庫的程式碼，可以建立一組腳本來建置 (build) 和 測試 (test) 應用程式，這些腳本有助於降低應用程式出錯的機率。
  - 持續交付/部署 (Continuous Delivery/Deployment)：這是在持續整合的基礎上更進一步。不僅每次推送程式碼時應用程式會自動建置和測試，還會持續部署 (deploy) 應用程式，使變更更快速地上線。

![CI/CD](../img/github/01.png)
