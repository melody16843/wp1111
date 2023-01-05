import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from "../components/editorTool";
import * as React from 'react';
import { useRef, useCallback, useEffect, useState } from "react";
import { Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
// import{makeParagraph,makeChecklist,makeCode,makeDelimeter,makeEmbed,
//   makeHeader,makeImage,makeList,makeQuote,makeWarning} from "./utilty/makeHTML"
import {Input} from "reactstrap";
// import Select from 'react-select';
import "./editPage.css"
import axios from "../api"
// import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';
import { useLogin } from '../containers/hook/useLogin';
import {useEdit} from '../containers/hook/useEdit'
import { Select } from 'antd';
import ButtonAppBar from '../components/ButtonAppBar';
import { useNavigate, useLocation } from 'react-router-dom'

const { Option } = Select;


const ReactEditorJS = createReactEditorJS()

// tags
const citys = ['台北','新北','桃園',"新竹","苗栗",'台中','彰化','雲林','嘉義','台南','高雄','屏東','宜蘭','花蓮','台東']
const costs = ['$5000-$10000','$10000-$15000','$15000-$20000','$20000-$30000','$30000-$40000','$40000+']
const days = ['一日遊','兩天一夜','其他']






const EditPage = () =>  {

  // get user information
  const { login, email, setUser, user, setStatus } = useLogin();
  const {setIsCreating, id, setId, read, setRead, setDeleted} = useEdit();
  const [init, setInit] = useState(true);
  
  const {state} = useLocation()
  const navigate = useNavigate();
  const location = useLocation()

  // for debugging
  const [testpost, setTestpost] = useState({});

  // EditPage: whole page outputData format
  const [data, setData] = useState({
    title: '',
    post: {
      blocks: [
        { id: "sheNwCUP5A",
          type: "paragraph",
          data: {
            text: "Type your story here...",
            level: 2
            }
        }],
      time:0,
      version:""
    }, // reactEditor block
    postExcerpt: '',
    // categoryId: [],
    tagId: [],
    metaDescription: '',
    user: ''
    // jsonData: null
  });
  
  useEffect(()=>{

  })

  //fetch article data from backend
  const getArticle = async() => {
    
    await axios.post('./article', {id:state.id})
    
    .then(async (res)=>{
      //set read only
      if (res.data.data === 'please update your page'){
        setStatus(
          {
            type: 'error',
            msg: 'someone has deleted the article please relogin to update navbar'
          });
          navigate('/')
          return
      }
      const owner = res.data.data.owner
      const creator = res.data.data.creator
      console.log(owner.indexOf(user) != -1 || creator == user)
      console.log(user)
      console.log(owner)
      console.log(creator)

      if ((owner.indexOf(user) != -1 || creator == user) && user !=''){
        setRead(false)
      }
      else {
        setRead(true)
      }
      setData(res.data.data.data)
      setTestpost(res.data.data.post)

      // console.log("before if (init && editorCore.current._editorJS){", editorCore.current._editorJS)
      // 把init拿掉試試看?
      console.log("init=",init)
      console.log("below init, editCore=",editorCore.current)
      if (init && editorCore.current) {
        editorCore.current._editorJS.isReady
            .then(() => {
                console.log('Editor.js is ready to work!')
                //draftBody = json.stringify()
                editorCore.current._editorJS.render(res.data.data.post)

                /** Do anything you need after editor initialization */
            })
            .catch((reason) => {
                console.log(`Editor.js initialization failed because of ${reason}`)
            });
        
        // editorCore.current.render(res.data.data.post)
      }
      
    }
    )
  }
  useEffect(() => {
    console.log("in useEffect, check state=",state)
    if (state){
      if (state.id === ''){
        setRead(false)
        setData({
          title: '',
          post: {
            blocks:[],
            time:0,
            version:""
          }, // reactEditor block
          postExcerpt: '',
          // categoryId: [],
          tagId: [],
          metaDescription: '',
          owner: ''
          // jsonData: null
        })
        setTestpost({})

        // rerender 全新的前端 article blocks
        console.log("editorCore.current=",editorCore.current)
        // console.log("in useEffect, editCore.current._editorJS.configuration.readOnly=",editorCore.current._editorJS.configuration.readOnly)
        console.log("2 is owner mode=", editorCore.current._editorJS.configuration?.readOnly)
        // 時間先後順序問題，沒有這個if會噴error
        if (editorCore.current._editorJS.blocks !== undefined) {
          editorCore.current._editorJS.isReady
            .then(() => {
                console.log('Editor.js is ready to work!')
                //draftBody = json.stringify()
                // editorCore.current._editorJS.render(res.data.data.post)
                editorCore.current._editorJS.blocks.render({
                  blocks: [
                  { id: "sheNwCUP5A",
                    type: "paragraph",
                    data: {
                      text: "Type your story here...",
                      level: 2
                      }
                  }]}
                )

                /** Do anything you need after editor initialization */
            })
            .catch((reason) => {
                console.log(`Editor.js initialization failed because of ${reason}`)
            });
        }
        
        return
      }
      getArticle()
    }

  }, [state, init])
 
  


  // useRef of Editor object
  const editorCore = useRef(null)


  // ReactEditor instance object
  const handleInitialize = useCallback((instance) => {
      setInit(false)
      editorCore.current = instance
      console.log("In handleInitialize",instance)
      setInit(true)
  }, [])

  // after click bottom save button, do onSave()
  const onSave = async (response) => {
    console.log("user in editpage")
    const newpost = await editorCore.current.save();
    console.log("newpost", newpost)
    // const htmlArticle = await OutputHtml(post.blocks);
    // setArticleHTML(htmlArticle)
    setTestpost(newpost)
    
    
    // TODO: 修這邊post沒被存進去QQ 
    setData( prevData => ({
      ...prevData,
      post: {
        ...prevData.post,
        blocks: newpost.blocks },
        creator:user
    })
    );
    // debug
    console.log("data", data)
    console.log("testpost=", testpost)
    // console.log("data.post", data.post)

    // check if any content block is empty
    if (data.title.trim() === '') return alert('Title is required');
    if (data.post === '') return alert('Post is required');
    if (data.postExcerpt.trim() === '') return alert('Post excerpt is required');
    if (data.metaDescription.trim() === '') return alert('Meta description is required');
    if (!data.tagId.length) return alert('Tag is required');
    // if (!data.categoryId.length) return alert('Category is required');
    
    console.log(state)
    // TODO: communicate with backend
    if (state.id ===''){
      setIsCreating(false);
      await axios.post('/newpage', {data:data, creator:state.user, post: newpost})
        .then((res) => {
          if (res.status === 200) {
            setStatus(
              {
                type: 'success',
                msg: res.data.msg
              });
            console.log("in frontend newPage, res.data sent from backend ",res.data.newpage)
            console.log("in frontend newPage, article _id",res.data.newpage._id)
            // setId(res.data._id)

            
            console.log(res.data.newpage)
            navigate('/article/'+res.data.newpage._id, 
              {state: {
                id: res.data.newpage._id,
                user: user
              }})
              setIsCreating(true);
          
          }
        });
      }
      else {
        console.log("in frontend /editpage, data=",data)
        console.log("in frontend /editpage, newpost=", newpost)
        await axios.post('/editpage', {id:state.id, data:data, post:newpost})
        .then(async (res) => {
          if (res.status === 200) {
            setStatus(
              {
                type: 'success',
                msg: 'Article has been edited successfully!'
              });
            console.log("in frontend newPage, res.data sent from backend ",res.data)
            console.log("in frontend newPage, article _id",res.data._id)
            setData(res.data.data)
            // TODO
            // setTestpost(data.post)
            // render
            await editorCore.current.render(res.data.post)
            console.log("successfully rerender")

          }
          else if (res.status === 422) {
            for (let i in res.data.errors) {
              alert(res.data.errors[i][0]);
            }
          } else {
            setStatus(
              {
                type: 'error',
                msg: 'Save failed'
              });
            
          }
          
        })
        
      }
  }

  const onDelete = async() => {
    setDeleted(false)
    await axios.post('/deletepage', {id:state.id})
    .then((res) => {
      if (res.status == 200){
        setStatus(
          {
            type: 'success',
            msg: 'Deletion success'
          });
          setDeleted(true)
          navigate('/')
      }
      else{
        setStatus(
          {
            type: 'error',
            msg: 'Deletion failed'
          });
          setDeleted(true)
      }
    })
  }



  // const handleSave = useCallback( async () => {
  //   // console.log("editorCore: ", editorCore);
  //   // // post = 透過save()回傳的article contents {time,blocks,version}
  //   // const post = await editorCore.current.save();
  //   // // set data state
  //   // setData({
  //   //   ...data,
  //   //   post: post,//
  //   //   // jsonData: JSON.stringify(data)
  //   // });
  //   // console.log("successfully save data to state ", data);
  // }, [])


  return (
    <div className="content">
      <div className="container-fluid">

        <div className="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
          {/* Top Tool Bar -- Photo Article Account */}
          <ButtonAppBar/>

          {/* <p className="_title0">Create Article</p> */}

          {/* Title */}
          <div className="_input_field" style={{display: "flex", justifyContent: "center"}} >
            {read? <div style={{width:780, fontSize:25}}>{data.title}</div>:
            <Input  style={{width:780, fontSize:25}} type="text" value={data.title} placeholder="Title" onChange={(e) => setData({ ...data, title: e.target.value })} />}
          </div>

          {/* Editor object */}
          {console.log("identify ReactEditorJS read=",read)}
          <div className="_overflow _table_div blog_editor">  
            <ReactEditorJS
              tools={EDITOR_JS_TOOLS}
              onInitialize={handleInitialize}
              defaultValue={data.post}
              // onChange={handleSave}
              // readOnly = {true}
              
            ></ReactEditorJS>
          </div>
          {console.log("stuck above?")}

          {/* postExcerpt */}
          <div className="_input_field">
            {read? <div style={{width:780}}>{data.postExcerpt}</div>:
            <Input style={{width:780}} type="textarea" value={data.postExcerpt} rows={4} placeholder="Post excerpt " onChange={(e) => setData({ ...data, postExcerpt: e.target.value })} />}
          </div>

          
          <div className="_input_field">
            <Select mode="multiple"
                    style={{
                        width: '99.5%',
                        height: "30px"
                    }}
                    placeholder="Select Tags of this article"
                    value={data.tagId}
                    onChange={(value) => setData({ ...data, tagId: value })}
                    optionLabelProp="label"

                    // allowClear={true}
                    // open={false}

            >
              {citys.map( (option) => {
                return (
                    <Option value={option} label={option} key={option}>
                        <div className="demo-option-label-item">
                            <span role="img" aria-label={option}>
                            </span>
                            {option}
                        </div>
                    </Option>
                  )}   
              )}
              {costs.map( (option) => {
                return (
                    <Option value={option} label={option} key={option}>
                        <div className="demo-option-label-item">
                            <span role="img" aria-label={option}>
                            </span>
                            {option}
                        </div>
                    </Option>
                )}     
              )}
              {days.map( (option) => {
                return (
                    <Option value={option} label={option} key={option}>
                        <div className="demo-option-label-item">
                            <span role="img" aria-label={option}>
                            </span>
                            {option}
                        </div>
                    </Option>
                )}     
              )}

            </Select>
          </div>

          {/* metaDescription */}
          <div className="_input_field">
            {read? <div style={{width:780}} >{data.metaDescription}</div>: 
            <Input style={{width:780}} type="textarea" value={data.metaDescription} rows={4} placeholder="Meta description" onChange={(e) => setData({ ...data, metaDescription: e.target.value })} />}
            
            {/* {console.log(data)} */}
          </div>

          <div className="_input_field">

            {state.id != '' ? '': 
            <Input style={{width:780}}  value={data.owner} rows={4} placeholder="Owner(add space between users)" onChange={(e) => setData({ ...data, owner: e.target.value })} />}

          </div>

          {/* Save button */}
          <div className='buttons' >
            <div className="_input_field">
              {/* <Button onClick={handleSave} disabled={isCreating}>{isCreating ? 'Please wait...' : 'Create blog'}</Button> */}
              <Stack direction="row-reverse" spacing={2}>
                {console.log('id:', !read & state.id != '')}
                {read? '':<Button variant="outlined" onClick={onSave} startIcon={<SaveIcon />}>
                  Save
                </Button>}
                {(!read & state.id != '')? <Button variant="outlined" onClick={onDelete} startIcon={<DeleteIcon />}>
                  Delete
                </Button>:''}
              </Stack>
            </div>
            {/* <div className="_input_field">
              <Button onClick={handleSave} disabled={isCreating}>{isCreating ? 'Please wait...' : 'Create blog'}</Button>
              <Stack direction="row-reverse" spacing={1}>
                {read? '':<Button variant="outlined" onClick={onSave} startIcon={<SaveIcon />}>
                  Save
                </Button>}
              </Stack>
            </div> */}
          </div>

        </div>

      </div>
    </div>
  );
}

export default EditPage;
