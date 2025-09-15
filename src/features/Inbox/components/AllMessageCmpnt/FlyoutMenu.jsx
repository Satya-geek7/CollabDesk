// FlyoutMenu.jsx
import { motion } from "framer-motion";

const FlyoutMenu = ({ options, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -5 }}
    transition={{ duration: 0.2 }}
    className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-48 z-50"
  >
    {options.map((opt) => (
      <button
        key={opt.id}
        onClick={() => onSelect(opt.id)}
        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
      >
        {opt.label}
      </button>
    ))}
  </motion.div>
);

export default FlyoutMenu;
