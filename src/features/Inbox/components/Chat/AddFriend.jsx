import React, { useState, useMemo, useEffect } from "react";
import { X } from "lucide-react";
import useStore from "../../../../Zustand/useAuthStore";
import { supabase } from "../../../../lib/supabaseClient";
import _ from "lodash";

const AddFriend = ({ onClose }) => {
  const userData = useStore((s) => s.user);
  const [searchInpt, setSearchInpt] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Close modal when clicked outside
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("overlay-bg")) onClose();
  };

  //Searching Users to send request by Email

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    try {
      setIsLoading(true);
      setError(null);
      setResults([]);

      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, email, avatar_url")
        .ilike("email", `%${query}%`)
        .neq("email", userData?.email)
        .order("email", { ascending: true });

      if (error) throw error;
      setResults(data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch users.");
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useMemo(() => _.debounce(handleSearch, 3000), []);

  //Sending Friend Request

  const sendRequest = async (senderId, targetUserId, targetUserName) => {
    try {
      setError(null);
      setIsSending(true);

      const { error } = await supabase.from("notifications").insert([
        {
          user_id: targetUserId,
          sender_id: senderId,
          type: "friend_request",
          message: `${
            userData?.username || userData?.email
          } sent you a friend request.`,
        },
      ]);

      if (error) throw error;
      confirm(`Friend request sent to ${targetUserName}!`);
      setResults((prev) =>
        prev.map((r) => (r.id === targetUserId ? { ...r, requested: true } : r))
      );
    } catch (error) {
      console.error("Error sending friend request:", error);
      setError(error.message);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div
      onClick={handleOutsideClick}
      className="overlay-bg fixed inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/95 dark:bg-gray-100 p-8 rounded-3xl shadow-2xl w-11/12 max-w-lg md:w-2/3 lg:w-1/2 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white hover:bg-red-500 rounded-full p-2"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 text-gray-900">
          Add New Friend / Contact
        </h2>

        <input
          value={searchInpt}
          onChange={(e) => {
            const value = e.target.value;
            setSearchInpt(value);
            debouncedSearch(value);
          }}
          placeholder="Search by email..."
          className="w-full border border-gray-300 bg-gray-50 text-gray-900 rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="border border-dashed border-gray-300 rounded-xl max-h-80 overflow-y-auto mb-6">
          {isLoading ? (
            <div className="px-4 py-3 text-gray-400 text-center">
              Searching...
            </div>
          ) : error ? (
            <div className="px-4 py-3 text-red-500 text-center">
              {"There is some internal error Occured! " || error}
            </div>
          ) : results.length > 0 ? (
            results.map((user) => (
              <div
                key={user.id}
                className="px-4 py-3 border-b border-gray-200 hover:bg-gray-100 flex justify-between items-center"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    {user.username || "Unknown"}
                  </div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
                <button
                  disabled={user.requested || isSending}
                  className={`py-2 px-4 text-sm rounded-lg ${
                    user.requested
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "text-blue-800 hover:bg-blue-100"
                  }`}
                  onClick={() =>
                    sendRequest(userData.id, user.id, user.username)
                  }
                >
                  {user.requested ? "Requested ✅" : "+ Add"}
                </button>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-400 text-center">
              No results found
            </div>
          )}
        </div>

        <button
          onClick={() => handleSearch(searchInpt)}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-xl font-medium transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default AddFriend;
