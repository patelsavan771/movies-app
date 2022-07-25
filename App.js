import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MoviesList from './components/MoviesList';
import Navbar from './components/Navbar';
import RemoveFav from './components/RemoveFav';
import AddFav from './components/AddFav';

function App() {
  const [movies, setMovies] = useState([]);
  const [fav, setFav] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieReq = async (searchValue) => {
    // console.log("inside getMovieReq");
    setMovies([]);
    const url = `http://www.omdbapi.com/?apikey=5ce05853&s=${searchValue}`;
    const response = await fetch(url);
    const parsedData = await response.json();
    if (parsedData.Search) {
      await setMovies(parsedData.Search);
      // console.log(movies);
    }
  }

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favs', JSON.stringify(items));
  };

  useEffect(() => {
    getMovieReq(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const oldFavs = JSON.parse(localStorage.getItem('react-movie-app-favs'));
    setFav(oldFavs);
  }, []);

  const handleFavClick = (movie) => {
    const updatedFav = [movie, ...fav];
    const ids = updatedFav.map(o => o.imdbID)
    const filtered = updatedFav.filter(({ imdbID }, index) => !ids.includes(imdbID, index + 1))
    setFav(filtered);
    saveToLocalStorage(filtered);
  }

  const removeFavClick = (movie) => {
    const updatedFav = fav.filter(
      (ele) =>
        movie.imdbID !== ele.imdbID
    );
    setFav(updatedFav);
    saveToLocalStorage(updatedFav);
  }

  return (
    <>
      <Navbar heading="Movies" searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="container-fluid movies-row">
        <div className="mrow container-fluid d-flex mt-3">
          <MoviesList key="movies" movies={movies} FavComponent={AddFav} handleFavClick={handleFavClick} />
        </div>
      </div>

      {fav.length !== 0 && <h2 className="m-3">Favourites</h2>}

      <div className="container-fluid movies-row">
        <div className="mrow container-fluid d-flex mt-3">
          <MoviesList key="favs" movies={fav} FavComponent={RemoveFav} handleFavClick={removeFavClick} />
        </div>
      </div>
    </>

  );
}

export default App;
