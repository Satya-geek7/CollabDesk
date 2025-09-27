import React, { Children } from "react";
import { motion } from "framer-motion";
import { NotepadText } from "lucide-react";

const ToDoLayout = ({ children }) => {
  return (
    <>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full max-w-md bg-white/95 backdrop-blur-xl border rounded-xl p-4 shadow-2xl border-white/20"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl mt-2 font-bold text-center mb-4 flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            To-Do's List
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <NotepadText />
            </motion.span>
          </motion.h1>
          {children}
        </motion.div>
    </>
  );
};

export default ToDoLayout;
