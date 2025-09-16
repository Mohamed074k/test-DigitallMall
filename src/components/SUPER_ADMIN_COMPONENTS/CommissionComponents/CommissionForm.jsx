import { useState } from "react";
import { toast } from "react-toastify";

export default function CommissionForm({ currentValue, onSubmit }) {
  const [value, setValue] = useState(currentValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value || isNaN(value)) {
      toast.error("Please enter a valid number!");
      return;
    }
    onSubmit(Number(value));
    toast.success("Global Commission updated!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black p-4 rounded-lg flex flex-col md:flex-row items-center gap-4"
    >
      {/* العنوان اللي كنت عامله */}
      <div className="flex items-center text-2xl md:text-3xl font-semibold text-gray-500 font-[poppins]">
        <span className="text-white">Change</span>Value
      </div>

      {/* الانبت + الزرار */}
      <div className="flex items-center gap-2 font-[poppins]">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-white text-black px-3 py-2 rounded-md focus:outline-none w-[150px]"
        />
        <button
          type="submit"
          className="!bg-gray-500 hover:!bg-gray-500/70 duration-300 text-black px-4 py-2 !rounded-md font-semibold"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
