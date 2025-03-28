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
        <div className='header mb-5'  style={{width: '95vw'}}>
            <header>
            <ul className=' gap-4 list-unstyled justify-content-center row ' >
  <div className='col-12 d-flex gap-5 justify-content-end p-4 pt-0'>
  {!isLogin? <div className='d-flex gap-5 justify-content-center align-items-center'>
    <NavLink to={'/signup'}><li className='btn btn-dark'>Sign Up</li></NavLink>
    <NavLink to={'/login'}><li className='btn btn-dark'>Login</li></NavLink>
  </div>: <div className='d-flex gap-2'>
  <NavLink to={'/profile'}><button style={{background:'#eaf3ff', width:'75px', paddingTop:'0px', paddingBottom:'2px'}}><img style={{width:'100%'}} src='/src/assets/images/profile_logo.png'></img></button></NavLink>
  <div> 
  <NavLink to={'/login'}><li onClick={()=>{
    setIsLogin(false);
    //remove token 
    localStorage.removeItem('token');
  }}  className='btn btn-dark'>Sign out</li></NavLink>
   </div>
   
    
    
    </div>}
 


  </div>
  <Link to={'/home'}>
  <div> <img src='/src/assets/images/logo.PNG' style={{width:'60px', borderRadius:'10px', position:"absolute", top:'10px'}}></img></div></Link>
  

</ul>

            </header>
        </div>

    );
};

export default Header;