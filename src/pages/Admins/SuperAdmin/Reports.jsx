import { useState, useEffect } from "react";
import SalesReport from "../../../components/SUPER_ADMIN_COMPONENTS/ReportsComponents/SalesReport";
import UserGrowthReport from "../../../components/SUPER_ADMIN_COMPONENTS/ReportsComponents/UserGrowthReport";
import RevenueReport from "../../../components/SUPER_ADMIN_COMPONENTS/ReportsComponents/RevenueReport";
import ReelsPerformance from "../../../components/SUPER_ADMIN_COMPONENTS/ReportsComponents/ReelsPerformance";

const Reports = () => {
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setChartsReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    if (chartsReady) window.print();
    else alert("Wait for the charts to load before exporting.");
  };

  return (
    <div className="mt-5 min-h-screen">
      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>
      <ReelsPerformance />

      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>
      <SalesReport />

      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>
      <UserGrowthReport />

      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>
      <RevenueReport />

      <div className="flex justify-center pr-6 mb-4 text-xl font-[poppins] tracking-wide">
        <button
          onClick={handlePrint}
          disabled={!chartsReady}
          className={`w-full md:w-[350px] flex justify-center text-white px-4 py-3 !rounded-md shadow-md ${
            chartsReady
              ? "bg-gray-900 hover:bg-gray-900/70 duration-300"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          {chartsReady ? "Export PDF" : "Loading Charts..."}
        </button>
      </div>
    </div>
  );
};

export default Reports;
