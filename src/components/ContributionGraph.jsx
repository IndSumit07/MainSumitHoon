import React, { useEffect, useState } from "react";
import axios from "axios";

const ContributionGraph = ({ username }) => {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const query = `
          query {
            user(login: "${username}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `;

        const res = await axios.post(
          "https://api.github.com/graphql",
          { query },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // replace with env variable
            },
          }
        );

        const calendar =
          res.data.data.user.contributionsCollection.contributionCalendar;

        setWeeks(calendar.weeks);
        setTotal(calendar.totalContributions);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchContributions();
  }, [username]);

  // Determine color level for each contribution
  const getColor = (count) => {
    if (count === 0) return "bg-[#161b22]";
    if (count < 3) return "bg-[#0e4429]";
    if (count < 6) return "bg-[#006d32]";
    if (count < 10) return "bg-[#26a641]";
    return "bg-[#39d353]";
  };

  return (
    <div className="bg-black text-white rounded-xl font-space">
      <div className="overflow-x-auto">
        <div className="flex gap-[4px]">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-[4px]">
              {week.contributionDays.map((day, j) => (
                <div
                  key={j}
                  title={`${day.date} - ${day.contributionCount} contributions`}
                  className={`w-4 h-4 rounded-sm ${getColor(
                    day.contributionCount
                  )} transition-colors duration-150 hover:opacity-80`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="text-sm text-gray-400">
          {total} contributions in the last year
        </div>

        <div className="flex gap-1 text-xs text-gray-400">
          <span>Less</span>
          <div className="w-3 h-3 bg-[#161b22] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#0e4429] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#006d32] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#26a641] rounded-sm"></div>
          <div className="w-3 h-3 bg-[#39d353] rounded-sm"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;
