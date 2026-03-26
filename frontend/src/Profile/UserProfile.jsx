import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../Api-helper/api-helpers.js";
import {
  Box,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventSeatIcon from "@mui/icons-material/EventSeat";

const UserProfile = () => {
  const [Bookings, setBookings] = useState();
  const [User, setUser] = useState();

  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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
        {/* User Info Card */}
        {User && (
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
                fontWeight: 800,
                color: "#f0f0ff",
                fontSize: "1.15rem",
                mb: 0.3,
              }}
            >
              {User.name}
            </Typography>

            <Box
              sx={{
                width: "100%",
                mt: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: "rgba(255,255,255,0.04)",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.72rem",
                    color: "#8888aa",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    mb: 0.3,
                  }}
                >
                  Email
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.88rem",
                    color: "#c084fc",
                    fontWeight: 600,
                    wordBreak: "break-all",
                  }}
                >
                  {User.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Bookings */}
        {Bookings && Bookings.length > 0 && (
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
                <ConfirmationNumberIcon sx={{ color: "#fff", fontSize: 20 }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: "#f0f0ff", lineHeight: 1 }}
                >
                  My Bookings
                </Typography>
                <Typography sx={{ fontFamily: "'Outfit', sans-serif", color: "#8888aa", fontSize: "0.8rem" }}>
                  {Bookings.length} booking{Bookings.length !== 1 ? "s" : ""}
                </Typography>
              </Box>
            </Box>

            <List disablePadding>
              {Bookings.map((booking, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: "#16162a",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderLeft: "4px solid #7c3aed",
                    borderRadius: "14px",
                    mb: 1.5,
                    p: 2,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                    transition: "border-color 0.2s",
                    "&:hover": { borderLeftColor: "#e91e8c" },
                  }}
                >
                  <Box flex={1} display="flex" flexDirection="column" gap={0.6}>
                    <Typography
                      sx={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        color: "#f0f0ff",
                        fontSize: "1rem",
                      }}
                    >
                      {booking.movie.title}
                    </Typography>

                    <Box display="flex" gap={2} flexWrap="wrap">
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <EventSeatIcon sx={{ fontSize: 13, color: "#8888aa" }} />
                        <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "#8888aa" }}>
                          Seat {booking.seats}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <CalendarMonthIcon sx={{ fontSize: 13, color: "#8888aa" }} />
                        <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "#8888aa" }}>
                          {new Date(booking.showingDate).toDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <IconButton
                    onClick={() => handleDelete(booking._id)}
                    sx={{
                      color: "#8888aa",
                      flexShrink: 0,
                      "&:hover": { color: "#ef4444", background: "rgba(239,68,68,0.1)" },
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Empty state */}
        {Bookings && Bookings.length === 0 && (
          <Box flex={1} display="flex" alignItems="center" justifyContent="center">
            <Typography sx={{ fontFamily: "'Outfit', sans-serif", color: "#8888aa", fontSize: "1rem" }}>
              No bookings yet. Go book a movie!
            </Typography>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default UserProfile;
