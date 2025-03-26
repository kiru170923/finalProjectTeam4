import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeContext } from '../App';

const Header = () => {

    const {isLogin} = useContext(ThemeContext);
    const {setIsLogin} = useContext(ThemeContext);


    return (
        <div className='header mb-5'  style={{width: '95vw'}}>
            <header>
            <ul className=' gap-4 list-unstyled justify-content-center row ' >
  <div className='col-12 d-flex gap-5 justify-content-end p-4'>
  {!isLogin? <div className='d-flex gap-5'>
  <li  className='btn btn-dark'><NavLink to={'/signup'}>Sign Up</NavLink></li>
  <li className='btn btn-dark'><NavLink to={'/login'}>Login</NavLink></li>
  </div>: <div> <li onClick={()=>{
    setIsLogin(false);
    //remove token 
    localStorage.removeItem('token');
  }}  className='btn btn-dark'><NavLink to={'/signup'}>Sign out</NavLink></li></div>}


  </div>
  <Link to={'/home'}>
  <div> <img src='/src/assets/images/logo.PNG' style={{width:'60px', borderRadius:'10px', position:"absolute", top:'50px'}}></img></div></Link>
  

</ul>

            </header>
        </div>

    );
};

export default Header;