import React from "react";

export default function KpiCard({ data, icon: Icon, label, color }) {
  return (
    <div
      className={`p-4 sm:p-5 rounded-xl shadow-md flex items-center gap-3 sm:gap-4 text-white ${color} transform hover:scale-105 transition-transform duration-200 cursor-pointer w-full`}
    >
      {/* Icon */}
      <div className="p-2 sm:p-3 bg-white/20 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </div>

      {/* Text */}
      <div>
        <h4 className="text-xs sm:text-sm md:text-base opacity-90">
          {label}
        </h4>
        <p className="text-lg sm:text-xl md:text-2xl font-bold">{data}</p>
      </div>
    </div>
  );
}
