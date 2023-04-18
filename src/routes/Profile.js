import React from 'react'
import ProfileList from '../components/ProfileList';

function Profile({userObj}) {
  return (
  <>
    <ProfileList userObj={userObj}/>
  </>
  )
}

export default Profile