import { useState, createContext, useContext, useEffect } from "react";
import { message } from 'antd'

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    sendMessage: () => { },
    clearMessages: () => { },

});

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "ws://" + window.location.host +'4000'
    : 'ws://localhost:4000';

const client = new WebSocket('ws://localhost:4000')
client.onopen = () => console.log('backend socket server connected')

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false)
    const [init, setInit] = useState(false)

    // const client = new WebSocket('ws://localhost:4000')
    // client.onopen = () => console.log('backend socket server connected')

    // console.log(signedIn)

    useEffect(() => {
        if (signedIn) {
        localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
        }, [me, signedIn]);

    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
        // console.log('send success')


    };

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "init": {
                if (!init) {
                    setMessages(payload);
                    setInit(true);
                }
                break;
            }
            case "output": {
                console.log(payload)
                setMessages(prev => [...prev, payload])
            }
            case "status": {
                setStatus(payload)
                break
            }
            case "cleared": {
                setMessages([]);
                break;
            }
            case "chat" : {
                const msgs = payload.map((e) => {return {name:e.sender.name, body:e.body}})
                setMessages(() => msgs);
                break
            }
            default: break;
        }
    }
    const clearMessages = () => {
        sendData({task:'clear'});
    }
    const sendMessage = (payload) => {
        const {user, body, to} = payload
        // console.log(user, to, body)
        if(!user || !to || !body){
            throw new Error('name or to or body required')
        }
        else{
            sendData({
                task:'message',
                payload:{user, to, body}
            })
        }
    }
    const displayStatus = (s) => {
        
        if (s.msg) {
          const { type, msg } = s;
          const content = {
            content: msg, duration: 0.5
          }
          switch (type) {
            case 'message success':
              message.success(content)
              break
            case 'chat success':
                message.success(content)
                break
            case 'error':
            default:
              message.error(content)
              break
          }
        }
      }
    
    const startChat = (name, to) =>{
        if(!name || !to){
            throw new Error('name or to required')
        }
        else{
            sendData({
                task:'chat',
                payload:{name, to}
            })
        }
    }
    const userInit = (name) => {
        if(! name){
            throw new Error('name required')
        }
        else{
            sendData({
                task:'init',
                payload:{name}
            })
        }
    }

    return (
        < ChatContext.Provider
    value = {{
        status, me, signedIn, messages, setMe, setSignedIn,
            sendMessage, clearMessages, displayStatus, startChat, userInit
    }
    }{...props}/>
    )
}

const useChat = () => useContext(ChatContext);

export{ChatProvider, useChat}