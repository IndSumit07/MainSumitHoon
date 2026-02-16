import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import GetInTouch from "./pages/GetInTouch";
import NotFound from "./pages/NotFound";
import Resume from "./pages/Resume";
import Certificates from "./pages/Certificates";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/contact" element={<GetInTouch />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SpeedInsights />
    </>
  );
};

export default App;
