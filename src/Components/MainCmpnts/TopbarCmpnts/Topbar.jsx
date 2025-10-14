import React, { useState, useEffect } from "react";
import {
  Menu,
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  LogOut,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { motion } from "framer-motion";
import useBreadcrumbStore from "../../../Zustand/breadCrumbStore";
import useStore from "../../../Zustand/useAuthStore";
import { Navigate } from "react-router-dom";
import Notification from "./Notification";

const Topbar = ({ setMobileOpen }) => {
  //States
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationNO, setNotificationNo] = useState(0);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [scrollDir, setScrollDir] = useState("up");
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false); // 👈 screen size tracker

  //Zustand
  const location = useLocation();
  const breadcrumbStore = useBreadcrumbStore((state) => state);
  const setBreadcrumb = useBreadcrumbStore((state) => state.setBreadcrumb);
  const LogoutFromStore = useStore((state) => state.logout);

  const Logout = async () => {
    const LgotCnfrmd = confirm("Are you sure you want to logout?");
    if (LgotCnfrmd) {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw alert(error.message);

        localStorage.clear();
        LogoutFromStore();
        alert("User signed out successfully");
        return <Navigate to="/login" replace />;
      } catch (err) {
        console.error("Logout failed:", err.message);
        alert("An error occurred while logging out.");
      }
    }
  };

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobileOrTablet(window.innerWidth < 1024); // lg breakpoint = 1024px
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Detect scroll direction (only on mobile/tablet)
  useEffect(() => {
    if (!isMobileOrTablet) return; // 🚫 do nothing on desktop

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileOrTablet]);

  // Update breadcrumb on route change
  useEffect(() => {
    const pathnames = location.pathname.split("/").filter(Boolean);
    const breadcrumb = pathnames.map((name, index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      path: `/${pathnames.slice(0, index + 1).join("/")}`,
    }));
    setBreadcrumb([...breadcrumb]);
  }, [location.pathname, setBreadcrumb]);

  return (
    <>
      {showNotifications && (
        <Notification
          ntfcn={setNotificationNo}
          setNtfcn={setShowNotifications}
        />
      )}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isMobileOrTablet && scrollDir === "down" ? -80 : 0 }} // 👈 only mobile/tablet
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 shadow-sm"
      >
        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
          {/* Left Section: Menu + Breadcrumbs */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} className="text-gray-600" />
            </button>

            {/* Breadcrumbs */}
            <nav className="flex items-center text-base overflow-x-auto font-mono">
              {breadcrumbStore.breadcrumb.map((item, index) => {
                const isLast = index === breadcrumbStore.breadcrumb.length - 1;
                return (
                  <div
                    key={item.path}
                    className="flex items-center flex-shrink-0"
                  >
                    <div
                      className={`flex items-center ${
                        isLast ? "text-gray-800 font-medium" : "text-gray-800"
                      }`}
                    >
                      {isLast ? (
                        <span className="hover:text-blue-600 hover:cursor-pointer">
                          {item.name}
                        </span>
                      ) : (
                        <Link to={item.path}>{item.name}</Link>
                      )}
                    </div>
                    {!isLast && (
                      <ChevronRight
                        size={16}
                        className="text-gray-400 lg:mx-2"
                      />
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Centered Search Bar (desktop only) */}
          <div className="flex-1 flex justify-center mt-2 sm:mt-0">
            <div className="relative w-full max-w-md hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center space-x-5 flex-shrink-0 mt-2 sm:mt-0">
            {/* Desktop actions */}
            <div className="hidden sm:flex items-center space-x-5">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Bell size={20} className="text-gray-600" />
                  {notificationNO.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notificationNO}
                    </span>
                  )}
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-gray-600" />
                ) : (
                  <Moon size={20} className="text-gray-600" />
                )}
              </button>

              {/* User Avatar */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">JD</span>
                  </div>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => Logout()}
                className="relative p-2 rounded-lg hover:bg-red-400 transition-colors"
              >
                <LogOut
                  size={20}
                  className="text-gray-600 hover:bg-red-400 hover:text-white"
                />
              </button>
            </div>

            {/* Mobile Dropdown */}
            <div className="sm:hidden relative">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MoreHorizontal size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Topbar;
