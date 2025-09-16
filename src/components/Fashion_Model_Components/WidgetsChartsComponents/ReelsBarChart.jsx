import React, { useState } from "react";
import ReelsMultiBar from "./ReelsMultiBar";
import { Video } from "lucide-react";

const statusData = {
  2022: {
    views: [
      800, 900, 950, 1000, 1100, 1150, 1200, 1250, 1300, 1400, 1450, 1500,
    ],
    likes: [200, 250, 300, 320, 350, 380, 400, 420, 450, 480, 500, 520],
    shares: [50, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170],
  },
  2023: {
    views: [
      1000, 1100, 1150, 1200, 1300, 1350, 1400, 1450, 1500, 1600, 1650, 1700,
    ],
    likes: [250, 280, 320, 350, 380, 420, 440, 460, 480, 500, 530, 560],
    shares: [70, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190],
  },
  2024: {
    views: [
      1200, 1250, 1300, 1400, 1500, 1550, 1600, 1650, 1700, 1800, 1850, 1900,
    ],
    likes: [300, 330, 360, 400, 420, 460, 480, 500, 520, 550, 580, 600],
    shares: [90, 100, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210],
  },
  2025: {
    views: [
      1400, 1450, 1500, 1600, 1700, 1750, 1800, 1850, 1900, 2000, 2100, 2200,
    ],
    likes: [350, 380, 420, 450, 480, 500, 530, 560, 580, 600, 630, 650],
    shares: [100, 120, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230],
  },
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ReelsBarChart = () => {
  const [selectedYear, setSelectedYear] = useState("2022");

  const yearData = statusData[selectedYear] || {
    views: [],
    likes: [],
    shares: [],
  };

  const chartData = months.map((m, i) => ({
    name: m,
    views: yearData.views[i] || 0,
    likes: yearData.likes[i] || 0,
    shares: yearData.shares[i] || 0,
  }));

  return (
    <div className="mb-6 multiChart">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        {/* Title */}
        <div className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50 font-[poppins]">
          <Video size={22} className="text-gray-900/30 mt-1 animate-bounce" />
          <span className="text-gray-900 pl-4">Reels</span>&nbsp;Performance
        </div>

        {/* Year Filter */}
        <div className="flex flex-col sm:flex-row gap-2 mt-3 md:mt-0 font-[poppins]">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-lg md:w-[150px] px-4 py-2 text-white bg-black font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-base cursor-pointer"
          >
            {Object.keys(statusData).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="flex flex-col lg:flex-row gap-3 justify-between align-center ">
        <div className="flex-1">
          <ReelsMultiBar data={chartData} keys={["views", "likes", "shares"]} />
          <p className="text-center text-sm text-gray-500 font-bold font-[monospace] mt-2">
            {selectedYear} - Reels Performance Bar Chart
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReelsBarChart;
