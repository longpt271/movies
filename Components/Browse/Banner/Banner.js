import React, { useEffect, useState, useContext } from 'react';

import AuthContext from 'store/auth-context';
import useHttp from 'hooks/use-http';
import classes from './Banner.module.css';

// lấy giá trị banner mặc định
import initialBanner from './initialBanner.json';
// console.log(initialBanner);

const Banner = () => {
  // Sử dụng useContext để lấy data api
  const ctx = useContext(AuthContext);

  // Lấy ra url cần Fetch
  const urlFetch = ctx.requests.fetchNetflixOriginals;

  // state lưu data Banner
  const [dataBanner, setDataBanner] = useState({});

  //--- dùng custom hooks: useHttp()
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = dataObj => {
      // console.log(dataObj.results);

      // Lấy radom 1 số bât kỳ theo length của data object
      const randomNumber = Math.floor(Math.random() * dataObj.results.length);
      // console.log(randomNumber);

      // Nếu backdrop_path !== "null" set data object nhận về cho Banner state
      if (dataObj.results[randomNumber].backdrop_path !== null) {
        setDataBanner(dataObj.results[randomNumber]);
        // console.log(dataObj.results[randomNumber].backdrop_path);
      } else {
        // set giá trị mặc định
        setDataBanner(initialBanner[0]);
      }
    };

    fetchData(
      {
        url: urlFetch,
      },
      transformData
    );
  }, [fetchData, urlFetch]);

  const bgPath = `${ctx.urlImg}${dataBanner.backdrop_path}`;

  return (
    <section id="banner">
      {isLoading && <p>Loading...</p>}
      {!isLoading && Object.values(dataBanner).length !== 0 && (
        <div
          className={classes.banner}
          style={{ backgroundImage: `url(${bgPath})` }}
        >
          <div className={classes.content}>
            <h3>{dataBanner.name}</h3>
            <div>
              <button>Play</button>
              <button>My List</button>
            </div>
            <p>{dataBanner.overview}</p>
          </div>
        </div>
      )}
      {error && <p>Something error! ({error})</p>}
    </section>
  );
};

export default Banner;
