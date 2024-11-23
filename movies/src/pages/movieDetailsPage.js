import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '../components/movieDetails/';
import PageTemplate from '../components/templateMoviePage';
import { getMovie, getMovieRecommendations } from '../api/tmdb-api';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery(
    ['movie', { id: id }],
    getMovie
  );

  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [recommendationError, setRecommendationError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getMovieRecommendations(id);
        setRecommendations(data.results);
        setLoadingRecommendations(false);
      } catch (err) {
        setRecommendationError(err.message);
        setLoadingRecommendations(false);
      }
    };
    fetchRecommendations();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
          <h3>Recommended Movies</h3>
          {loadingRecommendations ? (
            <Spinner />
          ) : recommendationError ? (
            <h4>{recommendationError}</h4>
          ) : (
            <ul>
              {recommendations.map((recMovie) => (
                <li key={recMovie.id}>{recMovie.title}</li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
