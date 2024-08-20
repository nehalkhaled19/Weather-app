import React, { Component } from 'react'
import Navbar from './components/Navbar'
import InputForm from './components/InputForm'
import Weather from './components/Weather'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
      <div className='home h-auto pb-5 md:h-lvh'>
   <Navbar/>
   <Router>
  
        <Routes>
          <Route path='/' element={<InputForm />}></Route>
          <Route path='/search/:cityName' element={<Weather />} />
        </Routes>
      </Router>
      </div>
    )
  }
}

