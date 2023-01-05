import { Menu, Layout } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useLogin } from '../containers/hook/useLogin';
import { useEdit } from '../containers/hook/useEdit';
import { useSearch } from '../containers/hook/useSearch';
import axios from '../api';
import MyImage from '../banner.svg';
import bannerCol from '../banner-col.svg';

const { Sider } = Layout;

const NaviBar = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [article, setArticle] = useState([]);
  const [favorite, setFavorite] = useState([])
  const [selectedItem, setSelectedItem] = useState([])
  const { login, email, setUser, user } = useLogin();
  const { isCreating, id, deleted } = useEdit();
  const { isAddFavorite, setInFavorite } = useSearch()
  useEffect(() => {
    setUser(email.split('@')[0]);

  }, [email])

  const navigate = useNavigate();
  const { state } = useLocation()
  const fetch_data = async () => {
    console.log('find ', user)
    await axios.post('/getuser', {
      user
    })
      .then((res) => {
        // console.log(res.data.page)
        // console.log(res.data.favorite)
        // console.log(res.data)
        // console.log(res.data)
        setArticle(res.data.page) //check return format
        setFavorite(res.data.favorite) //check return format
        const infav = res.data.favorite.map((e) => { return e.id })
        // console.log(infav)
        setInFavorite(infav)
        console.log(res.data.page[res.data.page.length - 1].id)
        // if (res != undefined){
        // console.log(res.data.page[res.darta.page.length-1].id)
        // setSelectedItem(['1'])
        // }
      });


  }
  console.log(selectedItem)
  useEffect(() => {
    //get user information
    // console.log(login)
    // setIsCreating(true)
    console.log(isCreating)
    fetch_data()
    console.log('now user page', article)
    console.log('now user favorite', favorite)



  }, [login, user, isCreating, isAddFavorite, deleted])

  function getItem(label, key, children) {
    return {
      key,
      children,
      label,
    };
  }
  const items_unlogin = [
    getItem('Search', '1'),
    getItem('Login', '2')

  ]
  const items_login = [
    getItem('Search', '1'),
    getItem('articles', 'sub1', //fetch data from database
      article.map((e) => {
        return getItem(e.name, e.id)
      })

    ),
    getItem('new articles', '2'),
    getItem('favorite', 'sub2', favorite.map((e) => {
      return getItem(e.name, e.id)
    })), //fetch data from database
    getItem('Logout', '3')

  ];
  const OnclickUnlogin = (item) => {

    if (item.key == '2') {
      navigate('/login')

    }
    else {
      navigate('/')
    }
  }

  const OnclickLogin = (item) => {
    console.log(item)
    if (item.key == '1') {
      navigate('/', {
        state: {
          select: '1'
        }
      })
    }

    else if (item.key == '3') {
      //logout
      navigate('/logout')
    }
    else if (item.key == '2') {
      navigate('/newArticle', {
        state: {
          select: '2',
          id: '',
          user: user
        }
      })
    }
    else {
      navigate('/article/' + item.key,
        {
          state: {
            select: item.key,
            id: item.key,
            user: user
          }
        }
      )
    }

  }





  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div style={{ padding: '0.7em' }}>
      {(collapsed) ? <img src={bannerCol} alt="banner" height="240"/>:
      <>
      	<img src={MyImage} alt="banner" height="70" />
          <div style={{ padding: '1em' }}>
            <p style={{ color: 'white' }}>
              {login? 'Welcome '+user+'!':'Welcome!'}
            </p>
          </div>
          </>}
      </div>
      {login? <Menu theme="dark" mode="inline" items={items_login} onClick={OnclickLogin} defaultSelectedKeys={['1']} />:
              <Menu theme="dark" mode="inline" items={items_unlogin} onClick={OnclickUnlogin} defaultSelectedKeys={['1']} />}
        
    </Sider>
  )
}

export default NaviBar
