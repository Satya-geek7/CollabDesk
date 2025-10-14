import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // 👈 use Outlet instead of AppRouter
import Sidebar from "../Components/MainCmpnts/Sidebar/Sidebar";
import Topbar from "../Components/MainCmpnts/TopbarCmpnts/Topbar";

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full ">
      <Topbar setMobileOpen={setMobileOpen} />
      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main Content Area */}
        <main
          className="flex-1 min-w-0 p-4 overflow-y-auto "
          style={{ transition: "all 0.3s ease" }}
        >
          <Outlet /> {/* 👈 renders the nested route page */}
        </main>
      </div>
    </div>
  );
}
