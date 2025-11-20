import React, { useEffect, useState } from "react";
import axios from "axios";

const ContributionGraph = ({ username }) => {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

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
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleMouseEnter = (day, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredDay(day);
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  return (
    <div className="bg-black text-white rounded-xl font-space relative">
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          {/* Month Labels */}
          <div className="flex gap-[4px] mb-2">
            {weeks.map((week, i) => {
              const firstDay = week.contributionDays[0];
              if (!firstDay) return <div key={i} className="w-4" />;
              
              const date = new Date(firstDay.date);
              const isFirstWeekOfMonth = date.getDate() <= 7;
              
              return (
                <div key={i} className="w-4 flex-shrink-0">
                  {isFirstWeekOfMonth && (
                    <span className="block text-[10px] text-gray-500 whitespace-nowrap">
                      {date.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contribution Grid */}
          <div className="flex gap-[4px]">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[4px] flex-shrink-0">
                {week.contributionDays.map((day, j) => (
                  <div
                    key={j}
                    onMouseEnter={(e) => handleMouseEnter(day, e)}
                    onMouseLeave={handleMouseLeave}
                    className={`w-4 h-4 rounded-sm ${getColor(
                      day.contributionCount
                    )} transition-all duration-150 hover:ring-2 hover:ring-white/50 cursor-pointer`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 px-3 py-2 bg-[#1c1c1c] border border-white/20 rounded-md shadow-xl text-sm pointer-events-none whitespace-nowrap"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="font-semibold">
            {hoveredDay.contributionCount} {hoveredDay.contributionCount === 1 ? 'contribution' : 'contributions'}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            {formatDate(hoveredDay.date)}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4">
        <div className="text-xs sm:text-sm text-gray-400">
          {total} contributions in the last year
        </div>

        <div className="flex gap-1 text-[10px] sm:text-xs text-gray-400 items-center">
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
