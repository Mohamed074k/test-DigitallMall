import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const RevenueCard = () => {
  const [value, setValue] = useState(0);
  const target = 15231.89;

  useEffect(() => {
    let start = 0;
    const end = target;
    let totalMilSecDur = 1500;
    let incrementTime = 30;
    let step = (end - start) / (totalMilSecDur / incrementTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        start = end;
      }
      setValue(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, []);

  const data = [
    { name: "Jan", value: 300 },
    { name: "Feb", value: 950 },
    { name: "Mar", value: 520 },
    { name: "Apr", value: 430 },
    { name: "May", value: 330 },
    { name: "Jun", value: 870 },
    { name: "Jul", value: 680 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-black rounded-2xl shadow-md border border-gray-800 p-6 text-white">
        <h3 className="text-gray-400 text-sm font-medium mb-2  font-['poppins']">
          Total Revenue
        </h3>
        <p className="text-2xl font-bold mb-1 font-['Google_Sans_Mono']">
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          LE
        </p>
        <p className="text-sm text-green-400 mb-4 font-[poppins]">
          +20.1% from last month
        </p>

        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={2}
                dot={{ r: 5, fill: "#ffffff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueCard;
