import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getMoviedetails, newBooking } from "../../Api-helper/api-helpers.js";
import {
  Box,
  Button,
  Dialog,
  FormLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";

const selectSx = {
  color: "#f0f0ff",
  fontFamily: "'Outfit', sans-serif",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "10px",
  "& .MuiSelect-icon": { color: "#8888aa" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(124,58,237,0.5)" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#7c3aed" },
};

const labelSx = {
  mt: 3,
  mb: 1,
  color: "#8888aa",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.8rem",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
  gap: 0.5,
};

const Booking = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const { id: Id } = useParams();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const [movie, setMovie] = useState();
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);

  useEffect(() => {
    getMoviedetails(Id).then((res) => {
      setMovie(res.movie);
      setAvailableDates(res.movie.showings.map((show) => show.date));
    });
  }, [Id]);

  useEffect(() => {
    if (movie && inputs.date) {
      const selectedShow = movie.showings.find(
        (show) =>
          new Date(show.date).toISOString().split("T")[0] === inputs.date
      );
      if (selectedShow) {
        setAvailableSeats(
          selectedShow.availableSeats.filter((seat) => !seat.isBooked)
        );
      }
    }
  }, [inputs.date, movie]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      movie: movie._id,
      user: localStorage.getItem("userId"),
      showingDate: inputs.date,
      seats: [inputs.seatNumber],
      ticketPrice: movie.ticketPrice,
    };
    newBooking(bookingData)
      .then((res) => {
        console.log("Booking successful:", res);
        alert("Booking created successfully!");
      })
      .catch((err) => {
        console.error("Error creating booking:", err.response?.data || err.message);
        alert("Failed to create booking. Please try again.");
      });
  };

  return (
    <Box sx={{ bgcolor: "#0a0a12", minHeight: "100vh" }}>
      {movie && isUserLoggedIn && (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          px={{ xs: 2, md: 6 }}
          py={6}
        >
          {/* Left — Movie Info */}
          <Box flex={1} display="flex" flexDirection="column" gap={2}>
            <Box
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                maxWidth: 360,
                boxShadow: "0 16px 50px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                style={{ width: "100%", display: "block" }}
              />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                color: "#f0f0ff",
                mt: 1,
              }}
            >
              {movie.title}
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Outfit', sans-serif",
                color: "#8888aa",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                borderLeft: "3px solid #7c3aed",
                pl: 2,
              }}
            >
              {movie.description}
            </Typography>

            {movie.actors?.length > 0 && (
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                <GroupIcon sx={{ fontSize: 16, color: "#8888aa" }} />
                {movie.actors.map((actor, idx) => (
                  <Typography
                    key={idx}
                    sx={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.82rem",
                      color: "#c084fc",
                      bgcolor: "rgba(124,58,237,0.12)",
                      px: 1.2,
                      py: 0.3,
                      borderRadius: "6px",
                    }}
                  >
                    {actor}
                  </Typography>
                ))}
              </Box>
            )}

            <Typography
              sx={{
                fontFamily: "'Outfit', sans-serif",
                color: "#8888aa",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <CalendarMonthIcon sx={{ fontSize: 15 }} />
              {new Date(movie.releaseDate).toDateString()}
            </Typography>
          </Box>

          {/* Right — Booking Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              flexShrink: 0,
              width: { xs: "100%", md: 380 },
              bgcolor: "#16162a",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "20px",
              p: { xs: 3, md: 4 },
              alignSelf: "flex-start",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                color: "#f0f0ff",
                mb: 1,
              }}
            >
              Booking Details
            </Typography>
            <Box
              sx={{
                height: 2,
                borderRadius: 1,
                background: "linear-gradient(90deg, #7c3aed, #e91e8c)",
                mb: 2,
              }}
            />

            <FormLabel sx={labelSx}>
              <CalendarMonthIcon sx={{ fontSize: 14 }} /> Showing Date
            </FormLabel>
            <Select
              value={inputs.date}
              onChange={handleChange}
              name="date"
              fullWidth
              displayEmpty
              sx={selectSx}
            >
              <MenuItem value="" disabled sx={{ fontFamily: "'Outfit', sans-serif" }}>
                Select a date
              </MenuItem>
              {availableDates.map((date, idx) => (
                <MenuItem
                  key={idx}
                  value={new Date(date).toISOString().split("T")[0]}
                  sx={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {new Date(date).toLocaleString()}
                </MenuItem>
              ))}
            </Select>

            <FormLabel sx={labelSx}>
              <EventSeatIcon sx={{ fontSize: 14 }} /> Seat Number
            </FormLabel>
            <Select
              value={inputs.seatNumber}
              onChange={handleChange}
              name="seatNumber"
              fullWidth
              displayEmpty
              sx={selectSx}
            >
              <MenuItem value="" disabled sx={{ fontFamily: "'Outfit', sans-serif" }}>
                Select a seat
              </MenuItem>
              {availableSeats.map((seat) => (
                <MenuItem
                  key={seat._id}
                  value={seat.seatNumber}
                  sx={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {seat.seatNumber}
                </MenuItem>
              ))}
            </Select>

            <Button
              type="submit"
              fullWidth
              disabled={!inputs.date || !inputs.seatNumber}
              sx={{
                mt: 4,
                py: 1.4,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                "&:hover": { opacity: 0.9 },
                "&.Mui-disabled": {
                  background: "rgba(255,255,255,0.08)",
                  color: "#8888aa",
                },
              }}
            >
              Confirm Booking
            </Button>

            <Typography
              sx={{
                mt: 2,
                textAlign: "center",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.85rem",
                color: "#8888aa",
              }}
            >
              Ticket price:{" "}
              <Box component="span" sx={{ color: "#c084fc", fontWeight: 700 }}>
                ₹{movie.ticketPrice}
              </Box>
            </Typography>
          </Box>
        </Box>
      )}

      {!isUserLoggedIn && (
        <Dialog open={true} PaperProps={{ style: { borderRadius: 16, background: "#16162a", border: "1px solid rgba(255,255,255,0.08)" } }}>
          <Box p={4} textAlign="center">
            <Typography
              variant="h6"
              sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#f0f0ff", mb: 1 }}
            >
              Login Required
            </Typography>
            <Typography sx={{ fontFamily: "'Outfit', sans-serif", color: "#8888aa", mb: 3, fontSize: "0.9rem" }}>
              You need to be logged in to book tickets.
            </Typography>
            <Box display="flex" gap={2} justifyContent="center">
              <Button
                onClick={() => navigate("/auth")}
                variant="contained"
                sx={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outlined"
                sx={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "10px",
                  color: "#8888aa",
                  borderColor: "rgba(255,255,255,0.12)",
                  "&:hover": { borderColor: "#8888aa" },
                }}
              >
                Go Back
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default Booking;
