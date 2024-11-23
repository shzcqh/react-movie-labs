import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import MovieDetails from '../components/movieDetails/';
import PageTemplate from '../components/templateMoviePage';
import { getMovie, getMovieRecommendations, getMovieCredits } from '../api/tmdb-api';
import Spinner from '../components/spinner';

const MoviePage = (props) => {
  const { id } = useParams();

  // 使用 React Query 获取电影详情
  const { data: movie, error: movieError, isLoading: movieLoading } = useQuery(
    ['movie', { id }],
    () => getMovie({ queryKey: [null, { id }] })
  );

  // 使用 React Query 获取推荐电影
  const { data: recommendations, error: recommendationError, isLoading: recommendationLoading } = useQuery(
    ['movieRecommendations', { id }],
    () => getMovieRecommendations(id)
  );

  // 使用 React Query 获取演员信息
  const { data: credits, error: creditsError, isLoading: creditsLoading } = useQuery(
    ['movieCredits', { id }],
    () => getMovieCredits(id)
  );

  if (movieLoading || recommendationLoading || creditsLoading) {
    return <Spinner />;
  }

  if (movieError) {
    return <h1>{movieError.message}</h1>;
  }

  if (recommendationError) {
    return <h4>{recommendationError}</h4>;
  }

  if (creditsError) {
    return <h4>{creditsError}</h4>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
          
          <h3>Recommended Movies</h3>
          <ul>
            {recommendations.results.map((recMovie) => (
              <li key={recMovie.id}>{recMovie.title}</li>
            ))}
          </ul>

          <h3>Cast</h3>
          <ul>
            {credits.cast.map((actor) => (
              <li key={actor.id}>
                {actor.name} as {actor.character}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
