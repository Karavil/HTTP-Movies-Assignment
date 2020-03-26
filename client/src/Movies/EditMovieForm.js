import React from "react";
import { useForm } from "react-hook-form";

const EditMovieForm = ({ movie, editMovie }) => {
   const { register, handleSubmit, errors } = useForm({
      defaultValues: { ...movie }
   });

   const onSubmit = formData => editMovie(movie.id, { ...movie, ...formData });

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="save-wrapper">
            <div className="movie-card">
               <h2>
                  <input
                     type="text"
                     placeholder="First name"
                     name="title"
                     ref={register({ required: true, maxLength: 80 })}
                  />
               </h2>
               <div className="movie-director">
                  {"Edit Director: "}
                  <em>
                     <input
                        type="text"
                        placeholder="First name"
                        name="director"
                        ref={register({ required: true, maxLength: 80 })}
                     />
                  </em>
               </div>
               <div className="movie-metascore">
                  Metascore:{" "}
                  <strong>
                     <input
                        type="text"
                        placeholder="First name"
                        name="metascore"
                        ref={register({ required: true, maxLength: 80 })}
                     />
                  </strong>
               </div>
               <h3>Actors</h3>

               {movie.stars.map(star => (
                  <div key={star} className="movie-star">
                     {star}
                  </div>
               ))}
            </div>

            <button type="submit" className="save-button">
               Save
            </button>
         </div>
      </form>
   );
};

export default EditMovieForm;
