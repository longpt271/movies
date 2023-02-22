import React from 'react';

// Tạo biến với định dạng tương ứng
const AuthContext = React.createContext({
  urlApi: '',
  API_KEY: '',
  urlImg: '',
  requests: {},
});

export const AuthContextProvider = props => {
  // data API
  const API_KEY = 'f74d3d656abc1dd446015a8f03da3e7c'; // Token API
  const urlApiData = 'https://api.themoviedb.org/3';
  const requestsData = {
    fetchNetflixOriginals: `${urlApiData}/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTrending: `${urlApiData}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRated: `${urlApiData}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `${urlApiData}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${urlApiData}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${urlApiData}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${urlApiData}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${urlApiData}/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSearch: `${urlApiData}/search/movie?api_key=${API_KEY}&language=en-US`,
  };
  const urlImgData = 'https://image.tmdb.org/t/p/original';

  return (
    <AuthContext.Provider
      // Value trả về khi ở child dùng useContext()
      value={{
        API_KEY: API_KEY,
        urlApi: urlApiData,
        requests: requestsData,
        urlImg: urlImgData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
