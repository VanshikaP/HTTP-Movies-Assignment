import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

const Movie = props => {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { push } = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:7000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  const routeToUpdateMovie = e => {
    e.preventDefault();
    console.log(`/update-movie/${match.params.id}`);
    push(`/update-movie/${match.params.id}`)
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:7000/api/movies/${match.params.id}`)
    .then(res => {
      console.log('Delete operation', res.statusText)
      props.setMovieList(props.movies.filter(m => `${m.id}` !== match.params.id))
      push('/')
    })
    .catch(err => console.log(err));
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick={routeToUpdateMovie}>Edit</button>
      <button onClick={deleteMovie}>Delete</button>
    </div>
  );
}

export default Movie;
