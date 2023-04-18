import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/MoreList.scss';
import { FaRegSmile, FaPaintBrush, FaRegHandPeace, FaRegUserCircle, FaRegComment, FaInfoCircle, FaUtensils, FaHome, FaTv, FaPencilAlt, FaGraduationCap, FaLandmark, FaWonSign, FaVideo, FaUser, FaComment, FaSearch, FaEllipsisH } from "react-icons/fa";

function MoreList({props}) {
  console.log('props->',props)
  const {
    userObj : {
      displayName, email, photoURL
    }
  } = props;

  return (
<>
    <section className="user_info">
      <h2 className="blind">사용자 정보</h2>
      <span className="profile_img empty" style={{background:`url(${photoURL})`, backgroundSize:'cover'}}></span>
      <span className="profile_info">
        <span className="profile_name">{displayName}</span>
        <span className="profile_email">{email}</span>
      </span>
      <span className="chat_img"><Link to={"/Chats"}><i><FaRegComment /></i></Link></span>
    </section>

    <section className="user_menu">
      <h2 className="blind">사용자 메뉴</h2>
      <ul>
      <li><Link to={"#"}><i><FaRegSmile /></i>Emoticons</Link></li>  
      <li><Link to={"#"}><i><FaPaintBrush /></i>Themes</Link></li>  
      <li><Link to={"#"}><i><FaRegHandPeace /></i>Plus Friends</Link></li>  
      <li><Link to={"#"}><i><FaRegUserCircle /></i>Account</Link></li>  
      </ul>
    </section>

    <section className="plus_friends">
      <header>
        <h2>Plus Friends</h2>
        <span><i><FaInfoCircle /></i>Learn More</span>
      </header>
      <ul className="plus_list">
      <li><Link to={"/#"}><i><FaUtensils /></i></Link>Order</li>
      <li><Link to={"/#"}><i><FaHome /></i></Link>Store</li>
      <li><Link to={"/#"}><i><FaTv /></i></Link>Store</li>
      <li><Link to={"/#"}><i><FaPencilAlt /></i></Link>Store</li>
      <li><Link to={"/#"}><i><FaGraduationCap /></i></Link>Store</li>
      <li><Link to={"/#"}><i><FaLandmark /></i></Link>Store</li>
      <li><Link to={"/#"}><i><FaWonSign /></i></Link>Store</li>
      <li><Link to={"/#"}><i><FaVideo /></i></Link>Store</li>
      </ul>
    </section>

    <section className="more_app">
      <h2 className="blind">앱 더보기</h2>
      <ul>
      <li><Link to={"#"}><span className="app_icon"></span>Kakao Story</Link></li>
      <li><Link to={"#"}><span className="app_icon"></span>Path</Link></li>
      <li><Link to={"#"}><span className="app_icon"></span>Kakao friends</Link></li>
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