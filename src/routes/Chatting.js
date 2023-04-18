import React from 'react'
import ChattingList from '../components/ChattingList';
import Header from '../components/Header';

function Chatting({userObj}) {
  return (
    <>
      <Header />
      <ChattingList userObj={userObj}/>
    </>
  )
}

export default Chatting