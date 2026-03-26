import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { deleteMovie, getAdminById } from "../Api-helper/api-helpers.js";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";

const AdminProfile = () => {
  const [Admin, setAdmin] = useState();

  const handleDelete = async (movieTitle) => {
    try {
      await deleteMovie({ title: movieTitle });
      console.log("Movie deleted successfully:", movieTitle);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a12",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        px: { xs: 2, md: 5 },
        py: 5,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <Fragment>
        {/* Admin Info Card */}
        {Admin && (
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: "100%", md: 280 },
              bgcolor: "#16162a",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "20px",
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "flex-start",
            }}
          >
            <Box
              sx={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                boxShadow: "0 0 28px rgba(124,58,237,0.4)",
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 52, color: "#fff" }} />
            </Box>

            <Typography
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                color: "#f0f0ff",
                fontSize: "1.1rem",
                mb: 0.5,
              }}
            >
              Admin
            </Typography>

            <Box
              sx={{
                width: "100%",
                mt: 2,
                p: 1.5,
                bgcolor: "rgba(255,255,255,0.04)",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.78rem",
                  color: "#8888aa",
                  mb: 0.3,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Email
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.9rem",
                  color: "#c084fc",
                  fontWeight: 600,
                  wordBreak: "break-all",
                }}
              >
                {Admin.email}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Added Movies */}
        {Admin && Admin.addedMovies.length > 0 && (
          <Box flex={1}>
            <Box display="flex" alignItems="center" gap={1.5} mb={3}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 16px rgba(124,58,237,0.4)",
                  flexShrink: 0,
                }}
              >
                <MovieIcon sx={{ color: "#fff", fontSize: 20 }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: "#f0f0ff", lineHeight: 1 }}
                >
                  Added Movies
                </Typography>
                <Typography sx={{ fontFamily: "'Outfit', sans-serif", color: "#8888aa", fontSize: "0.8rem" }}>
                  {Admin.addedMovies.length} movie{Admin.addedMovies.length !== 1 ? "s" : ""} added
                </Typography>
              </Box>
            </Box>

            <List disablePadding>
              {Admin.addedMovies.map((movie, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: "#16162a",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    mb: 1.5,
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: "rgba(124,58,237,0.35)" },
                  }}
                >
                  <Box
                    component="img"
                    src={movie.posterUrl}
                    alt={movie.title}
                    sx={{
                      width: 56,
                      height: 76,
                      objectFit: "cover",
                      borderRadius: "8px",
                      flexShrink: 0,
                    }}
                  />
                  <ListItemText
                    primary={movie.title}
                    primaryTypographyProps={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      color: "#f0f0ff",
                      fontSize: "0.95rem",
                    }}
                  />
                  <Button
                    onClick={() => handleDelete(movie.title)}
                    variant="outlined"
                    size="small"
                    startIcon={<DeleteIcon sx={{ fontSize: "16px !important" }} />}
                    sx={{
                      flexShrink: 0,
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: "0.78rem",
                      borderRadius: "8px",
                      color: "#ef4444",
                      borderColor: "rgba(239,68,68,0.3)",
                      "&:hover": {
                        borderColor: "#ef4444",
                        background: "rgba(239,68,68,0.08)",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default AdminProfile;
