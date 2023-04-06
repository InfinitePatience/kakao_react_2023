import React from 'react'
import Header from '../components/Header';
import Tabbar from '../components/Tabbar';
import MoreList from '../components/MoreList';
import { FaCog } from "react-icons/fa";

function More() {
  return (
    <>
      <Header 
       h1 ="More" i ={<FaCog/>} />
    <main>
    <MoreList />
    </main>
    <Tabbar />
    </>
  )
}

export default More