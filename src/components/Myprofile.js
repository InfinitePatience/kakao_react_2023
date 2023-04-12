import React, { useEffect, useState } from 'react'
import { db, storage } from '../fbase';
import { getDownloadURL, uploadString, ref } from 'firebase/storage';
import { addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { FaBatteryFull, FaBluetooth, FaCog, FaComment, FaMoon, FaPencilAlt, FaPlane, FaTimes, FaWifi, } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/Myprofile.scss"
import Mybackground from './Mybackground';

function Myprofile({userObj}) {
  console.log("아아아아->",userObj)
  // 시간
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
  // //시간

  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState(userObj.attachment);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newPhotoUrl, setNewPhotoUrl] = useState(userObj.photoURL);

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
      setTweets(newArray);
    });
  },[]);

  
  const onNameSubmit = async (e) => {
    e.preventDefault();
    if(userObj.displayName !== newDisplayName){
      await updateProfile(userObj,{
        displayName:newDisplayName,
        // photoURL: ,
      });
    }
  }


  const onImgSubmit = async (e) => {
    e.preventDefault();
    try {
      let newPhotoUrl = "";
      if(attachment !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`); //경로 생성.  ${uuidv4()} - 아이디를 자동생성해주는 모듈.   경로 지정. uuidv4는 설치한 uuid 통해 자동생성되는 uid. [userObj.uid 폴더/uuidv4() 문서] 로 경로를 만들어서 보냄.
        const response = await uploadString(storageRef, attachment, 'data_url'); // attachment를 storage에 저장
        console.log('response->', response);
        newPhotoUrl = await getDownloadURL(ref(storage, response.ref)); //response.ref 는 https 주소가 됨. https 주소를 가져옴.
        await updateProfile(userObj,{
          photoURL: newPhotoUrl,
        });
      }

      const docRef = await addDoc(collection(db, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,  // 문서를 누가 작성했는지 알아내기 위함. userObj는 로그인한 사용자 정보.
        newPhotoUrl
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTweet("");
    setAttachment("");
  }


  const onChange = (e) => {
    const {target: {value}} = e;
    setNewDisplayName(value);
    setTweet(value);
  }

  const onFilechange = (e) => {
    console.log("e->",e)
    const {target: {files}} = e;
    
    const theFile = files[0];
    console.log('theFile->', theFile); // 사진 파일 이미지 주소
    
    const reader = new FileReader(); // FileReader - 웹 브라우저에서 제공하는 API 함수. 선택한 파일을 브라우저에서 미리 보여주기 위함. (필수)
    reader.onloadend = (finishedEvent) => {// onloadend -- 브라우저 로딩이 완료된 후 이벤트
      console.log('finishedEvent->',finishedEvent);
      const {currentTarget: {result}} = finishedEvent; // result는 Data URL임. [data:img~~]
      setAttachment(result);
    }
    reader.readAsDataURL(theFile); // 첨부한 file이 DATA URL 주소로 바뀌도록 만들어 줌. 결과는 currentTarget: result에 나옴. [data:img~~]
  }

  const onclearAttachment = () => {
    setAttachment(""); // 사진이 안 보이게 하려면 Data URL을 지우면 된다. 따라서 attachment를 공백으로 만들면 안 보이게 됨.
  }


  // const toggleEditing = () => setEditing((prev) => !prev);

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

  
<main className='main1' /*style={{background:`url(${back})`, backgroundSize:'cover', backgroundPosition:'50% 50%'}}*/>
    
  <section className="background">
    <h2 className="blind">My profile background image</h2>
  </section>
  <section className="Kprofile">
    <h2 className="blind">My profile info</h2>
    <form onSubmit={onImgSubmit}>
    <div className="Kprofile_img empty" style={{backgroundImage:`url(${userObj.photoURL})`, backgroundSize:'cover'/* border:'1px solid blue'*/}}>
    <label htmlFor='attach-file' className='my_prof_edit'><FontAwesomeIcon icon="fa-solid fa-camera" style={{fontSize:'20px'}} /></label>
    <input type='file' accept='image/*' onChange={onFilechange} id='attach-file' style={{opacity:0}}/>
    </div>

    {attachment && (
    <>
    <div className="attach-new">
    <img src={attachment} alt='' className='attach-new-image' />
    <div className='attach-select'>
    <button onClick={onclearAttachment} className='attach-cancel selector'>취소</button>
    <input type='submit' className='attach-submit selector' />
    </div>
    </div>
    </>
    )}
    {/* {attachment && ( 
      <section className="myprofile_img" style={{backgroundImage: `url("${userObj.photoURL}")`}}>
      <input type='submit' value="Edit" />
      <button onClick={onclearAttachment}>취소</button>
      <h2 className="blind">Profile background image</h2>
      </section>
    )} */}
    </form>


    <div className="Kprofile_cont">
      <form onSubmit={onNameSubmit}>
      <input type="text" onChange={onChange} value={newDisplayName} placeholder='이름' className="Kprofile_name" />
      </form>
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
          <li><Link to={"#"}><span className="icon" ><i><FaPencilAlt /></i></span>Edit Profile</Link></li>
      </ul>
    </div>
  </section>
</main>
</body>
</>

  )
}

export default Myprofile