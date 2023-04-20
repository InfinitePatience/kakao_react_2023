import React from 'react'
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import Tabbar from '../components/Tabbar';
import ChatsList from '../components/ChatsList';
import { FaCaretDown } from "react-icons/fa";

function Chats() {
  return (
    <>
      <Header 
      h1 ="Chats" span = {<FaCaretDown/>} a ="Edit" />
    <main><SearchBox />
    <ChatsList />
    </main>
    <div className='ChatTab'>
    <Tabbar />
    </div>
    </>
  )
}

export default Chats