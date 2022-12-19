import { useState, createContext, useContext, useEffect, memo } from "react";
import { message } from 'antd'
import { useLazyQuery, useMutation } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION } from '../../graphql/index'

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



const ChatProvider = (props) => {
    const [me, setMe] = useState('')
    const [friend, setFriend] = useState('')
    // const [messages, setMessages] = useState([])
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false)
    useEffect(() => {
        if (signedIn) {
        localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
        }, [me, signedIn]);

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
       
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION)


    const [getmessage, { data, subscribeToMore }]
        = useLazyQuery(CHATBOX_QUERY);

        // useEffect(() => {
        //     // console.log(data)
        //     setMessages(data)
        // },[data])
    
        const changeBox = async(friend) => {
            setFriend(friend)
            // console.log('getting data')
            // console.log(me, friend)
            await getmessage({variables:{
                name1:me,
                name2:friend
            }})
            // console.log(subscribeToMore)
            
            
            
            
        }
        // console.log(loading)
        // console.log(error)
        // console.log(subscribeToMore)

    useEffect(() => {
        try {
            console.log(me, friend)
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { name: me, to: friend },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    return {
                        chatbox: {
                            name1:me,
                            name2:friend,
                            messages: [...prev.chatbox.messages, newMessage],
                        },
                    };
                },
            });
        } catch (e) {console.log(e) }
    }, [subscribeToMore, friend]);
            

    return(
        < ChatContext.Provider
        value={{
            startChat, sendMessage, changeBox, data, displayStatus, status, me, setMe, setSignedIn,signedIn
        }}{...props}/>
    )

    // return (
    //     < ChatContext.Provider
    // value = {{
    //     status, me, signedIn, messages, setMe, setSignedIn,
    //         sendMessage, clearMessages, displayStatus, startChat, userInit
    // }
    // }{...props}/>
    // )
}

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat }