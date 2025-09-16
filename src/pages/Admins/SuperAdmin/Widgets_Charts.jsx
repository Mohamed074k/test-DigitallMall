import CustomBarChart from "../../../components/SUPER_ADMIN_COMPONENTS/ChartsComponents/BarChart";
import CustomLineChart from "../../../components/SUPER_ADMIN_COMPONENTS/ChartsComponents/LineChart";
import { BarChart3, Users, Store } from "lucide-react";

const salesData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
  { name: "May", value: 600 },
  { name: "Jun", value: 800 },
  { name: "Jul", value: 900 },
  { name: "Aug", value: 750 },
  { name: "Sep", value: 650 },
  { name: "Oct", value: 850 },
  { name: "Nov", value: 950 },
  { name: "Dec", value: 1100 },
];

const usersData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
  { name: "May", value: 600 },
  { name: "Jun", value: 800 },
  { name: "Jul", value: 900 },
  { name: "Aug", value: 750 },
  { name: "Sep", value: 650 },
  { name: "Oct", value: 850 },
  { name: "Nov", value: 950 },
  { name: "Dec", value: 1100 },
];

const brandsData = [
  { name: "Nike", value: 400 },
  { name: "Adidas", value: 300 },
  { name: "Puma", value: 500 },
  { name: "Zara", value: 700 },
  { name: "H&M", value: 600 },
  { name: "Apple", value: 800 },
  { name: "Samsung", value: 900 },
  { name: "Sony", value: 750 },
];

const Widgets_Charts = () => {
  return (
    <div className="mt-5 min-h-screen ">
        <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>

      {/* Monthly Sales */}
      <div className=" mb-4">
        <p className="flex items-center  text-3xl font-semibold mb-4 text-gray-900/50 font-[poppins]">
          <BarChart3
            size={22}
            className="text-gray-900/30 mt-1 animate-bounce"
          />
          <span className="text-gray-900 pl-4">Monthly</span>Sales
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-between align-center">
          <CustomBarChart data={salesData} />
          <CustomLineChart data={salesData} />
        </div>
      </div>

  <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>


      {/* New Users */}
      <div className=" mb-4">
        <p className="flex items-center  text-3xl font-semibold mb-4 text-gray-900/50 font-[poppins]">
          <Users size={22} className="text-gray-900/30 mt-1 animate-bounce" />
          <span className="text-gray-900 pl-4">Monthly</span>Users
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-between align-center">
          <CustomBarChart data={usersData} />
          <CustomLineChart data={usersData} />
        </div>
      </div>

  <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>

      {/* Top Brands */}
      <div>
        <p className="flex items-center  text-3xl font-semibold mb-4 text-gray-900/50 font-[poppins]">
          <Store size={22} className="text-gray-900/30 mt-1 animate-bounce" />
          <span className="text-gray-900 pl-4">Top</span>Brands
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-between align-center">
          <CustomBarChart data={brandsData} />
          <CustomLineChart data={brandsData} />
        </div>
      </div>
    </div>
  );
};

export default Widgets_Charts;
