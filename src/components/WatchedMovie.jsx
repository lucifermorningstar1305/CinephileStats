import React from "react";

const WatchedMovie = ({ poster, title, movieId, onDelete, children }) => {
  return (
    <li>
      <img src={poster} alt={`${title} Poster`} />
      <h3>{title}</h3>
      <div>{children}</div>
      <button className="btn-delete" onClick={() => onDelete(movieId)}>
        X
      </button>
    </li>
  );
};

export default WatchedMovie;
