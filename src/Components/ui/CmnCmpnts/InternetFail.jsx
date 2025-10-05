import React from "react";
import { motion } from "framer-motion";
import { WifiOff } from "lucide-react";

const InternetFail = () => {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
      {/* Icon Animation */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <WifiOff size={80} className="text-red-500 drop-shadow-md" />
        <h1 className="text-3xl font-bold mt-4">No Internet Connection</h1>
        <p className="text-gray-600 mt-2 text-center max-w-sm">
          It looks like you’re offline. Please check your connection and try
          again.
        </p>
      </motion.div>
    </div>
  );
};

export default InternetFail;
