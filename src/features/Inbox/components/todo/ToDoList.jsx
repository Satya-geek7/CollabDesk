import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { motion, AnimatePresence } from "framer-motion";
import ToDoItem from "./ToDoItem";

const ToDoList = ({
  todos,
  handleOnDragEnd,
  toggleDone,
  delTodo,
  startEdit,
  saveEdit,
  editingId,
  editingText,
  setEditingText,
}) => {
  return (
    <div className="mt-1">
      <div className="max-h-[254px] overflow-y-auto scrollbar-hide">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`transition-all duration-200 ${
                  snapshot.isDraggingOver ? "bg-blue-50/50 rounded-lg p-2" : ""
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {todos.map((t, index) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ToDoItem
                        data={t}
                        index={index}
                        toggleDone={toggleDone}
                        delTodo={delTodo}
                        startEdit={startEdit}
                        saveEdit={saveEdit}
                        editingId={editingId}
                        editingText={editingText}
                        setEditingText={setEditingText}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ToDoList;
