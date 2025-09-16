import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  let pathnames = location.pathname.split("/").filter((x) => x);

  pathnames = pathnames.filter(
    (segment) =>
      segment.toLowerCase() !== "super" &&
      segment.toLowerCase() !== "designerdash" &&
      segment.toLowerCase() !== "branddash" &&
      segment.toLowerCase() !== "fashionmodeldash"
  );

  const customNames = {
    kpis: "KPIs",
    discounts: "Discounts & Promotions",
    reports: "Reports & Analytics",
  };

  const formatName = (value) => {
    const lower = value.toLowerCase();
    return customNames[lower] || value;
  };

  return (
    <nav className="text-md sm:text-3xl font-[poppins] mb-4">
      <ol className="flex space-x-2 items-center">
        {pathnames.map((value, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center space-x-2">
              <span className="text-gray-400">•</span>
              {isLast ? (
                <span className="font-semibold text-black capitalize text-xl">
                  {formatName(value)}
                </span>
              ) : (
                <div className="text-gray-600 capitalize text-xl">
                  {formatName(value)}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
