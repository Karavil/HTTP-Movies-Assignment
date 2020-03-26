import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

function Movie({ addMovie, deleteMovie }) {
   const [movie, setMovie] = useState(null);
   const history = useHistory();
   const match = useRouteMatch();

   const fetchMovie = id => {
      axios
         .get(`http://localhost:5000/api/movies/${id}`)
         .then(res => setMovie(res.data))
         .catch(err => console.log(err.response));
   };

   const saveMovie = () => {
      addMovie(movie);
   };

   const delMovie = () => {
      deleteMovie(movie.id);
      history.push("");
   };

   useEffect(() => {
      fetchMovie(match.params.id);
   }, [match.params.id]);

   if (!movie) {
      return <div>Loading movie information...</div>;
   }

   return (
      <div className="save-wrapper">
         <MovieCard movie={movie} />

         <div className="save-button" onClick={saveMovie}>
            Save
         </div>
         <Link to={`/edit/${movie.id}`}>
            <div className="edit-button">Edit</div>
         </Link>
         <div className="delete-button" onClick={delMovie}>
            Delete
         </div>
      </div>
   );
}

export default Movie;
