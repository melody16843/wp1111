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
  const { startChat, sendMessage, changeBox, data, displayStatus, status, me } = useChat()
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
        {chat.map((e, i) => (
          <Message message={e.body} key={i} isMe={e.sender === me} />
        )
        )}
        <FootRef ref={msgFooter} />
      </>

    )
  )

  useEffect(() => {
    if (data !== undefined) {
      const friend = data.chatbox.name1 == me ? data.chatbox.name2 : data.chatbox.name1
      // console.log(chatBoxes.some
      //   (({ key }) => key === friend))
      if (chatBoxes.some
        (({ key }) => key === friend)) {

        setChatBoxes(chatBoxes.map((chatbox) => {
          // console.log(chatbox.key)
          const messages = data.chatbox.messages
          if (chatbox.key === activeKey) {
            // console.log(activeKey)
            return ({
              key: activeKey, label: activeKey, children: renderChat(messages)
            })
          }
          else {
            return chatbox
          }
        })
        )
        setMsgSent(true)
        // console.log(chatBoxes)
      }
      else {

        const messages = data.chatbox.messages
        // console.log(chatBoxes)
        // console.log(messages)
        setChatBoxes([...chatBoxes,
        {
          label: friend, children: renderChat(messages),
          key: friend
        }]);
        setMsgSent(true);
      }
    }

  }, [data])

  // const createChatBox = (friend) => {
  //   if (chatBoxes.some
  //     (({ key }) => key === friend)) {
  //     throw new Error(friend +
  //       "'s chat box has already opened.");
  //   }
  //   console.log(data)
  //   const messages = data.messages
  //   setChatBoxes([...chatBoxes,
  //   {
  //     label: friend, children: renderChat(messages),
  //     key: friend
  //   }]);
  //   setMsgSent(true);
  //   return friend;
  // };

  const removeChatBox =
    (targetKey, activeKey) => {
      const index = chatBoxes.findIndex
        (({ key }) => key === activeKey);
      const newChatBoxes = chatBoxes
        .filter(({ key }) =>
          key !== targetKey);
      setChatBoxes(newChatBoxes);
      return (
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
          tabBarStyle={{ height: '36px' }}
          type='editable-card'
          activeKey={activeKey}
          onChange={async(key) => {
            setActiveKey(key);
            await changeBox(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === 'add') setModalOpen(true);
            else if (action === 'remove') {
              const temp = removeChatBox(targetKey, activeKey)
              setActiveKey(temp);
              changeBox(temp);
            }
          }}
          items={chatBoxes}
        />
        <ChatModal
          open={modalOpen}
          onCreate={async ({ name }) => {
            await startChat({ variables: { name1: me, name2: name } });
            await changeBox(name)
            setActiveKey(name);

            setModalOpen(false);
          }}
          onCancel={() => { setModalOpen(false); }}
        />

      </div>
      <Input.Search
        ref={msgRef}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
          sendMessage({ variables:{name: me, body: msg, to:activeKey} })
          setMsg('')
        }}
      ></Input.Search>
    </div>
  )
}

export default ChatRoom