import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import bharatnetra from "../../public/bharatnetra.png";
import sudarshan from "../../public/sudarshan.png";
import hearwear from "../../public/hearwear.png";

const Projects = () => {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(null);

  const projects = [
    {
      name: "Bharat Netra",
      desc: "Law Enforcement Website.",
      img: bharatnetra,
      url: "https://official-bharat-netra.vercel.app/", // replace later
    },
    {
      name: "Sudarshan",
      desc: "Cyber Crime Report Portal.",
      img: sudarshan,
      url: "https://sudarshan-tawny.vercel.app/", // replace later
    },
    {
      name: "HearWear",
      desc: "Hearing Aid for Partially Deaf People.",
      img: hearwear,
      url: "https://hear-wear.vercel.app/", // replace later
    },
  ];

  const handleMouseMove = (e) => setPos({ x: e.clientX, y: e.clientY });
  const handleClick = (url) => {
    if (url && url !== "#") window.open(url, "_blank");
  };

  return (
    <div
      className="w-full min-h-screen bg-black text-white border border-white/20 font-space overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <header className="w-full px-10 h-[75px] border-white/20 border-b flex justify-between items-center">
        <span className="text-4xl font-bold">Projects</span>
        <div className="bg-[#1C1C1F] px-4 py-2 rounded-lg border border-white/10 cursor-pointer hover:bg-[#222226]">
          See all
        </div>
      </header>

      {/* Main Section */}
      <main className="px-10 py-5 relative">
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <div
              onMouseEnter={() => {
                setHovered(true);
                setActiveIndex(index);
              }}
              onMouseLeave={() => {
                setHovered(false);
                setActiveIndex(null);
              }}
              onClick={() => handleClick(project.url)}
              className={`flex justify-between items-center rounded-lg px-5 py-5 cursor-pointer transition-all duration-300 ${
                activeIndex === index ? "scale-[1.02]  " : "scale-100"
              }`}
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-5xl font-semibold">{project.name}</h3>
                <p className="text-[#99A1AF] text-lg">{project.desc}</p>
              </div>

              <div className="border-white/20 border-2 rounded-lg overflow-hidden">
                <div className="w-[300px] h-[150px] rounded border-8 border-[#18181B] overflow-hidden">
                  <img
                    src={project.img}
                    className="w-full h-full object-cover rounded-lg"
                    alt={project.name}
                  />
                </div>
              </div>
            </div>

            {/* line between projects */}
            {index !== projects.length - 1 && (
              <div className="w-full h-[2px] bg-white/10"></div>
            )}
          </React.Fragment>
        ))}

        {/* Cursor-follow “Visit” tooltip */}
        {hovered && (
          <div
            className="fixed z-50 flex items-center gap-2 bg-[#252528] text-white px-4 py-2 rounded-full text-sm font-medium pointer-events-none transition-opacity duration-150"
            style={{
              top: pos.y - 10,
              left: pos.x + 25,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span>Visit</span>
            <ArrowUpRight size={18} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
