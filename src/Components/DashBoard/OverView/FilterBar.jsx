import React, { useState } from "react";
import {
  Filter,
  Calendar as CalendarIcon,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";

const teams = ["All Teams", "Frontend", "Backend", "Design", "PM", "QA"];
const ranges = ["Last 7 days", "Last 30 days", "This Quarter", "Custom"];

export default function FilterBar({ onChange }) {
  const [team, setTeam] = useState(teams[0]);
  const [range, setRange] = useState(ranges[1]);
  const [open, setOpen] = useState(false);

  const emit = (t, r) => onChange?.({ team: t ?? team, range: r ?? range });

  return (
    <div className="w-full bg-white border-b px-4 py-3 sticky top-0 z-20 shadow-sm">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg border hover:bg-gray-50 transition"
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        </button>

        {/* Filters (Desktop) */}
        <div className="hidden md:flex flex-wrap items-center gap-3">
          {/* Team */}
          <div className="flex items-center gap-2">
            <label className="text-base text-gray-700">Team</label>
            <div className="relative">
              <Filter className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
              <select
                className="pl-8 pr-3 py-2 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={team}
                onChange={(e) => {
                  setTeam(e.target.value);
                  emit(e.target.value, null);
                }}
              >
                {teams.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Range</label>
            <div className="relative">
              <CalendarIcon className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
              <select
                className="pl-8 pr-3 py-2 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={range}
                onChange={(e) => {
                  setRange(e.target.value);
                  emit(null, e.target.value);
                }}
              >
                {ranges.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Apply Button */}
          <button
            className="inline-flex items-center gap-2 text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 transition focus:ring-2 focus:ring-blue-400"
            onClick={() => emit()}
          >
            <RefreshCw className="w-4 h-4" />
            Apply
          </button>
        </div>
      </div>

      {/* Filters (Mobile Dropdown) */}
      {open && (
        <div className="mt-3 flex flex-col gap-3 md:hidden">
          {/* Team */}
          <div>
            <label className="text-sm text-gray-500">Team</label>
            <select
              className="w-full mt-1 px-3 py-2 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={team}
              onChange={(e) => {
                setTeam(e.target.value);
                emit(e.target.value, null);
              }}
            >
              {teams.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Range */}
          <div>
            <label className="text-sm text-gray-500">Range</label>
            <select
              className="w-full mt-1 px-3 py-2 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={range}
              onChange={(e) => {
                setRange(e.target.value);
                emit(null, e.target.value);
              }}
            >
              {ranges.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Apply */}
          <button
            className="w-full inline-flex items-center justify-center gap-2 text-sm rounded-lg border px-3 py-2 hover:bg-gray-50 transition focus:ring-2 focus:ring-blue-400"
            onClick={() => emit()}
          >
            <RefreshCw className="w-4 h-4" />
            Apply
          </button>
        </div>
      )}
    </div>
  );
}