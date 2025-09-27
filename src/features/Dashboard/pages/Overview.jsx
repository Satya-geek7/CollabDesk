import { Users, Activity, CheckSquare, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";

import KpiCard from "../../../Components/DashBoard/OverView/KpiCard";
import EngagementChart from "../../../Components/DashBoard/OverView/EngagementChart";
import TaskPieChart from "../../../Components/DashBoard/OverView/TaskPieChart";
import TopContributors from "../../../Components/DashBoard/OverView/TopContributors";
import ProductivityInsights from "../../../Components/DashBoard/OverView/ProductivityInsights";
import UpcomingDeadlines from "../../../Components/DashBoard/OverView/UpcomingDeadlines";
import NextMeetingCard from "../../../Components/DashBoard/OverView/NextMeetingCard";
import SystemAlerts from "../../../Components/DashBoard/OverView/SystemAlerts";
import FilterBar from "../../../Components/DashBoard/OverView/FilterBar";
import DataLoadingPage from "../../../Components/ui/CmnCmpnts/DataLoading";

export default function OverviewPage() {
  const [filters, setFilters] = useState({
    team: "All Teams",
    range: "Last 30 days",
  });

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from("stats")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <DataLoadingPage />;

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    console.log("Filters updated:", newFilters);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Filters */}
      <FilterBar onChange={handleFilterChange} />

      <div className=" lg:px-8 py-6 space-y-8 md">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <KpiCard
            data={stats?.tasks_due}
            icon={Activity}
            label="Engagement Rate"
            color="bg-blue-500"
          />
          <KpiCard
            data={stats?.meetings_count}
            icon={CheckSquare}
            label="Task Completion Rate"
            color="bg-green-500"
          />
          <KpiCard
            data={stats?.inbox_count}
            icon={Users}
            label="Retention / Churn"
            color="bg-purple-500"
          />
          <KpiCard
            data={stats?.ai_reports}
            icon={Clock}
            label="Avg Meeting Duration"
            color="bg-yellow-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EngagementChart />
          <TaskPieChart />
        </div>

        {/* Team & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopContributors />
          <div className="lg:col-span-1">
            <ProductivityInsights />
          </div>
        </div>

        {/* Events & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UpcomingDeadlines />
          <NextMeetingCard />
          <SystemAlerts />
        </div>
      </div>
    </div>
  );
}
