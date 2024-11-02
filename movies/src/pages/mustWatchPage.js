import React from "react";
import { getUpcomingMovies} from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { MoviesContext } from "../contexts/moviesContext";

const MustWatchPage = () => {
    const {mustWatchPage: movieIds } = useContext(MoviesContext);
  
    // Create an array of queries and run in parallel.
    const mustWatchQueries = useQueries(
      movieIds.map((movieId) => {
        return {
          queryKey: ["movie", { id: movieId }],
          queryFn: getMovie,
        };
      })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = mustWatchQueries.find((m) => m.isLoading === true);
  
    if (isLoading) {
      return <Spinner />;
    }
  
    const movies = mustWatchQueries.map((q) => {
      q.data.genre_ids = q.data.genres.map(g => g.id)
      return q.data
    });
  
    const toDo = () => true;
  
    return (
      <PageTemplate
        title="Must Watch"
        movies={movies}
        action={(movie) => {
          return <AddToMustWatchIcon movie={movie} />
        }}
      />
    );
  };
  
  export default MustWatchPage ;