import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoginProvider } from './containers/hook/useLogin';
import { EditProvider } from './containers/hook/useEdit';
import { SearchProvider } from './containers/hook/useSearch';
// import EditPage from './containers/editPage'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <EditPageNew/>
  // <React.StrictMode>
  <SearchProvider>
  <EditProvider>
    <LoginProvider>

      <App />
    </LoginProvider>
    </EditProvider>
  </SearchProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
