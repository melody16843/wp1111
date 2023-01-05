import { Checkbox, Input, Dropdown, Space, Card, Col, Row } from 'antd'
// import {DownOutlined} from 'icons'
import React, { useState } from 'react';
import styled from 'styled-components'
import './searchPage.css'
import axios from '../api'
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from './hook/useLogin';
import { useSearch } from './hook/useSearch';
import { SearchOutlined } from '@ant-design/icons';
import {Button} from 'antd';
import {FileSearchOutlined} from '@ant-design/icons'
// import FileOpenIcon from '@mui/icons-material/FileOpen';
// import IconButton from '@mui/material/IconButton';

const PageWrapper = styled.div`
display: flex;
  flex-direction: column;
//   align-items: center;
`

function SearchPage() {
    const {login, user} = useLogin()
    const {setIsAddFavorite, inFavorite} = useSearch()
    const [filter, setFilter] = useState({north:[], east:[], middle:[], south:[], price:[], days:[]})
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState('')
    const onChange1 = (checkedValues) => {
        //setfilter
        setFilter({...filter, north:checkedValues})
    };
    const onChange2 = (checkedValues) => {
        //setfilter
        setFilter({...filter, east:checkedValues})
    };
    const onChange3 = (checkedValues) => {
        //setfilter
        setFilter({...filter, middle:checkedValues})
    };
    const onChange4 = (checkedValues) => {
        //setfilter
        setFilter({...filter, south:checkedValues})
    };
    const onChange5 = (checkedValues) => {
        //setfilter
        setFilter({...filter, price:checkedValues})
    };
    const onChange6 = (checkedValues) => {
        //setfilter
        setFilter({...filter, days:checkedValues})
    };
    const plainOptions_north = ['台北', '新北', '宜蘭', '新竹', '桃園'];
    const plainOptions_east = ['花蓮', '台東']
    const plainOptions_middle = ['雲林', '彰化', '南投', '台中', '苗栗']
    const plainOptions_south = ['屏東', '高雄', '台南', '嘉義']
    const plainOptions_price = ['$5000','$5000-$10000','$10000-$15000','$15000-$20000','$20000-$30000','$30000-$40000','$40000+']
    const plainOptions_days = ['一日遊', '兩天一夜', '其他']

    const filters = (
        <div className='filter'>
            <div>地區</div>
            <Checkbox.Group options={plainOptions_north} onChange={onChange1} />
            <Checkbox.Group options={plainOptions_east} onChange={onChange2} /> 
            <Checkbox.Group options={plainOptions_middle} onChange={onChange3} />
            <Checkbox.Group options={plainOptions_south} onChange={onChange4} />
            <div>價格</div>
            <Checkbox.Group options={plainOptions_price} onChange={onChange5} />
            <div>天數</div>
            <Checkbox.Group options={plainOptions_days} onChange={onChange6} />
        </div>
    )
    const search = async() =>{
        //call backend
        await axios.post('/search', {
            searchInput,
            filter
          })
          .then((res) => {
            // console.log(res.data.data)
            console.log(res.data.data)
            const result = res.data.data == [] ? '':res.data.data.map((e) => {return {name:e.name, id:e._id, description:e.data.metaDescription}})
            setSearchResult(result)
          })
          
          
    }
    const navigate = useNavigate();
    const findPage = (id) => {
        console.log('find paget test')
        // console.log(e.target)
        if (id){
            navigate('/article/'+id, {
                state: {
                user:'',
                id:id
                }
            })
        }
    }
    const setfavorite = async(e) => {
        const id = e.target.id.slice(3)

        setIsAddFavorite(false)
        await axios.post('/favorite', {id, user, checked:e.target.checked})
        .then((res) => {
            setIsAddFavorite(true)
        })
    }

    
    return (
        <PageWrapper>

            <div className='title'>Where to go?</div>
            <div className='search bar' style={{'display':'flex', 'flexDirection':'row', 'padding':'10px'}}>
                <Input className='input' placeholder="Basic usage" value={searchInput} onChange={(e) =>{setSearchInput(e.target.value)}}/>
                {/* <button className='search' onClick = {search}>search</button> */}
                <div className='space' style={{'width':'10px'}}></div>
                <Button className='search' type="primary" onClick = {search}  icon={<SearchOutlined />} />
            </div>
            <div  >
                {filters}
            </div>
            <div className='result'>
                <div className="site-card-wrapper" style={{'display':'flex', 'flexDirection':'column', 'padding':'10px'}}>
                    {searchResult == [] ? '':searchResult.map((e) => {
                        // console.log(inFavorite.indexOf(e.id) != -1 )
                        return (
                        <Card title={e.name} bordered={true} extra = {<div style={{'display':'flex', 'flexDirection':'row'}}>
                        {/* <button id={e.id} onClick={findPage}>view</button> */}
                        <Button id={e.id}  onClick={()=> findPage(e.id)} color="primary" >
                            {/* <FileOpenIcon  style={{'zIndex':'0'}} /> */}
                            <FileSearchOutlined/>
                        </Button>
                        <div className='space' style={{'width':'10px'}}></div>
                        {login? <Checkbox id={'fav'+e.id} onChange={setfavorite} defaultChecked={inFavorite.indexOf(e.id) != -1 }>like</Checkbox>:''}
                        
                        </div>} >
                            {e.description}
                        </Card>
                        )})}
                    
                </div>
            </div>
        </PageWrapper>

    )
}


export { SearchPage };