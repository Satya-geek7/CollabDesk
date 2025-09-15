import React from "react";

const Input = ({
  label,
  name,
  type = "text",
  register,
  error,
  placeholder,
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full px-4 py-3 rounded-xl border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white/90`}
      />
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default Input;
