import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, Mic, Image, Command, PenTool, Pen } from "lucide-react";
import IconTooltip from "../../../../../Components/ui/CmnCmpnts/Tooltip";

const modes = ["text", "note", "command", "sketch", "voice"];

const ChatInput = ({ updateMsg }) => {
  const { register, handleSubmit, reset } = useForm();
  const [mode, setMode] = useState("text");
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (data) => {
    let text = "";
    if (mode === "text") text = input;
    else if (mode === "command") text = data.command || "";
    else if (mode === "note") text = data.note || "";
    else text = input || data.message || data.command || data.note || "";

    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "Me",
      type: mode === "note" ? "note" : mode === "command" ? "command" : "text",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // 🔥 Send single message directly to parent
    updateMsg(newMessage);

    reset();
    setInput("");
  };

  return (
    <div className="flex border w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex-col bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 px-4 py-2 backdrop-blur-xl shadow-lg transition-all"
      >
        {/* Mode Switch Icons Row */}
        <div className="flex flex-wrap gap-2 ml-2 justify-start">
          {modes.map((m) => (
            <IconTooltip
              key={m}
              text={
                m === "text"
                  ? "Text Message"
                  : m === "note"
                  ? "Sticky Note"
                  : m === "voice"
                  ? "Voice Message"
                  : m === "command"
                  ? "Command Mode"
                  : "Sketch"
              }
            >
              <button
                type="button"
                key={m}
                onClick={() => setMode(m)}
                className={`p-2 rounded-full transition-transform transform ${
                  mode === m
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "hover:bg-gray-200 bg-white/30"
                }`}
              >
                {m === "text" && <Pen className="w-4 h-4 hover:scale-105" />}
                {m === "voice" && <Mic className="w-4 h-4 hover:scale-105" />}
                {m === "sketch" && (
                  <PenTool className="w-4 h-4 hover:scale-105" />
                )}
                {m === "command" && (
                  <Command className="w-4 h-4 hover:scale-105 " />
                )}
                {m === "note" && <Image className="w-4 h-4 hover:scale-105" />}
              </button>
            </IconTooltip>
          ))}
        </div>

        {/* Input + Send Button Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
          {mode === "text" && (
            <input
              type="text"
              {...register("message", { required: true })}
              onChange={handleInput}
              value={input}
              id="text"
              placeholder="Type your futuristic message..."
              className="flex-1 w-full bg-transparent outline-none placeholder-gray-400 text-gray-900 text-sm border rounded-md px-3 py-2"
            />
          )}
          {mode === "command" && (
            <input
              type="text"
              {...register("command")}
              id="command"
              placeholder="/summarize or /giphy cats..."
              className="flex-1 w-full bg-transparent outline-none text-blue-600 text-sm border rounded-md px-3 py-2"
            />
          )}
          {mode === "note" && (
            <textarea
              {...register("note")}
              placeholder="Write your sticky note..."
              id="note"
              className="flex-1 w-full bg-yellow-200 outline-none text-gray-800 text-sm rounded-md px-3 py-2"
            />
          )}
          {mode === "voice" && (
            <p className="flex-1 text-gray-500 text-sm italic w-full">
              🎤 Listening... (voice-to-text here)
            </p>
          )}
          {mode === "sketch" && (
            <div className="flex-1 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500 w-full">
              ✍️ [Sketch Canvas Here]
            </div>
          )}

          {/* Send Button */}
          <button
            type="submit"
            className="p-2 self-end sm:self-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition shadow-lg"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
