import React, { useState } from 'react'
import '../styles/ProfileList.scss';
import { Link, useLocation } from 'react-router-dom';
import { FaBatteryFull, FaBluetooth, FaCog, FaComment, FaMoon, FaPencilAlt, FaPlane, FaTimes, FaWifi, } from "react-icons/fa";

function ProfileList() {
  const location = useLocation();
  const name = location.state.name;
  const image = location.state.image;
  const comment = location.state.comment;
  const back = location.state.back;

  const [timer, setTimer] = useState("00:00");
  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    // const seconds = String(date.getSeconds()).padStart(2, "0");
    setTimer(`${hours}:${minutes}`)
  }

  const startTimer = () => {
    setInterval(currentTimer, 1000)
  }

  startTimer()
  return (
<>
<body>
<header className="header1">
  <div className="status_bar">
    <div className="left_item">
      <i><FaPlane /></i>
      <i><FaWifi /></i>
    </div>
    <div className="center_item">
      <span>{timer}</span>
    </div>
    <div className="right_item">
      <i><FaMoon /></i>
      <i><FaBluetooth /></i>
      <span><span>100</span>%</span>
      <i><FaBatteryFull /></i>
    </div>
  </div>

  <div className="title_bar">
    <h1>profile</h1>
    <div className="left_item"><Link to={"/"}><i><FaTimes /></i></Link></div>
    <div className="right_item"><Link to={"#"}><i><FaCog /></i></Link></div>
  </div>
</header>

<main className='main1' style={{background:`url(${back})`, backgroundSize:'cover', backgroundPosition:'50% 50%'}}>
  <section className="background">
    <h2 className="blind">My profile background image</h2>
  </section>
  <section className="Kprofile">
    <h2 className="blind">My profile info</h2>
    <div className="Kprofile_img empty" style={{background:`url(${image})`, backgroundSize:'cover'}}></div>
    <div className="Kprofile_cont">
      <span className="Kprofile_name">{name}</span>
      <input type="mail" className="Kprofile_email" placeholder="UserID@gmail.com" />
      <ul className="Kprofile_menu">
      <li>
        <Link to={"#"}>
          <span className="icon">
            <i><FaComment/></i>
          </span>
          My Chatroom
        </Link>
      </li>
      <li><Link to={"#"}><span className="icon"><i><FaPencilAlt /></i></span>Edit Profile</Link></li>
      </ul>
    </div>
  </section>
</main>
</body>
</>
  )
}

export default ProfileList