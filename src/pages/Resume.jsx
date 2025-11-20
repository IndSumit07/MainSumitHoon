import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, FileDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const navigate = useNavigate();
  const [pdfError, setPdfError] = useState(false);
  
  // Path to your resume in the public folder
  // Note: In Vite/React, files in 'public' are served at the root '/'
  const resumeUrl = "/Sumit Kumar Resume.pdf";

  return (
    <div className="w-full min-h-screen bg-black text-white font-space flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_#1b1a1a_0px,_#141414_2px,_#000_2px,_#000_8px)] opacity-50 pointer-events-none" />

      {/* Header */}
      <header className="w-full px-6 md:px-10 py-6 flex justify-between items-center border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Resume
        </h1>

        <a
          href={resumeUrl}
          download="Sumit_Kumar_Resume.pdf"
          className="flex items-center gap-2 bg-[#1C1C1F] hover:bg-[#2a2a2d] text-white px-4 py-2 rounded-lg border border-white/10 transition-all text-sm"
        >
          <FileDown size={18} />
          <span className="hidden sm:inline">Download</span>
        </a>
      </header>

      {/* PDF Viewer */}
      <main className="flex-1 w-full h-full relative z-10 p-4 md:p-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl h-[80vh] bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden shadow-2xl relative"
        >
          <object
            data={resumeUrl}
            type="application/pdf"
            className="w-full h-full"
            onError={() => setPdfError(true)}
          >
            {/* Fallback for browsers that don't support PDF embedding */}
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 gap-4">
              <p className="text-gray-400 text-lg">
                Unable to display PDF directly in this browser.
              </p>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Open PDF in New Tab
              </a>
            </div>
          </object>
        </motion.div>
      </main>
    </div>
  );
};

export default Resume;
