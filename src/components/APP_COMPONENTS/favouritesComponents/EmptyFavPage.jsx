// src/components/favourites/EmptyState.jsx
import { FaHeartBroken } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function EmptyFavPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center mt-5 font-[poppins]">
      <FaHeartBroken className="text-black mb-4 pulse" size={180} />
      <p className="text-2xl font-semibold tracking-wide pulse">
        Favourite is Empty...
      </p>
      <button
        onClick={() => navigate("/")}
        className="btn btn-dark px-4 py-2 rounded-pill bounce mt-4 !font-[poppins]"
      >
        ← Back to Home
      </button>
    </div>
  );
}
