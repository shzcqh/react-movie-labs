import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid2";
import { useQuery } from 'react-query';
import { getMoviesWithPagination } from '../../api/tmdb-api';   
import Typography from "@mui/material/Typography";

const MovieList = ({ action }) => {
  const { data, error, isLoading } = useQuery(
    ['movies', { page: 1 }],  // 默认获取第一页数据
    ({ queryKey }) => getMoviesWithPagination(queryKey[1].page)
  );

  if (isLoading) {
    return <Typography>Loading movies...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  let movieCards = data.results.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ padding: "20px" }}>
      <Movie key={m.id} movie={m} action={action} />
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      {movieCards}
    </Grid>
  );
};

export default MovieList;
