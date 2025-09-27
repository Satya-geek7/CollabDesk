import { supabase } from "../../../../lib/supabaseClient"; // path to your Supabase client
import useChatStore from "../../../../Zustand/chatStore"; // path to your Zustand store

// Constants.jsx
export const messageActions = {
  "mark-read": () => console.log("Mark all as Read"),
  delete: () => console.log("Delete all messages"),
  export: () => console.log("Export chat"),
};

export const channelActions = {
  "new-channel": async () => {
    const channelName = prompt("Enter new channel name");
    if (!channelName) return;

    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (!user) return alert("You must be logged in to create a channel");

    const { data, error } = await supabase
      .from("channels")
      .insert([
        {
          name: channelName,
          created_by: user.id, // ✅ important for RLS
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating channel:", error.message);
      return;
    }

    // Update Zustand
    const { channels, setChannels, setCurrentChannel, setMessages } =
      useChatStore.getState();

    const newChannel = { ...data, lastMessage: "" };
    setChannels([...channels, newChannel]);
    setCurrentChannel(newChannel.id);
    setMessages(newChannel.id, []);
  },
  manage: () => console.log("Manage channels"),
  leave: () => console.log("Leave channel"),
};

export const teamActions = {
  "new-team": () => console.log("Create new team"),
  invite: () => console.log("Invite team member"),
  delete: () => console.log("Delete team"),
};

export const messageMoreOptions = [
  { id: "mark-read", label: "Mark all as Read" },
  { id: "starred", label: "Starred Messages" },
  { id: "delete", label: "Delete All Messages" },
  { id: "mute", label: "Mute Notifications" },
];
export const messageSortOptions = [
  { id: "unread", label: "Unread First" },
  { id: "oldest", label: "Oldest First" },
  { id: "starred", label: "Starred First" },
  { id: "sender-az", label: "By Sender (A–Z)" },
  { id: "sender-za", label: "By Sender (Z–A)" },
];

export const channelSortOptions = [
  { id: "alpha", label: "Alphabetical (A–Z)" },
  { id: "unread", label: "Unread First" },
  { id: "recent", label: "Most Recent Activity" },
];
export const channelMoreOptions = [
  { id: "new-channel", label: "Create New Channel" },
  { id: "manage", label: "Manage Channels" },
  { id: "leave", label: "Leave Channel" },
];

export const teamSortOptions = [
  { id: "alpha", label: "Alphabetical (A–Z)" },
  { id: "members", label: "By Number of Members" },
  { id: "recent", label: "Recently Created" },
];
export const teamMoreOptions = [
  { id: "new-team", label: "Create New Team" },
  { id: "invite", label: "Invite Members" },
  { id: "delete", label: "Delete Team" },
];
