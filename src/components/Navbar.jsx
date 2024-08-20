import React, { Component } from 'react'

import logo from '../Images/logo.w-removebg-preview.png'

export default class navbar extends Component {
  render() {
    return   <nav className="px-10 py-2  ">
  
    <a className="flex align-middle" href="#">
        <img src={logo} className='logo w-14 mr-2' alt="logo" />
        <span className='nav-text'>Skiy</span>
    </a>
 
   
  
</nav>
  }
}

