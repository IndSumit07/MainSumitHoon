import { ArrowRight } from "lucide-react";
import React from "react";

const GetInTouch = () => {
  return (
    <div className="w-full h-[60vh] bg-black text-white border border-white/20 font-space overflow-hidden">
      <main className="px-10 w-full h-full py-8 flex justify-center items-center flex-col gap-8">
        <h3 className="text-5xl font-semibold">Let's work together</h3>
        <p className=" text-white/75 text-lg">
          Have a project in mind? Let’s create something amazing.
        </p>
        <button className=" flex justify-center items-center gap-2 px-6 py-4 rounded-full border-2 border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duratiom-300">
          <span>Get in touch</span>
          <ArrowRight size={20} />
        </button>
      </main>
    </div>
  );
};

export default GetInTouch;
