import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useKey } from "../hooks/useKey";

const KEY = "637661fd";

const SelectedMovieDetails = ({
  selectedId,
  watchedMovies,
  onClose,
  onAddWatched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  const isWatched = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  const alreadyRated = watchedMovies.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: userRating,
      countRatingDecision: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onClose();
  };

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  useKey("Escape", onClose);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          if (!res.ok)
            throw new Error(
              "Something went wrong with fetching the movie details"
            );
          const data = await res.json();

          setMovie(data);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of movie ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  {" "}
                  You have already rated this movie {alreadyRated}{" "}
                  <span>🌟</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default SelectedMovieDetails;
