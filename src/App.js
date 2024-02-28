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

const KEY = "637661fd";

const App = () => {
  const [query, setQuery] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const [watchedMoviesData, setWatchedMoviesData] = useState([]);
  const [watchedMoviesData, setWatchedMoviesData] = useState(() =>
    JSON.parse(localStorage.getItem("watchedMovies"))
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
      handleSelectClose();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  useEffect(
    function () {
      localStorage.setItem("watchedMovies", JSON.stringify(watchedMoviesData));
    },
    [watchedMoviesData]
  );

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
