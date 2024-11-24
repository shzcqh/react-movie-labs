# react-movie-labs
Project Overview
React Movie Labs is a movie browsing and review application developed using React and React Query. It allows users to explore movies, filter them by genre, view movie details, and save their favorite movies. The app integrates with The Movie Database (TMDb) API to fetch data related to movies, genres, trending titles, and more. Users can also see the cast information, movie recommendations, and reviews for specific titles.
Features
1.Browse Movies: Users can browse trending movies, popular movies, upcoming movies, or filter by genre.
2.Movie Details: Each movie has a dedicated details page showcasing information like release date, revenue, runtime, genre, and reviews.
3.Search and Filter: Users can filter movies by genre, using a genre dropdown on the home page.
4.Favorites: Users can add movies to their favorites, which are saved for easy access.
5.Reviews: Users can view movie reviews and add their own reviews to specific movies.
Getting Started
Prerequisites
Node.js and npm installed
A TMDb API Key: You will need to create an account on The Movie Database and obtain an API key.
Installation Steps
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/react-movie-labs.git
cd react-movie-labs
Install dependencies:
bash
Copy code
npm install
Create a .env file in the root directory to store environment variables like the TMDb API key:
makefile
Copy code
REACT_APP_TMDB_KEY=b535c3b8142ceefbfae4efc03a03f643
Start the development server:
bash
Copy code
npm start
API Details
This application relies heavily on TMDb API to fetch movie-related data. Below are the endpoints used in this project:

Get Movies: Fetches a list of movies
javascript
Copy code
getMovies()
Uses https://api.themoviedb.org/3/discover/movie
Get Movie Details: Fetches specific movie details by ID
javascript
Copy code
getMovie({ queryKey })
Uses https://api.themoviedb.org/3/movie/{id}
Get Genres: Retrieves a list of available genres
javascript
Copy code
getGenres()
Uses https://api.themoviedb.org/3/genre/movie/list
Get Movie Reviews: Fetches reviews for a movie by its ID
javascript
Copy code
getMovieReviews({ queryKey })
Uses https://api.themoviedb.org/3/movie/{id}/reviews
Get Upcoming Movies: Fetches a list of upcoming movies
javascript
Copy code
getUpcomingMovies()
Uses https://api.themoviedb.org/3/movie/upcoming
Get Trending Movies: Retrieves a list of trending movies for the week
javascript
Copy code
getTrendingMovies()
Uses https://api.themoviedb.org/3/trending/movie/week
Get Popular Movies: Fetches the most popular movies
javascript
Copy code
getPopularMovies()
Uses https://api.themoviedb.org/3/movie/popular
Functionalities by Component
HomePage.js
Displays trending movies fetched from the getTrendingMovies() API.
Allows users to filter movies by genre using a dropdown.
Uses the PageTemplate component to display movie lists, with each movie card allowing users to view details or add to favorites.
MovieCard.js
Renders a single movie card, which includes the movie's title, poster, release date, and rating.
Users can click the "More Info" button to navigate to the movie details page.
Displays a favorite icon for movies that are saved to the user's favorites list.
TemplateMoviePage.js
Provides a template layout for the movie details page.
Displays movie images in a grid fetched using the getMovieImages() API.
Uses the MovieHeader component to show the movie title and related metadata.
MovieDetails.js
Shows detailed information about a movie, including runtime, genres, production countries, and revenue.
Has a "Reviews" button that opens a drawer containing user reviews, using the MovieReviews component.
How to Use
Homepage: Explore trending or filtered movies.
Movie Details: Click "More Info" on a movie card to navigate to its details page.
Favorites: Click on the heart icon to add/remove a movie from favorites.
Genre Filter: Use the genre dropdown to filter movies.
Reviews: Click the "Reviews" button to read or write reviews.
Technologies Used
React: For building UI components.
React Router: For navigation between different pages.
React Query: For server-side state management, fetching, caching movie data.
Challenges Faced During Development and Solutions

API Integration Issues:

Challenge: Integrating with TMDb API and managing rate limits, as well as handling errors effectively when incorrect API keys or network issues occurred.
Solution: To overcome these issues, we implemented robust error handling by wrapping API calls in try-catch blocks and providing user-friendly error messages. Additionally, React Query was used to handle retries automatically and cache data to reduce unnecessary API calls, thus staying within rate limits.
Responsive Design:

Challenge: Ensuring consistent UI responsiveness across different devices.
Solution: We utilized Material-UI's grid system and custom CSS adjustments. Regular testing on different screen sizes helped identify inconsistencies, and breakpoints were carefully adjusted to ensure a uniform experience across mobile, tablet, and desktop views.

Merge Conflicts During Collaboration:

Challenge: Managing multiple branches and resolving merge conflicts.
Solution: To minimize merge conflicts, the team adopted a branching strategy, with features developed in isolated branches. Regular synchronization with the main branch was enforced to keep changes updated. During conflicts, rebase operations were done with a team effort to ensure every developer understood the changes before resolving conflicts manually.