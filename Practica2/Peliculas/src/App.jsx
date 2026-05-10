import {Route, Routes, useNavigate} from 'react-router-dom'
import CinemaList from './pages/CinemaList'
import MovieDetail from './pages/MovieDetail'
import {initialMovies} from './data/movies.js'
import { useState } from 'react'
import './App.css'
import NavbarComp from './component/NavBar.jsx'
import NewMovie from './pages/NewMovie.jsx'
import { MovieEdit } from './pages/MovieEdit.jsx'

function App() {
  const navigate= useNavigate()
  const [movies,setMovies]=useState(initialMovies)
  const deleteMovie= (id)=> setMovies(movies.filter(e=> e.id!==id))
  const addMovie = (newMovie) => {
    const movieRepeated= movies.find(movie => movie.title.toLowerCase() === newMovie.title.toLowerCase());
    if (movieRepeated) {
      alert("La película ya existe en la lista.");
      return;
    }else {      
      setMovies([...movies, newMovie]);
    }
  };
const handleEditMovie = (updatedMovie) => {
    setMovies(prevMovies => 
        prevMovies.map(movie => 
            movie.id.toString() === updatedMovie.id.toString() ? updatedMovie : movie
        )
    );
    navigate('/');
};
  return (
    <>
      <NavbarComp/>
    <Routes>
      <Route path='/' element={<CinemaList movies={movies} onDelete={deleteMovie}/>}/>
      <Route path='/new-movie' element={<NewMovie onAddMovie={addMovie}/>}/>
      <Route path='/movie/:id' element={<MovieDetail movies={movies} />}/>
      <Route path='/edit/:id' element={<MovieEdit movies={movies} onEditMovie={handleEditMovie}/>}/>
    </Routes>
    </>
  )
}

export default App
