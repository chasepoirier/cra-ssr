import React from 'react'
import { NavLink } from 'react-router-dom'

import './navbar.css'

const Navbar = () => (
  <div className="navbar">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/about">About</NavLink>
  </div>
)

export default Navbar
