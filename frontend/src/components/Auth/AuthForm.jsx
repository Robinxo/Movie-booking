import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { useNavigate } from "react-router";

const inputSx = {
  mb: 2,
  "& .MuiInput-root": {
    color: "#f0f0ff",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.95rem",
    "&::before": { borderColor: "rgba(255,255,255,0.15)" },
    "&:hover:not(.Mui-disabled)::before": { borderColor: "rgba(124,58,237,0.6)" },
    "&::after": { borderColor: "#7c3aed" },
  },
  "& .MuiInputBase-input": { color: "#f0f0ff" },
  "& .MuiInputBase-input::placeholder": { color: "#8888aa" },
};

const labelSx = {
  color: "#8888aa",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  mb: 0.5,
  mt: 0.5,
};

const AuthForm = ({ onSubmit, isAdmin }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const crossHandler = () => {
    setOpen(false);
    navigate("/");
  };
  const [inputs, setInputs] = useState({ username: "", email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let authData = { email: inputs.email, password: inputs.password };
    if (!isAdmin && isSignup) authData.username = inputs.username;
    onSubmit({ inputs: authData, isSignup: !isAdmin && isSignup, isAdmin });
    setOpen(false);
    navigate("/movies");
  };

  return (
    <Dialog
      open={open}
      onClose={crossHandler}
      PaperProps={{
        style: {
          borderRadius: 20,
          background: "#16162a",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.15)",
          minWidth: 380,
        },
      }}
    >
      {/* Close */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1.5, pr: 1.5 }}>
        <IconButton onClick={crossHandler} size="small" sx={{ color: "#8888aa", "&:hover": { color: "#f0f0ff" } }}>
          <ClearRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Logo & Title */}
      <Box display="flex" flexDirection="column" alignItems="center" pb={1}>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 24px rgba(124,58,237,0.5)",
            mb: 2,
          }}
        >
          <TheaterComedyIcon sx={{ color: "#fff", fontSize: 26 }} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            color: "#f0f0ff",
            mb: 0.5,
          }}
        >
          {isSignup ? "Create Account" : "Welcome Back"}
        </Typography>
        <Typography sx={{ fontFamily: "'Outfit', sans-serif", color: "#8888aa", fontSize: "0.85rem" }}>
          {isSignup ? "Sign up to start booking movies" : "Sign in to your account"}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box px={4} py={3} display="flex" flexDirection="column">
          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={labelSx}>Username</FormLabel>
              <TextField
                value={inputs.username}
                onChange={handleChange}
                variant="standard"
                type="text"
                name="username"
                placeholder="Enter username"
                sx={inputSx}
              />
            </>
          )}

          <FormLabel sx={labelSx}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            variant="standard"
            type="email"
            name="email"
            placeholder="Enter email"
            sx={inputSx}
          />

          <FormLabel sx={labelSx}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            variant="standard"
            type="password"
            name="password"
            placeholder="Enter password"
            sx={inputSx}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.3,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              textTransform: "none",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #7c3aed, #e91e8c)",
              boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
              "&:hover": { opacity: 0.9 },
            }}
          >
            {isSignup ? "Create Account" : "Sign In"}
          </Button>

          {!isAdmin && (
            <Button
              onClick={() => setIsSignup(!isSignup)}
              fullWidth
              sx={{
                mt: 1.5,
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.85rem",
                textTransform: "none",
                color: "#c084fc",
                "&:hover": { background: "rgba(124,58,237,0.08)" },
              }}
            >
              {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
