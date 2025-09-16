import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PendingRequestsCard = () => {
  const [value, setValue] = useState(0);
  const target = 30;

  const data = [
    { name: "Jan", value: 1 },
    { name: "Feb", value: 5 },
    { name: "Mar", value: 8 },
    { name: "Apr", value: 7 },
    { name: "May", value: 10 },
    { name: "Jun", value: 12 },
    { name: "Jul", value: 16 },
    { name: "Aug", value: 20 },
    { name: "Sep", value: 22 },
    { name: "Oct", value: 25 },
    { name: "Nov", value: 31 },
    { name: "Dec", value: 30 },
  ];

  const calcGrowth = () => {
    const lastIndex = data.findIndex((d) => d.value === target);
    if (lastIndex <= 0) return 0;
    const prevValue = data[lastIndex - 1].value;
    const growth = ((target - prevValue) / prevValue) * 100;
    return growth.toFixed(1);
  };

  const growth = calcGrowth();

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
      setValue(Math.ceil(start));
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-black rounded-2xl shadow-md border border-gray-800 p-6 text-white">
        <h3 className="text-gray-400 text-sm font-medium mb-2 font-['poppins']">
          Pending Requests
        </h3>
        <p className="text-2xl font-bold mb-1 font-['Google_Sans_Mono']">
          {value}
          <span className="text-[11px] text-gray-300/90 pl-1">request</span>
        </p>
        <p
          className={`text-sm mb-4 font-[poppins] ${
            growth >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {growth >= 0 ? "+" : ""}
          {growth}% from last month
        </p>

        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 10, bottom: 10, left: 10 }}
            >
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                itemStyle={{ color: "#fff" }}
                formatter={(value) => `${value} req`}
                labelFormatter={(label, payload) =>
                  payload && payload.length > 0
                    ? `Month: ${payload[0].payload.name}`
                    : `Month: ${label}`
                }
              />
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

export default PendingRequestsCard;
