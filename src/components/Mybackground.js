import { ref } from 'firebase/database';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db, storage } from '../fbase';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, uploadString } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/Mybackground.scss"

function Mybackground({userObj}) {

  const [attachment, setAttachment] = useState("");
  const [newimg, setNewImg] = useState("");
  const [back, setBack] = useState("");

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
      setNewImg(newArray);
    });
  },[]);

  const onBackSubmit = async (e) => {
    e.preventDefault();
      let attachmentUrl = "";
      if(attachment !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`); //경로 생성.  ${uuidv4()} - 아이디를 자동생성해주는 모듈.   경로 지정. uuidv4는 설치한 uuid 통해 자동생성되는 uid. [userObj.uid 폴더/uuidv4() 문서] 로 경로를 만들어서 보냄.
        const response = await uploadString(storageRef, attachment, 'data_url'); // attachment를 storage에 저장
        console.log('response->', response);
        attachmentUrl = await getDownloadURL(ref(storage, response.ref)); //response.ref 는 https 주소가 됨. https 주소를 가져옴.
      }
      const docRef = await addDoc(collection(db, "tweets"), {
        text: back,
        createdAt: Date.now(),
        creatorId: userObj.uid,  // 문서를 누가 작성했는지 알아내기 위함. userObj는 로그인한 사용자 정보.
        attachmentUrl
      });
    setAttachment("");
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
  
  return (
    <form onSubmit={onBackSubmit}>
    <div className="mybackimage" style={{backgroundImage:`url(${newimg})`, backgroundSize:'cover', border:'1px solid blue'}}>
    <label htmlFor='mybackfile' className='my_prof_edit'><FontAwesomeIcon icon="fa-solid fa-camera" style={{fontSize:'20px'}} /></label>
    <input type='file' accept='image/*' onChange={onFilechange} id='mybackfile' style={{opacity:0}}/>
    </div>

    {attachment && (
    <div className="attach-new">
    <img src={attachment} alt='' className='attach-new-image' />
    <div className='attach-select'>
    <input type='submit' className='attach-submit selector' />
    <button onClick={onclearAttachment} className='attach-cancel selector'>취소</button>
    </div>
    </div>
    )};
    </form>
  )
}

export default Mybackground