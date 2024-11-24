import React, { useContext } from 'react';
import { useQueries } from 'react-query';
import { getMovie } from '../api/tmdb-api';
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { MoviesContext } from "../contexts/moviesContext";

const MustWatchPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const mustWatchQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: () => getMovie(movieId),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = mustWatchQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = mustWatchQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="Must Watch"
      movies={movies}
      action={(movie) => {
        return <AddToMustWatchIcon movie={movie} />;
      }}
    />
  );
};

export default MustWatchPage;

