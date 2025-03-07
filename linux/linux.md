# 目錄

- [Introductiion and Setup](#Introductiion-and-Setup)
- [Linux Shell and Basic Commands](#Linux-Shell-and-Basic-Commands)
- [Read and Write files](#Read-and-Write-files)
- [User/Group and Permission](#UserGroup-and-Permission)
- [Network and Sodtware installation](#Network-and-Sodtware-installation)
- [SSH and SCP](#SSH-and-SCP)
- [Shell Script Programming Basic](#Shell-Script-Programming-Basic)

# Introductiion and Setup

- What is Linux?

  - An operating system: 用於控制底層的硬體設備，常見的系統有 Macos、windows、Linux 也是其中一種
  - A kernel: 如同 linux 的心臟，主要用途為和底層的設備溝通，我們可以用它開發一些應用程式，這些程式就不用自己去和底層的硬體做溝通，只需調用 linux kernel 的一些方法，它自然會幫我們溝通
  - Created by Linus Torvalds in 1991
  - FOSS(Free/Open Source Software): 免費和開源，代碼開放，任何人都可以查看，並且可以進行任意修改，也可以做商業

- Linux Distribution: Linux Kernel(用於和底層設備進行溝通) plus additional software(與人交互需用到輸入命令的終端機或圖形介面等軟體)，兩個加起來可以變成一個發行版

  - 以下兩個著名的 Linux Distributes，分企業用和個人用:
    - Redhat(企業用): opensoude 的公司，但軟體要錢(商業用)
    - Ubnutu(個人用戶): 介面做得比較好，適合新手學習
    - [其他公司](https://distrowatch.com/dwres.php?resource=family-tree)

- Why use Linux?

  - Linux is everywhere
  - Free Software Ecoysystem
  - Stable, Reliable, Secure

- Install Linux

  - 虛擬化: 虛擬化可將許多小型工作負載整合至單一實體電腦，可提高效率並降低 IT 費用。透過部署帶有作業系統和應用程式的新虛擬機器，IT 管理員可以輕鬆在更改生產環境之前建置概念驗證和開發測試環境。虛擬機器也可以合併至較少的實體伺服器上，從而簡化資產管理。管理虛擬機器還有助減少硬體維護、佈建資源及減少停機時間，以協助公司節省時間。它們還可以減少部署伺服器所需的空間，最終減少能源消耗，使其成爲更加環保的解決方案。此外，虛擬機器可以符合成本效益的方式執行傳統應用程式，而不需要移轉至全新的作業系統。當硬體老化或過時，虛擬化可讓使用者同時兼顧兩個方面：他們可以升級硬體，同時仍然保留對舊作業系統的存取。出色的虛擬機器具高度可攜性，表示它可以在網路中的實體電腦之間移動，甚至可以在企業內部部署與雲端環境之間移動。在同一個主機上執行多個虛擬機器可將系統資源的使用最佳化。
  - 虛擬化和虛擬機器管理程式：虛擬機器如何運作？

    - 透過虛擬化，單一電腦 (主機) 可以執行多部虛擬電腦 (VM)，每一部虛擬電腦都有自己的作業系統、處理器核心、記憶體、儲存體以及網路。由於虛擬化可讓您將許多小型工作負載合併至單一實體電腦上，因此可確保高資源使用率，進而降低 IT 費用。如果將虛擬化定義為可讓多個作業系統在單一主機上執行，則虛擬化堆疊中的必要元件是虛擬機器管理程式，它會將虛擬機器和主機連接在一起。虛擬機器管理程式是一個軟體層，可讓虛擬機器在主機上執行，並在所有虛擬機器之間分配處理器、記憶體及儲存。此虛擬機器管理程式亦稱為虛擬機器監督器 (VMM)，它會建立一個虛擬平台來執行及監督多個虛擬機器，可讓相同或不同作業系統的多個作業系統共用硬體資源。

    - 例如，VirtualBox 是一種常見的虛擬化產品，用於建立此虛擬環境。它是免費的開源軟體，可讓開發人員和 IT 管理員快速部署作業系統。VirtualBox 可以安裝在 macOS、Linux 和 Windows 上。其他虛擬機器管理程式還包括 VMware vSphere 和 Microsoft Hyper-V。

  - [安裝 VirtualBox](https://www.virtualbox.org/wiki/Downloads)

# Linux Shell and Basic Commands

# Read and Write files

# User/Group and Permission
