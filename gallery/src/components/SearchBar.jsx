import React from 'react'

const SearchBar = ({ search, onSearchChange }) => {
  return (
    <input 
    type="text"
    value={search}
    onChange={onSearchChange}
    className='border p-2 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black'
    placeholder='Enter author name'
    />
  )
}

export default React.memo(SearchBar)