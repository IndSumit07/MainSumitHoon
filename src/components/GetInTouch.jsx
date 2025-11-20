import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GetInTouch = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[60vh] bg-black text-white border border-white/20 font-space overflow-hidden relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />
      
      <main className="px-6 md:px-10 w-full h-full py-8 flex justify-center items-center flex-col gap-6 md:gap-8 relative z-10">
        <motion.h3 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-semibold text-center leading-tight"
        >
          Let's work together
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/75 text-base md:text-xl text-center max-w-2xl"
        >
          Have a project in mind? Let's create something amazing.
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate('/contact')}
          className="flex justify-center items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group cursor-pointer"
        >
          <span className="text-lg font-medium">Get in touch</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </main>
    </div>
  );
};

export default GetInTouch;
