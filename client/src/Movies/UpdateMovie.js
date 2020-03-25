import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const UpdateMovie = props => {
    const [movie, setMovie] = useState({})
    const { movieID } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        const movieToUpdate = props.movies.find(m => `${m.id}` === movieID)
        if(movieToUpdate) {
            setMovie(movieToUpdate)
        }
    }, [movieID, props.movies])

    const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        if(e.target.name === 'metascore') {
            value = parseInt(value, 0)
        }
        if(e.target.name === 'stars') {
            value = value.split(',');
        }
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleUpdate = e => {
        e.preventDefault();
        axios.put(`http://localhost:7000/api/movies/${movieID}`, movie)
        .then(res => {
            console.log('Movie Updated', res)
            props.setMovieList([res.data, ...props.movies.filter(m => `${m.id}` !== movieID)])
            push('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <form className='form-container'>
            <label htmlFor='title'>Name: <input type='text' name='title' value={movie.title} id='title' onChange={handleChanges} /></label>

            <label htmlFor='director'>Director: <input type='text' name='director' value={movie.director} id='director' onChange={handleChanges} /></label>

            <label htmlFor='metascore'>Metascore: <input type='text' name='metascore' value={movie.metascore} id='metascore' onChange={handleChanges} /></label>

            <label htmlFor='stars'>Stars: <input type='text' name='stars' value={movie.stars} id='stars' onChange={handleChanges} /></label>

            <button className='submit btn' onClick={handleUpdate} >Update</button>
        </form>
    )
}

export default UpdateMovie