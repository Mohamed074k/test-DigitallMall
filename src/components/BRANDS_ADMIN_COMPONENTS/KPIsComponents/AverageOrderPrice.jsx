function AverageOrderPrice() {
  return (
    <div className="bg-black rounded-2xl shadow-md border border-gray-800 p-8 text-white relative overflow-hidden pb-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 text-center">
        <div>
          <p className="text-2xl md:text-3xl font-semibold font-[poppins]">
            Avg. Order Price
          </p>
          <span className="text-2xl text-gray-300 font-[google_sans_mono]">
            156<span className="text-lg text-gray-300/50">LE</span>
            <span className="text-[11px] text-gray-300/90 pl-2">per order</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AverageOrderPrice;
