import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  IconButton, 
  Skeleton,
  Divider
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MovieIcon from "@mui/icons-material/Movie";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { deleteMovie, getAdminById } from "../Api-helper/api-helpers.js";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminById()
      .then((res) => {
        setAdmin(res.admin);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (movieTitle) => {
    try {
      await deleteMovie({ title: movieTitle });
      setAdmin((prev) => ({
        ...prev,
        addedMovies: prev.addedMovies.filter((m) => m.title !== movieTitle),
      }));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#0a0a12", p: { xs: 2, md: 5 } }}>
        <Skeleton variant="rectangular" height={200} sx={{ bgcolor: "rgba(255,255,255,0.05)", borderRadius: 4, mb: 4 }} />
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((n) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={n}>
              <Skeleton variant="rectangular" height={360} sx={{ bgcolor: "rgba(255,255,255,0.05)", borderRadius: 4 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (!admin) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#0a0a12", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 2 }}>
        <Typography color="#8888aa" fontFamily="'Outfit', sans-serif" fontSize="1.2rem">Admin data not found.</Typography>
        <Button component={Link} to="/" variant="outlined" sx={{ color: "#c084fc", borderColor: "rgba(192,132,252,0.5)" }}>Return Home</Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a12",
        px: { xs: 2, md: 5, lg: 8 },
        py: 6,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Dashboard Header Section */}
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          justifyContent: "space-between", 
          alignItems: { xs: "flex-start", md: "center" },
          gap: 3,
          mb: 5 
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
            }}
          >
            <DashboardIcon sx={{ color: "#fff", fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.02em" }}>
              Admin Dashboard
            </Typography>
            <Typography sx={{ color: "#8888aa", fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem" }}>
              Welcome back, <Box component="span" sx={{ color: "#c084fc", fontWeight: 600 }}>{admin.email}</Box>
            </Typography>
          </Box>
        </Box>

        {/* Quick Actions */}
        <Button
          component={Link}
          to="/add"
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            py: 1.5,
            px: 3,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            textTransform: "none",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
            boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
            "&:hover": { opacity: 0.9, transform: "translateY(-1px)", boxShadow: "0 6px 25px rgba(124,58,237,0.5)" },
            transition: "all 0.2s ease-in-out"
          }}
        >
          Add New Movie
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={6}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: "rgba(124,58,237,0.05)",
              border: "1px solid rgba(124,58,237,0.15)",
              display: "flex",
              alignItems: "center",
              gap: 2.5,
              transition: "transform 0.2s, background 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                bgcolor: "rgba(124,58,237,0.08)",
              }
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                bgcolor: "rgba(124,58,237,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MovieIcon sx={{ color: "#c084fc" }} />
            </Box>
            <Box>
              <Typography sx={{ color: "#8888aa", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", mb: 0.5 }}>
                Total Movies Added
              </Typography>
              <Typography sx={{ color: "#f0f0ff", fontSize: "1.8rem", fontWeight: 800, lineHeight: 1 }}>
                {admin.addedMovies.length}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 5 }} />

      {/* Movies Grid */}
      <Box mb={4} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: "#f0f0ff" }}>
          Manage Movies
        </Typography>
      </Box>

      {admin.addedMovies.length === 0 ? (
        <Box 
          sx={{ 
            p: 6, 
            textAlign: "center", 
            bgcolor: "#16162a", 
            borderRadius: "20px", 
            border: "1px dashed rgba(255,255,255,0.1)" 
          }}
        >
          <MovieIcon sx={{ fontSize: 60, color: "rgba(255,255,255,0.1)", mb: 2 }} />
          <Typography sx={{ color: "#f0f0ff", fontSize: "1.2rem", fontWeight: 600, mb: 1 }}>No movies added yet</Typography>
          <Typography sx={{ color: "#8888aa", mb: 3 }}>Start by adding a new movie to your catalog.</Typography>
          <Button component={Link} to="/add" variant="outlined" sx={{ color: "#c084fc", borderColor: "rgba(192,132,252,0.5)" }}>
            Add Movie
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {admin.addedMovies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  bgcolor: "#16162a",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  position: "relative",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
                    borderColor: "rgba(124,58,237,0.3)",
                    "& .delete-btn-overlay": {
                      opacity: 1,
                    }
                  }
                }}
              >
                <Box position="relative">
                  <CardMedia
                    component="img"
                    height="320"
                    image={movie.posterUrl || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                    alt={movie.title}
                    sx={{ objectFit: "cover" }}
                  />
                  {/* Hover Overlay for Delete */}
                  <Box
                    className="delete-btn-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: "rgba(10,10,18,0.7)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.2s ease",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(movie.title)}
                      startIcon={<DeleteIcon />}
                      sx={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        textTransform: "none",
                        borderRadius: "10px",
                        boxShadow: "0 4px 15px rgba(239,68,68,0.4)"
                      }}
                    >
                      Delete Movie
                    </Button>
                  </Box>
                </Box>
                
                <CardContent sx={{ p: 2.5 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      color: "#f0f0ff",
                      mb: 0.5,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {movie.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AdminProfile;
