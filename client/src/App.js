import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import EditMovie from "./Movies/EditMovie";
import axios from "axios";

const App = () => {
   const [savedList, setSavedList] = useState([]);
   const [movieList, setMovieList] = useState([]);

   const getMovieList = () => {
      axios
         .get("http://localhost:5000/api/movies")
         .then(res => setMovieList(res.data))
         .catch(err => console.log(err.response));
   };

   const addMovie = movie => {
      setSavedList([...savedList, movie]);
   };

   const editMovie = (id, data) => {
      axios
         .put("http://localhost:5000/api/movies/" + id, data)
         .then(res =>
            setMovieList(movies =>
               movies.map(movie => {
                  if (movie.id === res.data.id) return res.data;
                  return movie;
               })
            )
         )
         .catch(err => console.log(err));
   };

   useEffect(() => {
      getMovieList();
   }, []);

   return (
      <>
         <SavedList list={savedList} />

         <Route exact path="/">
            <MovieList movies={movieList} />
         </Route>

         <Route path="/movies/:id">
            <Movie addMovie={addMovie} />
         </Route>
         <Route path="/edit/:id">
            <EditMovie editMovie={editMovie} />
         </Route>
      </>
   );
};

export default App;
