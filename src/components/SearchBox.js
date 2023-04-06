import React from 'react'
import '../styles/SearchBox.scss'
import { FaSearch } from "react-icons/fa";


function SearchBox() {
  return (
<>
    <form className="search_box">
    <fieldset className="search_inner">
      <legend className="blind">검색창</legend>
      <i><FaSearch /></i>
      <input type="search" name="search" id="search" placeholder="Find firends, chats, Plus Friends" />
    </fieldset>
  </form>
</>
  )
}

export default SearchBox
