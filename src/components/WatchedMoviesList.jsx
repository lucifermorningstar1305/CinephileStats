import React from "react";
import WatchedMovie from "./WatchedMovie";

const WatchedMoviesList = ({ watchedMovies, onDelete }) => {
  return (
    <ul className="list">
      {watchedMovies.map((movie) => (
        <WatchedMovie
          title={movie.title}
          poster={movie.poster}
          key={movie.imdbID}
          onDelete={onDelete}
          movieId={movie.imdbID}
        >
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
        </WatchedMovie>
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
