import React, { useEffect, useState } from "react";

export default function LoadingPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
    </div>
  );
}
