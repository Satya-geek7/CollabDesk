import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { GripVertical, CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";

const ToDoItem = ({
  data,
  index,
  toggleDone,
  delTodo,
  startEdit,
  saveEdit,
  editingId,
  editingText,
  setEditingText,
}) => {
  return (
    <Draggable draggableId={data.id.toString()} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95, x: -100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{
            scale: snapshot.isDragging ? 1 : 1.02,
            y: snapshot.isDragging ? 0 : -2,
          }}
          className={`flex justify-between items-center px-4 py-2 rounded-full shadow-lg hover:shadow-xl my-2 border border-slate-200/50 backdrop-blur-sm ${
            snapshot.isDragging ? "rotate-2 shadow-2xl" : ""
          }`}
          style={{
            background: data.done
              ? "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e7f3ff 100%)",
            ...provided.draggableProps.style,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              {...provided.dragHandleProps}
              className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-slate-100 transition-colors"
            >
              <GripVertical size={16} className="text-slate-400" />
            </div>

            {/* Toggle */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleDone(data.id, data.done)}
              className="cursor-pointer"
            >
              {data.done ? (
                <CheckCircle2 size={20} className="text-emerald-500 drop-shadow-sm" />
              ) : (
                <Circle
                  size={20}
                  className="text-slate-400 hover:text-blue-500 transition-colors duration-200"
                />
              )}
            </motion.div>

            {/* Inline Editing */}
            {editingId === data.id ? (
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => saveEdit(data.id)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(data.id)}
                className="border-b border-gray-300 outline-none text-base font-medium px-1"
                autoFocus
              />
            ) : (
              <motion.span
                animate={{
                  color: data.done ? "#64748b" : "#1e293b",
                  scale: data.done ? 0.98 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={`text-base font-medium ${
                  data.done ? "line-through opacity-70" : ""
                }`}
              >
                {data.text}
              </motion.span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <motion.button
              onClick={() => startEdit(data.id, data.text)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg transition-all duration-200"
            >
              <Pencil size={18} className="text-blue-500" />
            </motion.button>
            <motion.button
              onClick={() => delTodo(data.id)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(239, 68, 68, 0.1)",
              }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 size={18} className="text-rose-500" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};

export default ToDoItem;
