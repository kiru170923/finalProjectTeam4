import { createContext, useState } from 'react'
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
import { differenceInMinutes, format } from "date-fns"
import SearchComponent from './pages/SearchComponent';
import Taskbar from './component/Taskbar';
import BootstrapModal from './component/BootstrapModal';
import AddData from './component/AddData';
import RealTimeChat from './component/RealTimeChat';



export const ThemeContext = createContext();
function App() {

  
  const [reload,setReload] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  function getFormatTime(time){
    const date = new Date(time);
    const now = new Date();
    // const day = date.toLocaleString('vi-VN', {day:'2-digit'})
    // const hour = date.toLocaleString('vi-VN', {hour:'2-digit'})
    // const min = date.toLocaleString('vi-VN', {minute:'2-digit'})
    // const month = date.toLocaleString('vi-VN', {month:'2-digit'})
    // const houseAndMin = date.toLocaleString('vi-VN', {hour:'2-digit', minute:'2-digit'})

    let displayTime = format(time, "dd/MM/yyyy");
    if(differenceInMinutes(now, date) < 1){
      displayTime = 'Vừa xong';
    }
    else if(differenceInMinutes(now, date)< 60){
      displayTime = differenceInMinutes(now, date) + " phút"
    }

    return displayTime;
  }

  return (
    <>
      <ThemeContext.Provider value={{isLogin, setIsLogin, setReload, reload, getFormatTime} }>
    <BrowserRouter>
    <Toaster/>
    <Header/>
     <Taskbar/>
    <Routes>
      <Route path='/home' element={<Articles/>}></Route>
      <Route path='/articles/:slug' element={<ArticlesDetail/>}></Route>
      <Route path='/' element={<Articles/>}></Route>
      <Route path='/login' element = {<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/favorite' element={<Favorite/>}></Route>
      <Route path='/search' element={<SearchComponent/>}></Route>
      <Route path='/:create' element={<BootstrapModal/>}></Route>
      <Route path='/home/favorites' element={<Articles/>}></Route>
      <Route path='/data' element={<AddData/>}></Route>
      <Route path='/chat' element={<RealTimeChat/>}></Route>





      BootstrapModal
    </Routes>
    </BrowserRouter>
    </ThemeContext.Provider>
    </>
  )
}

export default App
