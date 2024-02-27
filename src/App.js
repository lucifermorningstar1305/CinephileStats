import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Search from "./components/Search";
import Stats from "./components/Stats";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedStats from "./components/WatchedStats";
import { useEffect } from "react";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SelectedMovieDetails from "./components/SelectedMovieDetails";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const KEY = "637661fd";

const App = () => {
  const [query, setQuery] = useState("inception");
  const [moviesData, setMoviesData] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watchedMoviesData, setWatchedMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // const query = "interstellar";

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching the data.");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not Found.");

          setMoviesData(data.Search);
          setError("");
        } catch (err) {
          console.error(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMoviesData([]);
        setError("");
        return;
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  const handleSelect = (id) => {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  };

  const handleSelectClose = () => {
    setSelectedMovieId(null);
  };

  const handleWatchedMovie = (movie) => {
    setWatchedMoviesData((watchedMoviesArr) => [...watchedMoviesArr, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatchedMoviesData((watchedMoviesArr) =>
      watchedMoviesArr.filter((movie) => movie.imdbID !== id)
    );
  };

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <Stats movieData={moviesData} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movieData={moviesData} onSelect={handleSelect} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedMovieId ? (
            <SelectedMovieDetails
              selectedId={selectedMovieId}
              watchedMovies={watchedMoviesData}
              onClose={handleSelectClose}
              onAddWatched={handleWatchedMovie}
            />
          ) : (
            <>
              <WatchedStats watchedMovies={watchedMoviesData} />
              <WatchedMoviesList
                watchedMovies={watchedMoviesData}
                onDelete={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

export default App;
