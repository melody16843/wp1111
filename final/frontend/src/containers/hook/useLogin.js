import { useState, createContext, useContext } from "react";
import { message } from 'antd';

const LoginContext = createContext(
    {
        login: false,
        email: '',
        user: '',
        session_id: '',
        status: {},
    }
);

const LoginProvider = (props) => {
    const [login, setLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [session_id, setSession_id] = useState('');
    const [status, setStatus] = useState({});

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = {
                content: msg, duration: 5
            }
            switch (type) {
                case 'info':
                    message.info(content);
                    break;
                case 'success':
                    message.success(content)
                    break
                case 'error':
                default:
                    message.error(content)
                    break
            }
        }
    }
    return (
        <LoginContext.Provider
            value={{
                login, setLogin,
                email, setEmail,
                user, setUser,
                session_id, setSession_id,
                status, setStatus,
                displayStatus
            }}
            {...props}
        />
    );
}

const useLogin = () => useContext(LoginContext);
export { LoginProvider, useLogin }; 