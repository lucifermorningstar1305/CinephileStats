import React from "react";
import Movie from "./Movie";

const MovieList = ({ movieData, onSelect }) => {
  return (
    <ul className="list list-movies">
      {movieData.map((movie) => (
        <Movie
          poster={movie.Poster}
          title={movie.Title}
          key={movie.imdbID}
          movieId={movie.imdbID}
          onSelect={onSelect}
        >
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
