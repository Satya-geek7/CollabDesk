import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const ToDoForm = ({ todoInput, setTodoInput, handleSubmit }) => {
  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      onSubmit={handleSubmit}
      className="flex items-center rounded-full px-4 py-2 shadow-lg backdrop-blur-sm border border-slate-200/50"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <input
        type="text"
        className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 font-medium"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        placeholder="Add your task"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        className="ml-2 p-2 rounded-full text-white shadow-lg"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        }}
      >
        <Plus size={20} />
      </motion.button>
    </motion.form>
  );
};

export default ToDoForm;
