import React, { useState, useEffect } from "react";
import "./App.css";
import searchIcon from "./searchIcon.svg";
import MovieCard from "./component/MovieCard";

// Api key --> 7f761fae

const API_URL = "http://www.omdbapi.com?apikey=7f761fae";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    console.log(data);

    if (response.ok && data.Search) {
      setMovies(data.Search);
    } else {
      console.log("Response is not OK or no movies found");
    }
  };

  useEffect(() => {
    searchMovies(title);
  }, [title]);

  return (
    <div className="app">
      <h1>Story Movie Store</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <img src={searchIcon} alt="Search Icon" />
      </div>
      <div className="container">
        {movies?.length > 0 ? (
          movies.map((movie, idx) => <MovieCard movie={movie} key={idx} />)
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
