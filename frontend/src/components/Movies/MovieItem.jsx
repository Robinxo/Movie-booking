import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const MovieItem = ({ title, releaseDate, posterUrl, id, ticketPrice }) => {
  return (
    <Box
      component={Link}
      to={`/booking/${id}`}
      sx={{
        width: 220,
        textDecoration: "none",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#14142a",
        border: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 50px rgba(124,58,237,0.35)",
          borderColor: "rgba(124,58,237,0.4)",
        },
      }}
    >
      {/* Poster */}
      <Box sx={{ position: "relative", width: "100%", paddingTop: "150%" }}>
        <Box
          component="img"
          src={posterUrl}
          alt={title}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Gradient overlay at bottom of poster */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            background:
              "linear-gradient(to top, #14142a 0%, rgba(20,20,42,0.6) 60%, transparent 100%)",
          }}
        />
        {/* Price badge */}
        <Chip
          icon={
            <ConfirmationNumberIcon
              sx={{ fontSize: "13px !important", color: "#f0f0ff !important" }}
            />
          }
          label={`₹${ticketPrice}`}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "rgba(124,58,237,0.85)",
            backdropFilter: "blur(8px)",
            color: "#f0f0ff",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "0.72rem",
            border: "1px solid rgba(192,132,252,0.4)",
            height: 24,
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ p: 1.5, pt: 1 }}>
        <Typography
          sx={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#f0f0ff",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <CalendarMonthIcon sx={{ fontSize: 13, color: "#8888aa" }} />
          <Typography
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.75rem",
              color: "#8888aa",
            }}
          >
            {new Date(releaseDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>
        </Box>

        {/* Book button */}
        <Box
          sx={{
            mt: 1.5,
            py: 0.9,
            borderRadius: "10px",
            background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
            textAlign: "center",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "0.82rem",
            color: "#fff",
            letterSpacing: "0.04em",
            transition: "opacity 0.2s",
            "&:hover": { opacity: 0.88 },
          }}
        >
          Book Now
        </Box>
      </Box>
    </Box>
  );
};

export default MovieItem;
