import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => {
    return (
        <div className='border header rounded-top mb-5'  style={{width: '95vw'}}>
            <header>
            <ul className=' gap-4 list-unstyled justify-content-center row ' >
 <div className='col-7 d-flex gap-5 justify-content-start p-4'>
 <li><NavLink to={'/home'}>Home</NavLink></li>
    <li><NavLink to={'/article'}>Articles</NavLink></li>
    <li><NavLink to={'/favorite'}>Favorites</NavLink></li>
 </div>
  <div className='col-4 d-flex gap-5 justify-content-center p-4'>
  <li><NavLink to={'/aboutus'}>About Us</NavLink></li>
  <li><NavLink to={'/signup'}>Sign Up</NavLink></li>
  <li><NavLink to={'/login'}>Login</NavLink></li>

  </div>
</ul>

            </header>
        </div>

    );
};

export default Header;