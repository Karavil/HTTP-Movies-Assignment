import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import { useForm } from "react-hook-form";

function EditMovie({ editMovie }) {
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

   const { title, director, metascore, stars } = movie;
   const { register, handleSubmit, errors } = useForm({
      defaultValues: { ...movie }
   });
   const onSubmit = data => console.log(data);

   return movie ? <EditMovieForm movie={movie} /> : "Loading...";
}

export default EditMovie;
