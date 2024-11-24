import React, { useState } from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import { useQuery } from 'react-query';
import { getMoviesWithPagination } from '../../api/tmdb-api';   
import Typography from "@mui/material/Typography";
import ReactPaginate from "react-paginate";
import "../../styles/pagination.css"; 

const MovieList = ({ action }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 8;

  const { data, error, isLoading } = useQuery(
    ['movies', { page: currentPage + 1 }],
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

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <Grid container spacing={6}>{movieCards}</Grid>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={data.total_pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default MovieList;
