import { ChevronUp, Dot } from "lucide-react";
import React, { useState } from "react";
import buildathon from "../../public/buildathon.png";
import gla from "../../public/gla.png";

const Experiences = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const experiences = [
    {
      id: 1,
      title: "APGC Conference Website",
      type: "Internship",
      logo: gla,
      details: [
        "Astroparticle Physics, Gravitation and Cosmology is an International Conference organised by GLA University Mathura.",
        "In this Internship I created a website for this conference and received a Letter of Appreciation from GLA University, Mathura.",
      ],
      tech: ["React.js", "Tailwind CSS", "Vercel", "GitHub"],
    },
    {
      id: 2,
      title: "Smart India Hackathon 2024",
      type: "Hackathon",
      logo: "https://imgs.search.brave.com/DBs5TimjA1YvSN5llECBsRSJjClerQhoIkK8zzk6GxM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jc2Uu/bm90aWNlYmFyZC5j/b20vd3AtY29udGVu/dC91cGxvYWRzL3Np/dGVzLzIzLzIwMjQv/MDgvU21hcnQtSW5k/aWEtSGFja2F0aG9u/LTIwMjQuanBn",
      details: [
        "Participated in the national-level Smart India Hackathon 2024 organized by the Government of India.",
        "Developed a cyber monitoring dashboard for rural internet safety under the BharatNet initiative.",
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
    {
      id: 3,
      title: "Buildathon 2.0",
      type: "Hackathon",
      logo: buildathon,
      details: [
        "Ranked in the Top 5 teams in Buildathon 2.0 conducted by GLA University.",
        "Built an AI-powered productivity tracker with a clean React-based interface.",
      ],
      tech: ["React", "Tailwind CSS", "MongoDB", "Node.js", "Express.js"],
    },
  ];

  const toggleDrawer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-black text-white border border-white/20 font-space overflow-hidden h-auto">
      {/* Header */}
      <header className="w-full px-10 h-[75px] border-white/20 border-b flex justify-between items-center">
        <span className="text-4xl font-bold">Experience</span>
        <div className="bg-[#1C1C1F] px-4 py-2 rounded-lg border border-white/10 cursor-pointer hover:bg-[#222226]">
          See all
        </div>
      </header>

      {/* Experience List */}
      <main>
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className="flex flex-col border-b border-white/20 transition-all duration-300"
          >
            {/* Collapsible Header */}
            <div
              className="flex justify-between items-center hover:bg-[#0E0E0F] px-16 py-10 cursor-pointer transition-colors duration-200"
              onClick={() => toggleDrawer(index)}
            >
              <div className="flex justify-center items-center gap-5">
                {/* Logo */}
                <div className="w-14 h-14 rounded-xl p-[2px] overflow-hidden">
                  <div className="w-full h-full rounded-lg border-4 border-[#18181B] overflow-hidden">
                    <img
                      src={exp.logo}
                      alt={exp.title}
                      className="h-full bg-white object-cover rounded-md"
                    />
                  </div>
                </div>

                {/* Title + Type */}
                <h3 className="text-2xl font-semibold">{exp.title}</h3>
                <p className="bg-[#1E1F21] px-3 py-1.5 rounded-lg border-white/20 border text-sm">
                  {exp.type}
                </p>
              </div>

              {/* Arrow */}
              <div
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                <ChevronUp color="#E5E7EB" />
              </div>
            </div>

            {/* Collapsible Body */}
            <div
              className={`overflow-hidden transition-all px-14 duration-500 ${
                openIndex === index ? "max-h-[300px] py-4" : "max-h-0 py-0"
              }`}
            >
              {exp.details.map((point, i) => (
                <div key={i} className="flex justify-start items-center">
                  <Dot size={50} color="#444444" />
                  <p className="text-[#D1CBD5]">{point}</p>
                </div>
              ))}

              {/* Tech Stack */}
              <div className="mt-3 pl-8 py-2 flex flex-wrap justify-start items-center gap-3">
                {exp.tech.map((t, i) => (
                  <span
                    key={i}
                    className="bg-[#18181B] px-3 py-1 text-sm border-white/20 border rounded-md hover:border-white/10 font-medium hover:scale-105 transition-all duration-150 select-none"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Experiences;
