import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileDown,
  Folder,
  Layers,
  Search,
  UserRound,
  X,
  ArrowDown,
  ArrowUp,
  CornerDownLeft,
  Briefcase,
} from "lucide-react";

const Hero = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [loopIndex, setLoopIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const navigate = useNavigate();

  const roles = ["Developer", "UI/UX Master", "ML Learner", "Data Analyst"];

  // Typing effect
  useEffect(() => {
    const current = loopIndex % roles.length;
    const fullText = roles[current];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(150);
        if (displayText === fullText) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(80);
        if (displayText === "") {
          setIsDeleting(false);
          setLoopIndex(loopIndex + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopIndex]);

  const links = [
    {
      title: "Projects",
      desc: "View my projects",
      icon: <Folder />,
      route: "/projects",
    },
    {
      title: "Experience",
      desc: "View my experience",
      icon: <Briefcase />,
      route: "/experience",
    },
    {
      title: "Tech Stack",
      desc: "View my tech stacks",
      icon: <Layers />,
      route: "/tech-stack",
    },
  ];
  const handleClick = (url) => {
    if (url && url !== "#") window.open(url, "_blank");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }

      if (e.key === "Escape") setIsSearchOpen(false);

      if (isSearchOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % links.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + links.length) % links.length);
        } else if (e.key === "Enter") {
          navigate(links[selectedIndex].route);
          setIsSearchOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, selectedIndex]);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col border border-white/20 font-space text-white relative overflow-hidden">
      {/* Floating Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        transition={{ delay: 1, duration: 0.8, type: "spring" }}
        className="fixed z-40 bottom-4 sm:bottom-6 left-1/2 backdrop-blur-md bg-[#1b1b1b]/80 px-3 sm:px-4 py-3 rounded-full border border-white/20 flex justify-center items-center gap-3 sm:gap-4 shadow-2xl shadow-black/50"
      >
        {/* Social Icons */}
        {[
          {
            id: 1,
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
                fill="#ffffff"
              >
                <g transform="scale(8.53333, 8.53333)">
                  <path d="M26.37,26l-8.795,-12.822l0.015,0.012l7.93,-9.19h-2.65l-6.46,7.48l-5.13,-7.48h-6.95l8.211,11.971l-8.66,10.03h2.65l7.182,-8.322l5.708,8.322zM10.23,6l12.34,18h-2.1l-12.35,-18z" />
                </g>
              </svg>
            ),
            link: "#",
            label: "Custom",
          },
          {
            id: 2,
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            ),
            link: "https://www.linkedin.com/in/sumit-kumar-545737378/",
            label: "LinkedIn",
          },
          {
            id: 3,
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            ),
            link: "https://github.com/IndSumit07",
            label: "GitHub",
          },
        ].map((icon) => (
          <a
            href={icon.link || "#"}
            key={icon.id}
            className="bg-[#2e2e2f] p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:bg-[#3e3e3f] cursor-pointer"
            target={icon.link && icon.link !== "#" ? "_blank" : undefined}
            rel={
              icon.link && icon.link !== "#" ? "noopener noreferrer" : undefined
            }
            aria-label={icon.label}
          >
            {icon.svg}
          </a>
        ))}

        {/* Expand on hover green dot */}
        <div className="group relative flex items-center bg-[#2e2e2f] rounded-full px-3 py-1.5 cursor-pointer transition-all duration-300 hover:px-5 hover:bg-[#3e3e3f]">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          <span className="ml-0 max-w-0 overflow-hidden text-gray-300 text-sm opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-[200px] group-hover:opacity-100 whitespace-nowrap">
            Studying at GLA University
          </span>
        </div>
      </motion.div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-[80px] md:h-[100px] flex justify-between items-center px-5 md:px-10 border-white/20 border-b relative z-10 bg-black/50 backdrop-blur-sm"
      >
        <h1 className="font-space text-xl md:text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">@Sumit</h1>
        <div className="flex justify-center items-center gap-8">
          <Link
            to="/projects"
            className="font-semibold cursor-pointer hover:text-[#b2b2d8] transition-colors duration-300 md:flex hidden"
          >
            Projects
          </Link>
          <div className="flex justify-center items-center gap-5">
            <div
              onClick={() => setIsSearchOpen(true)}
              className="md:h-[54px] h-[40px] flex justify-center items-center px-4 border-white/15 rounded-lg border-2 gap-3 hover:border-[#b2b2d8] hover:bg-white/5 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-[#b2b2d8] md:text-base text-sm group-hover:text-white transition-colors">
                Search
              </span>
              <div className="md:flex hidden justify-center items-center gap-1 ">
                <span className="bg-[#252528] px-2 py-1 rounded text-xs text-gray-400 group-hover:text-white transition-colors">
                  Ctrl
                </span>
                <span className="bg-[#252528] px-2 py-1 rounded text-xs text-gray-400 group-hover:text-white transition-colors">
                  K
                </span>
              </div>
            </div>
            <div
              onClick={() => handleClick("https://github.com/IndSumit07")}
              className="h-[54px] w-[54px] md:flex hidden justify-center items-center border-white/15 rounded-lg border-2 cursor-pointer hover:border-[#b2b2d8] hover:bg-white/5 transition-all duration-300"
            >
              <img className="w-6 opacity-80 hover:opacity-100 transition-opacity" src="/github.png" alt="github" />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col justify-center px-5 md:px-10 pb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Hi I'm Sumit <br /> I am a <br className="md:hidden flex" />{" "}
            <span className="inline-block border-r-4 border-[#b2b2d8] pr-2 animate-pulse text-[#b2b2d8]">
              {displayText}
            </span>
          </h3>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full md:w-3/4 lg:w-1/2 pt-6 md:pt-10 text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed"
        >
          I build Websites that look and feel good to use. <br className="hidden md:block" /> Specialized in
          Full Stack Development and UI & UX Design.
          <br />I am also a Data Analyst and ML Engineer.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-start items-center mt-8 md:mt-12 gap-4"
        >
          <button className="group flex justify-center items-center bg-[#171717] px-6 py-3.5 rounded-lg gap-3 border border-white/10 hover:bg-[#222226] hover:border-white/30 transition-all duration-300 text-gray-300 hover:text-white w-full sm:w-auto">
            <span className="font-medium">Download Resume</span>
            <FileDown size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
          </button>
          <button className="group flex justify-center items-center bg-[#171717] px-6 py-3.5 rounded-lg gap-3 border border-white/10 hover:bg-[#222226] hover:border-white/30 transition-all duration-300 text-gray-300 hover:text-white w-full sm:w-auto">
            <span className="font-medium">Get in Touch</span>
            <UserRound size={20} className="group-hover:scale-110 transition-transform duration-300" />
          </button>
        </motion.div>
      </main>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-16 px-4 sm:px-6 bg-black/60 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl"
            >
              {/* Search Bar */}
              <div className="flex items-center gap-3 px-3 sm:px-5 py-3 sm:py-4 border-b border-white/10">
                <div className="flex-shrink-0">
                  <Search color="#fff" />
                </div>

                <input
                  autoFocus
                  type="text"
                  placeholder="Search for pages and sections..."
                  className="flex-1 bg-transparent outline-none text-white text-base sm:text-lg placeholder-white/40 py-2"
                  aria-label="Search input"
                />

                <div
                  className="flex items-center gap-3 ml-2 cursor-pointer hover:opacity-80 transition-opacity"
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsSearchOpen(false)}
                  onKeyDown={(e) => e.key === "Enter" && setIsSearchOpen(false)}
                >
                  <span className="hidden sm:inline-block bg-[#1C1C1F] rounded px-2 py-1 text-sm text-gray-400">
                    esc
                  </span>
                  <X size={20} className="text-white" />
                </div>
              </div>

              {/* Links List (scrollable on small screens) */}
              <div className="max-h-[60vh] sm:max-h-[50vh] overflow-y-auto p-2 border-b border-white/10">
                {links.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(link.route);
                      setIsSearchOpen(false);
                    }}
                    className={`w-full text-left px-3 sm:px-5 py-3 sm:py-4 rounded-lg mb-2 flex items-center justify-between gap-4 transition-all duration-150 focus:outline-none
                ${
                  selectedIndex === index
                    ? "bg-[#1C1C1F] border border-white/10"
                    : "hover:bg-[#0F0F10] border border-transparent"
                }`}
                    aria-current={selectedIndex === index ? "true" : "false"}
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 bg-[#252528] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-white">
                        {link.icon}
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-sm sm:text-base text-white">
                          {link.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/60">
                          {link.desc}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:inline-block text-sm bg-[#252528] px-3 py-1 rounded-md text-gray-400">
                      Pages
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-3 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#080808]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#1C1C1F] p-1 rounded">
                      <ArrowUp size={14} color="#fff" />
                    </div>
                    <div className="bg-[#1C1C1F] p-1 rounded">
                      <ArrowDown size={14} color="#fff" />
                    </div>
                    <span className="text-sm text-white/60 ml-1 hidden sm:inline">
                      navigate
                    </span>
                  </div>

                  <div className="flex items-center gap-2 ml-2">
                    <div className="bg-[#1C1C1F] p-1 rounded">
                      <CornerDownLeft color="#fff" size={14} />
                    </div>
                    <span className="text-sm text-white/60">enter</span>
                  </div>
                </div>

                <div className="text-sm text-white/60">@code by Sumit</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
