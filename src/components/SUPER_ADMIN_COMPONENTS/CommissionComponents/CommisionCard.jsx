import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommissionForm from "./CommissionForm";

export default function CommissionCard({ globalCommission, onChange }) {
  const [showForm, setShowForm] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-black rounded-2xl shadow-md border border-gray-800 p-8 text-white relative overflow-hidden">
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-center gap-6 text-center"
        animate={
          isLargeScreen
            ? {
                x: showForm ? -80 : 0,
                opacity: showForm ? 0.8 : 1,
                textAlign: showForm ? "left" : "center",
              }
            : {
                x: 0,
                opacity: showForm ? 0.8 : 1,
                textAlign: "center",
              }
        }
        transition={{
          duration: showForm ? 0.6 : 0.8,
          ease: "easeInOut",
        }}
      >
        <div>
          <p className="text-2xl md:text-3xl font-semibold font-[poppins]">
            Global Commission
          </p>
          <span className="text-2xl text-gray-300 font-[google_sans_mono]">
            {globalCommission}%
          </span>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ duration: 0.4 }}
            >
              <CommissionForm
                currentValue={globalCommission}
                onSubmit={(val) => {
                  onChange(val);
                  setShowForm(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* الزرار */}
      <div className="absolute bottom-1 right-4 font-[monospace] tracking-wider animate-pulse text-[12px] lg:text-[16px]"> 
        <motion.button
          onClick={() => setShowForm(!showForm)}
          className="text-white hover:text-blue-300 duration-300 no-underline"
          whileHover={{ scale: 1.05 }}
        >
          {showForm ? "Cancel" : "Tap to Change Commission Value"}
        </motion.button>
      </div>
    </div>
  );
}
