import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(null);
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    try {
      const mq = window.matchMedia("(hover: hover)");
      setSupportsHover(mq.matches);
      const handler = (e) => setSupportsHover(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } catch {
      setSupportsHover(true);
    }
  }, []);

  const projects = [
    {
      name: "Super Pass",
      desc: "All in one event hosting and pass management app.",
      img: "/Superpass.png",
      url: "https://super-pass-delta.vercel.app/",
      repo: "https://github.com/IndSumit07/Super-Pass",
      tech: ["React.js", "Tailwind CSS", "Node.js", "MongoDB", "Express.js", "Razorpay", "Render", "Vercel"],
    },
    {
      name: "Bharat Netra",
      desc: "Law Enforcement Website.",
      img: "/bharatnetra.png",
      url: "https://official-bharat-netra.vercel.app/",
      repo: "https://github.com/CaffeinatedCodersOfficial/Bharat-Netra-Official",
      tech: ["React.js", "Tailwind CSS", "Node.js", "MongoDB", "Express.js", "Render", "Vercel", "APIs"],
    },
    {
      name: "HearWear",
      desc: "Hearing Aid for Partially Deaf People.",
      img: "/hearwear.png",
      url: "https://hear-wear.vercel.app/",
      repo: "https://github.com/yourrepo3",
      tech: ["Python", "Machine Learning", "React.js", "TensorFlow"],
    },
  ];

  const handleMouseMove = (e) => {
    if (supportsHover) setPos({ x: e.clientX, y: e.clientY });
  };

  const openNewTab = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="w-full min-h-screen bg-black text-white border border-white/20 font-space overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <header className="w-full px-6 md:px-10 h-[75px] border-b border-white/20 flex items-center justify-between bg-black/50 backdrop-blur-sm sticky top-0 z-30">
        <span className="text-2xl md:text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Projects
        </span>

        <button className="bg-[#1C1C1F] px-4 py-2 rounded-lg border border-white/10 hover:bg-[#222226] hover:border-white/30 transition-all duration-300 text-sm md:text-base">
          See all
        </button>
      </header>

      {/* Main */}
      <main className="px-4 md:px-10 relative flex flex-col">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col pb-10"
          >
            <motion.div
              onMouseEnter={() =>
                supportsHover && (setHovered(true), setActiveIndex(index))
              }
              onMouseLeave={() =>
                supportsHover && (setHovered(false), setActiveIndex(null))
              }
              onTouchStart={() => setActiveIndex(index)}
              whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
              transition={{ duration: 0.3 }}
              className={`rounded-lg px-4 py-5 transition-colors duration-300 border border-transparent hover:border-white/5 ${
                activeIndex === index ? "bg-white/5" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Left */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-3xl md:text-4xl font-semibold leading-tight group-hover:text-[#b2b2d8] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-[#99A1AF] text-sm sm:text-base mt-2">
                    {project.desc}
                  </p>
                  
                  {/* Tech Stack */}
                  {project.tech && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-[#18181B] px-3 py-1 text-xs md:text-sm border-white/20 border rounded-md hover:border-white/40 font-medium hover:scale-105 transition-all duration-150 select-none text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right (Image + Buttons) */}
                <div className="flex-shrink-0 w-full md:w-[340px]">
                  <div className="rounded-lg border border-white/10 overflow-hidden bg-[#080808] relative group">
                    <img
                      src={project.img}
                      className="w-full h-40 sm:h-44 md:h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      draggable={false}
                      alt={project.name}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                  </div>

                  {/* Buttons */}
                  <div className="mt-3 flex gap-3 pointer-events-auto">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-[#101010] hover:bg-[#1a1a1a] hover:border-white/30 transition-all duration-300 cursor-pointer select-none"
                    >
                      View Live
                      <ArrowUpRight size={16} />
                    </a>

                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-[#101010] hover:bg-[#1a1a1a] hover:border-white/30 transition-all duration-300 cursor-pointer select-none"
                    >
                      View Repo
                      {/* GitHub SVG */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5 
                        .08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 
                        0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 
                        2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 
                        5.403 0 0 0 4 9c0 3.5 3 5.5 6 
                        5.5-.39.49-.68 1.05-.85 
                        1.65-.17.6-.22 1.23-.15 
                        1.85v4"
                        />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Separator */}
            {index !== projects.length - 1 && (
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            )}
          </motion.div>
        ))}

        {/* final line */}
        <div className="w-full h-[2px] bg-white/6" />
      </main>
    </div>
  );
};

export default Projects;
