import React from "react";
import { ClipboardCheck, Users, Sparkles } from "lucide-react";

const cards = [
  {
    title: "Avg Tasks / User",
    value: "7.4",
    sub: "last 30 days",
    icon: ClipboardCheck,
    tint: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Meetings / Team",
    value: "3.1",
    sub: "weekly average",
    icon: Users,
    tint: "bg-sky-50 text-sky-600",
  },
  {
    title: "Collaboration Index",
    value: "2.86",
    sub: "(msgs + meets + tasks) / active",
    icon: Sparkles,
    tint: "bg-emerald-50 text-emerald-600",
  },
];

export default function ProductivityInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map(({ title, value, sub, icon: Icon, tint }, i) => (
        <div
          key={title}
          className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <div
            className={`w-10 h-10 rounded-lg grid place-items-center ${tint} transition-transform duration-200 hover:scale-110`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div className="mt-3 text-sm text-gray-500">{title}</div>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-xs text-gray-400 mt-1">{sub}</div>
        </div>
      ))}
    </div>
  );
}