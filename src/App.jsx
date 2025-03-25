import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header'
import ArticlesDetail from './pages/ArticlesDetail'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Login from './pages/Login'


function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/article' element={<ArticlesDetail/>} ></Route>
      <Route path='/login' element = {<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>


      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
