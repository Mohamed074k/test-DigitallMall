import { useState } from "react";
import CustomBarChart from "../../SUPER_ADMIN_COMPONENTS/ChartsComponents/BarChart";
import CustomLineChart from "../../SUPER_ADMIN_COMPONENTS/ChartsComponents/LineChart";
import { ShoppingCart } from "lucide-react";

const salesData = {
  2022: [1200, 900, 1500, 2000, 1800, 2200, 2400, 2100, 1900, 2300, 2500, 2800],
  2023: [
    1400, 1000, 1700, 2300, 2000, 2600, 2800, 2500, 2200, 2700, 2900, 3200,
  ],
  2024: [
    1600, 1200, 2000, 2600, 2300, 3000, 3200, 2900, 2600, 3100, 3400, 3700,
  ],
  2025: [
    1800, 1400, 2300, 2900, 2600, 3400, 3600, 3300, 3000, 3500, 3800, 4100,
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

const BrandSalesChart = () => {
  const [selectedYear, setSelectedYear] = useState("2022");

  const yearData = salesData[selectedYear] || [];

  const chartData = months.map((m, i) => ({
    name: m,
    value: yearData[i] || 0,
  }));

  return (
    <div className="mb-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 ">
        <div className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50 font-[poppins]">
          <ShoppingCart
            size={22}
            className="text-gray-900/30 mt-1 animate-bounce"
          />
          <span className="text-gray-900 pl-4">Monthly Sales</span>
          &nbsp;Overview
        </div>

        {/* Year Filter */}
        <div className="flex flex-col sm:flex-row gap-2 mt-3 md:mt-0 font-[poppins]">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-lg md:w-[150px] px-4 py-2 text-white bg-black font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-base cursor-pointer"
          >
            {Object.keys(salesData).map((year) => (
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
            {selectedYear} - Monthly Sales Bar Chart
          </p>
        </div>
        <div className="flex-1">
          <CustomLineChart data={chartData} />
          <p className="text-center text-sm text-gray-500 font-bold font-[monospace]">
            {selectedYear} - Monthly Sales Line Chart
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandSalesChart;
