import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => (
  <div className="navbar">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/about">About</NavLink>
    <NavLink to="/blog">Blog</NavLink>
  </div>
)

export default Navbar
