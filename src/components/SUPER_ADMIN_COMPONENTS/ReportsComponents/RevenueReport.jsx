import { useState } from "react";
import CustomBarChart from "../ChartsComponents/BarChart";
import CustomLineChart from "../ChartsComponents/LineChart";
import { DollarSign } from "lucide-react";

const revenueData = {
  2022: [
    1000, 1200, 1100, 1500, 1400, 1600, 1800, 1700, 1900, 2000, 2300, 2500,
  ],
  2023: [
    1200, 1500, 1300, 1700, 1600, 1800, 2000, 1900, 2100, 2200, 2500, 2700,
  ],
  2024: [
    1400, 1600, 1500, 1900, 1800, 2000, 2200, 2100, 2300, 2400, 2700, 3000,
  ],
  2025: [
    1600, 1800, 1700, 2100, 2000, 2200, 2400, 2300, 2500, 2600, 2900, 3200,
  ],
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

const RevenueReport = () => {
  const [selectedYear, setSelectedYear] = useState("2022");

  const yearData = revenueData[selectedYear] || [];

  const chartData = months.map((m, i) => ({
    name: m,
    value: yearData[i] || 0,
  }));

  return (
    <div className="mb-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center text-3xl font-semibold text-gray-900/50 font-[poppins]">
          <DollarSign
            size={22}
            className="text-gray-900/30 mt-1 animate-bounce"
          />
          <span className="text-gray-900 pl-4">Revenue</span>Report
        </div>

        {/* Year Filter */}
        <div className="flex flex-col md:flex-row gap-2 mt-3 md:mt-0 font-[poppins]">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-lg md:w-[150px] px-4 py-2 text-white bg-black font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-base cursor-pointer"
          >
            {Object.keys(revenueData).map((year) => (
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
            {selectedYear} - Revenue Bar Chart
          </p>
        </div>
        <div className="flex-1">
          <CustomLineChart data={chartData} />
          <p className="text-center text-sm text-gray-500 font-bold font-[monospace]">
            {selectedYear} - Revenue Line Chart
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;
