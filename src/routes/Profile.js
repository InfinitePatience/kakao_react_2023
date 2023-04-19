import React from 'react'
import ProfileList from '../components/ProfileList';
import profile from '../data/Profile.json';

function Profile({userObj}) {
  return (
  <>
      <ProfileList userObj={userObj}/>
  </>
  )
}

export default Profile