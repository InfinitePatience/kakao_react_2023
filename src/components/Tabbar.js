import React from 'react'
import '../styles/Tabbar.scss';
import { FaUser,FaUserFriends, FaCommentAlt, FaSearch, FaThLarge } from "react-icons/fa";
import { Link } from 'react-router-dom';


function Tabbar(props) {
  return (
<>
<nav className="tab_bar">
  <ul>
    <li><Link to={"/"}><i><FaUserFriends /></i>Friends</Link></li>
    <li><Link to={"/Chats"}><i><FaCommentAlt /></i>Chats</Link></li>
    <li><Link to={"/Find"}><i><FaSearch /></i>Find</Link></li>
    <li><Link to={"/More"}><i><FaThLarge /></i>More</Link></li>
  </ul>
</nav>
</>
  )
}

export default Tabbar