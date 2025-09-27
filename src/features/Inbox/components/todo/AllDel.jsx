import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const AllDel = ({ handleAllDel }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="font-semibold text-lg mt-10 flex justify-center"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Do it now !
        </motion.div>
        <div className="flex justify-end mt-4">
          <motion.button
            onClick={handleAllDel}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(239, 68, 68, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg flex flex-row gap-1 font-base transition-all duration-200 hover:shadow-md"
          >
            <Trash2 size={18} className="text-red-500 align-middle" />
            <span className="text-slate-700 font-medium">Delete all</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default AllDel;
