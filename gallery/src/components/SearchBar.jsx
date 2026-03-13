import React from 'react'

const SearchBar = ({ search, onSearchChange }) => {
  return (
    <input 
    type="text"
    placeholder='Search author...'
    value={search}
    onChange={onSearchChange}
    className='border rounded-lg px-3 py-2'
    />
  )
}

export default React.memo(SearchBar)