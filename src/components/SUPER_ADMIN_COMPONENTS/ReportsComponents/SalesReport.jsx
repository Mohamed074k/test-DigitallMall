import { useState } from "react";
import CustomBarChart from "../ChartsComponents/BarChart";
import CustomLineChart from "../ChartsComponents/LineChart";
import { BarChart3 } from "lucide-react";

const salesData = {
  2023: [
    {
      brand: "Nike",
      monthly: [400, 300, 500, 700, 600, 800, 900, 750, 650, 850, 950, 1100],
    },
    {
      brand: "Adidas",
      monthly: [350, 250, 400, 600, 500, 700, 800, 700, 600, 750, 850, 1000],
    },
    {
      brand: "Puma",
      monthly: [200, 150, 300, 400, 350, 500, 600, 550, 500, 600, 700, 800],
    },
    {
      brand: "Reebok",
      monthly: [150, 100, 200, 300, 250, 400, 500, 450, 400, 500, 600, 700],
    },
    {
      brand: "Apple",
      monthly: [100, 80, 150, 250, 200, 300, 400, 350, 300, 400, 500, 600],
    },
    {
      brand: "Samsung",
      monthly: [120, 90, 160, 260, 220, 320, 420, 370, 320, 420, 520, 620],
    },
    {
      brand: "Sony",
      monthly: [130, 100, 170, 270, 230, 330, 430, 380, 330, 430, 530, 630],
    },
  ],
  2024: [
    {
      brand: "Nike",
      monthly: [400, 300, 500, 700, 600, 800, 900, 750, 650, 850, 950, 1100],
    },
    {
      brand: "Adidas",
      monthly: [350, 250, 400, 600, 500, 700, 800, 700, 600, 750, 850, 1000],
    },
    {
      brand: "Puma",
      monthly: [200, 150, 300, 400, 350, 500, 600, 550, 500, 600, 700, 800],
    },
    {
      brand: "Reebok",
      monthly: [150, 100, 200, 300, 250, 400, 500, 450, 400, 500, 600, 700],
    },
    {
      brand: "Apple",
      monthly: [100, 80, 150, 250, 200, 300, 400, 350, 300, 400, 500, 600],
    },
    {
      brand: "Samsung",
      monthly: [120, 90, 160, 260, 220, 320, 420, 370, 320, 420, 520, 620],
    },
    {
      brand: "Sony",
      monthly: [130, 100, 170, 270, 230, 330, 430, 380, 330, 430, 530, 630],
    },
  ],
  2025: [
    {
      brand: "Nike",
      monthly: [400, 300, 500, 700, 600, 800, 900, 750, 650, 850, 950, 1100],
    },
    {
      brand: "Adidas",
      monthly: [350, 250, 400, 600, 500, 700, 800, 700, 600, 750, 850, 1000],
    },
    {
      brand: "Puma",
      monthly: [200, 150, 300, 400, 350, 500, 600, 550, 500, 600, 700, 800],
    },
    {
      brand: "Reebok",
      monthly: [150, 100, 200, 300, 250, 400, 500, 450, 400, 500, 600, 700],
    },
    {
      brand: "Apple",
      monthly: [100, 80, 150, 250, 200, 300, 400, 350, 300, 400, 500, 600],
    },
    {
      brand: "Samsung",
      monthly: [120, 90, 160, 260, 220, 320, 420, 370, 320, 420, 520, 620],
    },
    {
      brand: "Sony",
      monthly: [130, 100, 170, 270, 230, 330, 430, 380, 330, 430, 530, 630],
    },
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

const SalesReport = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");

  const yearData = salesData[selectedYear] || [];

  let chartData = [];

  if (selectedBrand === "All Brands") {
    chartData = yearData.map((brand) => ({
      name: brand.brand,
      value: brand.monthly.reduce((acc, val) => acc + val, 0),
    }));
  } else {
    const brandData = yearData.find((b) => b.brand === selectedBrand);
    chartData = months.map((m, i) => ({
      name: m,
      value: brandData ? brandData.monthly[i] : 0,
    }));
  }

  return (
    <div className="mb-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center text-3xl font-semibold text-gray-900/50 font-[poppins]">
          <BarChart3
            size={22}
            className="text-gray-900/30 mt-1 animate-bounce"
          />
          <span className="text-gray-900 pl-4">Sales</span>Report
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 mt-3 md:mt-0  font-[poppins]">
          {/* Year Filter */}
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

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="border border-gray-300 rounded-lg md:w-[200px] px-4 py-2 text-white bg-black font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-base cursor-pointer"
          >
            <option>All Brands</option>
            {yearData.map((brand) => (
              <option
                key={brand.brand}
                value={brand.brand}
                className="hover:!bg-gray-200"
              >
                {brand.brand}
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
            {selectedYear} - {selectedBrand} Bar Chart
          </p>
        </div>
        <div className="flex-1">
          <CustomLineChart data={chartData} />
          <p className="text-center text-sm text-gray-500 font-bold font-[monospace]">
            {selectedYear} - {selectedBrand} Line Chart
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
