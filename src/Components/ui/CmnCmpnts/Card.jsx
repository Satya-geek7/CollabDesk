import React from "react";

// Wrapper for the entire card
export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
};

// Wrapper for inner card content
export const CardContent = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
