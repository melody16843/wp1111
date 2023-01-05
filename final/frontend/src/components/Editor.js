// import logo from './logo.svg';
// import './App.css';
import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from "./editorTool";
// import ReactDOM from "react-dom";
// import React, { Component } from "react";


import { useRef, useCallback } from "react";
import { Button } from 'antd';


const ReactEditorJS = createReactEditorJS()
const dafaultData = {
  time: 1635603431943,
  blocks: [
    {
      id: "sheNwCUP5A",
      type: "header",
      data: {
        text: "Editor.js",
        level: 2
      }
    },
    {
      id: "12iM3lqzcm",
      type: "paragraph",
      data: {
        text:
          "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
      }
    },
    {
      id: "fvZGuFXHmK",
      type: "header",
      data: {
        text: "Key features",
        level: 3
      }
    },
    {
      id: "xnPuiC9Z8M",
      type: "list",
      data: {
        style: "unordered",
        items: [
          "It is a block-styled editor",
          "It returns clean data output in JSON",
          "Designed to be extendable and pluggable with a simple API"
        ]
      }
    },
    {
      id: "-MhwnSs3Dw",
      type: "header",
      data: {
        text: "What does it mean «block-styled editor»",
        level: 3
      }
    },
    {
      id: "Ptb9oEioJn",
      type: "paragraph",
      data: {
        text:
          'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
      }
    },
    {
      id: "-J7nt-Ksnw",
      type: "paragraph",
      data: {
        text:
          'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
      }
    },
    {
      id: "SzwhuyoFq6",
      type: "header",
      data: {
        text: "What does it mean clean data output",
        level: 3
      }
    },
    {
      id: "x_p-xddPzV",
      type: "paragraph",
      data: {
        text:
          "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
      }
    },
    {
      id: "6W5e6lkub-",
      type: "paragraph",
      data: {
        text:
          'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.'
      }
    },
    {
      id: "eD2kuEfvgm",
      type: "paragraph",
      data: {
        text:
          "Clean data is useful to sanitize, validate and process on the backend."
      }
    },
    {
      id: "N8bOHTfUCN",
      type: "delimiter",
      data: {}
    },
    {
      id: "IpKh1dMyC6",
      type: "paragraph",
      data: {
        text:
          "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
      }
    },
    {
      id: "FF1iyF3VwN",
      type: "image",
      data: {
        file: {
          url: "https://codex.so/public/app/img/external/codex2x.png"
        },
        caption: "",
        withBorder: false,
        stretched: false,
        withBackground: false
      }
    }
  ]
};

// const ReactEditor = () => {
//   const editorInstance = useRef(null);
//   let cleanData = "";
//   console.log(editorInstance);

//   const onSave = async () => {
//     const outputData = await editorInstance.current.save();
//     cleanData = JSON.stringify(outputData);
//     // save output data to backend
//     console.log(editorInstance);
//     console.log(cleanData);
//   };

//   let meetings = [
//     {
//       name: "Meeting1",
//       iscompleted: false,
//       createdby: "Priyav",
//       meetingDescription: "Meeting Description1",
//       meetingDate: "12-08-2021"
//     },
//     {
//       name: "Meeting2",
//       iscompleted: true,
//       createdby: "Krishna",
//       meetingDescription: "Meeting Description2",
//       meetingDate: "12-08-2021"
//     }
//   ];

//   return (
//     <div>
//       <EditorJs
//         editorInstance={(instance) => {
//           editorInstance.current = instance;
//         }}
//         tools={EDITOR_JS_TOOLS}
//         data={Data({
//           meetings: meetings
//         })}
//         onChange={onSave}
//       />
//       <a
//         href="http://localhost:8000/api/v1/jira_authenticate"
//         rel="noreferrer"
//         target="_blank"
//       >
//         <button onClick={onSave}>Save</button>
//       </a>
//     </div>
//   );
// };


function Editor() {

  // useRef to find editor object
  const editorCore = useRef(null)
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleSave = useCallback( async () => {
    console.log("editorCore: ", editorCore);
    const savedData = await editorCore.current.save();
    // const sendData = JSON.stringify(outputData);
    // TODO1: save outputData data to backend
    //////////////////////////////////////////
    console.log("successfully save data to backend ",savedData);
  }, [])


  return (

    <div>
      <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        onInitialize={handleInitialize}
        defaultValue={dafaultData}
      />
      {/* TODO2: UI design save button (recent in lower left corner) */}
      {/* ********************************************************** */}
      <Button onClick={handleSave}>Save</Button>
    </div>

  );
}

export default Editor;
