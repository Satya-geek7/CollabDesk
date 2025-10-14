import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import useStore from "../../../Zustand/useAuthStore";

import { X } from "lucide-react";

const Notification = ({ ntfcn, setNtfcn }) => {
  const user = useStore((s) => s.user);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    // fetch existing notifications
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*, sender_id (username, email, avatar_url)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!error) setNotifications(data);
    };
    fetchNotifications();

    // realtime subscription
    const channel = supabase
      .channel("notifications_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  useEffect(() => {
    if (ntfcn) ntfcn(notifications.length);
  }, [notifications, ntfcn]);

  const handleAccept = async (notif) => {
    try {
      // insert both directions in friends table
      const { error } = await supabase.from("friends").insert([
        { user_id: user.id, friend_id: notif.sender_id },
        { user_id: notif.sender_id, friend_id: user.id },
      ]);
      if (error) throw error;

      // mark notification as read or delete
      await supabase.from("notifications").delete().eq("id", notif.id);

      alert("Friend request accepted!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl w-80">
      <button
        onClick={() => setNtfcn(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-white hover:bg-red-500 rounded-full p-2"
      >
        <X size={24} />
      </button>
      {notifications.length === 0 ? (
        <div className="p-4 text-gray-500 text-center">No notifications</div>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif.id}
            className="p-3 border-b flex justify-between items-center"
          >
            <span className="text-gray-800 text-sm">
              {notif.sender.username}
            </span>
            {notif.type === "friend_request" && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(notif)}
                  className="px-2 py-1 text-sm bg-green-100 hover:bg-green-200 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    supabase.from("notifications").delete().eq("id", notif.id)
                  }
                  className="px-2 py-1 text-sm bg-red-100 hover:bg-red-200 rounded"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
