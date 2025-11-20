import React from "react";
import { motion } from "framer-motion";
import ContributionGraph from "./ContributionGraph";

const Github = () => {
  return (
    <div className="w-full bg-black text-white border border-white/20 font-space overflow-hidden h-auto">
      {/* Header */}
      <header className="w-full px-6 md:px-10 h-[75px] border-white/20 border-b flex justify-between items-center bg-black/50 backdrop-blur-sm sticky top-0 z-30">
        <span className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Github Graph
        </span>
      </header>
      <main className="py-8 md:py-12 flex justify-center items-center px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full overflow-hidden"
        >
          <ContributionGraph username="IndSumit07" />
        </motion.div>
      </main>
    </div>
  );
};

export default Github;
