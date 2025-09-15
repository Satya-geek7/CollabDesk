import React from "react";
import { AlertTriangle, HardDrive, PlugZap } from "lucide-react";

const alerts = [
  {
    icon: HardDrive,
    msg: "Storage nearing limit (85%). Consider archiving old files.",
    type: "warn",
  },
  {
    icon: PlugZap,
    msg: "Integration error: Jira webhook failed last sync.",
    type: "error",
  },
];

const alertStyles = {
  warn: "bg-amber-50 text-amber-800 border-amber-200",
  error: "bg-red-50 text-red-700 border-red-200",
};

export default function SystemAlerts() {
  return (
    <div className="rounded-xl p-5 border bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
        <AlertTriangle className="w-5 h-5 text-red-500" /> System Alerts
      </h3>
      <div className="space-y-2">
        {alerts.map((alert, i) => {
          const Icon = alert.icon;
          return (
            <div
              key={i}
              className={`rounded-lg border px-3 py-2 flex items-start gap-2 transition-all duration-200 hover:scale-105 cursor-pointer ${alertStyles[alert.type]}`}
            >
              <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{alert.msg}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}