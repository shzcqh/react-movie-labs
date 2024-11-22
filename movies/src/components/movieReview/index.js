import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const MovieReview =  ({ review }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        {/* Review Author */}
        <Typography variant="h5" component="h3" sx={{ marginBottom: 1 }}>
          Review By: {review.author}
        </Typography>

        {/* Review Content */}
        <Typography variant="h6" component="p">
          {review.content}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default MovieReview