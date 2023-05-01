import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/MoreList.scss';
import { FaRegSmile,FaHandshake,FaDemocrat,FaPaintRoller, FaPaintBrush, FaRegHandPeace, FaRegUserCircle, FaComments, FaInfoCircle, FaUtensils, FaHome, FaTv, FaPencilAlt, FaGraduationCap, FaLandmark, FaWonSign, FaVideo, FaUser, FaComment, FaSearch, FaEllipsisH, FaDoorOpen } from "react-icons/fa";
import { authService } from '../fbase';

function MoreList({props}) {
  console.log('props->',props)
  const {
    userObj : {
      displayName, email, photoURL
    }
  } = props;
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut(); // signOut(); 메소드를 사용하면 로그아웃 시킬 수 있다. 로컬 스토리지도 비워짐.
    navigate('/'); // 첫화면으로 이동 즉 리다이렉트 기능이다. ES6(최신) 버전에서만 사용 가능.
  }

  return (
<>
    <section className="user_info">
      <h2 className="blind">사용자 정보</h2>
      <span className="profile_img empty" style={photoURL ? {background:`url(${photoURL})`, backgroundSize:'cover'}:null}></span>
      <span className="profile_info">
        <span className="profile_name">{displayName}</span>
        <span className="profile_email">{email}</span>
      </span>
      <span className="chat_img"><Link to={"/Chats"}><i><FaComments /></i></Link></span>
      <span className="Log_Out" onClick={onLogOutClick}><i><FaDoorOpen /></i></span>
    </section>

    <section className="user_menu">
      <h2 className="blind">사용자 메뉴</h2>
      <ul>
      <li><Link to={"#"}><i><FaDemocrat /></i>Emoticons</Link></li>  
      <li><Link to={"#"}><i><FaPaintRoller /></i>Themes</Link></li>  
      <li><Link to={"#"}><i><FaHandshake /></i>Plus Friends</Link></li>  
      <li><Link to={"#"}><i><FaRegUserCircle /></i>Account</Link></li>  
      </ul>
    </section>

    <section className="plus_friends">
      <header>
        <h2>Plus Friends</h2>
        <span><i><FaInfoCircle /></i> Learn More</span>
      </header>
      <ul className="plus_list">
      <li><Link to={"/#"}><i><FaUtensils /></i></Link>Order</li>
      <li><Link to={"/#"}><i><FaHome /></i></Link>TV Channel/Radio</li>
      <li><Link to={"/#"}><i><FaTv /></i></Link>Education</li>
      <li><Link to={"/#"}><i><FaPencilAlt /></i></Link>Finance</li>
      <li><Link to={"/#"}><i><FaGraduationCap /></i></Link>Store</li>
      <li><Link to={"/#"}><i><FaLandmark /></i></Link>Creation</li>
      <li><Link to={"/#"}><i><FaWonSign /></i></Link>Politics/Society</li>
      <li><Link to={"/#"}><i><FaVideo /></i></Link>Movies/Music</li>
      </ul>
    </section>

    <section className="more_app">
      <h2 className="blind">앱 더보기</h2>
      <ul>
      <li><Link to={"#"}><span className="app_icon"></span>Story</Link></li>
      <li><Link to={"#"}><span className="app_icon"></span>Path</Link></li>
      <li><Link to={"#"}><span className="app_icon"></span>friends</Link></li>
      </ul>
    </section>

    <nav className="tab_bar">
  <ul>
    <li><Link to={"/"}><i><FaUser /></i>Friends</Link></li>
    <li><Link to={"/Chats"}><i><FaComment /></i>Chats</Link></li>
    <li><Link to={"/Find"}><i><FaSearch /></i>Find</Link></li>
    <li><Link to={"/More"}><i><FaEllipsisH /></i>More</Link></li>
  </ul>
</nav>
</>
  )
}

export default MoreList