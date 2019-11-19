import React, { useState } from 'react'

const Search = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('')

  const handleSearchInputChanges = e => {
    setKeyword(e.target.value)
  }

  const handleSearch = e => {
    e.preventDefault();
    onSearch(keyword)
    resetInputField()
  }

  const resetInputField = () => {
    setKeyword('')
  }

  return (
    <form className="search">
      <input value={keyword} onChange={handleSearchInputChanges} type="text" />
      <button className="searchButton" onClick={handleSearch}>Search</button>
    </form>
  )
}

export default Search
