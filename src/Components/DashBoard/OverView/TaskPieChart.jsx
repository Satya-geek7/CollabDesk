import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 60 },
  { name: "Pending", value: 30 },
  { name: "Overdue", value: 10 },
];

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export default function TaskPieChart() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="font-semibold mb-4 text-gray-800">Task Completion Breakdown</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}