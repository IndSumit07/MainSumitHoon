import { ArrowLeft, Award, ExternalLink } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Certificates = () => {
    const navigate = useNavigate();
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const certificates = [
        {
            id: 1,
            title: "Participation Certificate - SIH 2025",
            image: "https://res.cloudinary.com/dwfwpivrm/image/upload/v1763626473/SIH_io2ae2.jpg",
            issuer: "GLA University, Mathura",
            date: "2025",
            description: "Participated in the Internal Smart India Hackathon Organised by GLA University, Mathura"
        },
        {
            id: 2,
            title: "Letter of Appreciation - APGC Conference",
            image: "https://res.cloudinary.com/dwfwpivrm/image/upload/v1763626476/APGC_o8iqsb.jpg",
            issuer: "GLA University",
            date: "2025",
            description: "Appreciation for developing the conference website."
        },
        {
            id: 3,
            title: "Next.js Course Completion",
            image: "/next-js-gfg.png",
            issuer: "GeeksforGeeks",
            date: "2026", // Assuming 2024 based on typical timelines, user can update
            description: "Certified for completing the Next.js course from GeeksforGeeks."
        }
    ];

    return (
        <div className="w-full min-h-screen bg-black text-white font-space flex justify-center bg-[repeating-linear-gradient(45deg,_#1b1a1a_0px,_#141414_2px,_#000_2px,_#000_8px)] bg-repeat bg-fixed">
            <div className="w-full max-w-7xl border-l border-r border-white/20 min-h-screen flex flex-col bg-black">
                {/* Header */}
                <header className="px-6 md:px-20 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/20 bg-black/50 backdrop-blur-sm sticky top-0 z-30">
                    <div className="flex flex-col gap-2 md:gap-5">
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-6xl lg:text-8xl font-bold"
                        >
                            Certificates
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-base md:text-xl text-white/50 font-light"
                        >
                            My certifications and achievements.
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                        {certificates.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedCertificate(cert)}
                                className="group relative border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-white/30 transition-all duration-300 bg-[#111111] flex flex-col"
                            >
                                <div className="w-full aspect-[4/3] bg-[#1a1a1a] flex items-center justify-center overflow-hidden p-4">
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
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-xl font-semibold mb-2 group-hover:text-[#b2b2d8] transition-colors">
                                            {cert.title}
                                        </h4>
                                        <p className="text-white/60 text-sm mb-4">
                                            {cert.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-white/40 border-t border-white/10 pt-4">
                                        <span>{cert.issuer}</span>
                                        <span>{cert.date}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Modal */}
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
                            <button
                                onClick={() => setSelectedCertificate(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/70 hover:bg-black/90 rounded-full border border-white/20 transition-colors"
                            >
                                <span className="text-white text-2xl">×</span>
                            </button>

                            <div className="w-full bg-[#111111] flex items-center justify-center p-4 md:p-8">
                                <img
                                    src={selectedCertificate.image}
                                    alt={selectedCertificate.title}
                                    className="w-full h-auto max-h-[75vh] object-contain"
                                />
                            </div>

                            <div className="p-6 border-t border-white/10 bg-[#050505]">
                                <h3 className="text-2xl font-semibold mb-2">
                                    {selectedCertificate.title}
                                </h3>
                                <p className="text-white/60">
                                    Issued by {selectedCertificate.issuer} • {selectedCertificate.date}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Certificates;
