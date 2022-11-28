import { useEffect, useRef, useState } from 'react'
import { useChat } from './hooks/useChat'
import { Button, Input, Tag, message, Tabs } from 'antd'
import Title from '../components/Title'
import Message from '../components/Message'
import styled from 'styled-components'
import ChatModal from '../components/ChatModal'

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-fadius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`

const FootRef = styled.div`
  height: 20px;
`

const ChatRoom = () => {
  const { me, status, messages, sendMessage, clearMessages, displayStatus, startChat } = useChat()
  // const [username, setUsername] = useState('')
  const [msg, setMsg] = useState('')
  const [msgSent, setMsgSent] = useState(false);
  const [chatBoxes, setChatBoxes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState('');

  const msgRef = useRef(null)
  const msgFooter = useRef(null);
  const test = ''
  
  useEffect(() => {
    displayStatus(status)
  }, [status])

  const renderChat = (chat) => 
    (
    chat.length === 0 ? (
      <div>
      <p styles={{ color: '#ccc' }}>No messages...</p>
      <FootRef ref={msgFooter} />
      </div>
    ) : (
      <>
      {chat.map(({ name, body }, i) => (
        <Message message={body} key={i} isMe={name === me} />
      )
      )}
      <FootRef ref={msgFooter} />
      </>
      
    )
  )

  useEffect(() => {
    // console.log(messages)
    // console.log(activeKey)
    setChatBoxes(chatBoxes.map((chatbox) => {
      // console.log(chatbox.key)
      if (chatbox.key === activeKey){
        // console.log(activeKey)
        return ({
          key:activeKey, label:activeKey, children:renderChat(messages)
        })
      }
      else{
        return chatbox
      }
    })
    )
    setMsgSent(true)
    // console.log(chatBoxes)
    
  }, [messages])

  const createChatBox = (friend) => {
    if (chatBoxes.some
      (({ key }) => key === friend)) {
      throw new Error(friend +
        "'s chat box has already opened.");
    }
    // console.log(messages)
    setChatBoxes([...chatBoxes,
    {
      label: friend, children:renderChat(messages),
      key: friend
    }]);
    setMsgSent(true);
    return friend;
  };

  const removeChatBox =
    (targetKey, activeKey) => {
      const index = chatBoxes.findIndex
        (({ key }) => key === activeKey);
      const newChatBoxes = chatBoxes
        .filter(({ key }) =>
          key !== targetKey);
      setChatBoxes(newChatBoxes);
      return(
      activeKey ?
        activeKey === targetKey ?
          index === 0 ?
            '' : chatBoxes[index - 1].key
          : activeKey
        : '');
    };

  // const extractChat = (friend) => {
  //   return renderChat
  //     (messages.filter
  //       (({ name, body }) => ((name === friend) || (name === me))));
  // }

  

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView
      ({ behavior: 'smooth', block: 'start' });
  };
  useEffect(() => {
    console.log('scroll')
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent])

  // console.log(activeKey)

  return (
    <div >
      <Title name={me} />
      <div>
      <ChatBoxesWrapper
        tabBarStyle = {{height: '36px'}}
        type = 'editable-card'
        activeKey = {activeKey}
        onChange = {(key) => {
          setActiveKey(key);
          startChat(me, key);
        }}
        onEdit={(targetKey, action) => {
          if (action === 'add') setModalOpen(true);
          else if (action === 'remove') {
            setActiveKey(removeChatBox(targetKey, activeKey));
          }
        }}
        items={chatBoxes}
      />
        <ChatModal
          open={modalOpen}
          onCreate={({ name }) => {
            startChat(me, name);
            setActiveKey(createChatBox(name));
            
            setModalOpen(false);
          }}
          onCancel={() => { setModalOpen(false); }}
        />
        {/* {renderChat(messages)} */}
        {/* <FootRef ref={msgFooter} /> */}
      </div>
      {/* </ChatBoxesWrapper> */}
      {/* <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.ke === 'Enter') {
            msgRef.current.focus()
          }
        }}
        style={{ marginBottom: 10 }}
      ></Input> */}
      <Input.Search
        ref={msgRef}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg ) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
          sendMessage({ user: me, body: msg, to:activeKey })
          setMsg('')
        }}
      ></Input.Search>
    </div>
  )
}

export default ChatRoom