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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState } from "react";
import { addMovie } from "../../Api-helper/api-helpers.js";

const labelProps = {
  color: "#8888aa",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  mb: 0.5,
  mt: 2,
};

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "#f0f0ff",
    fontFamily: "'Outfit', sans-serif",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "10px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(124,58,237,0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
  },
  "& .MuiInputBase-input": { color: "#f0f0ff" },
  "& .MuiInputLabel-root": { color: "#8888aa" },
};

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
    addMovie({ ...inputs, actors, showings })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const sectionTitle = (label) => (
    <Typography
      sx={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 700,
        color: "#c084fc",
        fontSize: "0.8rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        mt: 3,
        mb: 1.5,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {label}
    </Typography>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a12",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 760,
          bgcolor: "#16162a",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px",
          p: { xs: 3, md: 5 },
        }}
      >
        {/* Header */}
        <Box mb={4}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              color: "#f0f0ff",
              mb: 0.5,
            }}
          >
            Add New Movie
          </Typography>
          <Box
            sx={{
              height: 3,
              width: 60,
              borderRadius: 2,
              background: "linear-gradient(90deg, #7c3aed, #e91e8c)",
            }}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <Box display="grid" gap={2} gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}>

            {/* Title */}
            <Box gridColumn="span 2">
              <FormLabel sx={labelProps}>Title *</FormLabel>
              <TextField fullWidth value={inputs.title} onChange={handleChange} name="title" variant="outlined" sx={textFieldSx} />
            </Box>

            {/* Description */}
            <Box gridColumn="span 2">
              <FormLabel sx={labelProps}>Description *</FormLabel>
              <TextField fullWidth multiline rows={4} value={inputs.description} onChange={handleChange} name="description" variant="outlined" sx={textFieldSx} />
            </Box>

            {/* Poster URL */}
            <Box gridColumn="span 2">
              <FormLabel sx={labelProps}>Poster URL</FormLabel>
              <TextField fullWidth value={inputs.posterUrl} onChange={handleChange} name="posterUrl" variant="outlined" sx={textFieldSx} />
            </Box>

            {/* Release Date */}
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
                  "& ::-webkit-calendar-picker-indicator": { filter: "invert(1)" },
                }}
              />
            </Box>

            {/* Ticket Price */}
            <Box>
              <FormLabel sx={labelProps}>Ticket Price (₹) *</FormLabel>
              <TextField
                fullWidth
                type="number"
                value={inputs.ticketPrice}
                onChange={handleChange}
                name="ticketPrice"
                variant="outlined"
                inputProps={{ min: 0, step: 0.01 }}
                sx={textFieldSx}
              />
            </Box>

            {/* Featured */}
            <Box gridColumn="span 2" display="flex" alignItems="center" gap={1}>
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
              <FormLabel sx={{ ...labelProps, mt: 0, mb: 0, color: "#8888aa" }}>
                Featured Movie
              </FormLabel>
            </Box>

            {/* Divider */}
            <Box gridColumn="span 2">
              <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", my: 1 }} />
            </Box>

            {/* Actors */}
            <Box gridColumn="span 2">
              {sectionTitle("Cast & Actors")}
              <Box display="flex" alignItems="center" gap={1.5}>
                <TextField
                  fullWidth
                  value={actor}
                  onChange={(e) => setActor(e.target.value)}
                  variant="outlined"
                  placeholder="Actor name"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleActorAdd(); } }}
                  sx={textFieldSx}
                />
                <Button
                  variant="contained"
                  onClick={handleActorAdd}
                  disabled={!actor.trim()}
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    flexShrink: 0,
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
                    "&.Mui-disabled": { background: "rgba(255,255,255,0.08)", color: "#8888aa" },
                  }}
                >
                  Add
                </Button>
              </Box>
              {actors.length > 0 && (
                <List dense sx={{ mt: 1 }}>
                  {actors.map((a, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        bgcolor: "rgba(124,58,237,0.1)",
                        borderRadius: "8px",
                        mb: 0.5,
                        border: "1px solid rgba(124,58,237,0.2)",
                      }}
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleActorDelete(index)} sx={{ color: "#8888aa", "&:hover": { color: "#ef4444" } }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={a}
                        primaryTypographyProps={{ fontFamily: "'Outfit', sans-serif", color: "#c084fc", fontWeight: 600, fontSize: "0.9rem" }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>

            {/* Showings */}
            <Box gridColumn="span 2">
              {sectionTitle("Showings")}
              {showings.map((showing, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1.5} mb={1.5}>
                  <TextField
                    type="datetime-local"
                    name="date"
                    value={showing.date}
                    onChange={(event) => handleShowingChange(index, event)}
                    variant="outlined"
                    sx={{
                      flex: 2,
                      ...textFieldSx,
                      "& ::-webkit-calendar-picker-indicator": { filter: "invert(1)" },
                    }}
                  />
                  <TextField
                    type="number"
                    name="numberOfSeats"
                    value={showing.numberOfSeats}
                    onChange={(event) => handleShowingChange(index, event)}
                    variant="outlined"
                    label="Seats"
                    inputProps={{ min: 1 }}
                    sx={{ flex: 1, ...textFieldSx, "& .MuiInputLabel-root": { color: "#8888aa" } }}
                  />
                  <IconButton
                    onClick={() => handleShowingDelete(index)}
                    sx={{ color: "#8888aa", "&:hover": { color: "#ef4444" } }}
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
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "10px",
                  color: "#c084fc",
                  borderColor: "rgba(192,132,252,0.3)",
                  "&:hover": { borderColor: "#c084fc", background: "rgba(124,58,237,0.08)" },
                }}
              >
                Add Showing
              </Button>
            </Box>

            {/* Submit */}
            <Box gridColumn="span 2" mt={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
                  boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                Add Movie
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddMovies;
