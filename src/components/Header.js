import React, { useState } from 'react'
import '../styles/Header.scss'
import { FaPlane, FaWifi, FaMoon, FaBluetooth, FaBatteryFull } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Header(props) {
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
<header>
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
    <h1>{props.h1}<span>{props.span}</span></h1>
    <div className="left_item"><Link to={"#"} style={{opacity:0.5}}>{props.a}</Link></div>
    <div className="right_item"><Link to={"#"}><i>{props.i}</i></Link></div>
  </div>
</header>
</body>
</>
    
  )
}

export default Header