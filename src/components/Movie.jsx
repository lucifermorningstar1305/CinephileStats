import React from "react";

const Movie = ({ poster, title, children }) => {
  return (
    <li>
      <img src={poster} alt={`${title} Poster`} />
      <h3>{title}</h3>
      <div>{children}</div>
    </li>
  );
};

export default Movie;
