import './App.css'
import { Button, Input, Tag, message } from 'antd'
import styled from 'styled-components'
import {useChat} from './hooks/useChat.js'
import { useEffect, useRef, useState } from 'react'
import ChatRoom from './ChatRoom'
import SignedIn from './SignedIn'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`



const App = () => {
  const { me, status, signedIn, displayStatus } = useChat()

  // useEffect(() => {
  // displayStatus(status)}, [status])
  // console.log(me)
  return (
  <Wrapper> {signedIn? <ChatRoom />: <SignedIn me = {me}/>} </Wrapper>
  // <Wrapper> <SignedIn me = {me}/> </Wrapper>
  // <SignedIn/>
  )
}




export default App
