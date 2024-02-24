import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./components/StarRating";
// import "./index.css";
// import App from "./App";

const Test = () => {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating maxRating={5} onSetRating={setMovieRating} color="blue" />
      <p>This movie was rated {movieRating || ""} stars</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={10} />
    <StarRating
      maxRating={5}
      color="red"
      size={20}
      messages={["Terrible", "Bad", "Okay", "Good", "Great"]}
    />
    <Test />
  </React.StrictMode>
);
