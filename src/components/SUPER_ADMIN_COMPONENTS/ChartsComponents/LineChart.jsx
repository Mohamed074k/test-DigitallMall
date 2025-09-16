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

function CustomLineChart({ data }) {
  return (
    <div className="w-full h-96 p-4">
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
            dataKey="value"
            stroke="#9ca3af"
            strokeWidth={2}
            dot={{ r: 5, fill: "#fff", stroke: "#000", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomLineChart;
