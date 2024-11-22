import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { MoviesContext } from "../../contexts/moviesContext";
import { useQuery } from 'react-query';
import { getMovie } from '../../api/tmdb-api';

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites, removeFromFavorites, mustWatch, addToMustWatch, removeFromMustWatch } = useContext(MoviesContext);

  // Determine if the movie is in favorites
  const isFavorite = favorites.includes(movie.id);

  // Determine if the movie is in must-watch list
  const isInMustWatch = mustWatch.includes(movie.id);

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      removeFromFavorites(movie);
    } else {
      addToFavorites(movie);
    }
  };

  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    if (isInMustWatch) {
      removeFromMustWatch(movie);
    } else {
      addToMustWatch(movie);
    }
  };

  const { data: movieDetails, error, isLoading } = useQuery([
    'movie',
    { id: movie.id }
  ], getMovie);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Card>
      <CardHeader
        avatar={
          isFavorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleAddToFavorite}>
          <FavoriteIcon color={isFavorite ? "error" : "disabled"} />
        </IconButton>
        <Button
          variant={isInMustWatch ? "contained" : "outlined"}
          color="secondary"
          onClick={handleAddToMustWatch}
        >
          {isInMustWatch ? "Remove from Must-Watch" : "Add to Must-Watch"}
        </Button>
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
