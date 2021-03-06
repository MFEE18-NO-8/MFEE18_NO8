# MFEE18_NO8

請各位在此 repositories 進行操作

此版本是建立在 MFEE18.NO.8 「組織」下面的專案，任何在組織內的成員都有權限 可在不需要允許的前提下，進行推送

有別於前版本 是建立在我個人帳號下面的

在這邊我要先跟各位說聲抱歉，在沒完全理解 github 就先教導各位
<(＿ ＿)>

------------------------------------------------------------------

git 簡單來說 是使用指令 使用分支來分工合作
git hub 是一個平台 你可以在上面先建立帳號 後續使用帳號參與各種大大小小的專案
共同點：目的都是為了分工合作 同時處理一份文件
差異點：git 相對比較像是工具， 初學者建議從 github 和 vs code 入門

在開始之前 有幾件事情要先準備

1. 安裝 git 在你的電腦 https://git-scm.com/

2. 然後在 git hub 註冊帳號 //後面都是使用這個平台進行操作

3. 點擊 專案網頁中 右手邊綠色的 code 按鈕
你會看到一個網址 旁邊那個按鈕 按下去 複製一下

4. 然後接下來我們要 將此份 repositories clone(克隆) 到你的電腦裡

打開 vs code ，這邊有兩個方法 (選哪個都可以 推薦選第一個) ：
(1)你需要先安裝 vs code 的 github 延伸模組
    => 登入後 ctrl + shift + p （MAC 是 shift+command+p)
    => 輸入 git clone
    =>把剛剛的網址貼上來
    ＝>選擇你想放的位置
(2)直接在終端輸入 git remote add origin 網址

//(2)這句話的意思是： 加入遠端數據庫 
//兩個方式推薦第一種，因為這是在 vscode 官網看到的，官網給的建議 可以翻譯又有圖可以看 
//https://code.visualstudio.com/docs/editor/github

5. 複製完後，你的電腦裡就有一份檔案了，接下來就可以開始動工了 

6. 大概是醬
------------------------------------------------------------------
這邊我簡單介紹一下使用的方式：
請記得先開新分支，再從新分支開始做 commit
當你編輯的時候 左手邊的git圖示會出現藍色數字
(這時候 儲存的話 是存在你的電腦端 不會進行上傳的。)

假設今天確定要上傳了，點擊左手邊 git圖示
=>點擊＋的符號
=>輸入你想留下的訊息
=>點擊最上面的『打勾的符號』
(這時候你的檔案 還沒完成真正的上傳)
=>點擊左下角的『迴圈符號』
(這時才會完成真正的推送)

------------------------------------------------------------------
常用 git 指令：比較常用的有標註星號
    (*)git clone 複製版本庫到一個新目錄 
    (*)git init 建立一個空的 Git 版本庫或重新初始化一個已存在的版本庫
在目前變更上工作
    (_)git add 新增檔案內容至索引
    (_)git mv 移動或重新命名一個檔案、目錄或符號連結
    (_)git restore 復原工作區檔案
    (_)git rm 從工作區和索引中刪除檔案 
    (_)git sparse-checkout 初始化並修改稀疏檢出
檢查歷史和狀態  
    (_)git bisect 透過二分搜尋定位引入bug 的提交 diff 顯示提交之間、提交和工作區之間等的差異
    (_)git grep 輸出和模式符合的行
    (*)git log 顯示提交日誌 
    (_)git show 顯示各種類型的物件
    (*)git status 顯示工作區狀態(只顯示跟上次不同的部份)
擴展、標記和調校您的歷史記錄
    (*)git branch 列出、建立或刪除分支
    (*)git commit 記錄變更到版本庫
    (*)git merge 合併兩個或更多開發歷史
    (*)git rebase 在另一個分支上重新套用提交 
    (_)git reset 重設目前 HEAD 到指定狀態
    (_)git switch 切換分支 tag 建立、列出、刪除或驗證一個 GPG 簽名的標籤物件
協同  
    (*)git fetch 從另外一個版本庫下載物件和引用
    (*)git pull 取得並整合另外的版本庫或一個本機分支
    (*)git push 更新遠端引用和相關的物件

-----------------------------------------------------------------------
相關網站介紹

git 官網 https://git-scm.com/

git hub 官網 https://github.com/

vs code 官網介紹 https://code.visualstudio.com/docs/editor/github

it 邦幫忙 介紹相關外掛 https://ithelp.ithome.com.tw/articles/10250436

使用 Git 分支 - 分支和合併的基本用法 https://git-scm.com/book/zh-tw/v2/%E4%BD%BF%E7%94%A8-Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E5%92%8C%E5%90%88%E4%BD%B5%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95

添加遠端數據庫--教學 六角學院 https://w3c.hexschool.com/git/fd426d5

初學者必讀 -俊諭推薦 http://tech-marsw.logdown.com/blog/2013/08/16/git-notes-github

初學者必讀 2 --多人合作 俊諭推薦 http://tech-marsw.logdown.com/blog/2013/08/17/git-notes-github-n-person-cooperation-settings
