import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

function CustomBarChart({ data }) {
  return (
    <div className="w-full h-96 p-4 focus:outline-none">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 15, right: 10, left: -20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="1 2" stroke="#aaaab8" />
          <XAxis dataKey="name" stroke="#aaa" tick={{ fontSize: 12 }} />
          <YAxis
            stroke="#aaa"
            tickFormatter={(value) => value.toLocaleString()} // يخلي الأرقام مفهومة زي 10,000 بدل 10000
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            cursor={{ fill: "rgba(156,163,175,0.2)" }}
            contentStyle={{
              border: "none",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="value" fill="black" radius={[6, 6, 0, 0]}></Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomBarChart;
