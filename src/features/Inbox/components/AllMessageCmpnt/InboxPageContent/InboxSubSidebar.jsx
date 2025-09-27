import { useState, useEffect } from "react";
import {
  Inbox,
  Circle,
  Star,
  FileText,
  Archive,
  MessageSquare,
  Settings,
  Mail,
  AlertTriangle,
  Folder,
  Megaphone,
  Bug,
  Notebook,
  Calendar,
  ListTodo,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InboxSubSidebar = () => {
  const filterItems = [
    { id: "all-messages", icon: Inbox, label: "Messages", path: "messages" },
    { id: "unread", icon: Circle, label: "Unread", path: "unread" },
    { id: "starred", icon: Star, label: "Starred", path: "starred" },
    { id: "archived", icon: Archive, label: "Archived", path: "archived" },
  ];

  const sourceItems = [
    {
      id: "slack",
      icon: MessageSquare,
      label: "Slack",
      badge: 12,
      path: "slack",
      iconColor: "text-pink-400",
    },
    {
      id: "jira",
      icon: Settings,
      label: "Jira",
      badge: 7,
      path: "jira",
      iconColor: "text-blue-400",
    },
    {
      id: "email",
      icon: Mail,
      label: "Email",
      badge: 4,
      path: "email",
      iconColor: "text-red-400",
    },
  ];

  const tagItems = [
    {
      id: "high-priority",
      icon: AlertTriangle,
      label: "High Priority",
      badge: 3,
      path: "highpriority",
      borderColor: "border-l-red-400",
    },
    {
      id: "project-alpha",
      icon: Folder,
      label: "Project Alpha",
      badge: 8,
      path: "projectalpha",
      borderColor: "border-l-emerald-400",
    },
    {
      id: "marketing",
      icon: Megaphone,
      label: "Marketing Campaign",
      badge: 5,
      path: "marketing",
      borderColor: "border-l-amber-400",
    },
    {
      id: "bug-fixes",
      icon: Bug,
      label: "Bug Fixes",
      badge: 2,
      path: "bugfixes",
      borderColor: "border-l-purple-400",
    },
  ];

  const integratedApps = [
    {
      id: "notion",
      icon: Notebook,
      label: "Notion",
      path: "notion",
    },
    {
      id: "calender",
      icon: Calendar,
      label: "Calendar",
      path: "notion",
    },
    {
      id: "to-do list",
      icon: ListTodo,
      label: "To-Do",
      path: "to-do",
    },
  ];

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(`/inbox/${path}`);
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const SidebarItem = ({
    icon: Icon,
    label,
    badge,
    badgeColor,
    borderColor,
    iconColor,
    path,
  }) => (
    <div
      className={`flex items-center justify-between px-4 py-3 mb-1 rounded-xl cursor-pointer transition-all duration-200 ease-out
        hover:bg-white/20 hover:translate-x-1 hover:shadow-md ${
          borderColor || ""
        }`}
      onClick={() => handleClick(path)}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className={iconColor} />
        <span>{label}</span>
      </div>
      {badge && (
        <span
          className={`text-xs font-semibold text-white px-1.5 py-0.5 rounded-full bg-blue-500`}
        >
          {badge}
        </span>
      )}
    </div>
  );

  const DownbarItem = ({ icon: Icon, label, badge, path }) => (
    <button
      className={`flex flex-col items-center justify-center relative px-5 py- rounded-xl cursor-pointer transition-all duration-200 ease-out hover:bg-white/30`}
      onClick={() => handleClick(path)}
    >
      <Icon size={24} />
      <span className="text-[11px] mt-1">{label}</span>
      {badge && (
        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <>
      <div className="lg:w-[380px] hidden lg:block mt-[67px] fixed top-0 text-black bg-white/20 backdrop-blur-xl border border-black/10 rounded-2xl px-5 py-6 left-0 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          {/* Search */}
          <div className="h-8 w-8 border rounded-full">
            <img
              src="../../../assets/logos/Profile.svg"
              alt="Pic"
              className="h-8 w-8"
            />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full px-3 py-1 w-2/3"
          />

          {/* Online/Offline */}
          <div className="flex items-center gap-2 rounded-lg bg-white/10 py-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline ? "bg-green-400 animate-pulse" : "bg-red-500"
              }`}
            />
            <span className="text-sm font-medium">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Filters */}

        <div className="mb-3">
          <h4 className=" font-semibold mb-3 px-2 text-xs tracking-wide uppercase">
            Filters
          </h4>
          {filterItems.map((i) => (
            <SidebarItem
              key={i.id}
              icon={i.icon}
              path={i.path}
              onClick={() => handleClick(path)}
              label={i.label}
              badgeColor={
                i.badgeColor || "bg-gradient-to-r from-pink-500 to-purple-500"
              }
              borderColor={`border-l-4 ${i.borderColor}`}
            />
          ))}
        </div>

        {/* Sources */}
        <div className="mb-6">
          <h4 className=" font-semibold mb-3 px-2 text-xs tracking-wide uppercase">
            Sources
          </h4>
          {sourceItems.map((i) => (
            <SidebarItem
              key={i.id}
              icon={i.icon}
              path={i.path}
              label={i.label}
              onClick={() => handleClick(path)}
              badge={i.badge}
              iconColor={i.iconColor}
              badgeColor={
                i.badgeColor || "bg-gradient-to-r from-pink-500 to-purple-500"
              }
              borderColor={`border-l-4 ${i.borderColor}`}
            />
          ))}
        </div>

        {/* Tags */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 px-2 text-xs tracking-wide uppercase">
            Tags
          </h4>
          {tagItems.map((i) => (
            <SidebarItem
              key={i.id}
              icon={i.icon}
              label={i.label}
              onClick={() => handleClick(path)}
              badge={i.badge}
              path={i.path}
              badgeColor={
                i.badgeColor || "bg-gradient-to-r from-pink-500 to-purple-500"
              }
              borderColor={`border-l-4 ${i.borderColor}`}
            />
          ))}
        </div>
        {/* {Add On's} */}
        <div>
          <h4 className="font-semibold mb-3 px-2 text-xs tracking-wide uppercase">
            Add-On's
          </h4>
          {integratedApps.map((i) => (
            <SidebarItem
              key={i.id}
              icon={i.icon}
              label={i.label}
              badge={i.badge}
              path={i.path}
              badgeColor={
                i.badgeColor || "bg-gradient-to-r from-pink-500 to-purple-500"
              }
              borderColor={`border-l-4 ${i.borderColor}`}
            />
          ))}
        </div>
      </div>

      {/* { Mobile Downbar } */}
      <div className="md:hidden fixed bottom-0 left-0 w-full gap-x-1 pl-1 pr-1 overflow-scroll flex justify-around items-center bg-white/20 backdrop-blur-xl border-t border-black/10 shadow-lg py-1 z-50">
        {filterItems.map((i) => (
          <DownbarItem
            key={i.id}
            label={i.label}
            badge={i.badge}
            icon={i.icon}
            path={i.path}
          />
        ))}
        {sourceItems.map((i) => (
          <DownbarItem
            key={i.id}
            label={i.label}
            badge={i.badge}
            icon={i.icon}
            path={i.path}
          />
        ))}
        {tagItems.map((i) => (
          <DownbarItem
            key={i.id}
            path={i.path}
            label={i.label}
            badge={i.badge}
            icon={i.icon}
          />
        ))}
        {integratedApps.map((i) => (
          <DownbarItem
            key={i.id}
            path={i.path}
            label={i.label}
            badge={i.badge}
            icon={i.icon}
          />
        ))}
      </div>
    </>
  );
};

export default InboxSubSidebar;
