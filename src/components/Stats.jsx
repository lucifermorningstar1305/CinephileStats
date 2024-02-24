import React from "react";

const Stats = ({ movieData }) => {
  return (
    <div className="num-results">
      <p>
        Found <strong>{movieData.length}</strong> results
      </p>
    </div>
  );
};

export default Stats;
