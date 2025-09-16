import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useModelEarnings } from "../../../context/modelContext/ModelEarningsContext";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const Earnings = () => {
  const navigate = useNavigate();

  const {
    totalCommissions,
    pendingAmounts,
    paidAmounts,
    earningsBreakdown,
    filterEarnings,
  } = useModelEarnings();

  useEffect(() => {
    filterEarnings();
  }, []);

  const chartData = earningsBreakdown.map((e) => ({
    name: new Date(e.submissionDate).toLocaleDateString("en-US", {
      month: "short",
    }),
    value: e.amount,
  }));

  const totalCount = earningsBreakdown.length;
  const pendingCount = earningsBreakdown.filter(
    (e) => e.status === "Pending"
  ).length;
  const paidCount = earningsBreakdown.filter((e) => e.status === "Paid").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-black rounded-2xl shadow-md border border-gray-800 p-7 text-white relative overflow-hidden  space-y-8">
        <h2 className="text-2xl md:text-3xl !font-extrabold tracking-wide font-[poppins] mt-1">
          Earnings Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-4">
          {/* Total */}
          <div className="bg-gray-500/25 rounded-xl py-3 px-4">
            <p className="text-gray-400 text-md font-[poppins]">
              Total Commissions
            </p>
            <p className="text-2xl font-bold font-[Google_Sans_Mono]">
              {totalCommissions.toLocaleString()}{" "}
              <span className="text-sm">LE</span>
            </p>
            <p className="text-lg text-blue-400 font-[poppins] mt-1">
              <span className="text-[11px]">You have </span> {totalCount}{" "}
              <span className="text-[11px]"> total commissions</span>
            </p>
          </div>

          {/* Pending */}
          <div className="bg-gray-500/25 rounded-xl py-3 px-4">
            <p className="text-gray-400 text-md font-[poppins]">
              Pending Commissions
            </p>
            <p className="text-2xl font-bold text-yellow-400 font-[Google_Sans_Mono]">
              {pendingAmounts.toLocaleString()}{" "}
              <span className="text-sm">LE</span>
            </p>
            <p className="text-lg text-yellow-300 font-[poppins] mt-1">
              {pendingCount}{" "}
              <span className="text-[11px]">of them pending</span>
            </p>
          </div>

          {/* Paid */}
          <div className="bg-gray-500/25 rounded-xl py-3 px-4">
            <p className="text-gray-400 text-md font-[poppins]">
              Paid Commissions
            </p>
            <p className="text-2xl font-bold text-green-400 font-[Google_Sans_Mono]">
              {paidAmounts.toLocaleString()} <span className="text-sm">LE</span>
            </p>
            <p className="text-lg text-green-300 font-[poppins] mt-1">
              {paidCount} <span className="text-[11px]">of them paid</span>
            </p>
          </div>
        </div>

        {/* جراف الإيرادات */}
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                itemStyle={{ color: "#fff" }}
                formatter={(value) => `${value.toLocaleString()} LE`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={2}
                dot={{ r: 4, fill: "#ffffff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="absolute bottom-1 right-4 font-[monospace] tracking-wider animate-pulse text-[11px] lg:text-[16px]">
          <button onClick={() => navigate("/fashionmodeldash/earnings")}>
            Tap to See Earnings
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Earnings;
