import React from 'react'

function SearchBar() {
  return (
    <div>
      <input
        /* onChange={ handleChange } */
        type="text"
        name="search"
        /* value={ data } */
        placeholder="Write here..."
        id="search" />
      <button /* onClick={ ()=>onSearch(data) } */>Search</button>
    </div>
  )
}

export default SearchBar