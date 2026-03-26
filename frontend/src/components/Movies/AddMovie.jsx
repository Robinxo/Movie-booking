import {
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import React, { useState } from "react";
import { addMovie } from "../../Api-helper/api-helpers.js";

const labelProps = {
  color: "#8888aa",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.8rem",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  mb: 0.8,
  mt: 2,
};

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "#f0f0ff",
    fontFamily: "'Outfit', sans-serif",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "12px",
    transition: "all 0.2s ease",
    "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
    "&:hover fieldset": { borderColor: "rgba(124,58,237,0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#7c3aed", borderWidth: "2px" },
    "&.Mui-focused": {
      background: "rgba(124,58,237,0.03)",
    }
  },
  "& .MuiInputBase-input": { color: "#f0f0ff" },
  "& .MuiInputLabel-root": { color: "#8888aa" },
};

const sectionTitle = (label) => (
  <Typography
    sx={{
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
      color: "#f0f0ff",
      fontSize: "1.1rem",
      mt: 4,
      mb: 2,
      display: "flex",
      alignItems: "center",
      gap: 1.5,
    }}
  >
    <Box 
      sx={{ 
        width: 4, 
        height: 18, 
        borderRadius: 2, 
        background: "linear-gradient(180deg, #7c3aed, #e91e8c)" 
      }} 
    />
    {label}
  </Typography>
);

const AddMovies = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
    ticketPrice: "",
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const [showings, setShowings] = useState([{ date: "", numberOfSeats: 1 }]);
  
  // Submit feedback state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleActorAdd = () => {
    if (actor.trim() && !actors.includes(actor.trim())) {
      setActors([...actors, actor.trim()]);
      setActor("");
    }
  };

  const handleActorDelete = (index) => {
    setActors(actors.filter((_, i) => i !== index));
  };

  const handleShowingChange = (index, event) => {
    const { name, value } = event.target;
    setShowings((prevShowings) =>
      prevShowings.map((showing, i) =>
        i === index
          ? { ...showing, [name]: name === "numberOfSeats" ? Math.max(1, Number(value)) : value }
          : showing
      )
    );
  };

  const handleShowingAdd = () => {
    setShowings([...showings, { date: "", numberOfSeats: 1 }]);
  };

  const handleShowingDelete = (index) => {
    setShowings(showings.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.title || !inputs.description || !inputs.releaseDate || !inputs.ticketPrice) {
      alert("Please fill all required fields.");
      return;
    }
    if (showings.some((showing) => !showing.date || showing.numberOfSeats < 1)) {
      alert("Please fill all showing fields correctly.");
      return;
    }
    
    setIsSubmitting(true);
    addMovie({ ...inputs, actors, showings })
      .then((res) => {
        console.log("Movie added:", res);
        alert("Movie added successfully!");
        // Reset form or redirect
        setInputs({ title: "", description: "", posterUrl: "", releaseDate: "", featured: false, ticketPrice: "" });
        setActors([]);
        setShowings([{ date: "", numberOfSeats: 1 }]);
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add movie.");
        setIsSubmitting(false);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a12",
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4, lg: 8 },
      }}
    >
      <Box maxWidth={1200} mx="auto">
        {/* Header */}
        <Box mb={5}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              color: "#f0f0ff",
              letterSpacing: "-0.02em",
              mb: 1,
            }}
          >
            Add New Movie
          </Typography>
          <Typography sx={{ color: "#8888aa", fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem" }}>
            Publish a new cinematic experience to your platform.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, lg: 6 }}>
          {/* Main Form Area */}
          <Grid item xs={12} md={7} lg={8}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#16162a",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "24px",
                p: { xs: 3, md: 5 },
              }}
            >
              <form onSubmit={handleSubmit}>
                
                {/* Basic Details */}
                {sectionTitle("Basic Details")}
                <Box display="grid" gap={2.5} gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}>
                  <Box gridColumn="span 2">
                    <FormLabel sx={labelProps}>Title *</FormLabel>
                    <TextField fullWidth value={inputs.title} onChange={handleChange} name="title" variant="outlined" placeholder="e.g. Inception" sx={textFieldSx} />
                  </Box>

                  <Box gridColumn="span 2">
                    <FormLabel sx={labelProps}>Description *</FormLabel>
                    <TextField fullWidth multiline rows={4} value={inputs.description} onChange={handleChange} name="description" variant="outlined" placeholder="Enter movie synopsis..." sx={textFieldSx} />
                  </Box>
                  
                  <Box>
                    <FormLabel sx={labelProps}>Release Date *</FormLabel>
                    <TextField
                      fullWidth
                      type="date"
                      value={inputs.releaseDate}
                      onChange={handleChange}
                      name="releaseDate"
                      variant="outlined"
                      sx={{
                        ...textFieldSx,
                        "& ::-webkit-calendar-picker-indicator": { filter: "invert(1) opacity(0.7) hover:opacity(1)", cursor: "pointer" },
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <FormLabel sx={labelProps}>Base Ticket Price (₹) *</FormLabel>
                    <TextField
                      fullWidth
                      type="number"
                      value={inputs.ticketPrice}
                      onChange={handleChange}
                      name="ticketPrice"
                      variant="outlined"
                      placeholder="e.g. 250"
                      inputProps={{ min: 0, step: 0.01 }}
                      sx={textFieldSx}
                    />
                  </Box>
                </Box>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", my: 4 }} />

                {/* Media & Highlighting */}
                {sectionTitle("Media & Promotion")}
                <Box display="grid" gap={2.5} gridTemplateColumns="1fr">
                  <Box>
                    <FormLabel sx={labelProps}>Poster URL</FormLabel>
                    <TextField fullWidth value={inputs.posterUrl} onChange={handleChange} name="posterUrl" variant="outlined" placeholder="https://example.com/poster.jpg" sx={textFieldSx} />
                  </Box>
                  
                  <Box 
                    sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 2, 
                      p: 2, 
                      bgcolor: "rgba(124,58,237,0.05)", 
                      borderRadius: "12px",
                      border: "1px dashed rgba(124,58,237,0.2)"
                    }}
                  >
                    <Checkbox
                      checked={inputs.featured}
                      onChange={(e) => setInputs((p) => ({ ...p, featured: e.target.checked }))}
                      name="featured"
                      sx={{
                        color: "rgba(255,255,255,0.2)",
                        "&.Mui-checked": { color: "#7c3aed" },
                        p: 0,
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#f0f0ff" }}>
                        Feature on Homepage
                      </Typography>
                      <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: "#8888aa" }}>
                        Display this movie prominently in the hero carousel.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", my: 4 }} />

                {/* Cast */}
                {sectionTitle("Cast & Crew")}
                <Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <TextField
                      fullWidth
                      value={actor}
                      onChange={(e) => setActor(e.target.value)}
                      variant="outlined"
                      placeholder="Add an actor's name..."
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleActorAdd(); } }}
                      sx={textFieldSx}
                    />
                    <Button
                      variant="contained"
                      onClick={handleActorAdd}
                      disabled={!actor.trim()}
                      sx={{
                        flexShrink: 0,
                        height: 54,
                        px: 3,
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        textTransform: "none",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
                        "&.Mui-disabled": { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)" },
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                  
                  {actors.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      {actors.map((a, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            bgcolor: "rgba(124,58,237,0.1)",
                            color: "#c084fc",
                            px: 2,
                            py: 1,
                            borderRadius: "100px",
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            border: "1px solid rgba(124,58,237,0.2)",
                          }}
                        >
                          {a}
                          <IconButton size="small" onClick={() => handleActorDelete(index)} sx={{ color: "#c084fc", p: 0.2, "&:hover": { color: "#ef4444" } }}>
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", my: 4 }} />

                {/* Showings */}
                {sectionTitle("Showings & Availability")}
                <Box>
                  {showings.map((showing, index) => (
                    <Box key={index} display="flex" flexWrap={{ xs: "wrap", sm: "nowrap" }} alignItems="center" gap={2} mb={2}>
                      <TextField
                        type="datetime-local"
                        name="date"
                        value={showing.date}
                        onChange={(event) => handleShowingChange(index, event)}
                        variant="outlined"
                        fullWidth
                        sx={{
                          flex: { xs: "1 1 100%", sm: 2 },
                          ...textFieldSx,
                          "& ::-webkit-calendar-picker-indicator": { filter: "invert(1) opacity(0.7)", cursor: "pointer" },
                        }}
                      />
                      <TextField
                        type="number"
                        name="numberOfSeats"
                        value={showing.numberOfSeats}
                        onChange={(event) => handleShowingChange(index, event)}
                        variant="outlined"
                        label="Total Seats"
                        inputProps={{ min: 1 }}
                        sx={{ flex: { xs: "1 1 70%", sm: 1 }, ...textFieldSx, "& .MuiInputLabel-root": { color: "#8888aa", fontFamily: "'Outfit', sans-serif" } }}
                      />
                      <IconButton
                        onClick={() => handleShowingDelete(index)}
                        sx={{ 
                          color: "rgba(239,68,68,0.7)", 
                          bgcolor: "rgba(239,68,68,0.05)",
                          borderRadius: "12px",
                          p: 1.5,
                          "&:hover": { color: "#ef4444", bgcolor: "rgba(239,68,68,0.15)" } 
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    onClick={handleShowingAdd}
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                      mt: 1,
                      py: 1.2,
                      px: 3,
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: "12px",
                      color: "#c084fc",
                      borderColor: "rgba(192,132,252,0.3)",
                      "&:hover": { borderColor: "#c084fc", background: "rgba(124,58,237,0.08)" },
                    }}
                  >
                    Add Another Showing
                  </Button>
                </Box>

                {/* Submit Action */}
                <Box mt={6} pt={4} borderTop="1px solid rgba(255,255,255,0.05)">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    fullWidth
                    sx={{
                      py: 2,
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      letterSpacing: "0.05em",
                      textTransform: "none",
                      borderRadius: "14px",
                      background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
                      boxShadow: "0 8px 30px rgba(124,58,237,0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": { 
                        opacity: 0.9, 
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 40px rgba(124,58,237,0.4)",
                      },
                      "&.Mui-disabled": { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" },
                    }}
                  >
                    {isSubmitting ? "Publishing Movie..." : "Publish Movie"}
                  </Button>
                </Box>

              </form>
            </Paper>
          </Grid>

          {/* Live Preview Sidebar */}
          <Grid item xs={12} md={5} lg={4}>
            <Box 
              sx={{ 
                position: { md: "sticky" }, 
                top: { md: 40 },
                display: "flex",
                flexDirection: "column",
                gap: 3
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  color: "#8888aa",
                  fontSize: "0.9rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <MovieFilterIcon fontSize="small" /> LIVE PREVIEW
              </Typography>
              
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "#16162a",
                  borderRadius: "24px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  aspectRatio: "2/3",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative"
                }}
              >
                {inputs.posterUrl ? (
                  <Box
                    component="img"
                    src={inputs.posterUrl}
                    alt="Poster Preview"
                    onError={(e) => { e.target.style.display='none'; }}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      inset: 0,
                      zIndex: 1
                    }}
                  />
                ) : (
                  <Box 
                    sx={{ 
                      width: "100%", 
                      height: "100%", 
                      display: "flex", 
                      flexDirection: "column",
                      alignItems: "center", 
                      justifyContent: "center",
                      bgcolor: "rgba(255,255,255,0.02)",
                      position: "absolute",
                      inset: 0,
                      zIndex: 1
                    }}
                  >
                    <MovieFilterIcon sx={{ fontSize: 64, color: "rgba(255,255,255,0.05)", mb: 2 }} />
                    <Typography sx={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
                      No Poster URL
                    </Typography>
                  </Box>
                )}

                {/* Overlays to make text readable over poster */}
                <Box 
                  sx={{ 
                    position: "absolute", 
                    bottom: 0, left: 0, right: 0, 
                    background: "linear-gradient(to top, rgba(10,10,18,1) 0%, rgba(10,10,18,0.8) 50%, rgba(10,10,18,0) 100%)",
                    p: 4,
                    pt: 8,
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                  }}
                >
                  {inputs.featured && (
                    <Box 
                      sx={{ 
                        alignSelf: "flex-start",
                        bgcolor: "rgba(233, 30, 140, 0.2)",
                        color: "#e91e8c",
                        px: 1.5, py: 0.5,
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        border: "1px solid rgba(233, 30, 140, 0.4)",
                        mb: 1
                      }}
                    >
                      Featured
                    </Box>
                  )}
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontFamily: "'Outfit', sans-serif", 
                      fontWeight: 800, 
                      color: "#fff",
                      lineHeight: 1.2,
                      textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                    }}
                  >
                    {inputs.title || "Movie Title"}
                  </Typography>
                  <Typography 
                    sx={{ 
                      fontFamily: "'Outfit', sans-serif", 
                      color: "#aaa", 
                      fontSize: "0.9rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {inputs.description || "The description of the movie will appear here. Add a captivating synopsis."}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddMovies;
