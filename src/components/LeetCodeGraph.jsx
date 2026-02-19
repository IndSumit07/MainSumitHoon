import React, { useEffect, useState } from "react";
import axios from "axios";

const LeetCodeGraph = ({ username }) => {
    const [months, setMonths] = useState([]);
    const [total, setTotal] = useState(0);
    const [hoveredDay, setHoveredDay] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeetCodeData = async () => {
            try {
                const res = await axios.get(
                    `https://alfa-leetcode-api.onrender.com/${username}/calendar`
                );

                if (res.data) {
                    const submissionCalendar = JSON.parse(res.data.submissionCalendar || "{}");
                    processData(submissionCalendar);
                }
            } catch (err) {
                console.error("Error fetching LeetCode data:", err);
                setError("Failed to load LeetCode data");
                processData({});
            } finally {
                setLoading(false);
            }
        };

        fetchLeetCodeData();
    }, [username]);

    const processData = (submissionCalendar) => {
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        // Align start date to the previous Sunday
        const dayOfWeek = oneYearAgo.getDay();
        oneYearAgo.setDate(oneYearAgo.getDate() - dayOfWeek);

        const dateToCountMap = {};
        let totalSubmissions = 0;
        Object.keys(submissionCalendar).forEach(timestamp => {
            const date = new Date(parseInt(timestamp) * 1000);
            const dateStr = date.toISOString().split('T')[0];
            dateToCountMap[dateStr] = (dateToCountMap[dateStr] || 0) + submissionCalendar[timestamp];
            totalSubmissions += submissionCalendar[timestamp];
        });

        setTotal(totalSubmissions);

        const monthsData = [];
        let currentMonth = {
            name: oneYearAgo.toLocaleDateString('en-US', { month: 'short' }),
            monthIndex: oneYearAgo.getMonth(),
            weeks: []
        };
        let currentWeek = Array(7).fill(null);

        const runner = new Date(oneYearAgo);

        while (runner <= today) {
            const dateStr = runner.toISOString().split('T')[0];
            const count = dateToCountMap[dateStr] || 0;
            const dayIdx = runner.getDay();
            const monthIdx = runner.getMonth();

            // Check if month changed
            if (monthIdx !== currentMonth.monthIndex) {
                // Push current week to old month
                if (currentWeek.some(d => d !== null)) {
                    currentMonth.weeks.push(currentWeek);
                }
                // Push old month to list
                if (currentMonth.weeks.length > 0) {
                    monthsData.push(currentMonth);
                }

                // Start new month
                currentMonth = {
                    name: runner.toLocaleDateString('en-US', { month: 'short' }),
                    monthIndex: monthIdx,
                    weeks: []
                };
                // Start new week for the new month
                currentWeek = Array(7).fill(null);
            } else if (dayIdx === 0 && currentWeek.some(d => d !== null)) {
                // Classic Sunday week break within same month
                currentMonth.weeks.push(currentWeek);
                currentWeek = Array(7).fill(null);
            }

            currentWeek[dayIdx] = {
                date: dateStr,
                contributionCount: count
            };

            runner.setDate(runner.getDate() + 1);
        }

        // Push final data
        if (currentWeek.some(d => d !== null)) {
            currentMonth.weeks.push(currentWeek);
        }
        if (currentMonth.weeks.length > 0) {
            monthsData.push(currentMonth);
        }

        setMonths(monthsData);
    };

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
        if (!day) return;
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

    if (loading) {
        return <div className="text-white text-center py-4">Loading LeetCode Graph...</div>;
    }

    return (
        <div className="bg-black text-white rounded-xl font-space relative w-full overflow-hidden p-4 border border-white/10">
            <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <div className="flex gap-2">
                    {months.map((month, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            {/* Month Label */}
                            <span className="text-xs text-gray-500 h-4 px-1 text-center block">
                                {month.name}
                            </span>

                            {/* Weeks Grid for this Month */}
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
                        {hoveredDay.contributionCount} {hoveredDay.contributionCount === 1 ? 'submission' : 'submissions'}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                        {formatDate(hoveredDay.date)}
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4 px-1">
                <div className="text-xs sm:text-sm text-gray-400">
                    {total} submissions in the last year
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

export default LeetCodeGraph;
