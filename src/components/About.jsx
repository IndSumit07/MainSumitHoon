import { ArrowUpRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="w-full bg-black text-white border border-white/20 font-space overflow-hidden h-auto">
      {/* Header */}
      <header className="w-full px-6 md:px-10 h-[75px] border-white/20 border-b flex justify-between items-center bg-black/50 backdrop-blur-sm sticky top-0 z-30">
        <span className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          About Me
        </span>
        <div className="bg-[#1C1C1F] px-4 py-2 rounded-lg border border-white/10 cursor-pointer hover:bg-[#222226] hover:border-white/30 transition-all duration-300 text-sm md:text-base">
          See all
        </div>
      </header>

      <main className="px-6 md:px-10 py-8 md:py-12">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl leading-relaxed text-white/75 max-w-4xl"
        >
          I’m a UI/UX Designer and Full Stack Developer based in India,
          currently pursuing my degree at Vishwakarma Institute of Technology,
          Pune. I blend design thinking with technical expertise to create
          intuitive and scalable digital solutions. <br /> <br /> With a strong
          foundation in both design and development, I bridge the gap between
          aesthetics and functionality. My approach combines user-centered
          design principles with robust full-stack development practices,
          ensuring seamless experiences from concept to deployment.
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-start items-center mt-10 gap-6 md:gap-8"
        >
          {[
            { name: "Github", url: "https://github.com/IndSumit07" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/sumit-kumar-545737378/" },
            { name: "Leetcode", url: "https://leetcode.com/u/MainSumitHoon/" },
          ].map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center gap-1 hover:text-[#b2b2d8] cursor-pointer transition-all duration-300 group"
            >
              <span className="text-base md:text-lg font-medium">{link.name}</span>
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default About;
