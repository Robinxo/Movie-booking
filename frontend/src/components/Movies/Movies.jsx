import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MovieItem from "./MovieItem";
import { getAllMovies } from "../../Api-helper/api-helpers.js";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

const Movies = () => {
  const [MoviesList, setMoviesList] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMoviesList(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a12",
        px: { xs: 2, md: 6 },
        py: 6,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Section Header */}
      <Box
        display="flex"
        alignItems="center"
        gap={1.5}
        mb={5}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "12px",
            background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 0 18px rgba(124,58,237,0.4)",
          }}
        >
          <MovieFilterIcon sx={{ color: "#fff", fontSize: 22 }} />
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              color: "#f0f0ff",
              lineHeight: 1,
              mb: 0.3,
            }}
          >
            All Movies
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Outfit', sans-serif",
              color: "#8888aa",
              fontSize: "0.82rem",
            }}
          >
            {MoviesList.length} title{MoviesList.length !== 1 ? "s" : ""} available
          </Typography>
        </Box>
      </Box>

      {/* Movie Grid */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent={{ xs: "center", md: "flex-start" }}
      >
        {MoviesList.map((item, index) => (
          <MovieItem
            id={item._id}
            title={item.title}
            posterUrl={item.posterUrl}
            releaseDate={item.releaseDate}
            ticketPrice={item.ticketPrice}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Movies;
