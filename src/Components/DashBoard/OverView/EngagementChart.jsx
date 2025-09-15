import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", active: 400 },
  { month: "Feb", active: 600 },
  { month: "Mar", active: 800 },
  { month: "Apr", active: 500 },
  { month: "May", active: 700 },
];

export default function EngagementChart() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full h-[320px] hover:shadow-lg transition-shadow duration-200">
      <h3 className="font-semibold mb-4 text-gray-800">Monthly User Growth</h3>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="active" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}