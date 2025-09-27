import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ErrorPage = ({ children, path }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center bg-white shadow-2xl rounded-xl p-10 max-w-md w-full text-center"
      >
        <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-6">
          {children || "Something went wrong."}
        </p>
        <a
          href={`/${path}`}
          className="inline-block bg-red-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-600 transition-colors"
        >
          Go Back Home
        </a>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
