import React, { useEffect, useState } from "react";
import axios from "axios";

const ContributionGraph = ({ username }) => {
  const [months, setMonths] = useState([]);
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

        setTotal(calendar.totalContributions);
        processData(calendar.weeks);

      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchContributions();
  }, [username]);

  const processData = (weeks) => {
    // Flatten all days from the GitHub weeks structure
    const allDays = weeks.flatMap(week => week.contributionDays);

    const monthsData = [];
    let currentMonth = null;
    let currentWeek = Array(7).fill(null);

    allDays.forEach((dayData) => {
      const date = new Date(dayData.date);
      const dayIdx = date.getDay();
      const monthIdx = date.getMonth();
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });

      // Initialize currentMonth if it's the first iteration
      if (!currentMonth) {
        currentMonth = {
          name: monthName,
          monthIndex: monthIdx,
          weeks: []
        };
      }

      // Check if we moved to a new month
      if (monthIdx !== currentMonth.monthIndex) {
        // Push the pending week to the old month
        if (currentWeek.some(d => d !== null)) {
          currentMonth.weeks.push(currentWeek);
        }
        // Push the old month to the list
        if (currentMonth.weeks.length > 0) {
          monthsData.push(currentMonth);
        }

        // Start a new month
        currentMonth = {
          name: monthName,
          monthIndex: monthIdx,
          weeks: []
        };
        // Reset week
        currentWeek = Array(7).fill(null);

      } else if (dayIdx === 0 && currentWeek.some(d => d !== null)) {
        // It's Sunday, and we have data in the current week, so start a new column (week)
        currentMonth.weeks.push(currentWeek);
        currentWeek = Array(7).fill(null);
      }

      // Place the day in the current week
      currentWeek[dayIdx] = dayData;
    });

    // Handle the last remaining week and month
    if (currentWeek.some(d => d !== null)) {
      currentMonth.weeks.push(currentWeek);
    }
    if (currentMonth && currentMonth.weeks.length > 0) {
      monthsData.push(currentMonth);
    }

    setMonths(monthsData);
  };

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
    <div className="bg-black text-white rounded-xl font-space relative p-4 border border-white/10">
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="flex gap-2">
          {months.map((month, i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* Month Label */}
              <span className="text-xs text-gray-500 h-4 px-1 text-center block">
                {month.name}
              </span>

              {/* Weeks Grid for Grid */}
              <div className="flex gap-[3px]">
                {month.weeks.map((week, j) => (
                  <div key={j} className="flex flex-col gap-[3px]">
                    {week.map((day, k) => {
                      if (!day) return <div key={k} className="w-3 h-3 bg-transparent" />;
                      return (
                        <div
                          key={k}
                          onMouseEnter={(e) => handleMouseEnter(day, e)}
                          onMouseLeave={handleMouseLeave}
                          className={`w-3 h-3 rounded-sm ${getColor(
                            day.contributionCount
                          )} transition-all duration-150 hover:ring-2 hover:ring-white/50 cursor-pointer`}
                        ></div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4 px-1">
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
