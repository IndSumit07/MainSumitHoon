import { ArrowUpRight } from "lucide-react";
import React from "react";

const About = () => {
  return (
    <div className="w-full bg-black text-white border border-white/20 font-space overflow-hidden h-auto">
      {/* Header */}
      <header className="w-full px-10 h-[75px] border-white/20 border-b flex justify-between items-center">
        <span className="text-4xl font-bold">About Me</span>
        <div className="bg-[#1C1C1F] px-4 py-2 rounded-lg border border-white/10 cursor-pointer hover:bg-[#222226]">
          See all
        </div>
      </header>

      <main className="px-10 py-8">
        <h3 className="text-xl leading-relaxed text-white/75">
          I’m a UI/UX Designer and Full Stack Developer based in India,
          currently pursuing my degree at Vishwakarma Institute of Technology,
          Pune. I blend design thinking with technical expertise to create
          intuitive and scalable digital solutions. <br /> <br /> With a strong
          foundation in both design and development, I bridge the gap between
          aesthetics and functionality. My approach combines user-centered
          design principles with robust full-stack development practices,
          ensuring seamless experiences from concept to deployment.
        </h3>

        <div className="flex justify-start items-center mt-10 gap-8">
          <a
            href="https://github.com/IndSumit07"
            className="flex justify-center items-center gap-1 hover:underline cursor-pointer transition-all duration-300"
          >
            <span>Github</span>
            <ArrowUpRight size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/sumit-kumar-545737378/"
            className="flex justify-center items-center gap-1 hover:underline cursor-pointer transition-all duration-300"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={20} />
          </a>
          <a
            href="https://leetcode.com/u/MainSumitHoon/"
            className="flex justify-center items-center gap-1 hover:underline cursor-pointer transition-all duration-300"
          >
            <span>Leetcode</span>
            <ArrowUpRight size={20} />
          </a>
        </div>
      </main>
    </div>
  );
};

export default About;
