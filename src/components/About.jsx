// About.js

import React from "react";
import backgroundImg from "../assets/Background4.png"; // Import the background image

const About = () => (
  <div style={{ ...contentStyle, backgroundImage: `url(${backgroundImg})` }}>
    <h1>Welcome to the About Page</h1>
    {/* Add your home page content here */}
  </div>
);

const contentStyle = {
  margin: 0,
  padding: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white", // Adjust text color based on background
};

export default About;
