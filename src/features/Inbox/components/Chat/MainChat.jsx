import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import { supabase } from "../../../../lib/supabaseClient"; // import your Supabase client
import useChatStore from "../../../../Zustand/chatStore";

const MainChat = () => {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);
  const currentChatId = useChatStore((s) => s.currentChatId);
  const [error, setError] = useState();
  const [isloading, setIsLoading] = useState(false);

  const [user, setUser] = useState(null);

  // No selcted chat
  const [noChat, setNoChat] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
      else if (error.message)
        setError("User not logged in! Login to Access this Feature!");
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchMsg = async () => {
      if (!currentChatId) {
        return setNoChat(true);
      } else setNoChat(false);

      setIsLoading(true);
      const { data: fetchedData, error: dataError } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", currentChatId);
      if (fetchedData) setMessages(fetchedData);
      else if (dataError?.message) setError(dataError.message);
    };

    fetchMsg();
  }, [currentChatId]);

  //Real-time message updates
  useEffect(() => {
    if (!currentChatId) return;

    const channel = supabase.channel(`chat:${currentChatId}`).on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `chat_id=eq.${currentChatId}`,
      },
      (payload) => {
        setMessages((prev) => {
          // If optimistic message already exists (same temp_id), replace it
          const exists = prev.some(
            (m) =>
              m.content?.client_temp_id &&
              m.content.client_temp_id === payload.new.content?.client_temp_id
          );

          if (exists) {
            return prev.map((m) =>
              m.content?.client_temp_id === payload.new.content?.client_temp_id
                ? payload.new
                : m
            );
          }

          // Otherwise, just append the new message
          return [...prev, payload.new];
        });
      }
    );
  }, [currentChatId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateMsg = (newMsg) => {
    setMessages((prev) => [...prev, newMsg]);
  };

  const renderMessage = (msg) => {
    //   // your existing renderMessage logic unchanged
    //   if (msg.type === "system") {
    //     return (
    //       <div key={msg.id} className="text-center text-xs text-gray-500 my-3">
    //         {msg.body}
    //       </div>
    //     );
    //   }

    return msg.sender_id === user?.id ? (
      <div
        key={msg.id}
        className="flex justify-end items-start space-x-2 text-gray-800"
      >
        <div className="bg-green-100 px-3 py-1 rounded-lg shadow break-words max-w-[350px]">
          {msg.type === "text" && <p className="text-sm">{msg.body}</p>}
          {msg.type === "image" && (
            <img
              src={msg.url}
              alt="upload"
              className="rounded-lg max-w-[200px]"
            />
          )}
          {msg.type === "code" && (
            <pre className="bg-black text-green-400 text-base p-2 rounded-lg overflow-x-auto">
              {msg.body}
            </pre>
          )}
          {msg.type === "note" && (
            <div className="bg-yellow-200 border-l-4 min-h-16 min-w-16 border-yellow-400 pl-2 pr-6 pt-2 pb-6 rounded-md">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {msg.body}
              </p>
            </div>
          )}
          {msg.type === "sketch" && (
            <div className="bg-white border rounded-md p-2">
              <canvas
                width={200}
                height={120}
                className="border border-gray-300 rounded"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                ✍️ Sketch placeholder
              </p>
            </div>
          )}
          <div className="text-right">
            <span className="text-[11px] text-gray-500">{msg.time}</span>
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center">
          {msg.sender?.display_name?.charAt(0) ?? "?"}
        </div>
      </div>
    ) : (
      <div key={msg.id} className="flex items-start">
        <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center">
          {msg.sender?.display_name?.charAt(0) ?? "?"}
        </div>
        <div className="bg-gray-100 px-3 py-1 rounded-2xl shadow max-w-[350px] break-words">
          {msg.type === "text" && (
            <p className="text-gray-800 text-sm">{msg.body}</p>
          )}
          {msg.type === "image" && (
            <img
              src={msg.url}
              alt="upload"
              className="rounded-lg max-w-[200px]"
            />
          )}
          {msg.type === "code" && (
            <pre className="bg-black text-green-400 text-sm p-2 rounded-lg overflow-x-auto">
              {msg.body}
            </pre>
          )}
          {msg.type === "note" && (
            <div className="bg-yellow-200 border-l-4 border-yellow-400 min-h-16 min-w-16 pl-2 pr-6 pt-2 pb-6 rounded-md">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {msg.body}
              </p>
            </div>
          )}
          {msg.type === "sketch" && (
            <div className="bg-white border rounded-md p-2">
              <canvas
                width={200}
                height={120}
                className="border border-gray-300 rounded"
              />
              <p className="text-xs text-gray-500 mt-1 italic">
                ✍️ Sketch placeholder
              </p>
            </div>
          )}
          <div className="text-right">
            <span className="text-[11px] text-gray-500">{msg.time}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="
                  fixed 
                  inset-x-0 
                  flex flex-col 
                  border rounded-xl 
                  bg-white
                  sm:top-[51px] sm:bottom-[40px] sm:h-[calc(100vh-91px)]
                  md:top-[51px] md:bottom-[40px] md:h-[calc(100vh-91px)]
                  lg:top-[67px] lg:bottom-[67px] lg:ml-[762px]
  "
    >
      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-4 space-y-5">
        {messages.map(renderMessage)}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <ChatInput updateMsg={updateMsg} />
      <div className="border-r" />
    </div>
  );
};

export default MainChat;
