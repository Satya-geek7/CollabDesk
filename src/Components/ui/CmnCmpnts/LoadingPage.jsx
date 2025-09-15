import { useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import InternetFail from "./InternetFail";

export default function LoadingPage() {
  const [showFail, setShowFail] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFail(true); // update state after 5s
    }, 5000);

    return () => clearTimeout(timer); // cleanup if unmounts early
  }, []);

  if (showFail) {
    return <InternetFail />;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
          className="w-12 h-12 border-4 border-gray-800 rounded-full"
        ></motion.div>

        <h1 className="text-2xl text-gray-800 font-semibold mt-6 tracking-wide">
          Loading...
        </h1>
      </motion.div>
    </div>
  );
}
