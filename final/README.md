


## FB 社團公告內容
- 專題題目名稱
Group 59 
Have a nice trip

- 組員
B08504045 蔡心櫻
B08901214 蔡昕璇
B09504006 白鈺綺

- Demo 影片連結  
https://drive.google.com/file/d/1SwvZ4ADgb5YQkbRWMID15MiMZPxJm36v/view?usp=share_link

- 網路服務說明
我們的服務have a nice trip是一個兼具記帳功能的旅遊網誌，使用者可以在此搜尋並閱讀其他人的旅遊心得文章，發掘新的出遊地點，登陸後還可以收藏喜歡的文章，非常適合想要探索各種旅遊秘境、私房景點的人，或是好不容易有空出去玩耍但一時間不知道該何去何從的人，又或是想要參考別人的出遊經驗，來規劃旅遊行程的人，也都很適合。除了搜尋與瀏覽功能外外，登陸後即可建立自己公開的旅遊文章(可限定共編對象)，並且每篇文章皆具有私人的記帳功能，三五好友一起出門，最後分帳往往讓人困擾，使用have a nice trip的記帳功能就能針對此次出遊，清楚記錄每筆開支，也能夠增添一起旅遊的回憶。



- 使用與參考之(第三方)框架/模組/原始碼
    - Frontend
    react
    MaterialUI
    Antd
    Editor-js
    react-editor-js
    react-date-object
    react-dom
    universal-cookie
    reactstrap
    styled-components
    - Backend
    Express
    Mongoose
    Axios
    react-router-dom
    dotenv-defaults
    stytch
    cors
    - Deployment
    railway
- hierachy
![](https://i.imgur.com/0psw2Kg.png)
![](https://i.imgur.com/12IfZVT.png)



- 專題製作心得
蔡心櫻：
本次專題讓我體會到網頁state更新以及各種async順序的重要性，本次專題的許多bug多半來自於此問題，對於網頁設計以及網路服務的各種貢獻者至上12萬分敬意。
蔡昕璇：
A lesson learned in this project is how incredible the world of the Internet is. Although coding is not where I shine, this course has a great discrepancy from many other courses in EE (algorithm, data structure, etc.). The point is to integrate the amazing extensions/works of your teammate/others, conjure up a recipe and create your own projects. It is important to ask people for help, as well as the universe of github issue and documents online!
白鈺綺：
製作完本次專案的當下回過頭來看，很難相信自己從原本對網頁服務的技術完全沒概念，到最後能夠利用這堂課所學跟兩名carry的隊友一起成功架出一個網誌，雖然過程中真的很累學習曲線陡峭，更因此深刻感受到自己成長很多，不論是對於網頁技術的實作基礎知識或是跟隊友一起協作開發軟體專案的能力都有很大提升。

-------
## Deployed 連結 (點進去即可使用)
https://haveanicetrip-2023.up.railway.app/
(若有連結失效的狀況麻煩來信通知，有可能是railway的Deployed每月額度用光)


## 如何在 localhost 安裝與測試之詳細步驟

1. 
```
cd frontend/
yarn install
yarn start
```

2. 
```
cd backend/
yarn install
yarn server
```


#### 資料庫使用我們的自己的mangodb，不須新增.env檔
由於之後的搜尋功能測試會使用到我們資料庫的側資，所以直接在.env.defaults提供我們的mangodb資料庫認證連結，此連結有時效性，等期末專題評分完畢後就會刪除，故無資安問題，也請老師與助教協助，勿將mangodb資料庫認證連結外流，感謝


## 使用的packages

如上"使用與參考之(第三方)框架/模組/原始碼"所述
細節可參考下方
* backend dependencies
  "dependencies": {
    "@babel/plugin-proposal-class-properties": "^7.18.6",
    "@babel/plugin-proposal-object-rest-spread": "^7.20.2",
    "@babel/plugin-transform-arrow-functions": "^7.18.6",
    "cors": "^2.8.5",
    "dotenv-defaults": "^5.0.2",
    "express": "^4.18.2",
    "mongoose": "^6.8.2",
    "nodemon": "^2.0.20",
    "stytch": "^5.17.0"
  },
* frontend dependecies
  "dependencies": {
    "@ant-design/icons": "^4.8.0",
    "@editorjs/checklist": "^1.4.0",
    "@editorjs/code": "^2.8.0",
    "@editorjs/delimiter": "^1.3.0",
    "@editorjs/editorjs": "^2.26.4",
    "@editorjs/embed": "^2.5.3",
    "@editorjs/header": "^2.7.0",
    "@editorjs/image": "^2.8.1",
    "@editorjs/inline-code": "^1.4.0",
    "@editorjs/link": "^2.5.0",
    "@editorjs/list": "^1.8.0",
    "@editorjs/marker": "^1.3.0",
    "@editorjs/paragraph": "^2.9.0",
    "@editorjs/quote": "^2.5.0",
    "@editorjs/raw": "^2.4.0",
    "@editorjs/simple-image": "^1.5.1",
    "@editorjs/table": "^2.2.0",
    "@editorjs/warning": "^1.3.0",
    "@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "@mui/icons-material": "^5.11.0",
    "@mui/material": "^5.11.2",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "antd": "^5.0.5",
    "antd-input-tag": "^1.0.14",
    "axios": "^1.2.2",
    "dayjs": "^1.11.7",
    "react": "^18.2.0",
    "react-date-object": "^2.1.5",
    "react-dom": "^18.2.0",
    "react-editor-js": "^2.1.0",
    "react-router-dom": "^6.4.5",
    "react-scripts": "5.0.1",
    "reactstrap": "^9.1.5",
    "styled-components": "^5.3.6",
    "universal-cookie": "^4.0.4",
    "web-vitals": "^2.1.4"
  },






### 初始畫面如下：
![](https://i.imgur.com/vHRKOag.png)






## 功能測試
#### 由於後端資料庫處於動態調整狀態，以下demo的圖片僅供參考，小部分UI design或是搜尋結果可能會與demo的圖片有些微差異，但邏輯皆是follow以下說明，若有任何問題或是不清楚的地方歡迎來信詢問(信箱)

1. email login
> click "Login", enter your account email, and check the corresponding email box, you should see belowing mail, click Log in to Login our service 
> ![](https://i.imgur.com/uPOSOGj.png)
> ![](https://i.imgur.com/o38d5o7.png)
> ![](https://i.imgur.com/e1VuDQ0.png)
> (note: if there is an error message display like below, just check whether your email is typing correct or use the same email and click the continue button again)
> ![](https://i.imgur.com/fefU2cC.png)
> 
> SUCCESS Login Page：
> ![](https://i.imgur.com/Sc91j4n.png)
> 

#### Before login 既有的功能Search:
2. search traveling articles <搜尋引擎&filter>
> 勾選checkbox地區、價格、天數或在搜尋欄輸入關鍵字後按下search button，可以看到搜尋的文章結果
> 也可不選取任何filter、不輸入任何關鍵字直接click search button, and see all articles.
> ![](https://i.imgur.com/nitHj6D.png)
> ![](https://i.imgur.com/P3frv7R.png)


3. check search result(article) 
> 搜尋後，按下其中一篇文章右邊的view button可以看到文章內容
> ![](https://i.imgur.com/zcFnkgb.png)


### After login 才有的功能articles、new articls、favorite、Account(記帳)、Logout:
4. add article to favorite 收藏
>  搜尋後，按下其中一篇文章右邊的like checkbox可以收藏該文章，在左方menu的favorite可以看到該文章
>  ![](https://i.imgur.com/hI61rKI.jpg)
> 
5. create new article
> 按下左邊menu的"new articles"，可以新增文章
> 文章有6個輸入框
> * Title (input text, 會顯示在search page result card)
> * Acticle (block input style editor, like notion)
> 圖片嵌入測試
> ![](https://i.imgur.com/p5aaCvB.jpg)
> 複製以下公開圖片網址(需要是公開的url且結尾為jpg、png格式)：https://media.cntraveler.com/photos/5d8cf7d5db6acf000833e6cc/master/pass/Eiffel-Tower_GettyImages-1060266626.jpg
> 到editor編輯區上
> 
> 編輯區:
> ![](https://i.imgur.com/2vMqKa0.png)
> 測試結果如下:
> ![](https://i.imgur.com/2XXJJrL.png)
> 影片嵌入功能測試
> 一樣複製以下網址
> https://www.youtube.com/watch?v=-ltO_iTeiVM
> 到editor編輯區上
> 結果：
> ![](https://i.imgur.com/FG8F4V2.png)



> 
> <詳細的使用示範可見demo 影片>
:::info
![](https://i.imgur.com/HMXZI9m.gif)
headings設定
![](https://i.imgur.com/mZ0ktnM.gif)
表格(table)設定
![](https://i.imgur.com/1083vvg.gif)
以連結插入圖片及影片
:::

> * post excerpt (文章摘要或PS註記)
> * Tag (option selsctor: 地區、價格、天數, for search page filter)
> * Meta Description (this article description, 會顯示在search page result card)
> * Owner (共同編輯該文章的人員名單、協作者(名稱請輸入他的登錄帳號@前的部分，使用示範如10.，只能在初次SAVE文章時設定，之後編輯該文章都無法修改，協作者必須是已經登錄過此服務的人)
> 
> #### 輸入完文章後，click SAVE button:
> * it will nevigate to that article page, and in left menu "articles" block will auto save that new article title. 
6. edit old article
> Once you login, in left menu "articles" will show all your previous created articles. You can go to any of your old articles page(edit it) by clicking its title in menu "articles"
> 
> after edit the article and click SAVE button, it will show below message：
> ![](https://i.imgur.com/hIKcbDN.png)

> 
7. see account(帳務) of article
> 按下SAVE建立新文章後，click上方的ACCOUNT Button進入該文章的記帳頁面
> ![](https://i.imgur.com/36FNmXf.png)
> 點選上方的Click to enter expense可以新增花費
> ![](https://i.imgur.com/1SLLhHc.png)
> 點選右邊的trash can可以刪除該花費
> 再點選上方ARTICLE可以切換回文章編輯頁面

8. delete old article
> 按下save旁邊的delete鍵，會將article刪除，且側欄的文章列表也會更新，但是協作者的部份需要協作者重新登錄之後才看得到更新（會有error訊息跳出提醒）
> before Delete
> ![](https://i.imgur.com/NHbksHb.png)
> after click Delete
> ![](https://i.imgur.com/IVAx2KH.png)

9. logout
> click left menu "Logout", it will logout
> ![](https://i.imgur.com/IhvoXWC.png)


 

:::info
P.S.
- 所有文章一旦SAVE後皆可以顯示在Search的結果中，文章的瀏覽權限屬於pubic，文章的修改儲存功能權限只for作者本人或指定的對象，屬於private
- account一律都是private的功能，非owner無法瀏覽與編輯
- 左邊側欄可以伸縮，網站icon會隨之改變排版

![](https://i.imgur.com/uZJceFE.gif)

:::

10. 共同編輯
如下圖在owner中填入想要協作者的名字（email@前的部份），若有很多個請以空格隔開
![](https://i.imgur.com/8nIF1Ps.png)
文章創建以後，所有的協作者都可以有編輯權限，但是請注意，若是協作者現在在登錄狀態，他的navbar不會馬上更新，會在下一次需要更新navbar時才會更新，例如創建文章、更改喜歡、重新login等等
剛剛輸入的共編者(協作者)2002paipai帳號會收到共同編輯文章，連結收錄在左側menu的"articles"，如下圖
![](https://i.imgur.com/jDVGpTQ.png)




## 每位組員之負責項目 (請詳述)

==蔡心櫻==
search、filter、navbar功能實做
==蔡昕璇==
account、login功能實做、網站icon設計
==白鈺綺==
page的edit、save、delete實做



## (Optional) 對於此課程的建議
- 我覺的在教學的部份，與其使用作業來做示範，我覺的可能用別的題目來示範，但是示範完全，作業出不一樣的題目，這樣可能對於初學者更友善一點
- 這門課建議改成5學分，並且增加 TA recitation


