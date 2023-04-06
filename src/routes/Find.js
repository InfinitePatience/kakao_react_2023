import React from 'react'
import FindList from '../components/FindList';
import Header from '../components/Header';
import Tabbar from '../components/Tabbar';

function Find() {
  return (
    <>
      <Header 
       h1 ="Find" a ="Edit"/>
    <main>
    <FindList />
    </main>
    <Tabbar />
    </>
  )
}

export default Find