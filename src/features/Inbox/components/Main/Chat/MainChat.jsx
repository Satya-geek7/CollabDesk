import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";

const MainChat = () => {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const updateMsg = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
    console.log(messages);
    console.log(newMessage);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderMessage = (msg) => {
    if (msg.type === "system") {
      return (
        <div key={msg.id} className="text-center text-xs text-gray-500 my-3">
          {msg.text}
        </div>
      );
    }

    return msg.sender === "Me" ? (
      <div
        key={msg.id}
        className="flex justify-end items-start space-x-2 text-gray-800"
      >
        <div className="bg-green-100 px-3 py-1 rounded-lg shadow break-words max-w-[350px]">
          {msg.type === "text" && <p className="text-sm">{msg.text}</p>}

          {msg.type === "image" && (
            <img
              src={msg.url}
              alt="upload"
              className="rounded-lg max-w-[200px]"
            />
          )}

          {msg.type === "code" && (
            <pre className="bg-black text-green-400 text-base p-2 rounded-lg overflow-x-auto">
              {msg.text}
            </pre>
          )}

          {msg.type === "note" && (
            <div className="bg-yellow-200 border-l-4 min-h-16 min-w-16 border-yellow-400 pl-2 pr-6 pt-2 pb-6 rounded-md">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {msg.text}
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
          {msg.sender.charAt(0)}
        </div>
      </div>
    ) : (
      <div key={msg.id} className="flex items-start">
        <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center">
          {msg.sender.charAt(0)}
        </div>
        <div className="bg-gray-100 px-3 py-1 rounded-2xl shadow max-w-[350px] break-words">
          {msg.type === "text" && (
            <p className="text-gray-800 text-sm">{msg.text}</p>
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
              {msg.text}
            </pre>
          )}

          {msg.type === "note" && (
            <div className="bg-yellow-200 border-l-4 border-yellow-400 min-h-16 min-w-16 pl-2 pr-6 pt-2 pb-6 rounded-md">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {msg.text}
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
    lg:top-[67px] lg:bottom-[67px] lg:ml-[762px] lg:w-[750px] lg:h-[calc(100vh-67px)]
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
