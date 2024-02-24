import React from "react";
import Movie from "./Movie";

const MovieList = ({ movieData }) => {
  return (
    <ul className="list">
      {movieData.map((movie) => (
        <Movie poster={movie.Poster} title={movie.Title} key={movie.imdbID}>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </Movie>
      ))}
    </ul>
  );
};

export default MovieList;
