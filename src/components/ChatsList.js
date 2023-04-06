import React from 'react'
import { FaComment } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../styles/ChatsList.scss';
import profile from '../data/Profile.json';

function ChatsList() {
  return (
<>
    <section className="main_section">
    <header><h2>Friends</h2></header>
    <ul>
      {profile.map((prof, index)=> 
<li key={index}>
 <Link to={"/Chatting"} state={{name:prof.name, image:prof.images, comment:prof.comment}}> 
   <span className="chats_img empty" style={{background:`url(${prof.images})`, backgroundSize: '50px 50px'}}></span>
   <span className="chats_cont">
     <span className="chats_name">{prof.name}</span>
     <span className="chats_latest">{prof.comment}</span>
   </span>
   <span className="chats_time"><span>17</span>:<span>33</span></span>
 </Link>
</li>
)}
    </ul>
    </section>

  <div className="chat_fa_btn">
    <Link to="/#">
    <i><FaComment /></i>
    </Link>
  </div>
</>
  )
}

export default ChatsList