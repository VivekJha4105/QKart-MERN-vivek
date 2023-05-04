import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react"; 
import { Link, useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {

  const history = useHistory();

  const routeToExplore = () => {
    history.push("/"); 
  }

  const logOut = () => {
    history.push("/");
    localStorage.clear();
    window.location.reload();
  }

  const routeToLogin = () => {
    history.push("/login");
  }

  const routeToRegister = () => {
    history.push("/register");
  }


  if(hasHiddenAuthButtons){
    return (
      <Box className="header">
        <Box className="header-title">
          <Link to="/">
            <img src="logo_light.svg" alt="QKart-icon"></img>
          </Link>
        </Box>
        { children }
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={routeToExplore}
        >
          Back to explore
        </Button>
      </Box>
    );
  }

  return (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Link>
      </Box>
      { children }
      <Stack direction="row" spacing={1} alignItems='center'>
        {
          localStorage.getItem("username") ? (
            <>
              <Avatar 
                alt={localStorage.getItem("username") || "User Profile"} 
                src="../../public/avatar.png" 
              />

              <p className="username-text"> { localStorage.getItem("username") } </p>

              <Button onClick={logOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={routeToLogin}> Login </Button>
              <Button 
                variant="contained" 
                onClick={routeToRegister}
              > 
                Register 
              </Button>
            </>
          )
        }
      </Stack>
    </Box>
  );
};

export default Header;
