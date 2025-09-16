import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const OrdersCard = () => {
  const [value, setValue] = useState(0);
  const target = 8452;

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
    { name: "Jan", value: 200 },
    { name: "Feb", value: 550 },
    { name: "Mar", value: 300 },
    { name: "Apr", value: 700 },
    { name: "May", value: 400 },
    { name: "Jun", value: 950 },
    { name: "Jul", value: 620 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-black rounded-2xl shadow-md border border-gray-800 p-6 text-white">
        <h3 className="text-gray-400 text-sm font-medium mb-2 font-['poppins']">
          Total Orders
        </h3>
        <p className="text-2xl font-bold mb-1 font-['Google_Sans_Mono']">
          {Math.floor(value).toLocaleString()}
        </p>
        <p className="text-sm text-green-400 mb-4 font-[poppins]">
          +12.3% from last month
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

export default OrdersCard;
