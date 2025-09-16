import { useState } from "react";
import CustomBarChart from "../../SUPER_ADMIN_COMPONENTS/ChartsComponents/BarChart";
import CustomLineChart from "../../SUPER_ADMIN_COMPONENTS/ChartsComponents/LineChart";
import { BadgeDollarSign } from "lucide-react";

const usersData = {
  2022: [300, 200, 400, 600, 500, 700, 800, 650, 550, 750, 850, 1000],
  2023: [400, 300, 500, 700, 600, 800, 900, 750, 650, 850, 950, 1100],
  2024: [500, 400, 600, 800, 700, 900, 1000, 850, 750, 950, 1050, 1200],
  2025: [600, 500, 700, 900, 800, 1000, 1100, 950, 850, 1050, 1150, 1300],
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

const EarningsChart = () => {
  const [selectedYear, setSelectedYear] = useState("2022");

  const yearData = usersData[selectedYear] || [];

  const chartData = months.map((m, i) => ({
    name: m,
    value: yearData[i] || 0,
  }));

  return (
    <div className="mb-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center text-3xl font-semibold text-gray-900/50 font-[poppins]">
          <BadgeDollarSign
            size={22}
            className="text-gray-900/30 mt-1 animate-bounce"
          />
          <span className="text-gray-900 pl-4">Earnings</span>&nbsp;Overview
        </div>

        {/* Year Filter */}
        <div className="flex flex-col sm:flex-row gap-2 mt-3 md:mt-0 font-[poppins]">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-lg md:w-[150px] px-4 py-2 text-white bg-black font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-base cursor-pointer"
          >
            {Object.keys(usersData).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col lg:flex-row gap-3 justify-between align-center">
        <div className="flex-1">
          <CustomBarChart data={chartData} />
          <p className="text-center text-sm text-gray-500 font-bold font-[monospace]">
            {selectedYear} - Earnings Bar Chart
          </p>
        </div>
        <div className="flex-1">
          <CustomLineChart data={chartData} />
          <p className="text-center text-sm text-gray-500 font-bold font-[monospace]">
            {selectedYear} - Earnings Line Chart
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarningsChart;
