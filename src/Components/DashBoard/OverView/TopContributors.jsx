import React from "react";

const contributors = [
  { name: "Aarav", score: 128, role: "Frontend", avatar: "A" },
  { name: "Neha", score: 117, role: "PM", avatar: "N" },
  { name: "Rahul", score: 98, role: "Backend", avatar: "R" },
  { name: "Ishita", score: 90, role: "Design", avatar: "I" },
  { name: "Kabir", score: 86, role: "QA", avatar: "K" },
];

export default function TopContributors() {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-md mx-auto hover:shadow-lg transition-shadow duration-200">
      <h3 className="font-semibold mb-4 text-lg md:text-xl text-gray-800 flex items-center gap-2">
        🏆 Top Contributors
      </h3>
      <ul className="space-y-3">
        {contributors.map((c, i) => (
          <li
            key={c.name}
            className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors group"
          >
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 text-white grid place-items-center font-semibold shadow-sm group-hover:scale-110 transition-transform duration-200">
                {c.avatar}
              </div>
              <div className="leading-tight">
                <div className="font-medium text-sm md:text-base">{c.name}</div>
                <div className="text-xs text-gray-500">{c.role}</div>
              </div>
            </div>
            {/* Right Section */}
            <div className="text-sm font-semibold text-gray-700 flex items-center gap-1 group-hover:scale-110 transition-transform duration-200">
              {c.score}
              <span className="text-gray-400 text-xs">pts</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}