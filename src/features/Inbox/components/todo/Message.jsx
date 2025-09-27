import React from "react";
import { motion } from "framer-motion";

const Message = ({ message }) => {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="text-center text-sm mt-2 font-medium"
      style={{
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {message}
    </motion.p>
  );
};

export default Message;
