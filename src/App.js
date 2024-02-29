import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Search from "./components/Search";
import Stats from "./components/Stats";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedStats from "./components/WatchedStats";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SelectedMovieDetails from "./components/SelectedMovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

// const KEY = "637661fd";

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { moviesData, isLoading, error } = useMovies(query);
  const [watchedMoviesData, setWatchedMoviesData] = useLocalStorageState(
    [],
    "watchedMovies"
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
