import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InternetFail from "./InternetFail";

export default function LoadingPage() {
  const [showFail, setShowFail] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFail(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  if (showFail) {
    return <InternetFail />;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex flex-col items-center space-y-6"
      >
        {/* Animated Dots */}
        <div className="flex space-x-2 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gray-800 rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.h1
          className="text-2xl font-semibold text-gray-800 tracking-wide"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          Loading...
        </motion.h1>
      </motion.div>
    </div>
  );
}
