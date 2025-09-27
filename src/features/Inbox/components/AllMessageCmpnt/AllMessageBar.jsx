// AllMessageBar.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { motion } from "framer-motion";
import ListRenderer from "./ListRenderer";
import Header from "./Header";
import useChatStore from "../../../../Zustand/chatStore";

const AllMessageBar = () => {
  const [name, setName] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const channels = useChatStore((s) => s.channels);
  const setChannels = useChatStore((s) => s.setChannels);
  const messagesStore = useChatStore((s) => s.messages);
  const setMessages = useChatStore((s) => s.setMessages);
  const setCurrentChannel = useChatStore((s) => s.setCurrentChannel);

  const teams = useChatStore((s) => s.teams);
  const setTeams = useChatStore((s) => s.setTeams);

  // Fetch channels + last message
  useEffect(() => {
    const fetchChannels = async () => {
      const { data: channelsData } = await supabase
        .from("channels")
        .select("*, messages!inner(id, body, created_at)")
        .order("created_at", { ascending: true });

      const mappedChannels = channelsData?.map((c) => {
        const lastMsg = c.messages?.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )[0]; 
        return { ...c, lastMessage: lastMsg?.body || "" };
      });

      setChannels(mappedChannels || []);
    };

    fetchChannels();
  }, [setChannels]);

  // Fetch teams
  useEffect(() => {
    const fetchTeams = async () => {
      const { data: teamsData } = await supabase
        .from("teams")
        .select("*")
        .order("created_at", { ascending: true });

      setTeams(teamsData || []);
    };

    fetchTeams();
  }, [setTeams]);

  // Get logged-in user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) setName(user.user_metadata?.name);
    };
    getUser();
  }, []);

  const handleChannelClick = async (channel) => {
    setCurrentChannel(channel.id);

    if (!messagesStore[channel.id]) {
      const { data: msgs } = await supabase
        .from("messages")
        .select(
          `
          *,
          sender:profiles(username, display_name, avatar_url)
        `
        )
        .eq("channel_id", channel.id)
        .order("created_at", { ascending: true });

      setMessages(channel.id, msgs || []);
    }
  };

  const handleDMClick = async (dm) => {
    setCurrentChannel(dm.id); // treat DMs as channel-like

    if (!messagesStore[dm.id]) {
      const { data: msgs } = await supabase
        .from("messages")
        .select("*, sender:profiles(username, display_name, avatar_url)")
        .eq("channel_id", dm.id)
        .order("created_at", { ascending: true });

      setMessages(dm.id, msgs || []);
    }
  };

  const handleTeamClick = async (team) => {
    setCurrentChannel(team.id); // treat teams as a "channel"

    if (!messagesStore[team.id]) {
      const { data: msgs } = await supabase
        .from("messages")
        .select("*, sender:profiles(username, display_name, avatar_url)")
        .eq("channel_id", team.id) // assuming messages are linked by team ID
        .order("created_at", { ascending: true });

      setMessages(team.id, msgs || []);
    }
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="lg:w-[380px] scrollbar-hide ml-[381px] hidden lg:block fixed top-[67px] 
    text-black bg-white/40 backdrop-blur-xl border border-black/10 rounded-2xl 
    px-4 py-4 left-0 shadow-lg flex-col overflow-y-auto"
    >
      <Header
        msg="Messages/DM's"
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <ListRenderer
        items={messagesStore["dm"] || []}
        type="messages"
        onItemClick={handleDMClick}
      />
      <div className="mt-4">
        <Header msg="Channels" openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <ListRenderer
          items={channels}
          type="channels"
          onItemClick={handleChannelClick}
        />
      </div>

      <div className="mt-4">
        <Header
          msg="Team/Group"
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
        <ListRenderer items={teams} type="team" onItemClick={handleTeamClick} />{" "}
      </div>
    </motion.div>
  );
};

export default AllMessageBar;
