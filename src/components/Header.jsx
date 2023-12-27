import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Button size="large" variant="elevated" onClick={() => navigateTo("/")}>
          Home
        </Button>
        <Button
          size="large"
          variant="elevated"
          onClick={() => navigateTo("/BasicTabs")}
        >
          Take Question
        </Button>
        <Button
          size="large"
          variant="elevated"
          onClick={() => navigateTo("/about")}
        >
          About Us
        </Button>
        <Button
          size="large"
          variant="elevated"
          onClick={() => navigateTo("/contact")}
        >
          Contact
        </Button>
      </nav>
    </header>
  );
};
const headerStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  padding: "20px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
};

const navStyle = {
  display: "flex",
  gap: "20px",
};

export default Header;
