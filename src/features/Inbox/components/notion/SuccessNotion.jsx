import React from "react";

const SuccessNotion = ({ code, user, onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="p-6 border rounded-lg shadow-lg bg-green-50 text-green-700 text-center">
        <h2 className="text-xl font-semibold mb-2">✅ Notion Connected!</h2>
        <p className="text-sm mb-2">
          Authorization code received successfully.
        </p>
        <p className="text-sm font-medium text-gray-600">
          User: {user?.email || "Unknown"}
        </p>
        <p className="text-xs text-gray-500 mt-1">Code: {code}</p>
      </div>
      <button
        onClick={onContinue}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Continue
      </button>
    </div>
  );
};

export default SuccessNotion;
