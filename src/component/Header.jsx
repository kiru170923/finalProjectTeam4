import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeContext } from '../App';

const Header = () => {

    const {isLogin} = useContext(ThemeContext);
    const {setIsLogin} = useContext(ThemeContext);

        //lay token de duy tri dang nhap
        useEffect(()=>{
            if(localStorage.getItem('token')){
                setIsLogin(true);
            }
        },[])


    return (
        <div className='header'  style={{width: '95vw'}}>
            <header>
            <ul className=' gap-4 list-unstyled justify-content-center row ' >
  <div className='col-12 d-flex gap-5 justify-content-end p-4 pt-0'>
  {!isLogin? <div className='d-flex gap-5 justify-content-center align-items-center'>
    <NavLink to={'/signup'}><li className='btn btn-dark'>Sign Up</li></NavLink>
    <NavLink to={'/login'}><li className='btn btn-dark'>Login</li></NavLink>
  </div>: <div className='d-flex gap-2'>
  
  <div> 
  <NavLink to={'/login'}><li onClick={()=>{
    setIsLogin(false);
    //remove token 
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }}  className='btn btn-dark'>Sign out</li></NavLink>
   </div>
   
    
    
    </div>}
 


  </div>
  <Link to={'/home'}>
  <div> <img src='/images/logo.PNG' style={{width:'90px', borderRadius:'10px', position:"absolute", top:'10px', left:'80px'}}></img></div></Link>
  

</ul>

            </header>
        </div>

    );
};

export default Header;