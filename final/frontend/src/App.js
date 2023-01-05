
import './App.css';
import { SearchPage } from './containers/searchPage';
import React from 'react';
import { useState, useEffect } from 'react';
import { Layout, Menu, theme } from 'antd';
import NaviBar from './components/navibar'
import LogIn from './containers/LoginPages/LogIn';
import Auth from './containers/LoginPages/Auth';
import LogOut from './containers/LoginPages/LogOut';
import EditPage from './containers/editPage';
import Account from './containers/Account';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLogin } from './containers/hook/useLogin';


const { Header, Content, Footer, Sider } = Layout;


function App() {

  const [collapsed, setCollapsed] = useState(false);
  const { status, displayStatus } = useLogin();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    displayStatus(status)
  }, [status]);

  return (
    <Router>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <NaviBar />
        <Layout className="site-layout">
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Routes>

              <Route path="/login" element={<LogIn />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/" element={<SearchPage />} />
              <Route path="/article/:id" element={<EditPage />} />
              <Route path="/newArticle" element={<EditPage />} />
              <Route path="/account/:id" element={<Account />} />
            </Routes>

          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
