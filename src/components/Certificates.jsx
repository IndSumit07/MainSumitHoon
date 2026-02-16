import { ExternalLink, Award } from "lucide-react";
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
        },
        {
            id: 2,
            title: "Letter of Appreciation - APGC Conference",
            image: "https://res.cloudinary.com/dwfwpivrm/image/upload/v1763626476/APGC_o8iqsb.jpg",
            issuer: "GLA University",
            date: "2025",
        },
        {
            id: 3,
            title: "Next.js Course Completion",
            image: "/next-js-gfg.png",
            issuer: "GeeksforGeeks",
            date: "2026",
        }
    ];

    return (
        <div className="w-full bg-black text-white border border-white/20 font-space overflow-hidden h-auto">
            {/* Header */}
            <header className="w-full px-6 md:px-10 h-[75px] border-white/20 border-b flex justify-between items-center bg-black/50 backdrop-blur-sm sticky top-0 z-30">
                <span className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Certificates
                </span>
                <div
                    onClick={() => navigate("/certificates")}
                    className="bg-[#1C1C1F] px-4 py-2 rounded-lg border border-white/10 cursor-pointer hover:bg-[#222226] hover:border-white/30 transition-all duration-300 text-sm md:text-base"
                >
                    See all
                </div>
            </header>

            {/* Certificates Grid */}
            <main className="p-6 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
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
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h5 className="font-semibold text-base mb-1 group-hover:text-[#b2b2d8] transition-colors line-clamp-2">
                                        {cert.title}
                                    </h5>
                                </div>
                                <div className="flex justify-between items-center text-xs text-white/40 mt-3 pt-3 border-t border-white/10">
                                    <span>{cert.issuer}</span>
                                    <span>{cert.date}</span>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                <span className="text-white font-medium flex items-center gap-2">
                                    <Award size={18} /> View Certificate
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

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
                            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/20 rounded-xl overflow-hidden my-8"
                        >
                            <button
                                onClick={() => setSelectedCertificate(null)}
                                className="absolute top-4 right-4 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-black/70 hover:bg-black/90 rounded-full border border-white/20 transition-colors"
                            >
                                <span className="text-white text-xl md:text-2xl">×</span>
                            </button>

                            <div className="w-full bg-[#111111] flex items-center justify-center p-4 md:p-8">
                                <img
                                    src={selectedCertificate.image}
                                    alt={selectedCertificate.title}
                                    className="w-full h-auto max-h-[70vh] object-contain"
                                />
                            </div>

                            <div className="p-4 md:p-6 border-t border-white/10 bg-[#050505]">
                                <h3 className="text-lg md:text-2xl font-semibold mb-2">
                                    {selectedCertificate.title}
                                </h3>
                                <p className="text-sm md:text-base text-white/60">
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
