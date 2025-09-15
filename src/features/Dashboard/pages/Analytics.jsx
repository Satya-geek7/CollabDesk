import React, { useState } from "react";
import { TrendingUp, Users, Activity, CreditCard } from "lucide-react";

// Components
import AnalyticsHeader from "../../../Components/DashBoard/Analytics/AnalyticsHeader";
import SummaryCard from "../../../Components/DashBoard/Analytics/SummaryCards";
import FilterControls from "../../../Components/DashBoard/Analytics/FiltersControls";
import RevenueChart from "../../../Components/DashBoard/Analytics/Charts/RevenueChart";
import UsersBarChart from "../../../Components/DashBoard/Analytics/Charts/UsersBarChart";
import PlansPieChart from "../../../Components/DashBoard/Analytics/Charts/PlansPieChart";
import EngagementChart from "../../../Components/DashBoard/Analytics/Charts/EngagementChart";

import {
  revenueData,
  usersData,
  plansData,
  engagementData,
} from "../../../data/AnalyticsData";

const Analytics = () => {
  const [activeFilter, setActiveFilter] = useState("30d");

  const iconMap = {
    TrendingUp,
    Users,
    Activity,
    CreditCard,
  };

  const summaryCardsData = [
    {
      icon: TrendingUp,
      label: "Total Revenue",
      value: "₹245k",
      trend: "+12.5%",
      isPositive: true,
      subtitle: "vs last month",
      color: "indigo",
    },
    {
      icon: Users,
      label: "Active Users",
      value: "12,543",
      trend: "+8.2%",
      isPositive: true,
      subtitle: "vs last month",
      color: "cyan",
    },
    {
      icon: Activity,
      label: "Engagement Rate",
      value: "76.8%",
      trend: "+5.1%",
      isPositive: true,
      subtitle: "vs last month",
      color: "purple",
    },
    {
      icon: CreditCard,
      label: "Conversion Rate",
      value: "3.24%",
      trend: "-2.1%",
      isPositive: false,
      subtitle: "vs last month",
      color: "amber",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 lg:p-x-8 lg:p-2 pb-20">
      <div className="mx-auto space-y-8">
        {/* Header */}
        <AnalyticsHeader />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryCardsData.map((card, index) => (
            <SummaryCard
              key={index}
              icon={card.icon}
              label={card.label}
              value={card.value}
              trend={card.trend}
              isPositive={card.isPositive}
              subtitle={card.subtitle}
              color={card.color}
            />
          ))}
        </div>

        {/* Filter Controls */}
        <FilterControls
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData} />
          </div>
          <div>
            <UsersBarChart data={usersData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlansPieChart data={plansData} />
          <EngagementChart data={engagementData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
