// AllMessageBar.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { motion } from "framer-motion";
import { dummyMessages, dummyChannels, dummyTeams } from "./DummyData";
import ListRenderer from "./ListRenderer";
import Header from "./Header";

const AllMessageBar = () => {
  const [name, setName] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setMessages(dummyMessages);
    setChannels(dummyChannels);
    setTeams(dummyTeams);

    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.log("Error fetching User Metadata!");
        return;
      }
      if (user) {
        setName(user.user_metadata?.name);
      }
    };
    getUser();
  }, []);

  const fetchMessages = async (sortId) => {
    console.log("Sorting messages by:", sortId);
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
        fetchMessages={fetchMessages}
      />
      <ListRenderer items={messages} type="messages" />

      <div className="mt-4">
        <Header
          msg="Channels"
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          fetchMessages={fetchMessages}
        />
        <ListRenderer items={channels} type="channels" />
      </div>

      <div className="mt-4">
        <Header
          msg="Team/Group"
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          fetchMessages={fetchMessages}
        />
        <ListRenderer items={teams} type="team" />
      </div>
    </motion.div>
  );
};

export default AllMessageBar;
