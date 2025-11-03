import React from "react";
import ContributionGraph from "./ContributionGraph";

const Github = () => {
  return (
    <div className="w-full bg-black text-white border border-white/20 font-space overflow-hidden h-auto">
      {/* Header */}
      <header className="w-full px-10 h-[75px] border-white/20 border-b flex justify-between items-center">
        <span className="text-4xl font-bold">Github Graph</span>
      </header>
      <main className="py-8 flex justify-center items-center">
        <ContributionGraph username="IndSumit07" />
      </main>
    </div>
  );
};

export default Github;
