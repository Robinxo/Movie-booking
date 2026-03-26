import { Box, Button, Typography, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./Movies/MovieItem.jsx";
import { Link } from "react-router-dom";
import { getAllMovies } from "../Api-helper/api-helpers.js";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

const Homepage = () => {
  const [movies, setmovies] = useState();

  useEffect(() => {
    getAllMovies()
      .then((data) => setmovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#0a0a12",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* ── Hero ── */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "58vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          textAlign: "center",
          px: 2,
          py: 8,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(124,58,237,0.18) 0%, transparent 70%), linear-gradient(180deg, #0d0d1f 0%, #0a0a12 100%)",
        }}
      >
        {/* Decorative blobs */}
        <Box
          sx={{
            position: "absolute",
            top: "-80px",
            left: "10%",
            width: 340,
            height: 340,
            borderRadius: "50%",
            background: "rgba(124,58,237,0.12)",
            filter: "blur(90px)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-60px",
            right: "8%",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(233,30,140,0.1)",
            filter: "blur(80px)",
            zIndex: 0,
          }}
        />

        {/* Chip */}
        <Chip
          icon={<LocalMoviesIcon sx={{ color: "#c084fc !important", fontSize: 16 }} />}
          label="Now Showing"
          size="small"
          sx={{
            mb: 3,
            bgcolor: "rgba(124,58,237,0.15)",
            color: "#c084fc",
            border: "1px solid rgba(192,132,252,0.3)",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.08em",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        />

        {/* Heading */}
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: { xs: "2.4rem", md: "3.8rem" },
            lineHeight: 1.15,
            background: "linear-gradient(135deg, #f0f0ff 30%, #c084fc 70%, #f472b6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
            zIndex: 1,
          }}
        >
          Your Next Favourite<br />Film Awaits
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Outfit', sans-serif",
            color: "#8888aa",
            fontSize: "1.05rem",
            maxWidth: 520,
            mb: 4,
            zIndex: 1,
          }}
        >
          Discover the latest blockbusters and book your seats in seconds.
        </Typography>

        {/* CTA buttons */}
        <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center" sx={{ zIndex: 1 }}>
          <Button
            component={Link}
            to="/movies"
            variant="contained"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              px: 3.5,
              py: 1.2,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
              boxShadow: "0 4px 20px rgba(124,58,237,0.45)",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(135deg, #6d28d9, #c21579)",
                boxShadow: "0 4px 28px rgba(124,58,237,0.6)",
              },
            }}
          >
            Browse All Movies
          </Button>
        </Box>
      </Box>

      {/* ── Latest Releases ── */}
      <Box sx={{ px: { xs: 2, md: 6 }, pb: 8 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
          mt={2}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              color: "#f0f0ff",
              fontSize: "1.5rem",
            }}
          >
            Latest Releases
          </Typography>
          <Button
            component={Link}
            to="/movies"
            variant="outlined"
            size="small"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: "0.8rem",
              textTransform: "none",
              borderRadius: "8px",
              color: "#c084fc",
              borderColor: "rgba(192,132,252,0.4)",
              "&:hover": {
                borderColor: "#c084fc",
                background: "rgba(124,58,237,0.08)",
              },
            }}
          >
            View All →
          </Button>
        </Box>

        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          {movies &&
            movies.slice(0, 6).map((movie, index) => (
              <MovieItem
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                ticketPrice={movie.ticketPrice}
                key={index}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
