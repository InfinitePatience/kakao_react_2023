import React from 'react'
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import MainSection from '../components/MainSection';
import Tabbar from '../components/Tabbar';
import { FaCog } from "react-icons/fa";

function Friends({userObj}) {
  console.log("userObj ->", userObj)
  return (
    <>
    <Header 
    h1 ="Friends" span =" 1" a ="Manage" i = {<FaCog/>} />
    <main><SearchBox />
    <MainSection userObj={userObj}/>
    </main>
    <Tabbar />
    </>
  )
}

export default Friends