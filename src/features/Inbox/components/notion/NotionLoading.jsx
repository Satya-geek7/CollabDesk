import React from "react";
import { LoaderIcon } from "lucide-react"; // optional icon library

const NotionLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <div className="animate-spin">
        <LoaderIcon size={48} className="text-blue-500" />
      </div>
      <div className="text-gray-500 text-lg font-medium animate-pulse">
        Loading Notion data...
      </div>
    </div>
  );
};

export default NotionLoading;
