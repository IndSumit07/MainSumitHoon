import { ArrowLeft, ExternalLink } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Projects = () => {
  const [activeLink, setActiveLink] = useState("All");
  const navigate = useNavigate();

  const projects = [
    {
      name: "Super Pass",
      desc: "All in one event hosting and pass management app.",
      img: "../public/superpass.png",
      url: "https://super-pass-delta.vercel.app/",
      repo: "https://github.com/IndSumit07/Super-Pass",
      category: "Full Stack",
      tech: ["React.js", "Tailwind CSS", "Node.js", "MongoDB", "Express.js", "Razorpay", "Render", "Vercel"],
    },
    {
      name: "Bharat Netra",
      desc: "Law Enforcement Website.",
      img: "/bharatnetra.png",
      category: "Full Stack",
      url: "https://official-bharat-netra.vercel.app/",
      repo: "https://github.com/CaffeinatedCodersOfficial/Bharat-Netra-Official",
      tech: ["React.js", "Tailwind CSS", "Node.js", "MongoDB", "Express.js", "Render", "Vercel", "APIs"],
    },
    {
      name: "HearWear",
      desc: "Hearing Aid for Partially Deaf People.",
      img: "/hearwear.png",
      category: "Full Stack",
      url: "https://hear-wear.vercel.app/",
      repo: "https://github.com/yourrepo3",
      tech: ["Python", "Machine Learning", "React.js", "TensorFlow"],
    },
  ];

  const filteredProjects =
    activeLink === "All"
      ? projects
      : projects.filter((p) => p.category === activeLink);

  return (
    <div className="w-full min-h-screen bg-black text-white font-space flex justify-center bg-[repeating-linear-gradient(45deg,_#1b1a1a_0px,_#141414_2px,_#000_2px,_#000_8px)] bg-repeat bg-fixed">
      <div className="w-full max-w-7xl border-l border-r border-white/20 min-h-screen flex flex-col bg-black">
        <header className="px-6 md:px-20 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/20 bg-black/50 backdrop-blur-sm  top-0 z-30">
          <div className="flex flex-col gap-2 md:gap-5">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-bold"
            >
              Projects
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-xl text-white/50 font-light"
            >
              All my proof of work at one place.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex justify-center items-center gap-3 border-2 border-white/50 px-4 py-2 rounded-xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </motion.div>
        </header>

        <main className="flex flex-col items-center py-10 px-6 md:px-10 flex-1">
          {/* Sorting */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center border border-white/10 p-1 rounded-full gap-2 md:gap-5"
          >
            {["All", "Full Stack", "Frontend", "Data Science"].map((cat) => (
              <div
                key={cat}
                onClick={() => setActiveLink(cat)}
                className={`${
                  activeLink === cat
                    ? "bg-[#1C1C1C] text-white"
                    : "text-white/50 hover:text-white"
                } px-4 py-2 rounded-full transition-all duration-300 cursor-pointer flex justify-center items-center text-sm md:text-base`}
              >
                {cat}
              </div>
            ))}
          </motion.div>

          {/* Main Content */}
          <motion.div 
            layout
            className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={index}
                className="w-full border border-white/10 rounded-xl overflow-hidden bg-[#050505] hover:border-white/30 transition-colors group"
              >
                <div className="w-full h-48 md:h-60 overflow-hidden bg-[#0A0A0A] relative">
                  <img
                    src={project.img}
                    alt={project.name}
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="w-full p-5 flex flex-col gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold group-hover:text-[#b2b2d8] transition-colors">{project.name}</h3>
                    <p className="text-white/50 text-sm mt-2 line-clamp-2">
                      {project.desc}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 text-xs">
                    {project.tech.map((t, i) => (
                      <div key={i} className="bg-[#111111] px-3 py-1 rounded-full border-white/5 select-none border text-white/50">
                        {t}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex justify-center items-center gap-3 pt-2">
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/2 flex gap-2 justify-center items-center border border-white/10 py-2 rounded-md bg-gradient-to-b from-white/10 to-white/5 cursor-pointer hover:bg-gradient-to-b hover:from-white/20 hover:to-white/10 transition-all duration-300"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Live</span>
                    </a>
                    <a 
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/2 flex gap-2 justify-center items-center border border-white/10 py-2 rounded-md bg-gradient-to-b from-white/10 to-white/5 cursor-pointer hover:bg-gradient-to-b hover:from-white/20 hover:to-white/10 transition-all duration-300"
                    >
                      <img src="/github.png" alt="Github" className="w-4 opacity-70" />
                      <span className="text-sm">Github</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
