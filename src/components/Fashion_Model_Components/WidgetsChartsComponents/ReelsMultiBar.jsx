import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ReelsMultiBar = ({ data, keys }) => {
  const colors = {
    views: "#F97316",
    likes: "#3B82F6",
    shares: "#84CC16",
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{ top: 15, right: 10, left: -20, bottom: 30 }}
      >
        <XAxis dataKey="name" stroke="#aaa" tick={{ fontSize: 12 }} />
        <YAxis
          stroke="#aaa"
          tickFormatter={(value) => value.toLocaleString()}
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
        <Legend
          wrapperStyle={{
            fontSize: "12px",
            opacity: 0.7,
          }}
        />
        {keys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors[key]}
            radius={[6, 6, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReelsMultiBar;
