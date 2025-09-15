import React from "react";

const SidebarShow = ({ menuItems }) => {
  return (
    <div className="flex-1 p-2 space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.name}
            className="flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 text-gray-700"
          >
            <Icon size={20} className="mr-3 text-gray-500" />
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarShow;
