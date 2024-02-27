import React from "react";

const Movie = ({ poster, title, movieId, onSelect, children }) => {
  return (
    <li onClick={() => onSelect(movieId)}>
      <img src={poster} alt={`${title} Poster`} />
      <h3>{title}</h3>
      <div>{children}</div>
    </li>
  );
};

export default Movie;
