import React, { useEffect, useState, useContext } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';

import useHttp from 'hooks/use-http';
import AuthContext from 'store/auth-context';
import MovieDetail from './MovieDetail/MovieDetail';
import classes from './MovieList.module.css';

const MovieList = props => {
  const ctx = useContext(AuthContext);

  // state lưu data MovieList
  const [dataMovieList, setDataMovieList] = useState([]);

  // state lưu data detail film khi click
  const [movieData, setMovieData] = useState(null);

  const [isShow, setIsShow] = useState(false);
  const [isSameMovie, setIsSameMovie] = useState(null);

  //--- dùng custom hooks: useHttp()
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = dataObj => {
      // Hàm check null src
      let dataPathNotNull = dataObj.results.filter(
        movie => movie.backdrop_path !== null
      );
      // console.log(dataPathNotNull);

      // set data object nhận về cho MovieList state
      setDataMovieList(dataPathNotNull);
    };

    fetchData(
      {
        url: props.url,
      },
      transformData
    );
  }, [fetchData, props.url]);

  // Xử lý click vào film
  const clickHandler = (dataObj, event) => {
    // console.log(dataObj.id);
    // Lưu id hiện tại để so sánh id khi click
    setIsSameMovie(dataObj.id);

    // Nếu khác id sẽ hiện modal và set  data
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

  const isPosterPath = `${props.isLargeRow ? 'poster_path' : 'backdrop_path'}`;

  return (
    <div className={classes.movieList}>
      {!isLoading && !error && (
        <Swiper
          // Tùy chỉnh số slide và margin mặc định
          slidesPerView={1}
          spaceBetween={10}
          // Tùy chỉnh theo tỷ lệ màn hình
          breakpoints={props.breakpoints}
          className={classes.mySwiper}
        >
          {dataMovieList.map(movie => {
            // console.log(movie);
            return (
              <SwiperSlide
                key={movie.id}
                onClick={clickHandler.bind(this, movie)}
              >
                <img
                  id={movie.id}
                  className={`animationScaleMovie ${
                    props.isLargeRow ? classes.imgPoster : ''
                  }`}
                  src={`${ctx.urlImg}${movie[isPosterPath]}`}
                  alt={movie.title}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Something error! ({error})</p>}

      {isShow && movieData && <MovieDetail items={movieData} />}
    </div>
  );
};

export default MovieList;
