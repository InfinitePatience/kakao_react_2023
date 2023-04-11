import React from 'react'
import '../styles/MainSection.scss';
import { Link } from 'react-router-dom';
import Profile from '../data/Profile.json';
// import My from '../data/My.json';

function MainSection({userObj}) {
  console.log('나다->',userObj)
  return (
<>
<section className="main_section">
  <header><h2>My Profile</h2></header>
  <ul>
    <li>
     <Link to={"/Myprofile"} /*state={{id:myprof.id, name:myprof.name, image:myprof.images, comment:myprof.comment, back:myprof.back}}*/>
      <span className="profile_img empty" style={{background:`url(${userObj.photoURL})`, backgroundSize:'50px 50px'}}></span>
      <span className="profile_name">{userObj.displayName}</span>
      <span className="profile_messages">{/*myprof.comment*/}챠챠챠</span>
     </Link>
    </li>

    <li>
     <Link to={"#"}>
      <span className="profile_img empty"></span>
      <span className="profile_name">Friends' Names Display</span>
     </Link>
    </li>
  </ul>
</section>
<section className="main_section">
  <header><h2>Friends</h2></header>
  <ul>
    {Profile.map((prof, index) => 
    <li key={index}>
      <Link to={"/profile"} state={{id:prof.id, name:prof.name, image:prof.images, comment:prof.comment, back:prof.back}}>
      <span className="profile_img empty" style={{background:`url(${prof.images})`, backgroundSize: '50px 50px'}} ></span>
      <span className="profile_name">{prof.name}</span>
      <span className="profile_messages">{prof.comment}</span>
      </Link>
      </li>
        )}
  </ul>
</section>
</>
  )
}

export default MainSection

{/* <img src={prof.images} alt={prof.name} /> */}