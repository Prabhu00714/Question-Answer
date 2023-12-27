/* eslint-disable no-unused-vars */
// BasicTabs.js
import React, { useState } from "react";
import backgroundImg from "../assets/Background2.png";
import Card from "@mui/material/Card";
import SubTabs from "./SubTabs";

const BasicTabs = () => {
  const [isBasicTabs, setIsBasicTabs] = useState(true);

  return (
    <div
      style={{
        ...containerStyle,
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <Card
        sx={{
          width: "75%",
          height: "80vh",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          margin: "50px auto 0 auto", // Add 20px top margin
          transition: "width 0.3s",
          overflowY: "auto",
          "@media (max-width: 600px)": {
            width: "95%",
          },
        }}
      >
        <SubTabs isBasicTabs={isBasicTabs} />
      </Card>
    </div>
  );
};

const containerStyle = {
  margin: 0,
  padding: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

export default BasicTabs;
