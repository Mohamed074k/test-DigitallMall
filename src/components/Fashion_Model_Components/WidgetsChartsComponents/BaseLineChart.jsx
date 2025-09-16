import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const colors = {
  views: "#F97316",
  likes: "#3B82F6",
  shares: "#84CC16",
};

const BaseLineChart = ({ data, dataKey, label, color }) => {
  return (
    <div className="w-full lg:w-3/4 h-110 lg:h-110 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 15, right: 10, left: -20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="1 2" stroke="#aaaab8" />
          <XAxis dataKey="name" stroke="#aaa" tick={{ fontSize: 12 }} />
          <YAxis
            stroke="#aaa"
            tickFormatter={(value) => value.toLocaleString()}
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111",
              border: "none",
              color: "#fff",
              fontSize: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey={dataKey}
            name={label}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 4, fill: "#fff", stroke: color, strokeWidth: 2 }}
            activeDot={{ r: 6, stroke: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { colors };
export default BaseLineChart;
