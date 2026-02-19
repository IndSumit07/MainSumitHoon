import React from "react";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Experiences from "../components/Experiences";
import Github from "../components/Github";
import About from "../components/About";
import GetInTouch from "../components/GetInTouch";
import Certificates from "../components/Certificates";
import CodingProfiles from "../components/CodingProfiles";

const Home = () => {
  return (
    <div className="md:px-24">
      <Hero />
      <div className="w-full h-[75px] border-l border-r border-white/20 bg-[radial-gradient(circle,_#1D202A_1px,_transparent_1px)] [background-size:20px_18px] bg-[#000000]"></div>
      <Projects />
      <div className="w-full h-[75px] border-l border-r border-white/20 bg-[radial-gradient(circle,_#1D202A_1px,_transparent_1px)] [background-size:20px_18px] bg-[#000000]"></div>
      <Experiences />
      <div className="w-full h-[75px] border-l border-r border-white/20 bg-[radial-gradient(circle,_#1D202A_1px,_transparent_1px)] [background-size:20px_18px] bg-[#000000]"></div>
      <Certificates />
      <div className="w-full h-[75px] border-l border-r border-white/20 bg-[radial-gradient(circle,_#1D202A_1px,_transparent_1px)] [background-size:20px_18px] bg-[#000000]"></div>
      <CodingProfiles />
      <div className="w-full h-[75px] border-l border-r border-white/20 bg-[radial-gradient(circle,_#1D202A_1px,_transparent_1px)] [background-size:20px_18px] bg-[#000000]"></div>
      <Github />
      <div className="w-full h-[75px] border-l border-r border-white/20 bg-[radial-gradient(circle,_#1D202A_1px,_transparent_1px)] [background-size:20px_18px] bg-[#000000]"></div>
      <About />
      <div className="w-full h-[75px] border-l border-r border-white/20 bg-[radial-gradient(circle,_#1D202A_1px,_transparent_1px)] [background-size:20px_18px] bg-[#000000]"></div>
      <GetInTouch />
    </div>
  );
};

export default Home;
