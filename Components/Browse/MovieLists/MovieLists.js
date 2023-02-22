import React, { useContext } from 'react';

import MovieList from './MovieList';
import AuthContext from 'store/auth-context';
import classes from './MovieLists.module.css';

const MovieLists = () => {
  // Sử dụng useContext để lấy data api
  const ctx = useContext(AuthContext);

  // Data theo tỷ lệ màn hình với từng loại ảnh
  // Để truyền vào <Swiper />
  const posterBreakObj = {
    640: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 7,
      spaceBetween: 10,
    },
    1400: {
      slidesPerView: 10,
      spaceBetween: 10,
    },
  };

  const backdropBreakObj = {
    640: {
      slidesPerView: 3,
      spaceBetween: 13,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 13,
    },
    992: {
      slidesPerView: 6,
      spaceBetween: 13,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 13,
    },
    1400: {
      slidesPerView: 8,
      spaceBetween: 13,
    },
  };

  return (
    <section id="movieLists">
      <div className={classes.movieLists}>
        {/* Lấy ra danh sách phim với tiêu đề tương ứng */}
        <div>
          <MovieList
            url={ctx.requests.fetchNetflixOriginals}
            isLargeRow
            breakpoints={posterBreakObj}
          />
        </div>
        <div>
          <h3>Xu hướng</h3>
          <MovieList
            url={ctx.requests.fetchTrending}
            breakpoints={backdropBreakObj}
          />
        </div>
        <div>
          <h3>Xếp hạng cao</h3>
          <MovieList
            url={ctx.requests.fetchTopRated}
            breakpoints={backdropBreakObj}
          />
        </div>
        <div>
          <h3>Hành động</h3>
          <MovieList
            url={ctx.requests.fetchActionMovies}
            breakpoints={backdropBreakObj}
          />
        </div>
        <div>
          <h3>Hài</h3>
          <MovieList
            url={ctx.requests.fetchComedyMovies}
            breakpoints={backdropBreakObj}
          />
        </div>
        <div>
          <h3>Kinh dị</h3>
          <MovieList
            url={ctx.requests.fetchHorrorMovies}
            breakpoints={backdropBreakObj}
          />
        </div>
        <div>
          <h3>Lãng mạn</h3>
          <MovieList
            url={ctx.requests.fetchRomanceMovies}
            breakpoints={backdropBreakObj}
          />
        </div>
        <div>
          <h3>Tài liệu</h3>
          <MovieList
            url={ctx.requests.fetchDocumentaries}
            breakpoints={backdropBreakObj}
          />
        </div>
      </div>
    </section>
  );
};

export default MovieLists;
