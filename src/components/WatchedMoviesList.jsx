import React from "react";
import Movie from "./Movie";

const WatchedMoviesList = ({ watchedMovies }) => {
  return (
    <ul className="list">
      {watchedMovies.map((movie) => (
        <Movie title={movie.Title} poster={movie.Poster} key={movie.imdbID}>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        </Movie>
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
