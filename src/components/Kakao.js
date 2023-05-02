import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../fbase';
import { deleteObject,ref } from 'firebase/storage';
import ChattingList from './ChattingList';
import "../styles/kakao.scss";
import moment from 'moment/moment';
import { useLocation } from 'react-router-dom';

function Kakao(props) {
  console.log("props->", props);
  const {talkObj:
    {
      createdAt,creatorId,text,id,attachmentUrl
    }, 
    isOwner} = props; //객체로 들어온 props를 구조분해할당으로 가져옴. const {} = props; / {속성: {}} 안에 추가로 내용을 나누어서 내보낼 수 있음
  const [editing, setEditing] = useState(false);
  const [newTalk, setNewTalk] = useState(text);
  const [nowDate, setNowDate] = useState(createdAt);
  const location = useLocation();
  // const chatId = location.state.id;
  console.log("sdsd",location)

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok){
      const data = await deleteDoc(doc(db, `friendstalk${props.chatId}`, `/${id}`)); // 폴더 안에 있는 id에 해당되는 문서를 삭제하기 위함. 폴더/문서 구조이기 때문에 앞에 /를 붙인다. 연필 아이콘 눌러보면 그렇게 나옴.
      if(attachmentUrl !== ""){
        const desertRef = ref(storage, attachmentUrl);
        await deleteObject(desertRef);
      }
    }
  }
  console.log(onDeleteClick)
  
  const toggleEditing = () => setEditing((prev) => !prev); //토글 기능

  const onChange = (e) => {
    const {target:{value}} = e;
    setNewTalk(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTweetRef = doc(db, `friendstalk${props.chatId}`, `/${id}`);

    await updateDoc(newTweetRef, {
      text: newTalk,
      createdAt: Date.now()
    });
    setEditing(false);
  }

  useEffect(() => {  // 내용 입력 시간 기록 남게끔.
    let timeStamp = createdAt;
    const now = new Date(timeStamp);
    const nows = moment(now).format('LT');
    setNowDate(nows);  //.toUTCString() .toDateString()
  }, [])

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className='container tweetEdit'>
            <input type='text' onChange={onChange} value={newTalk} required className='formInput'/>
            <input type='submit' value='Update Tweet' className='formBtn'/>
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
        </>
      ) : (
        <div className='ddd'>
          {text && (
            <span className='chatcolor chat_my'>{text}</span>
          )}
          {attachmentUrl && (// 이렇게 설정하면 이미지 없이 내용만 넣어도 엑박이 안 뜸
          <img src={attachmentUrl} width="50" height="50" alt='' />
          )}
          <span className='my_chat_time'><span>{nowDate}</span></span>
          {isOwner && (// true일 경우에만 아래 내용들이 보이게 된다.
           <>
           <button onClick={onDeleteClick} className='chatting_delete'><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
           </>
          )}
        </div>
      )}
    </div>
  )
}


export default Kakao

