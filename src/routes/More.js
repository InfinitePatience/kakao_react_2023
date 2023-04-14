import React from 'react'
import Header from '../components/Header';
import Tabbar from '../components/Tabbar';
import MoreList from '../components/MoreList';
import { FaCog } from "react-icons/fa";

function More(props) {
  return (
    <>
      <Header 
       h1 ="More" i ={<FaCog/>} />
    <main>
    <MoreList props={props}/>
    </main>
    <Tabbar />
    </>
  )
}

export default More