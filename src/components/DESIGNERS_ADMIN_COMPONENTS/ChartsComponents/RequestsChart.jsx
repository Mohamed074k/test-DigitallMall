import { useState } from "react";
import CustomBarMulti from "./CustomBarMulti";
import { BadgeQuestionMark } from "lucide-react";

const statusData = {
  2022: {
    rejected: [50, 30, 40, 60, 45, 70, 55, 65, 40, 80, 90, 100],
    done: [200, 150, 250, 300, 280, 350, 400, 370, 360, 420, 450, 500],
    pending: [80, 50, 110, 150, 130, 160, 180, 140, 120, 160, 180, 200],
  },
  2023: {
    rejected: [60, 40, 50, 70, 55, 75, 65, 70, 50, 90, 95, 110],
    done: [220, 180, 270, 320, 300, 370, 420, 390, 380, 440, 470, 520],
    pending: [90, 60, 120, 160, 140, 170, 190, 150, 130, 170, 190, 210],
  },
  2024: {
    rejected: [70, 45, 60, 80, 65, 85, 75, 80, 55, 95, 100, 120],
    done: [250, 200, 300, 350, 320, 390, 450, 420, 400, 460, 490, 540],
    pending: [100, 70, 130, 170, 150, 180, 200, 160, 140, 180, 200, 220],
  },
  2025: {
    rejected: [80, 50, 70, 90, 75, 95, 85, 90, 60, 100, 110, 130],
    done: [280, 220, 330, 370, 350, 420, 470, 440, 420, 480, 510, 560],
    pending: [110, 80, 140, 180, 160, 190, 210, 170, 150, 190, 210, 230],
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

const RequestsChart = () => {
  const [selectedYear, setSelectedYear] = useState("2022");

  const yearData = statusData[selectedYear] || {
    rejected: [],
    done: [],
    pending: [],
  };

  const chartData = months.map((m, i) => ({
    name: m,
    Rejected: yearData.rejected[i] || 0,
    Done: yearData.done[i] || 0,
    Pending: yearData.pending[i] || 0,
  }));

  return (
    <div className="mb-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50 font-[poppins]">
          <BadgeQuestionMark
            size={22}
            className="text-gray-900/30 mt-1 animate-bounce"
          />
          <span className="text-gray-900 pl-4">Requests</span>&nbsp;Overview
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
      <div className="flex flex-col lg:flex-row gap-3 justify-between align-center">
        <div className="flex-1">
          <CustomBarMulti
            data={chartData}
            keys={["Rejected", "Done", "Pending"]}
          />
          <p className="text-center text-sm text-gray-500 font-bold font-[monospace] mt-2">
            {selectedYear} - Requests Bar Chart
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestsChart;
