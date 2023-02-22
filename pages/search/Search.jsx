import React, { useState } from 'react';

import NavBar from 'Components/Browse/NavBar/NavBar';
import SearchForm from 'Components/Search/SearchForm';
import ResultList from 'Components/Search/ResultList';
import classes from './Search.module.css';

const Search = () => {
  const [movieName, setMovieName] = useState('');
  // lấy value từ child searchForm.js
  const addSearchHandler = searchData => {
    setMovieName(searchData);
  };
  return (
    <div className={`app ${classes.search}`}>
      <NavBar />
      <SearchForm onSearchMovie={addSearchHandler} />
      {movieName !== '' && <ResultList movieName={movieName} />}
    </div>
  );
};

export default Search;
