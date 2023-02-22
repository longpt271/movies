import React, { useState } from 'react';

import SearchIcon from 'store/SearchIcon.svg';
import classes from './SearchForm.module.css';

const SearchForm = props => {
  const [enteredSearch, setEnteredSearch] = useState('');

  // Lưu giá trị nhập từ input vào state
  const searchInputChangeHandler = event => {
    setEnteredSearch(event.target.value);
  };

  // Xử lý nhấn Search btn
  const formSubmitHandler = event => {
    event.preventDefault();

    // Truyền value lên parent search.js
    props.onSearchMovie(enteredSearch);
    // console.log(enteredSearch);
    setEnteredSearch('');
  };

  // Xử lý ấn Enter
  const keyDownHandler = event => {
    // console.log(event.key);
    // Cho phép ấn dấu cách (ko ngăn sk .preventDefault())
    if (event.key !== ' ' && !/^[a-zA-Z0-9]+$/.test(event.key)) {
      event.preventDefault();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      props.onSearchMovie(enteredSearch);
      setEnteredSearch('');
    }
  };

  // Xử lý nút reset input
  const resetInput = () => {
    setEnteredSearch('');
  };

  return (
    <div className={classes.searchForm}>
      <form
        onSubmit={formSubmitHandler}
        onKeyDown={keyDownHandler}
        className={classes.searchFormWrap}
      >
        <div className={classes.inputWrap}>
          <input
            type="text"
            placeholder="..."
            onChange={searchInputChangeHandler}
            value={enteredSearch}
          />
          <div className={classes.imgSearchIcon}>
            <img src={SearchIcon} alt="Search Icon" />
          </div>
        </div>

        <div className={classes.btnWrap}>
          <button onClick={resetInput} className={classes.btnReset}>
            RESET
          </button>
          <button className={classes.btnSearch}>SEARCH</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
