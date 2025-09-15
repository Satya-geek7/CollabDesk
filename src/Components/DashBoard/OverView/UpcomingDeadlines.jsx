import React from "react";
import { CalendarDays, AlarmClock } from "lucide-react";

const items = [
  { title: "Homepage Redesign", due: "Aug 21", priority: "High" },
  { title: "API Integration v2", due: "Aug 23", priority: "Medium" },
  { title: "Test Coverage 85%", due: "Aug 28", priority: "Low" },
  { title: "Release Notes", due: "Aug 30", priority: "Medium" },
];

const getBadgeStyle = (priority) =>
  priority === "High"
    ? "bg-red-100 text-red-600"
    : priority === "Medium"
    ? "bg-amber-100 text-amber-700"
    : "bg-emerald-100 text-emerald-700";

export default function UpcomingDeadlines() {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2 text-gray-800">
          <CalendarDays className="w-5 h-5" /> Upcoming Deadlines
        </h3>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <AlarmClock className="w-4 h-4" /> next 2 weeks
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={item.title}
            className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors duration-200 group cursor-pointer"
          >
            <div className="truncate flex-1">
              <div className="font-medium truncate text-gray-800 group-hover:text-gray-900">
                {item.title}
              </div>
              <div className="text-xs text-gray-500">Due {item.due}</div>
            </div>
            <span 
              className={`text-xs px-2 py-1 rounded ml-2 transition-all duration-200 group-hover:scale-105 ${getBadgeStyle(item.priority)}`}
            >
              {item.priority}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}