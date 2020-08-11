import React, {useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const AddMovie = props => {
    const [movie, setMovie] = useState({})
    const { push } = useHistory();

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

    const handleAdd = e => {
        e.preventDefault();
        axios.post(`http://localhost:7000/api/movies`, movie)
        .then(res => {
            console.log('Movie Added', res)
            props.setMovieList([...props.movies, movie])
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

            <button className='submit btn' onClick={handleAdd} >Add</button>
        </form>
    )
}

export default AddMovie