import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import LeetCodeGraph from "./LeetCodeGraph";

const CodingProfiles = () => {
    const profiles = [
        {
            name: "LeetCode",
            username: "MainSumitHoon",
            url: "https://leetcode.com/MainSumitHoon",
            icon: "/icons/leetcode.svg",
            color: "hover:bg-[#ffa116]/10 hover:border-[#ffa116]/50",
            textColor: "text-[#ffa116]",
        },
        {
            name: "Codeforces",
            username: "MainSumitHoon",
            url: "https://codeforces.com/profile/MainSumitHoon",
            icon: "/icons/codeforces.svg",
            color: "hover:bg-[#1f8dd6]/10 hover:border-[#1f8dd6]/50",
            textColor: "text-[#1f8dd6]",
        },
        {
            name: "AtCoder",
            username: "mainsumithoon",
            url: "https://atcoder.jp/users/mainsumithoon",
            icon: "/icons/atcoder.png",
            color: "hover:bg-[#1f8dd6]/10 hover:border-[#1f8dd6]/50",
            textColor: "text-[#1f8dd6]",
        },
        {
            name: "GeeksforGeeks",
            username: "mainsumithoon",
            url: "https://www.geeksforgeeks.org/user/mainsumithoon/",
            icon: "/icons/geeksforgeeks.svg",
            color: "hover:bg-[#2f8d46]/10 hover:border-[#2f8d46]/50",
            textColor: "text-[#2f8d46]",
        },
        {
            name: "CodeChef",
            username: "mainsumithoon",
            url: "https://www.codechef.com/users/mainsumithoon",
            icon: "/icons/codechef.svg",
            color: "hover:bg-[#5b4638]/10 hover:border-[#5b4638]/50",
            textColor: "text-[#c7a17a]",
        },
    ];

    return (
        <div className="w-full bg-black text-white border border-white/20 font-space overflow-hidden h-auto">
            {/* Header */}
            <header className="w-full px-6 md:px-10 h-[75px] border-white/20 border-b flex justify-between items-center bg-black/50 backdrop-blur-sm sticky top-0 z-30">
                <span className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Coding Profiles
                </span>
            </header>

            <main className="py-8 md:py-12 px-4 md:px-10 flex flex-col gap-8">
                {/* Profile Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {profiles.map((profile, index) => (
                        <motion.a
                            key={profile.name}
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center justify-between p-6 rounded-xl border border-white/20 bg-[#0a0a0a] transition-all duration-300 group ${profile.color}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-white p-2 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={profile.icon}
                                        alt={profile.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-lg font-bold ${profile.textColor}`}>
                                        {profile.name}
                                    </span>
                                    <span className="text-gray-400 text-sm">@{profile.username}</span>
                                </div>
                            </div>
                            <ExternalLink
                                size={20}
                                className="text-gray-500 group-hover:text-white transition-colors"
                            />
                        </motion.a>
                    ))}
                </div>

                {/* LeetCode Graph Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full overflow-hidden flex flex-col gap-4"
                >
                    <h3 className="text-xl font-bold text-gray-200">
                        LeetCode Activity
                    </h3>
                    <LeetCodeGraph username="MainSumitHoon" />
                </motion.div>
            </main>
        </div>
    );
};

export default CodingProfiles;
