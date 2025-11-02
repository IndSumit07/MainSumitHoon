import React from "react";
import Hero from "../components/Hero";
import Projects from "../components/Projects";

const Home = () => {
  return (
    <div className="px-24 h-[2000vh]">
      <Hero />
      <div className="w-full h-[75px] border-l border-r border-white/20 bg-[radial-gradient(circle,_#1D202A_1px,_transparent_1px)] [background-size:20px_18px] bg-[#000000]"></div>
      <Projects />
    </div>
  );
};

export default Home;
