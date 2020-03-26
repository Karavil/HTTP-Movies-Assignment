import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";

import EditMovieForm from "./EditMovieForm";

function EditMovie(props) {
   const [movie, setMovie] = useState(null);
   const match = useRouteMatch();

   const fetchMovie = id => {
      axios
         .get(`http://localhost:5000/api/movies/${id}`)
         .then(res => setMovie(res.data))
         .catch(err => console.log(err.response));
   };

   useEffect(() => {
      fetchMovie(match.params.id);
   }, [match.params.id]);

   return movie ? (
      <EditMovieForm movie={movie} editMovie={props.editMovie} />
   ) : (
      "Loading..."
   );
}

export default EditMovie;
