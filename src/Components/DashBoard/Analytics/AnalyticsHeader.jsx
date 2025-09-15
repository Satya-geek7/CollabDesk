import React from "react";
import { Calendar } from "lucide-react";

const AnalyticsHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Monitor your business performance and insights
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Calendar className="w-4 h-4" />
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
