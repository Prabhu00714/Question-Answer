/* eslint-disable no-unused-vars */
// import "./App.css";
// import BasicStepper from "./components/BasicStepper";
// import BasicTabs from "./components/BasicTabs";
// import Image from "./components/Image";

// function App() {
//   return (
//     <div className="App">
//       {/* <ImageUpload />
//       <ImageDisplay /> */}
//       {/* <Image /> */}
//       <BasicTabs />
//       {/* <BasicStepper /> */}
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";

// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/data");
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//     console.log("data ->", data);
//   }, []); // Empty dependency array to ensure the effect runs only once on mount

//   return (
//     <div>
//       <h1>Your Data:</h1>
//       <ul>
//         {data.map((item) => (
//           <li key={item._id}>{/* Render your data here */}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

// App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import BasicTabs from "./components/BasicTabs";
import "./App.css";

const App = () => {
  const [activeKey, setActiveKey] = useState("home");

  const handleRouteChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Home />
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route
          path="/BasicTabs"
          element={
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BasicTabs />
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route
          path="/about"
          element={
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <About />
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route
          path="/contact"
          element={
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Contact />
              </motion.div>
            </AnimatePresence>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
