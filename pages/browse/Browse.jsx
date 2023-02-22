import React from 'react';

import NavBar from 'Components/Browse/NavBar/NavBar';
import Banner from 'Components/Browse/Banner/Banner';
import MovieLists from 'Components/Browse/MovieLists/MovieLists';

function Browse() {
  // console.log('Browse');

  return (
    <div className="app">
      <NavBar />
      <Banner />
      <MovieLists />
    </div>
  );
}

export default Browse;
