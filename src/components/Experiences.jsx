import { ChevronUp, Dot, Award } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Experiences = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const experiences = [
    {
      id: 1,
      title: "APGC Conference Website",
      type: "Internship",
      logo: "/gla.png",
      details: [
        "Astroparticle Physics, Gravitation and Cosmology is an International Conference organised by GLA University Mathura.",
        "In this Internship I created a website for this conference and received a Letter of Appreciation from GLA University, Mathura.",
      ],
      tech: ["React.js", "Tailwind CSS", "Vercel", "GitHub"],
    },
    {
      id: 2,
      title: "Smart India Hackathon 2025 Internal",
      type: "Hackathon",
      logo: "https://imgs.search.brave.com/DBs5TimjA1YvSN5llECBsRSJjClerQhoIkK8zzk6GxM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jc2Uu/bm90aWNlYmFyZC5j/b20vd3AtY29udGVu/dC91cGxvYWRzL3Np/dGVzLzIzLzIwMjQv/MDgvU21hcnQtSW5k/aWEtSGFja2F0aG9u/LTIwMjQuanBn",
      details: [
        "Participated in the Internal Smart India Hackathon Organised by GLA University, Mathura",
        ,
      ],
      tech: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Gemini API",
        "Mongo DB",
        "Brevo",
      ],
    },

  ];

  const toggleDrawer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-black text-white border border-white/20 font-space overflow-hidden h-auto">
      {/* Header */}
      <header className="w-full px-6 md:px-10 h-[75px] border-white/20 border-b flex justify-between items-center bg-black/50 backdrop-blur-sm sticky top-0 z-30">
        <span className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Experience
        </span>
        <div
          onClick={() => navigate("/experience")}
          className="bg-[#1C1C1F] px-4 py-2 rounded-lg border border-white/10 cursor-pointer hover:bg-[#222226] hover:border-white/30 transition-all duration-300 text-sm md:text-base"
        >
          See all
        </div>
      </header>

      {/* Experience List */}
      <main>
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col border-b border-white/20"
          >
            {/* Collapsible Header */}
            <div
              className="flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-[#0E0E0F] px-6 md:px-16 py-6 md:py-10 cursor-pointer transition-colors duration-200 gap-4"
              onClick={() => toggleDrawer(index)}
            >
              <div className="flex items-center gap-5 w-full">
                {/* Logo */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl p-[2px] overflow-hidden flex-shrink-0">
                  <div className="w-full h-full rounded-lg border-4 border-[#18181B] overflow-hidden">
                    <img
                      src={exp.logo}
                      alt={exp.title}
                      className="h-full w-full bg-white object-cover rounded-md"
                    />
                  </div>
                </div>

                {/* Title + Type */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold leading-tight">
                    {exp.title}
                  </h3>
                  <span className="bg-[#1E1F21] px-3 py-1 rounded-lg border-white/20 border text-xs md:text-sm w-fit">
                    {exp.type}
                  </span>
                </div>

                {/* Arrow (Mobile: absolute or flex end) */}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-auto"
                >
                  <ChevronUp color="#E5E7EB" />
                </motion.div>
              </div>
            </div>

            {/* Collapsible Body */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden bg-[#0a0a0a]"
                >
                  <div className="px-6 md:px-14 py-4 md:pb-8">
                    {exp.details.map((point, i) => (
                      <div
                        key={i}
                        className="flex justify-start items-start gap-2 mb-2"
                      >
                        <Dot
                          size={24}
                          className="mt-1 flex-shrink-0 text-[#444444]"
                        />
                        <p className="text-[#D1CBD5] text-sm md:text-base leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}

                    {/* Tech Stack */}
                    <div className="mt-4 pl-8 flex flex-wrap justify-start items-center gap-2 md:gap-3">
                      {exp.tech.map((t, i) => (
                        <span
                          key={i}
                          className="bg-[#18181B] px-3 py-1 text-xs md:text-sm border-white/20 border rounded-md hover:border-white/40 font-medium hover:scale-105 transition-all duration-150 select-none text-gray-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* View Certificates Button */}
                    <div className="mt-6 pl-8">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/experience", {
                            state: { experienceId: exp.id },
                          });
                        }}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] hover:from-[#2a2a2a] hover:to-[#3a3a3a] px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 text-sm md:text-base group"
                      >
                        <Award
                          size={18}
                          className="group-hover:scale-110 transition-transform"
                        />
                        <span>View Certificates</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default Experiences;
