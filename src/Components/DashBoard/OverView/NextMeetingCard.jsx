import React from "react";
import { Calendar, Users } from "lucide-react";

export default function NextMeetingCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-blue-500 grid place-items-center group-hover:bg-blue-600 transition-colors duration-200 group-hover:scale-110">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="font-semibold text-gray-800 group-hover:text-gray-900">
            Project Roadmap
          </div>
          <div className="text-xs text-gray-500">Aug 22, 10:00 AM</div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-700">
        <Users className="w-4 h-4" />
        6 attendees
      </div>
    </div>
  );
}