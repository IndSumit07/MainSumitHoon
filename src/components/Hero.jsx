import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import github from "../../public/github.png";
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
} from "lucide-react";

const Hero = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [loopIndex, setLoopIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const navigate = useNavigate();

  const roles = ["Developer", "UI/UX Master", "ML Engineer", "Data Analyst"];

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
    <div className="w-full h-screen bg-black flex flex-col border border-white/20 font-space text-white relative">
      {/* Floating Bar */}
      <div className="fixed z-50 bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-sm bg-[#1b1b1b]/80 px-6 py-4 rounded-full border border-white/20 flex justify-center items-center gap-6">
        {/* Social Icons */}
        {[
          {
            id: 1,
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 256 256"
                fill="#ffffff"
              >
                <g transform="scale(8.53333, 8.53333)">
                  <path d="M26.37,26l-8.795,-12.822l0.015,0.012l7.93,-9.19h-2.65l-6.46,7.48l-5.13,-7.48h-6.95l8.211,11.971l-8.66,10.03h2.65l7.182,-8.322l5.708,8.322zM10.23,6l12.34,18h-2.1l-12.35,-18z"></path>
                </g>
              </svg>
            ),
            link: "",
          },
          {
            id: 2,
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
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
          },
          {
            id: 3,
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
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
          },
        ].map((icon) => (
          <a
            href={icon.link}
            key={icon.id}
            className="bg-[#2e2e2f] p-2 rounded-full transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
          >
            {icon.svg}
          </a>
        ))}

        {/* Expand on hover green dot */}
        <div className="group relative flex items-center bg-[#2e2e2f] rounded-full px-2 py-1 cursor-pointer transition-all duration-300 hover:px-5">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="ml-0 max-w-0 overflow-hidden text-gray-300 text-sm opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-[200px] group-hover:opacity-100 whitespace-nowrap">
            Studying at GLA University
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="w-full h-[100px] flex justify-between items-center px-10 border-white/20 border-b">
        <h1 className="font-space text-2xl font-semibold">@code by Sumit</h1>
        <div className="flex justify-center items-center gap-8">
          <h3 className="font-semibold cursor-pointer">Projects</h3>
          <div className="flex justify-center items-center gap-5">
            <div
              onClick={() => setIsSearchOpen(true)}
              className="h-[54px] flex justify-center items-center px-4 border-white/15 rounded-lg border-2 gap-3 hover:border-[#b2b2d8] transition-all duration-300 cursor-pointer"
            >
              <span className="text-[#b2b2d8]">Search</span>
              <div className="flex justify-center items-center gap-1">
                <span className="bg-[#252528] px-2 py-1 rounded text-sm">
                  Ctrl
                </span>
                <span className="bg-[#252528] px-2 py-1 rounded text-sm">
                  K
                </span>
              </div>
            </div>
            <div
              onClick={() => handleClick("https://github.com/IndSumit07")}
              className="h-[54px] w-[54px] flex justify-center items-center border-white/15 rounded-lg border-2 cursor-pointer hover:border-[#b2b2d8] transition-all duration-300"
            >
              <img className="w-6" src={github} alt="github" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main>
        <h3 className="pt-12 px-10 text-9xl font-bold">
          Hi I'm Sumit <br /> I am a{" "}
          <span className="border-r-4 border-[#b2b2d8] pr-2 animate-pulse">
            {displayText}
          </span>
        </h3>
        <p className="w-3/5 px-10 pt-10 text-2xl text-white/55 leading-snug">
          I build Websites that look and feel good to use. <br /> Specialized in
          Full Stack Development and UI & UX Design.
          <br />I am also a Data Analyst and ML Engineer.
        </p>
        <div className="flex justify-start items-center px-10 py-10 gap-4">
          <div className="flex justify-center items-center bg-[#171717] px-5 py-3 rounded-md gap-2 border border-white/10 hover:bg-[#222226] transition-all duration-150 text-[#99A1AF] cursor-pointer select-none">
            <span>Download Resume</span>
            <FileDown color="#99A1AF" />
          </div>
          <div className="flex justify-center items-center bg-[#171717] px-5 py-3 rounded-md gap-2 border border-white/10 text-[#99A1AF] hover:bg-[#222226] transition-all duration-150 cursor-pointer select-none">
            <span>Get in Touch</span>
            <UserRound color="#99A1AF" />
          </div>
        </div>
      </main>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 flex flex-col justify-start items-center pt-20 z-50 backdrop-blur-md bg-black/40">
          <div className="flex flex-col justify-between items-center border-2 border-white/10 bg-[#000000] rounded-xl">
            {/* Search Bar */}
            <div className="w-[600px] h-[70px] flex justify-between items-center px-5 border-b-2 border-white/10 gap-4">
              <Search color="#99A1AF" />
              <input
                autoFocus
                className="w-full h-full bg-transparent outline-none text-white text-lg"
                type="text"
                placeholder="Search for pages and sections..."
              />
              <div
                className="text-[#99A1AF] flex justify-center items-center gap-3 cursor-pointer"
                onClick={() => setIsSearchOpen(false)}
              >
                <span className="bg-[#1C1C1F] rounded px-2 py-1 text-[14px]">
                  esc
                </span>
                <X size={20} />
              </div>
            </div>

            {/* Links List */}
            <div className="w-full p-2 border-b-2 border-white/10 flex flex-col gap-2">
              {links.map((link, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(link.route);
                    setIsSearchOpen(false);
                  }}
                  className={`w-full px-5 py-5 rounded-lg flex justify-between items-center transition-all duration-150 select-none cursor-pointer ${
                    selectedIndex === index
                      ? "bg-[#1C1C1F] border-2 border-white/10"
                      : "hover:bg-[#0F0F10] border-2 border-inherit"
                  }`}
                >
                  <div className="flex justify-center items-center gap-5">
                    <div className="bg-[#252528] w-12 h-12 flex justify-center items-center rounded-lg">
                      {link.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold">{link.title}</h3>
                      <p className="text-sm text-[#99A1AF]">{link.desc}</p>
                    </div>
                  </div>
                  <div className="text-sm bg-[#252528] px-3 py-1 rounded-md">
                    Pages
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="w-full bg-[#0A0A0A] px-5 py-5 flex justify-between items-center gap-8">
              <div className="flex justify-center items-center gap-8">
                <div className="flex justify-center items-center gap-1">
                  <div className="bg-[#1C1C1F] p-1.5 rounded">
                    <ArrowUp size={14} color="#99A1AF" />
                  </div>
                  <div className="bg-[#1C1C1F] p-1.5 rounded">
                    <ArrowDown color="#99A1AF" size={14} />
                  </div>
                  <h3 className="text-sm text-[#99A1AF] ml-1">navigate</h3>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div className="bg-[#1C1C1F] p-1.5 rounded">
                    <CornerDownLeft color="#99A1AF" size={14} />
                  </div>
                  <h3 className="text-sm text-[#99A1AF]">enter</h3>
                </div>
              </div>
              <h1 className="text-sm text-[#99A1AF]">@code by Sumit</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
