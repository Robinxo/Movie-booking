import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Autocomplete,
} from "@mui/material";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
import { getAllMovies } from "../Api-helper/api-helpers.js";

const tabSx = {
  color: "rgba(240,240,255,0.7)",
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 500,
  fontSize: "0.85rem",
  letterSpacing: "0.04em",
  textTransform: "none",
  minWidth: 80,
  transition: "color 0.2s",
  "&:hover": { color: "#fff" },
  "&.Mui-selected": { color: "#fff", fontWeight: 700 },
};

const GuestHeader = ({ value, onChange }) => (
  <Tabs
    value={value}
    TabIndicatorProps={{
      style: {
        background: "linear-gradient(90deg, #7c3aed, #e91e8c)",
        height: 3,
        borderRadius: 2,
      },
    }}
    onChange={onChange}
  >
    <Tab component={Link} to="/movies" label="Movies" value="/movies" sx={tabSx} />
    <Tab component={Link} to="/auth" label="Login / Sign up" value="/auth" sx={tabSx} />
  </Tabs>
);

const UserHeader = ({ value, onChange, handleLogout }) => (
  <Tabs
    value={value}
    TabIndicatorProps={{
      style: {
        background: "linear-gradient(90deg, #7c3aed, #e91e8c)",
        height: 3,
        borderRadius: 2,
      },
    }}
    onChange={onChange}
  >
    <Tab component={Link} to="/movies" label="Movies" value="/movies" sx={tabSx} />
    <Tab component={Link} to="/user" label="Profile" value="/user" sx={tabSx} />
    <Tab component={Link} to="/" label="Logout" value="/" onClick={handleLogout} sx={tabSx} />
  </Tabs>
);

const AdminHeader = ({ value, onChange, handleLogout }) => (
  <Tabs
    value={value}
    TabIndicatorProps={{
      style: {
        background: "linear-gradient(90deg, #7c3aed, #e91e8c)",
        height: 3,
        borderRadius: 2,
      },
    }}
    onChange={onChange}
  >
    <Tab component={Link} to="/movies" label="Movies" value="/movies" sx={tabSx} />
    <Tab component={Link} to="/add" label="Add Movie" value="/add" sx={tabSx} />
    <Tab component={Link} to="/admin" label="Profile" value="/admin" sx={tabSx} />
    <Tab component={Link} to="/" label="Logout" value="/" onClick={handleLogout} sx={tabSx} />
  </Tabs>
);

const Header = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState("/movies");

  useEffect(() => {
    setTimeout(() => {
      setValue(location.pathname);
    }, 100);
  }, [location.pathname]);

  useEffect(() => {
    let isMounted = true;
    getAllMovies()
      .then((data) => {
        if (isMounted) setMovies(data.movies);
      })
      .catch((err) => console.error("Error fetching movies:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = (isAdmin) => () => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(9,9,15,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <Toolbar sx={{ py: 0.5 }}>
        {/* Logo */}
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          component={Link}
          to="/"
          sx={{ textDecoration: "none", mr: "auto", flexShrink: 0 }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 18px rgba(124,58,237,0.5)",
            }}
          >
            <TheaterComedyIcon sx={{ color: "#fff", fontSize: 22 }} />
          </Box>
          <Box
            component="span"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "1.15rem",
              background: "linear-gradient(90deg, #c084fc, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.02em",
              ml: 0.5,
            }}
          >
            CineBook
          </Box>
        </Box>

        {/* Search */}
        <Box width="28%" mx={3}>
          <Autocomplete
            freeSolo
            options={movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search movies…"
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "'Outfit', sans-serif",
                    color: "#e0e0ff",
                    fontSize: "0.85rem",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                    "&:hover fieldset": { borderColor: "rgba(124,58,237,0.5)" },
                    "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
                  },
                  "& .MuiInputBase-input::placeholder": { color: "#8888aa" },
                  "& .MuiSvgIcon-root": { color: "#8888aa" },
                }}
              />
            )}
          />
        </Box>

        {/* Nav */}
        <Box display="flex" alignItems="center">
          {isAdminLoggedIn ? (
            <AdminHeader
              value={value}
              onChange={handleChange}
              handleLogout={handleLogout(true)}
            />
          ) : isUserLoggedIn ? (
            <UserHeader
              value={value}
              onChange={handleChange}
              handleLogout={handleLogout(false)}
            />
          ) : (
            <GuestHeader value={value} onChange={handleChange} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
