import { useRef, useEffect } from "react";
import {
  Inbox,
  CheckSquare,
  Calendar,
  Users,
  BarChart3,
  Settings,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SidebarBrand from "./SidebarBrand";

const menuItems = [
  { name: "Dashboard", icon: BarChart3 },
  { name: "Inbox", icon: Inbox },
  { name: "Tasks", icon: CheckSquare },
  { name: "Team", icon: Users },
  { name: "Meetings", icon: Calendar },
  { name: "Settings", icon: Settings },
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen, setMobileOpen]);

  return (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
        >
          {/* Modern Glass-morphism Sidebar */}
          <motion.div
            ref={sidebarRef}
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.3,
            }}
            className="h-full w-80 bg-gradient-to-br from-white/95 to-white/90 
                       dark:from-gray-900/95 dark:to-gray-800/90 
                       backdrop-blur-xl border-r border-white/20 
                       dark:border-gray-700/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-6 pb-4">
              <SidebarBrand collapsed={false} setCollapsed={() => {}} />
              <motion.button
                onClick={() => setMobileOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-100/50 dark:bg-gray-800/50 
                           text-gray-600 dark:text-gray-400 
                           hover:bg-red-100 dark:hover:bg-red-900/30 
                           hover:text-red-600 dark:hover:text-red-400 
                           transition-all duration-200"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Navigation Menu */}
            <div className="px-6 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.08,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: 1.02,
                      x: 4,
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate(`/${item.name.toLowerCase()}`);
                      setMobileOpen(false);
                    }}
                    className="group w-full flex items-center gap-4 p-4 
                               rounded-2xl font-medium text-left 
                               text-gray-700 dark:text-gray-200 
                               hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                               dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 
                               hover:text-blue-700 dark:hover:text-blue-300 
                               hover:shadow-lg hover:shadow-blue-500/10 
                               transition-all duration-300 ease-out"
                  >
                    <div
                      className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 
                                    group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 
                                    group-hover:shadow-md transition-all duration-300"
                    >
                      <Icon
                        size={20}
                        className="text-gray-600 dark:text-gray-400 
                                   group-hover:text-blue-600 dark:group-hover:text-blue-400 
                                   transition-colors duration-300"
                      />
                    </div>
                    <span className="group-hover:font-semibold transition-all duration-300">
                      {item.name}
                    </span>
                    <motion.div
                      className="ml-auto w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 
                                 group-hover:w-2 transition-all duration-300 rounded-full"
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Decorative Gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16 
                            bg-gradient-to-t from-blue-500/5 to-transparent 
                            dark:from-blue-400/10 pointer-events-none rounded-b-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}