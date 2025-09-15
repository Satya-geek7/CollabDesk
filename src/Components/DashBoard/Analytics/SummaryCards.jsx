// ===============================
import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const SummaryCard = ({
  icon: Icon,
  label,
  value,
  trend,
  isPositive,
  subtitle,
  color = "indigo",
}) => {
  const colorClasses = {
    indigo: "from-indigo-500 to-indigo-600",
    cyan: "from-cyan-500 to-cyan-600",
    purple: "from-purple-500 to-purple-600",
    amber: "from-amber-500 to-amber-600",
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div
            className={`flex items-center text-sm font-medium ${
              isPositive ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            {trend}
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
    </div>
  );
};

export default SummaryCard;
