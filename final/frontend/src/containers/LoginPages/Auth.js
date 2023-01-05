import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from '../../api';
import { useLogin } from '../hook/useLogin';

const Auth = () => {
  const { setLogin, setEmail, setSession_id, setStatus } = useLogin();
  const [searchParams] = useSearchParams();
  const cookie = new Cookies();
  useEffect(() => {
    const token = searchParams.get("token");

    axios.post('/auth',
      {
        token,
      }).then((response) => {
        cookie.set("sessionToken", response.data);
        if (response.data.status_code === 200) {
          setEmail(response.data.user.emails[0].email);
          setSession_id(response.data.session.session_id);
          setLogin(true);
          setStatus({ type: 'success', msg: 'You are now logged in!' })
          console.log(response.data);
        } else {
          console.log(response.data);
        }
      });
  });


  return (
    <>
      <Navigate to="/" replace />

    </>
  );
}

export default Auth;