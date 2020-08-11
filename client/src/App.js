import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from './Movies/AddMovie'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:7000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Link to='/add-movie' className='navlink'>Add Movie</Link>
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} movies={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path='/update-movie/:movieID'>
        <UpdateMovie movies={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path='/add-movie'>
        <AddMovie movies={movieList} setMovieList={setMovieList} />
      </Route>
    </>
  );
};

export default App;
