import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import useChatStore from "../../Zustand/chatStore";

export default function ChannelList() {
  const [channels, setChannels] = useState([]);
  const { currentChannelId, setCurrentChannel } = useChatStore();

  useEffect(() => {
    // Fetch channels on load
    const fetchChannels = async () => {
      const { data, error } = await supabase.from("channels").select("*");
      if (!error) setChannels(data);
    };
    fetchChannels();

    // Realtime subscription for new channels
    const channelSub = supabase
      .channel("realtime-channels")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "channels" },
        (payload) => {
          setChannels((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channelSub);
  }, []);

  return (
    <div className="w-64 border-r bg-gray-50">
      <h2 className="p-3 font-bold">Channels</h2>
      {channels.map((c) => (
        <div
          key={c.id}
          onClick={() => setCurrentChannel(c.id)}
          className={`p-2 cursor-pointer ${
            currentChannelId === c.id ? "bg-purple-200" : ""
          }`}
        >
          #{c.name}
        </div>
      ))}
    </div>
  );
}
