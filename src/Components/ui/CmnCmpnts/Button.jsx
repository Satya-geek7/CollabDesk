import React from "react";

const colorClasses = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "bg-gray-600 text-white hover:bg-gray-700",
  success: "bg-green-600 text-white hover:bg-green-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
};


const Button = ({
  type = "button",
  onClick,
  color = "primary",
  children,
  ...props
}) => {
  const bgColorClass = colorClasses[color] || colorClasses.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${bgColorClass} px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
