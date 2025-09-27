// ListRenderer.jsx
import { motion, AnimatePresence } from "framer-motion";

const ListRenderer = ({ items, type, onItemClick }) => (
  <div className="border max-h-[277px] overflow-y-auto scrollbar-hide rounded-xl divide-y divide-gray-200 overflow-hidden">
    <AnimatePresence>
      {items?.map((i) => (
        <motion.div
          key={i.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex justify-between items-center p-3 hover:bg-white/70 transition cursor-pointer"
          onClick={() => {
            if (onItemClick) onItemClick(i);
          }}
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600 text-lg">
              {type === "messages"
                ? i.sender[0]
                : i.type === "public"
                ? "#"
                : "🔒"}
            </div>
            <div>
              <p className="font-semibold flex items-center">
                {type === "messages" ? i.sender : i.name}
                {type === "channels" && i.unread > 0 && (
                  <span className="ml-2 inline-block w-[6px] h-[6px] rounded-full bg-blue-500"></span>
                )}
              </p>
              <p className="text-sm text-gray-600 truncate w-[200px]">
                {type === "messages" ? i.text : i.lastMessage}
              </p>
            </div>
          </div>

          {type === "messages" ? (
            <span className="text-xs text-gray-500">{i.time}</span>
          ) : (
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">{i.updatedAt}</span>
              {i.unread > 0 && (
                <span className="mt-1 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                  {i.unread}
                </span>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default ListRenderer;
