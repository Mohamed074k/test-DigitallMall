import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 850) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center
             !rounded-full bg-gray-900/60 hover:bg-gray-900
             text-white shadow-lg transition-all duration-300
             z-50 animate-bounce cursor-pointer"
      >
        <ChevronUp size={24} />
      </button>
    )
  );
};

export default ScrollToTopBtn;
