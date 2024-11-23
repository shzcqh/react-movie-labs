import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getTrendingMovies, getPopularMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import {  getGenres, getMoviesByGenre } from "../api/tmdb-api";

const HomePage = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(""); 

  
  const { data: genresData, isLoading: isGenresLoading } = useQuery('genres', getGenres);

  
  const { data: trendingMoviesData, error: trendingError, isLoading: isTrendingLoading } = useQuery('trendingMovies', getTrendingMovies);

  
  const { data: filteredMoviesData, isLoading: isFilteredLoading } = useQuery(
    ['moviesByGenre', selectedGenre],
    () => getMoviesByGenre(selectedGenre),
    {
      enabled: !!selectedGenre, 
    }
  );

  if (isTrendingLoading || isGenresLoading || (selectedGenre && isFilteredLoading)) {
    return <Spinner />;
  }

  if (trendingError) {
    return <h1>{trendingError.message}</h1>;
  }

  const genres = genresData?.genres || [];
  const trendingMovies = trendingMoviesData?.results || [];
  const filteredMovies = filteredMoviesData?.results || [];

  return (
    <>
      <h2>Filter by Genre</h2>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Displays Trending Movies or movies filtered by genre */}
      <PageTemplate
        title={selectedGenre ? "Filtered Movies" : "Trending Movies"}
        movies={selectedGenre ? filteredMovies : trendingMovies}
        action={(movie) => {
          return (
            <>
              <AddToFavoritesIcon movie={movie} />
              <Link to={`/movies/${movie.id}`}>
                <button>View Details</button>
              </Link>
            </>
          );
        }}
      />
    </>
  );
};

export default HomePage;