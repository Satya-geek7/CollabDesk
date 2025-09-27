import React from "react";
import { motion } from "framer-motion";

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 text-gray-500 mt-10"
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-4xl mb-4 filter drop-shadow-lg"
        >
          🎯
        </motion.div>
        <motion.p
          className="text-lg font-medium"
          style={{
            background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          No tasks yet!
        </motion.p>
        <p className="text-sm mt-1 text-slate-500 font-medium">
          Add your first task above
        </p>
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;
