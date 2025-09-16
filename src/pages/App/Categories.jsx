import { useState, useEffect } from "react";
import FiltersSidebar from "../../components/APP_COMPONENTS/categoriesComponents/FiltersSidebar";
import MainPage from "../../components/APP_COMPONENTS/categoriesComponents/MainPage";
import { X } from "lucide-react"; // 👈 بدلنا من ChevronLeft إلى X

const Categories = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isFilterOpen) {
      const currentScroll = window.scrollY;
      setScrollPosition(currentScroll);

      document.body.style.top = `-${currentScroll}px`;
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      window.scrollTo(0, scrollPosition);
      document.body.style.top = "auto";
    }

    return () => {
      document.body.classList.remove("no-scroll");
      document.body.style.top = "auto";
    };
  }, [isFilterOpen, scrollPosition]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-8 font-[poppins] relative">
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 shadow-2xl transform transition-transform duration-300 z-50
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
          w-full lg:w-1/3`}
      >
        <FiltersSidebar setIsFilterOpen={setIsFilterOpen} />

        {/* زرار (X) لما المنيو مفتوحة */}
        {isFilterOpen ? (
          <button
            onClick={() => setIsFilterOpen(false)}
            className="absolute top-5 right-4 !text-red-500 hover:!text-red-500/50  p-2   transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        ) : (
          /* زرار Open Filters لما المنيو مقفولة */
          <button
            onClick={() => setIsFilterOpen(true)}
            className="absolute top-1/2 -translate-y-1/2 bg-black text-white p-2 !rounded-r-lg shadow-lg animate-pulse flex items-center justify-center transition-all duration-300 -right-8"
          >
            <span
              className="text-sm tracking-wider rotate-180"
              style={{ writingMode: "vertical-rl" }}
            >
              OPEN FILTERS
            </span>
          </button>
        )}
      </div>

      {/* Overlay في الموبايل */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Main Page */}
      <div className="w-full">
        <MainPage />
      </div>
    </div>
  );
};

export default Categories;
