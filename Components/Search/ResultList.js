import React, { useContext, useEffect, useState } from 'react';

import useHttp from 'hooks/use-http';
import AuthContext from 'store/auth-context';
import MovieDetail from 'Components/Browse/MovieLists/MovieDetail/MovieDetail';
import classes from './ResultList.module.css';

const ResultList = props => {
  // Sử dụng useContext để lấy data api
  const ctx = useContext(AuthContext);

  // Lưu value trả về sau khi fetchData
  const [resultList, setResultList] = useState([]);

  // custom url để fetchData
  const movieNameApi = props.movieName;
  const urlFetch = `${ctx.requests.fetchSearch}&query=${movieNameApi}`;
  // console.log(urlFetch);

  //--- dùng custom hooks: useHttp()
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = dataObj => {
      setResultList(dataObj.results);
    };
    fetchData(
      {
        url: urlFetch,
      },
      transformData
    );
  }, [fetchData, urlFetch]);

  // state lưu data detail film khi click
  const [movieData, setMovieData] = useState(null);

  const [isShow, setIsShow] = useState(false);
  const [isSameMovie, setIsSameMovie] = useState(null);

  // Xử lý click vào film
  const clickHandler = (dataObj, event) => {
    // console.log(dataObj.id);
    // Lưu id hiện tại để so sánh id khi click
    setIsSameMovie(dataObj.id);

    // Nếu khác id sẽ hiện detail và set  data
    if (Number(isSameMovie) !== Number(event.target.id)) {
      setIsShow(true);

      // Lấy dataObj từ img bằng bind() dưới dạng đối số set lại vào state
      setMovieData(dataObj);
    }

    // Nếu trùng id sẽ đóng modal
    if (Number(isSameMovie) === Number(event.target.id)) {
      setIsShow(prevId => !prevId);
    }
  };

  // Hàm check null src
  const searchListJSX = movie => {
    if (movie.poster_path) {
      return (
        <img
          id={movie.id}
          className="animationScaleMovie"
          src={`${ctx.urlImg}${movie.poster_path}`}
          alt={movie.title}
        />
      );
    } else {
      return (
        <div
          id={movie.id}
          className={`${classes.searchListBanner} errorBannerMovie animationScaleMovie`}
        >
          {movie.title}
        </div>
      );
    }
  };

  return (
    <div className={classes.searchList}>
      <h3>Search Result</h3>
      {isShow && movieData && <MovieDetail items={movieData} />}
      <div className={classes.resultList}>
        {resultList.map(movie => {
          return (
            <div key={movie.id} onClick={clickHandler.bind(this, movie)}>
              {searchListJSX(movie)}
            </div>
          );
        })}
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something error! ({error})</p>}
    </div>
  );
};

export default ResultList;
