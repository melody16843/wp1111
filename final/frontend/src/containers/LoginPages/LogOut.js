import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
// import Cookies from "universal-cookie";
import axios from '../../api';
import { useLogin } from '../hook/useLogin';

const LogOut = () => {
    const { setLogin, setEmail, setSession_id, session_id, setStatus } = useLogin();
    //  const [searchParams] = useSearchParams();
    //  const cookie = new Cookies();
    useEffect(() => {
        axios.post('/logout',
            {
                session_id,
            }).then((response) => {
                console.log(response);
                if (response.data.status_code === 200) {
                    setEmail('');
                    setSession_id('');
                    setStatus({ type: 'info', msg: 'You are now logged out.' });
                    setLogin(false);
                } else {
                    console.log(response.data);
                    alert(response.data);
                }
            }).catch((err) => {
                console.log(err)
            });
    }, []);

    return (
        <>
            <Navigate to="/" replace />

        </>
    );
}

export default LogOut;