import React from 'react'

export default function Navbar(props) {
  return (
    <nav className="navbar mt-3">
      <div className="container-fluid">
        <a className="navbar-brand text-light h1 fs-2" href='/'>{props.heading}</a>
        <form className="d-flex" role="search" onSubmit={(e) => {
          e.preventDefault();
          props.setSearchValue(document.querySelector("#movieSearchBox").value);
        }} >
          <input className="form-control me-2" id="movieSearchBox" type="search" placeholder="Type to Search..." aria-label="Search" />
          <button className="btn btn-outline-primary" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}
