import React, { useState, useEffect } from 'react';

import SearchIcon from 'store/SearchIcon.svg';
import classes from './NavBar.module.css';

const NavBar = () => {
  // Xử lý click
  const logoHandler = function () {
    window.location.href = '/';
  };

  const searchHandler = function () {
    window.location.href = '/search';
  };

  // Xử lý cuộn xuống quá 100px
  const [isScroll, setIsScroll] = useState(false);

  const controlScroll = () => {
    if (window.scrollY > 100) {
      // console.log('FIXED NAVBAR (down)');
      setIsScroll(true);
    } else {
      // console.log('TRANSPARENT NAVBAR (up)');
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', controlScroll);
  }, []);

  // CSS cho nav scroll
  const navClasses = `${classes.navbar} ${
    isScroll ? classes.fadeIn : classes.fadeOut
  }`;

  return (
    <nav id="nav">
      <div className={navClasses}>
        <h3 onClick={logoHandler}>Movie App</h3>
        <img src={SearchIcon} alt="Search Icon" onClick={searchHandler} />
      </div>
    </nav>
  );
};

export default NavBar;
