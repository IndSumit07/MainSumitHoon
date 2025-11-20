import { ArrowLeft } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ExperiencePage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const experienceRefs = useRef({});

  const experiences = [
    {
      id: 1,
      title: "APGC Conference Website",
      company: "GLA University",
      type: "Internship",
      logo: "/gla.png",
      description:
        "Developed a comprehensive website for the Astroparticle Physics, Gravitation and Cosmology International Conference. Received a Letter of Appreciation from GLA University, Mathura for outstanding work.",
      duration: "3 months",
      tech: ["React.js", "Tailwind CSS", "Vercel", "GitHub"],
      certificates: [
        {
          title: "Letter of Appreciation - APGC Conference",
          image:
            "https://res.cloudinary.com/dwfwpivrm/image/upload/v1763626476/APGC_o8iqsb.jpg",
          issuer: "GLA University",
          date: "2024",
        },
      ],
    },
    {
      id: 2,
      title: "Smart India Hackathon 2025 Internal",
      company: "GLA University",
      type: "Hackathon",
      logo: "https://imgs.search.brave.com/DBs5TimjA1YvSN5llECBsRSJjClerQhoIkK8zzk6GxM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jc2Uu/bm90aWNlYmFyZC5j/b20vd3AtY29udGVu/dC91cGxvYWRzL3Np/dGVzLzIzLzIwMjQv/MDgvU21hcnQtSW5k/aWEtSGFja2F0aG9u/LTIwMjQuanBn",
      description:
        "Participated in the Internal Smart India Hackathon Organised by GLA University, Mathura",
      duration: "48 hours",
      tech: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Gemini API",
        "MongoDB",
        "Brevo",
      ],
      certificates: [
        {
          title: "Participation Certificate - SIH 2025",
          image:
            "https://res.cloudinary.com/dwfwpivrm/image/upload/v1763626473/SIH_io2ae2.jpg",
          issuer: "GLA University, Mathura",
          date: "2025",
        },
      ],
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      company: "Cognifyz Technologies",
      type: "Internship",
      logo: "https://cognifyz.com/wp-content/uploads/2023/11/cognifyz-1.png",
      description:
        "Worked as a Data Analyst Intern at Cognifyz Technologies, analyzing large datasets and creating insightful visualizations. Developed data-driven solutions and reports to support business decision-making processes.",
      duration: "2 months",
      tech: [
        "Python",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
        "SQL",
        "Excel",
      ],
      certificates: [
        {
          title: "Data Analyst Internship Certificate",
          image:
            "https://res.cloudinary.com/dwfwpivrm/image/upload/v1763626543/Offer_Letter_ozdrie.jpg",
          issuer: "Cognifyz Technologies",
          date: "2024",
        },
      ],
    },
  ];

  const filteredExperiences =
    activeFilter === "All"
      ? experiences
      : experiences.filter((exp) => exp.type === activeFilter);

  // Scroll to specific experience if coming from homepage
  useEffect(() => {
    if (location.state?.experienceId) {
      const targetId = location.state.experienceId;
      setTimeout(() => {
        const element = experienceRefs.current[targetId];
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Add a brief highlight effect
          element.style.transition = "all 0.3s ease";
          element.style.borderColor = "rgba(178, 178, 216, 0.5)";
          setTimeout(() => {
            element.style.borderColor = "";
          }, 2000);
        }
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="w-full min-h-screen bg-black text-white font-space flex justify-center bg-[repeating-linear-gradient(45deg,_#1b1a1a_0px,_#141414_2px,_#000_2px,_#000_8px)] bg-repeat bg-fixed">
      <div className="w-full max-w-7xl border-l border-r border-white/20 min-h-screen flex flex-col bg-black">
        {/* Header */}
        <header className="px-6 md:px-20 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/20 bg-black/50 backdrop-blur-sm top-0 z-30">
          <div className="flex flex-col gap-2 md:gap-5">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-bold"
            >
              Experience
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-xl text-white/50 font-light"
            >
              My professional journey and achievements.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex justify-center items-center gap-3 border-2 border-white/50 px-4 py-2 rounded-xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back</span>
          </motion.div>
        </header>

        <main className="flex flex-col items-center py-10 px-3 md:px-10 flex-1">
          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center border border-white/10 p-1 rounded-full gap-2 md:gap-5"
          >
            {["All", "Internship", "Hackathon"].map((filter) => (
              <div
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`${
                  activeFilter === filter
                    ? "bg-[#1C1C1C] text-white"
                    : "text-white/50 hover:text-white"
                } px-4 py-2 rounded-full transition-all duration-300 cursor-pointer flex justify-center items-center text-sm md:text-base`}
              >
                {filter}
              </div>
            ))}
          </motion.div>

          {/* Experience Cards */}
          <motion.div layout className="mt-10 w-full max-w-5xl space-y-8">
            {filteredExperiences.map((exp, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                key={exp.id}
                ref={(el) => (experienceRefs.current[exp.id] = el)}
                className="w-full border border-white/10 rounded-xl overflow-hidden bg-[#050505] hover:border-white/30 transition-colors"
              >
                {/* Card Header */}
                <div className="p-6 md:p-8 border-b border-white/10">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Logo */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl p-[2px] overflow-hidden flex-shrink-0 bg-white">
                      <div className="w-full h-full rounded-lg border-4 border-[#18181B] overflow-hidden">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl md:text-3xl font-semibold">
                          {exp.title}
                        </h3>
                        <span className="bg-[#1E1F21] px-3 py-1 rounded-lg border-white/20 border text-xs md:text-sm">
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-[#b2b2d8] text-base md:text-lg mb-2">
                        {exp.company}
                      </p>
                      <p className="text-white/60 text-sm">
                        Duration: {exp.duration}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mt-4">
                    {exp.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-[#18181B] px-3 py-1 text-xs md:text-sm border-white/20 border rounded-md hover:border-white/40 font-medium hover:scale-105 transition-all duration-150 select-none text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certificates Section */}
                {exp.certificates && exp.certificates.length > 0 && (
                  <div className="p-6 md:p-8 bg-[#0a0a0a]">
                    <h4 className="text-lg md:text-xl font-semibold mb-4 text-white/90">
                      Certificates & Recognition
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {exp.certificates.map((cert, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedCertificate(cert)}
                          className="group relative border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-white/30 transition-all duration-300 bg-[#111111]"
                        >
                          <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center overflow-hidden p-2">
                            <img
                              src={cert.image}
                              alt={cert.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentElement.innerHTML =
                                  '<div class="text-white/40 text-sm text-center">Certificate Preview</div>';
                              }}
                            />
                          </div>
                          <div className="p-3 md:p-4">
                            <h5 className="font-semibold text-sm md:text-base mb-1 line-clamp-2">
                              {cert.title}
                            </h5>
                            <p className="text-xs text-white/50">
                              {cert.issuer} • {cert.date}
                            </p>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                            <span className="text-white text-sm font-medium">
                              Click to view
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/20 rounded-xl overflow-hidden my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/70 hover:bg-black/90 rounded-full border border-white/20 transition-colors"
              >
                <span className="text-white text-2xl">×</span>
              </button>

              {/* Certificate Image */}
              <div className="w-full bg-[#111111] flex items-center justify-center p-4 md:p-8">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML =
                      '<div class="text-white/40 p-20 text-center">Certificate image not available</div>';
                  }}
                />
              </div>

              {/* Certificate Info */}
              <div className="p-4 md:p-6 border-t border-white/10">
                <h3 className="text-lg md:text-2xl font-semibold mb-2">
                  {selectedCertificate.title}
                </h3>
                <p className="text-sm md:text-base text-white/60">
                  Issued by {selectedCertificate.issuer} •{" "}
                  {selectedCertificate.date}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperiencePage;
