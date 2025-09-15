import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeDown } from "../../../utils/motionVariants";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import CollabDesk from "../../../assets//logos/CollabDesk.png"

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menus = [
    {
      name: "AI Features",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Smart Tools</h4>
            <ul className="space-y-1 text-gray-600">
              <li>AI Chat Assistant</li>
              <li>Smart Summarizer</li>
              <li>Task Automation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Productivity</h4>
            <ul className="space-y-1 text-gray-600">
              <li>Workflow Builder</li>
              <li>Data Insights</li>
              <li>AI Reports</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      name: "Integration",
      content: (
        <p className="text-gray-600">
          Connect with tools like Slack, Zoom, Google Workspace, and more.
        </p>
      ),
    },
    {
      name: "Pricing",
      content: (
        <p className="text-gray-600">
          Check our pricing plans for teams and enterprises.
        </p>
      ),
    },
    {
      name: "Resources",
      content: (
        <p className="text-gray-600">
          Blogs, guides, and documentation to help you get started.
        </p>
      ),
    },
  ];

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  return (
    <motion.header
      variants={fadeDown}
      initial="hidden"
      animate="show"
      className="fixed w-full bg-white shadow-sm top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center flex-row gap-2">
        <img src={CollabDesk} className="h-10 w-10" alt="logo" />
        <div className="text-3xl font-bold text-purple-700">CollabDesk</div>
        </div>

        <nav className="hidden md:flex space-x-8 font-medium text-gray-700 mx-auto">
          {menus.map((menu, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setActiveMenu(menu.name)}
              onMouseLeave={() => setTimeout(() => setActiveMenu(null), 200)}
            >
              <button
                aria-expanded={activeMenu === menu.name}
                className="relative inline-block after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-purple-700 after:transition-all after:duration-300 hover:after:w-full transition-all duration-300 cursor-pointer"
              >
                {menu.name}
              </button>

              <AnimatePresence>
                {activeMenu === menu.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full mt-3 bg-white shadow-xl rounded-lg p-6 w-[400px] z-50 ${
                      i === menus.length - 1 ? "right-0" : "left-0"
                    }`}
                  >
                    {menu.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-6">
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="border border-purple-700 text-purple-700 px-5 py-2 rounded-full hover:bg-purple-50 transition-all"
            >
              Sign In
            </Link>
            <button className="bg-purple-700 text-white px-5 py-2 rounded-full hover:bg-purple-800 transition-all">
              Get Started
            </button>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-xl z-50 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-2xl font-bold text-purple-700">
                CollabDesk
              </div>
              <button onClick={() => setMobileOpen(false)}>
                <X size={28} className="text-gray-700" />
              </button>
            </div>

            <ul className="space-y-6 text-gray-700 text-lg">
              {menus.map((menu, i) => (
                <li key={i}>
                  <details className="group">
                    <summary className="flex font-medium justify-between items-center cursor-pointer">
                      {menu.name}
                      <span className="transition-transform duration-200 group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="mt-2 font-small text-gray-600">{menu.content}</div>
                  </details>
                </li>
              ))}
            </ul>

            <div className="mt-auto space-y-4">
              <Link
                to="/login"
                className="block border border-purple-700 text-purple-700 text-center px-5 py-2 rounded-full hover:bg-purple-50"
              >
                Sign in
              </Link>
              <button className="w-full bg-purple-700 text-white py-2 rounded-full hover:bg-purple-800">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
