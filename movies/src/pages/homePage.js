import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getTrendingMovies, getPopularMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const HomePage = (props) => {
  // 使用 React Query 获取 Trending Movies 数据
  const { data: trendingMoviesData, error: trendingError, isLoading: isTrendingLoading } = useQuery(
    'trendingMovies',
    getTrendingMovies
  );

  // 使用 React Query 获取 Popular Movies 数据
  const { data: popularMoviesData, error: popularError, isLoading: isPopularLoading } = useQuery(
    'popularMovies',
    getPopularMovies
  );

  if (isTrendingLoading || isPopularLoading) {
    return <Spinner />;
  }

  if (trendingError) {
    return <h1>{trendingError.message}</h1>;
  }

  if (popularError) {
    return <h1>{popularError.message}</h1>;
  }

  const trendingMovies = trendingMoviesData.results;
  const popularMovies = popularMoviesData.results;

  return (
    <>
      <PageTemplate
        title="Trending Movies"
        movies={trendingMovies}
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
      <PageTemplate
        title="Popular Movies"
        movies={popularMovies}
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
