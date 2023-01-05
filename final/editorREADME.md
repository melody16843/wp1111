# yarn add packages below first

yarn add react-editor-js

yarn add @editorjs/editorjs

yarn add @editorjs/embed @editorjs/table @editorjs/paragraph @editorjs/list @editorjs/warning @editorjs/code @editorjs/link @editorjs/image @editorjs/raw @editorjs/header @editorjs/quote @editorjs/marker @editorjs/checklist @editorjs/delimiter @editorjs/inline-code @editorjs/simple-image

yarn add @mui/material @mui/icons-material reactstrap antd @emotion/react @emotion/styled @mui/icons-material @mui/lab mui react-form-elements formidable 



## new files:

創建新文章的object
# |-module:
# |
# |---wpFinal/frontend/src/components/editorTool.js (Editor Tool config)
# |
# |---wpFinal/frontend/src/components/ButtonAppBar.js
# |
# |---wpFinal/frontend/src/containers/editPageNew.css
# |
# |-main:
# |---wpFinal/frontend/src/containers/editPageNew.js

閱讀舊文章的object
# |-module:
# |---wpFinal/frontend/src/components/Reader.js


# How to use <EditPageNew />
## issue !!!!! need to remove <React.StrictMode> !!!!!!
<EditPageNew /> can not render inside  <React.StrictMode></React.StrictMode>
like below:
---------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EditPageNew from 'wpFinal/frontend/src/containers/editPageNew.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <EditPageNew />
  // </React.StrictMode>
);

reportWebVitals();
----------------------------------------------------------------



## some resource
https://www.npmjs.com/package/react-editor-js
https://github.com/Jungwoo-An/react-editor-js
https://codesandbox.io/s/react-editor-js-v2-34bfl?file=/src/index.js
https://github.com/codex-team/editor.js/tree/master
https://editorjs.io/getting-started#tools-installation


## editor.js 官方文件
https://editorjs.io/
https://github.com/codex-team/editor.js
## 我用的 react-editor-js是繼承自editor.js
https://github.com/Jungwoo-An/react-editor-js
### image tool
https://github.com/editor-js/image
### Simple Image tutorial project
https://github.com/editor-js/simple-image-tutorial

### react-editor-js 儲存的資料格式
{
   "time": 1550476186479,
   "blocks": [
      {
         "type": "heading",
         "data": {
            "text": "Editor.js",
            "level": 2
         }
      },
      {
         "type": "paragraph",
         "data": {
            "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
         }
      },
      {
         "type": "heading",
         "data": {
            "text": "Key features",
            "level": 3
         }
      }
   ],
   "version": "2.8.1"
}