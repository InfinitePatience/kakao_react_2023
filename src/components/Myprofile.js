import React, { useEffect, useState } from 'react'
import { db, storage } from '../fbase';
import { getDownloadURL, uploadString, ref, deleteObject, getStorage } from 'firebase/storage';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { FaBatteryFull, FaBluetooth, FaCog, FaComment, FaMoon, FaPencilAlt, FaPlane, FaTimes, FaWifi, } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/Myprofile.scss"

function MyProfile({userObj}) {
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
  const [talk, setTalk] = useState("");
  const [newBgImg, setNewBgImg] = useState("");
  const [editing, setEditing] = useState(false);
  const [bgAttachment, setBgAttachment] = useState("");

  const [attachment, setAttachment] = useState(userObj.attachment);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newPhotoUrl, setNewPhotoUrl] = useState(userObj.photoURL);

  useEffect(() => { // useEffect에다 직접 함수를 기재하지 않고 호출만 한다.
    // getTweets();
    const q = query(collection(db,"backimg"),
                 orderBy("createdAt","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => { // 문서 하나하나 가져와서 
        newArray.push({...doc.data(), id:doc.id});  // (10 -> 9 -> 8 -> 7 -> 6 -> 5 -> ...)
        console.log(newArray)
      });
      if (newArray && newArray.length > 0 && newArray[0].attachmentUrl) {
        setNewBgImg(newArray[0].attachmentUrl);
      }
      setTweets(newArray);
    });
  },[newBgImg]);

  useEffect(() => { // useEffect에다 직접 함수를 기재하지 않고 호출만 한다.
    // getTweets();
    const q = query(collection(db,"mypProfileimg"),
                 orderBy("createdAt","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => { // 문서 하나하나 가져와서 
        newArray.push({...doc.data(), id:doc.id});  // (10 -> 9 -> 8 -> 7 -> 6 -> 5 -> ...)
        console.log(newArray)
      });
      if (newArray && newArray.length > 0 && newArray[0].newPhotoUrl) {
        setNewPhotoUrl(newArray[0].newPhotoUrl);
      }
      setTweets(newArray);
    });
  },[newPhotoUrl]);
  
  
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
        const storageRef = ref(storage, `${userObj.uid}/myprofileimg`); //경로 생성.  ${uuidv4()} - 아이디를 자동생성해주는 모듈.   경로 지정. uuidv4는 설치한 uuid 통해 자동생성되는 uid. [userObj.uid 폴더/uuidv4() 문서] 로 경로를 만들어서 보냄.
        const response = await uploadString(storageRef, attachment, 'data_url'); // attachment를 storage에 저장
        console.log('response->', response);
        newPhotoUrl = await getDownloadURL(ref(storage, response.ref)); //response.ref 는 https 주소가 됨. https 주소를 가져옴.
        await updateProfile(userObj,{
          photoURL: newPhotoUrl,
        });
      }

      const docRef = await addDoc(collection(db, "mypProfileimg"), {
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
    setNewDisplayName(value)
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


  const onBgSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
      if(bgAttachment !== ""){
        const storageRef = ref(storage, `${userObj.uid}/test`); 
        const response = await uploadString(storageRef, bgAttachment, 'data_url'); 
        attachmentUrl = await getDownloadURL(ref(storage, response.ref)); 
      }
      const docRef = await addDoc(collection(db, "backimg"), {
        text: talk,
        createdAt: Date.now(),
        creatorId: userObj.uid,  // 문서를 누가 작성했는지 알아내기 위함. userObj는 로그인한 사용자 정보.
        attachmentUrl
      });
    setBgAttachment("");
  }

  const onBackChange = (e) => {
    const {target: {files}} = e;
    const theFile = files[0];
    const reader = new FileReader(); 
    reader.onloadend = (finishedEvent) => {
      const {currentTarget: {result}} = finishedEvent 
      setBgAttachment(result);
    }
    reader.readAsDataURL(theFile); 
  }

  const onClearBackImg = () => {
    setBgAttachment("");
  }

  const toggleEditing = () => {setEditing((prev) => !prev);
    onclearAttachment();
    onClearBackImg();
  }

const onDeleteClick = async() => {
const storage = getStorage();

// Create a reference to the file to delete
const desertRef = ref(storage, `${userObj.uid}/test`);

// Delete the file
await deleteObject(desertRef).then(() => {}).catch((error) => {});
setNewBgImg("");
}

const onDeleteProfile = async() => {
  const storage = getStorage();
  
  // Create a reference to the file to delete
  const desertRef = ref(storage, `${userObj.uid}/myprofileimg`);
  
  // Delete the file
  await deleteObject(desertRef).then(() => {}).catch((error) => {});
  await updateProfile(userObj,{
    photoURL:''
  });
  setEditing((prev) => !prev);
  setNewPhotoUrl("");
  }
    
  return (
    <>
<body>
<header className="myheader">
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

<main className='mymain' style={newBgImg ? {backgroundImage: `url("${newBgImg}")` , backgroundSize:'cover', backgroundPosition:'50% 50%'}:null}>
    <form onSubmit={onBgSubmit}>
    <section className='mymain'>
      {editing && (
        <>
          <label htmlFor='bg-attach' className='mybackscissors'><FontAwesomeIcon icon="fa-solid fa-scissors"/></label>
          <input type='file' accept='image/*' onChange={onBackChange} id='bg-attach' style={{opacity:0}}/>
          <button onClick={onDeleteClick} className='mybacktrash'><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
        </>
      )}
    </section>
    {bgAttachment && (
      <section className="mymain mybackimg" style={{backgroundImage: `url("${bgAttachment}")`}}>
        <input type='submit' className='attach-back-img submit' value="확인" />
        <button onClick={onClearBackImg} className='attach-back-img cancel'>취소</button>
      </section>
    )}
    </form>

  <section className="background">
    <h2 className="blind">My profile background image</h2>
  </section>
  <section className="myprofile">
    <h2 className="blind">My profile info</h2>
    <form onSubmit={onImgSubmit}>
    <div className="myprofile_img empty" style={newPhotoUrl ? {backgroundImage:`url(${newPhotoUrl})`, backgroundSize:'cover'/*, border:'1px solid blue'*/}:null}>
    {editing && (
    <>
    <label htmlFor='attach-file' className='myprofile-scissors'><FontAwesomeIcon icon="fa-solid fa-scissors" /* style={{fontSize:'20px'}} */ /></label>
    <input type='file' accept='image/*' onChange={onFilechange} id='attach-file' style={{opacity:0}}/>
    <button onClick={onDeleteProfile} className='myprofile-trash'><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
    </>
    )}
    </div>

    {attachment && (
    <>
    <div className="attach-new">
    <img src={attachment} alt='' className='attach-new-image' />
    <div className='attach-select'>
    <button onClick={onclearAttachment} className='attach-cancel selector'>취소</button>
    <input type='submit' className='attach-submit selector' value='확인' />
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


    <div className="myprofile_cont">
      <form onSubmit={onNameSubmit}>
      <input type="text" onChange={onChange} value={newDisplayName} placeholder='이름' className="myprofile_name" />
      </form>
      <input type="mail" className="myprofile_email" placeholder="UserID@gmail.com"/>
      <ul className="myprofile_menu">
      <li>
        <Link to={"#"}>
          <span className="icon">
            <i><FaComment/></i>
          </span>
          <p>My Chatroom</p>
        </Link>
      </li>
          <li><Link to={"#"} onClick={toggleEditing}><span className="icon" ><i><FaPencilAlt /></i></span><p>Edit Profile</p></Link></li>
      </ul>
    </div>
  </section>
</main>
</body>
</>

  )
}

export default MyProfile