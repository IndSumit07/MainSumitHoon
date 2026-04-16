import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Experiences from "../components/Experiences";
import Github from "../components/Github";
import About from "../components/About";
import GetInTouch from "../components/GetInTouch";
import Certificates from "../components/Certificates";
import CodingProfiles from "../components/CodingProfiles";
import WelcomeIntro from "../components/WelcomeIntro";

const WELCOME_INTRO_SEEN_KEY = "welcome-intro-seen";

const Home = () => {
  const [showWelcomeIntro, setShowWelcomeIntro] = useState(() => {
    try {
      return sessionStorage.getItem(WELCOME_INTRO_SEEN_KEY) !== "true";
    } catch {
      return true;
    }
  });

  const handleWelcomeComplete = () => {
    try {
      sessionStorage.setItem(WELCOME_INTRO_SEEN_KEY, "true");
    } catch {
      // Ignore storage failures and continue with local state.
    }
    setShowWelcomeIntro(false);
  };

  useEffect(() => {
    if (!showWelcomeIntro) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showWelcomeIntro]);

  return (
    <div className="md:px-24 relative">
      {showWelcomeIntro && <WelcomeIntro onComplete={handleWelcomeComplete} />}
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
