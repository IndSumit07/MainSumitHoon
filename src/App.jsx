import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import GetInTouch from "./pages/GetInTouch";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<GetInTouch />} />
      </Routes>
    </>
  );
};

export default App;
