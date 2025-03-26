import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header'
import ArticlesDetail from './pages/ArticlesDetail'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Articles from './pages/Articles'
import Favorite from './pages/Favorite'
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <>
    <BrowserRouter>
    <Toaster/>
    <Header/>
    <Routes>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/article' element={<Articles/>} ></Route>
      <Route path='/login' element = {<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/favorite' element={<Favorite/>}></Route>



      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
