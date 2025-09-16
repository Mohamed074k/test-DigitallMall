import { useState } from "react";
import CustomBarChart from "../../SUPER_ADMIN_COMPONENTS/ChartsComponents/BarChart";
import CustomLineChart from "../../SUPER_ADMIN_COMPONENTS/ChartsComponents/LineChart";
import { Package } from "lucide-react";
import { useBrandProducts } from "../../../context/brandContext/BrandProductsContext";

// Mock Sales Data per Category per Year
const salesData = {
  2022: {
    "T-Shirts": [120, 150, 180, 200, 170, 220, 250, 230, 210, 240, 260, 300],
    Hoodies: [80, 90, 100, 110, 120, 130, 150, 140, 135, 145, 160, 180],
    Caps: [50, 60, 70, 75, 65, 80, 90, 85, 78, 88, 95, 100],
    Mugs: [100, 110, 120, 130, 125, 140, 150, 145, 138, 148, 155, 165],
  },
  2023: {
    "T-Shirts": [150, 160, 200, 220, 210, 230, 260, 250, 240, 270, 290, 320],
    Hoodies: [90, 95, 110, 120, 125, 140, 160, 150, 145, 155, 170, 190],
    Caps: [55, 65, 75, 80, 70, 85, 95, 90, 82, 92, 100, 110],
    Mugs: [110, 120, 130, 140, 135, 150, 160, 155, 148, 158, 165, 175],
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

const TopSellingProductsChart = () => {
  const { categories } = useBrandProducts();

  const [selectedYear, setSelectedYear] = useState("2022");
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");

  const yearCategories = salesData[selectedYear] || {};

  // لو في category متختارة هنعرضها لوحدها، لو فاضيه نعرض كل الكاتيجوريز
  const chartData = months.map((m, i) => {
    if (selectedCategory && yearCategories[selectedCategory]) {
      return { name: m, value: yearCategories[selectedCategory][i] || 0 };
    }
    // في حالة عرض الكل (نجمعهم)
    const total = Object.values(yearCategories).reduce(
      (sum, arr) => sum + (arr[i] || 0),
      0
    );
    return { name: m, value: total };
  });

  return (
    <div className="mb-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50 font-[poppins]">
          <Package size={22} className="text-gray-900/30 mt-1 animate-bounce" />
          <span className="text-gray-900 pl-4">Top-Selling</span>&nbsp;Products
        </div>

        {/* Year & Category Filters */}
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

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg md:w-[200px] px-4 py-2 text-white bg-black font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-base cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
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
            {selectedYear} - {selectedCategory || "All Categories"} Sales Bar
            Chart
          </p>
        </div>
        <div className="flex-1">
          <CustomLineChart data={chartData} />
          <p className="text-center text-sm text-gray-500 font-bold font-[monospace]">
            {selectedYear} - {selectedCategory || "All Categories"} Sales Line
            Chart
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopSellingProductsChart;
