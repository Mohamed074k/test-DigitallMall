import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div  className="flex items-center gap-2">
      <span className="text-2xl md:text-3xl font-black italic tracking-wide text-black ">
        Digital<span className="text-xl text-gray-700">Mall</span>
      </span>
    </div>
  );
};

export default Logo;