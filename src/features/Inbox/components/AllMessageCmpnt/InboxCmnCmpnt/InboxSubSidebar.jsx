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
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import IconTooltip from "../../../../../Components/ui/CmnCmpnts/Tooltip";
import useResponsive from "../../../../../Zustand/useResoponsive";

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

  //Zustand state for inbox-SubSidebar toggle Responsiveness
  const setToggled = useResponsive((s) => s.setToggled);
  const istoggled = useResponsive((s) => s.istoggled);

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
      className={`flex items-center justify-between px-4 ${
        istoggled === true ? "py-4" : "py-3"
      }  mb-1 rounded-xl cursor-pointer transition-all duration-200 ease-out
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

  // useEffect(() => {
  //   setToggled(true);
  // }, []);

  const handleToggle = () => {
    if (istoggled === true) {
      setToggled(false);
    } else setToggled(true);
  };

  return (
    <>
      <div
        className={`hidden lg:block mt-[67px] fixed top-0 left-0 text-black 
    bg-white/20 backdrop-blur-xl border border-black/10 rounded-2xl px-5 py-6 shadow-lg
    transition-all duration-300 
    ${
      istoggled === true
        ? "lg:w-[100px] md:w-[80px]"
        : "lg:w-[380px] md:w-[300px]"
    }`}
      >
        {/* Filters */}
        <div className="mb-3">
          {/* Toggle Arrow */}
          <button
            onClick={handleToggle}
            className="absolute top-4 right-[-12px] w-6 h-6 flex items-center justify-center 
             bg-white/90 text-black rounded-full shadow-md hover:bg-white/100 transition-all"
          >
            {istoggled === true ? ">" : "<"}
          </button>

          {istoggled === false && (
            <h4 className="font-semibold mb-3 px-2 text-xs tracking-wide uppercase">
              Filters
            </h4>
          )}
          {filterItems.map((i) => (
            <IconTooltip
              key={i.id}
              text={
                i.path === "messages"
                  ? "Messages/DM's"
                  : i.path === "unread"
                  ? "Unread"
                  : i.path === "starred"
                  ? "Starred"
                  : "Archived"
              }
            >
              <SidebarItem
                key={i.id}
                icon={i.icon}
                path={i.path}
                onClick={() => handleClick(i.path)}
                label={istoggled === false ? i.label : null}
                badgeColor={
                  i.badgeColor || "bg-gradient-to-r from-pink-500 to-purple-500"
                }
                borderColor={`border-l-4 ${i.borderColor}`}
              />
            </IconTooltip>
          ))}
        </div>

        {/* Sources */}
        <div className="mb-6">
          {istoggled === false && (
            <h4 className="font-semibold mb-3 px-2 text-xs tracking-wide uppercase">
              Sources
            </h4>
          )}
          {sourceItems.map((i) => (
            <IconTooltip
              key={i.id}
              text={
                i.path === "slack"
                  ? "Slack"
                  : i.path === "jira"
                  ? "Jira"
                  : "Email"
              }
            >
              <SidebarItem
                key={i.id}
                icon={i.icon}
                path={i.path}
                label={istoggled === false ? i.label : null}
                onClick={() => handleClick(path)}
                badge={istoggled === false ? i.badge : null}
                iconColor={i.iconColor}
                badgeColor={
                  i.badgeColor || "bg-gradient-to-r from-pink-500 to-purple-500"
                }
                borderColor={`border-l-4 ${i.borderColor}`}
              />
            </IconTooltip>
          ))}
        </div>

        {/* Add-Ons */}
        <div>
          {istoggled === false && (
            <h4 className="font-semibold mb-3 px-2 text-xs tracking-wide uppercase">
              Add-On's
            </h4>
          )}
          {integratedApps.map((i) => (
            <IconTooltip
              key={i.id}
              text={
                i.path === "notion"
                  ? "Notion"
                  : i.path === "calender"
                  ? "Calender"
                  : "To-Do List"
              }
            >
              <SidebarItem
                key={i.id}
                icon={i.icon}
                label={istoggled === false ? i.label : null}
                badge={istoggled === false ? i.badge : null}
                path={i.path}
                badgeColor={
                  i.badgeColor || "bg-gradient-to-r from-pink-500 to-purple-500"
                }
                borderColor={`border-l-4 ${i.borderColor}`}
              />
            </IconTooltip>
          ))}
        </div>
      </div>

      {/* { Mobile Downbar } */}
      <div className="md:hidden fixed bottom-0 left-0 w-full gap-x-1 px-1 overflow-scroll flex justify-around items-center bg-white/20 backdrop-blur-xl border-t border-black/10 shadow-lg py-1 z-50">
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
