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
import { useNavigate } from "react-router";

const labelStyle = { mt: 1, mb: 2 };

const AuthForm = ({ onSubmit, isAdmin }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true); // ✅ State to control dialog visibility
  const crossHandler = () => {
    setOpen(false); // ✅ Close dialog on cross button click
    navigate("/");
  };
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let authData = {
      email: inputs.email,
      password: inputs.password,
    };

    if (!isAdmin && isSignup) {
      // User signup
      authData.username = inputs.username;
    }

    onSubmit({
      inputs: authData,
      isSignup: !isAdmin && isSignup, // Pass signup flag.
      isAdmin: isAdmin, // Pass isAdmin flag.
    });
    setOpen(false);
    navigate("/movies");
  };

  return (
    <Dialog
      PaperProps={{ style: { borderRadius: 20 } }}
      open={open}
      onClose={crossHandler}
    >
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton onClick={crossHandler}>
          <ClearRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign="center">
        {isSignup ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          width={400}
          margin="auto"
          alignContent="center"
        >
          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={labelStyle}>Username</FormLabel>
              <TextField
                value={inputs.username}
                onChange={handleChange}
                variant="standard"
                margin="normal"
                type="text"
                name="username" // ✅ Fixed field name
              />
            </>
          )}

          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            variant="standard"
            margin="normal"
            type="email"
            name="email"
          />

          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            variant="standard"
            margin="normal"
            type="password"
            name="password"
          />

          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>

          {!isAdmin && (
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ mt: 2, borderRadius: 10 }}
              fullWidth
            >
              Switch to {isSignup ? "Login" : "Signup"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
