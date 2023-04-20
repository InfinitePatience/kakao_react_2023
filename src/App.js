import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Friends from './routes/Friends';
import Chats from './routes/Chats';
import Find from './routes/Find';
import More from './routes/More';
import Auth from './routes/Auth';
import { authService } from './fbase';
import { onAuthStateChanged } from 'firebase/auth';
import Myprofile from './components/Myprofile';
import ProfileList from './components/ProfileList';
import profile from './data/Profile.json';
// import Tabbar from './components/Tabbar';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import ChattingList from './components/ChattingList';
library.add(fas, faTwitter, faGoogle, faGithub );

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  console.log('authService.currentUser ->',authService.currentUser) // currnetUser 현재 로그인한 사람 확인하는 함수 null(false)

  const [userObj, setUserObj] = useState(null);

  useEffect(() => { // 컴포넌트가 렌더링 될 때 딱 한번 실행되는 함수 ( [] <- 이곳에 아무것도 없을경우 ) componentDidMount 시점
    onAuthStateChanged(authService, (user) => {// 로그인한 사용자의 정보를 가져오는 함수
      console.log('user->',user);
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);

      } else {
        setIsLoggedIn(false);
      }
    });
  },[]); 
  return (
  <>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggedIn ? (
          <>
        <Route path='/' element={<Friends userObj={userObj}/>} />
        <Route path='/Chats' element={<Chats />}  />
        <Route path='/Find' element={<Find />} />
        <Route path='/More' element={<More userObj={userObj}/>} />
        {profile.map((prof) => (
          <Route 
            key={prof.id}
            path={`/Profile/${prof.id}`} 
            element={<ProfileList userObj={userObj}
            id={prof.id} name={prof.name} image={prof.images} back={prof.back} />}
          />
        ))}

        {profile.map((prof) => (
        <Route 
          key={prof.id}
          path={`/Chatting/${prof.id}`} 
          element={<ChattingList userObj={userObj}
          id={prof.id} name={prof.name} image={prof.images} back={prof.back} />} 
          
          />
        ))}
        <Route path='/Myprofile' element={<Myprofile userObj={userObj}/>} />
          </>
        ) : ( 
          <Route path='/' element={<Auth />} /> // false면 Auth 화면 나옴
        )}
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
