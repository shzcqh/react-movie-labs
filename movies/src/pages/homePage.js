import React, { useEffect, useState } from "react";
import { getTrendingMovies, getPopularMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const HomePage = (props) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        
        const trending = await getTrendingMovies();
        setTrendingMovies(trending.results);

        
        const popular = await getPopularMovies();
        setPopularMovies(popular.results);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <PageTemplate
        title="Trending Movies"
        movies={trendingMovies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
      <PageTemplate
        title="Popular Movies"
        movies={popularMovies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
    </>
  );
};

export default HomePage;
