import React, { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';

import useHttp from 'hooks/use-http';
import AuthContext from 'store/auth-context';
import classes from './MovieDetail.module.css';

const MovieDetail = props => {
  // Sử dụng useContext để lấy data api
  const ctx = useContext(AuthContext);

  // Tạo url để fetch video youtube
  const urlFetch = `${ctx.urlApi}/movie/${props.items.id}/videos?api_key=${ctx.API_KEY}`;
  // console.log(urlFetch);

  const { isLoading, error, sendRequest: fetchData } = useHttp();
  useEffect(() => {
    const transformData = dataObj => {
      // console.log(dataObj.results);

      // Tìm link Trailer youtube
      const foundTrailerYt = dataObj.results.find(
        item => item.site === 'YouTube' && item.type === 'Trailer'
      );
      // console.log(foundTrailerYt);
      if (Object.keys(foundTrailerYt).length !== 0) {
        // Nếu có link Trailer youtube set lại data
        setDataYoutube(foundTrailerYt);
      } else {
        // NẾu không có link Trailer youtube -> Tìm link Teaser
        const foundTeaserYt = dataObj.results.find(
          item => item.site === 'YouTube' && item.type === 'Teaser'
        );
        // Nếu có link Teaser youtube set lại data
        setDataYoutube(foundTeaserYt);
      }
    };

    fetchData(
      {
        url: urlFetch,
      },
      transformData
    );
  }, [fetchData, urlFetch]);

  // Thuộc tính của tag Youtube
  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  // console.log(props.items);
  // Hàm check null src
  const srcImgMovieDetail = () => {
    if (props.items.backdrop_path) {
      return (
        <img src={`${ctx.urlImg}${props.items.backdrop_path}`} alt={error} />
      );
    } else {
      return <p>No trailer, teaser or banner in the API</p>;
    }
  };

  // Tạo state data link youtube
  const [dataYoutube, setDataYoutube] = useState(false);

  const contentYoutube = (
    <div className={classes.youtube}>
      {isLoading && <p>Loading...</p>}
      {/* Hiển thị img nếu fetch video lỗi */}
      {error && srcImgMovieDetail()}
      {/* Hiển thị Youtube nếu fetch video thành công */}
      {!isLoading && !error && (
        <YouTube videoId={dataYoutube.key} opts={opts} />
      )}
    </div>
  );

  return (
    <div className={classes.movieDetail}>
      <div className={classes.content}>
        <h3>{props.items.title || props.items.name}</h3>
        <h5>
          Release Date: {props.items.first_air_date || props.items.release_date}
        </h5>
        <h5>Vote: {props.items.vote_average} / 10</h5>
        <p>{props.items.overview}</p>
      </div>
      {contentYoutube}
    </div>
  );
};

export default MovieDetail;
