import { React, useEffect, useRef } from "react";
import { X } from "lucide-react";

const FlyoutMore = ({ setIsModalOpen, setAddFrndModal }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsModalOpen]);

  return (
    <div
      className="
        fixed inset-0 sm:inset-auto sm:top-28
        flex sm:block items-center justify-center
        bg-black/40 sm:bg-transparent
        z-50
        animate-fadeIn
      "
    >
      <div
        ref={modalRef}
        className="
          bg-white rounded-xl shadow-xl
          w-10/12 sm:w-44
          sm:absolute sm:right-0 sm:top-0
          sm:mt-2
          flex flex-col
        "
      >
        {/* Close button (only on small screens) */}
        <div className="flex sm:hidden justify-end p-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(false);
            setAddFrndModal(true);
            console.log("🆕 New Chat clicked");
          }}
          className="flex justify-center py-2 text-sm text-left hover:bg-gray-100 text-gray-800"
        >
          Create New Chat
        </button>

        <button
          onClick={() => {
            setIsModalOpen(false);
            console.log("📨 Select MSG clicked");
          }}
          className="flex justify-center py-2 border-y text-sm text-left hover:bg-gray-100 text-gray-800"
        >
          Select Message
        </button>

        <button
          onClick={() => {
            setIsModalOpen(false);
            console.log("⚙️ Settings clicked");
          }}
          className="flex justify-center py-2 text-sm text-left hover:bg-gray-100 text-gray-800"
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default FlyoutMore;
