import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/FindList.scss';
import { FaAddressBook, FaQrcode, FaMobileAlt, FaRegEnvelope  } from "react-icons/fa";

function FindList() {
  return (
<>
    <ul class="find_method">
  <li><Link to={"#"}><i><FaAddressBook /></i>Find</Link></li>
  <li><Link to={"#"}><i><FaQrcode /></i>QR code</Link></li>
  <li><Link to={"#"}><i><FaMobileAlt /></i>Shake</Link></li>
  <li><Link to={"#"}><i><FaRegEnvelope /></i>Invite via SMS</Link></li>
  </ul>
  <section class="recommend_section">
    <header><h2>Recommended Friends</h2></header>
    <ul>
    <li>You have no recommended friends.</li>
    </ul>
  </section>
</>
  )
}

export default FindList