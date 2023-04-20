import React, { useEffect, useRef, useState } from 'react'
import '../styles/ChattingList.scss';
import { FaAngleLeft, FaBars, FaBatteryFull, FaBluetooth, FaMicrophone, FaMoon, FaPlane, FaPlus, FaSearch, FaWifi } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, storage } from '../fbase';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, uploadString, ref } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Kakao from './Kakao';

function ChattingList(props) {
  console.log("dddd",props)
  const {
    id,name,image,back,userObj
  } = props;
  // const location = useLocation();
  // const name = location.state.name;
  // const image = location.state.image
  // const id = location.state.id;
 
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

  const [friends, setFriends] = useState('');
  const [friendstalk, setFriendsTalk] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => { // useEffect에다 직접 함수를 기재하지 않고 호출만 한다.
    // getTweets();
    const q = query(collection(db,`friendstalk${id}`),
                 orderBy("createdAt","asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => { // 문서 하나하나 가져와서 
        newArray.push({...doc.data(), id:doc.id});  // (10 -> 9 -> 8 -> 7 -> 6 -> 5 -> ...)
        console.log(newArray)
      });
      setFriendsTalk(newArray);
    });
    
  },[]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let attachmentUrl = "";
      if(attachment !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`); // 경로 지정. uuidv4는 설치한 uuid 통해 자동생성되는 uid. [userObj.uid 폴더/uuidv4() 문서] 로 경로를 만들어서 보냄.
        const response = await uploadString(storageRef, attachment, 'data_url'); // attachment를 storage에 저장
        console.log('response->', response);
        attachmentUrl = await getDownloadURL(ref(storage, response.ref)); //response.ref 는 https 주소가 됨.
      }
      const docRef = await addDoc(collection(db, `friendstalk${id}`), {
        text:friends,
        createdAt: Date.now(),
        creatorId: userObj.uid, // 문서를 누가 작성해는지 알아내기 위함. userObj는 로그인한 사용자 정보.
        attachmentUrl
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setFriends("");
    setAttachment("");
  }

  const onChange = e => {
    e.preventDefault();
    const {target: {value}} = e;
    setFriends(value);
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

  const scrollBottom = useRef(null) ;
  useEffect(() => {
    scrollBottom.current.scrollIntoView({behavior:'smooth'});
  },[friendstalk])
  
  return (
  <>
<header className="chatting_header">
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
    <h1>{name}</h1>
    <div className="left_item"><Link to={"/Chats"}><i><FaAngleLeft /></i></Link></div>
    <div className="right_item"><Link to={"#"}><i><FaSearch /></i>&emsp;<i><FaBars /></i></Link></div>
  </div>
</header>


<main className="chatting1">
  <span className="date_info">Thursday, March 23, 2023</span>

  {/* <div className="chat_box my">
    <span className="chat">Hello.</span>
    <span className="chat">Hello! This is a test message.<br />Hello!</span>
    <span className="chat">Hello! This is a test message.</span>
    <span className="chat_time"><span>17</span>:<span>33</span></span>
  </div> */}

  <div className="chat_box other">
    <div className="other_info">
      <Link to={`/Profile/${id}`}><span className="profile_img empty" style={{background:`url(${image})`, backgroundSize:'40px 40px'}}></span></Link>
    </div>
      <span className="profile_name">{name}</span>
      <span className="chat">And this is an answer</span>
      <span className="chat">And this is an answer And this is answer</span>
      <span className="chat">And this is an answer</span>
      <span className="chat">And this is an answer</span>
      <span className="chat">And this is an answer</span>
      <span className="chat">And this is an answer</span>
      <span className="chat">And this is an answer</span>
      <span className="chat">And this is an answer</span>
      <span className="chat">And this is an answer</span>
      <span className="chat">And this is an answer And this is answer</span>
      <span className="chat">And this is an answer And this is answer</span>
      <span className="chat">And this is an answer And this is answer</span>
      <span className="chat">And this is an answer</span>
      <span className="chat_time"><span>17</span>:<span>33</span></span>
  </div>


  <div className="chat_box mytalk">
  {friendstalk.map(talktalk => (
          <Kakao key={talktalk.id} talkObj={talktalk} isOwner={talktalk.creatorId === userObj.uid}/> 
        ))}
    {/* <span className="chat chat_my">{friends}</span>
    <span className="chat_time"><span>17</span>:<span>33</span></span> */}
  </div>
  <div ref={scrollBottom}></div>
</main>

<footer>
  <div>
  <label className="plus_btn">
  <FontAwesomeIcon icon="fa-solid fa-plus" />
  <input type='file' onChange={onFilechange} style={{display:`none`}}/>
  </label>
  </div>
  <form onSubmit={onSubmit}>
  <fieldset className="text_box">
  <legend className="blind">채팅 입력창</legend>
    <label for="chatting" className="blind">채팅 입력</label>
    <input type="text" id="chatting" className="text_field" value={friends} onChange={onChange}/>
    <input type="submit" className="emoticon_btn" value={'전송'} onChange={onChange}/>
    <span className="voice_btn"><Link to={"#"}><i><FaMicrophone /></i></Link></span>



    {attachment && (
      <div className='chatting_attach'>
        <img src={attachment} width="70" height="60" alt="" />
        <button onClick={onclearAttachment} className='chatting_button'>Remove</button>  
        </div>
      )}
  </fieldset>
  </form>
</footer>
</>
  )
}

export default ChattingList
