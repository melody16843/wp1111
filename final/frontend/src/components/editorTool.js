import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
// import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import ImageTool from '@editorjs/image';


// ReactEditorJS object 的 tools 設定
//  <ReactEditorJS
//     tools={EDITOR_JS_TOOLS}
//     onInitialize={handleInitialize}
//     defaultValue={dafaultData}
//     onChange={handleSave}
// ></ReactEditorJS> 

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  // linkTool: {
  //   class: LinkTool,
  //   config: {
  //     endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
  //   }
  // },
  // image: Image,
  // image: {
  //   class: ImageTool,
  //   config: {
  //     endpoints: {
  //       byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
  //       byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
  //     }
  //   }
  // },
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
