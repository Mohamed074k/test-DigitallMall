export default function StatsCards({ title, stats }) {
  return (
    <div className="bg-black rounded-2xl shadow-md border border-gray-800 p-6 text-white text-center">
      <p className="text-2xl font-semibold font-[poppins]">
        {title}{" "}
      </p>
      <span className="text-2xl text-gray-300 font-[google_sans_mono] relative">
        {stats}
      </span>
    </div>
  );
}
