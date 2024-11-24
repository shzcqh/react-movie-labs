import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getTrendingMovies, getPopularMovies, getUpcomingMovies, getGenres, getMoviesByGenre } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const HomePage = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(""); 

  const { data: upcomingMoviesData, error: upcomingError, isLoading: isUpcomingLoading } = useQuery('upcoming', getUpcomingMovies);
  const { data: genresData, isLoading: isGenresLoading } = useQuery('genres', getGenres);
  const { data: trendingMoviesData, error: trendingError, isLoading: isTrendingLoading } = useQuery('trendingMovies', getTrendingMovies);

  const { data: filteredMoviesData, isLoading: isFilteredLoading } = useQuery(
    ['moviesByGenre', selectedGenre],
    () => getMoviesByGenre(selectedGenre),
    {
      enabled: !!selectedGenre,
    }
  );

  if (isUpcomingLoading || isTrendingLoading || isGenresLoading || (selectedGenre && isFilteredLoading)) {
    return <Spinner />;
  }

  if (trendingError) {
    return <h1>{trendingError.message}</h1>;
  }

  if (upcomingError) {
    return <h1>{upcomingError.message}</h1>;
  }

  const genres = genresData?.genres || [];
  const trendingMovies = trendingMoviesData?.results || [];
  const filteredMovies = filteredMoviesData?.results || [];
  const upcomingMovies = upcomingMoviesData?.results || [];

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

      {/* 显示即将上映的电影 */}
      <PageTemplate
        title="Upcoming Movies"
        movies={upcomingMovies}
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

      {/* 显示热门电影或按流派筛选的电影 */}
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
