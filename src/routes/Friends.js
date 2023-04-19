import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import MainSection from '../components/MainSection';
import Tabbar from '../components/Tabbar';
import { FaCog } from "react-icons/fa";
import MyProfile from '../components/Myprofile';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../fbase';

function Friends({userObj}) {
  console.log("userObj ->", userObj)
  const [backimg, setBackimg] = useState([]);

  useEffect(() => { // useEffect에다 직접 함수를 기재하지 않고 호출만 한다.
    // getTweets();
    const q = query(collection(db,"tweets"),
                 orderBy("createdAt","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => { // 문서 하나하나 가져와서 
        newArray.push({...doc.data(), id:doc.id});  // (10 -> 9 -> 8 -> 7 -> 6 -> 5 -> ...)
        console.log(newArray)
      });
      setBackimg(newArray);
    });
    
  },[]);
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