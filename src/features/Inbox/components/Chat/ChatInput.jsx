import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Send,
  StickyNote,
  Command,
  PenTool,
  Pen,
  Plus,
  Sticker,
  Paperclip,
  Mic,
  Type,
} from "lucide-react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import EmojiPicker from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../../../lib/supabaseClient";
import IconTooltip from "../../../../Components/ui/CmnCmpnts/Tooltip";
import useChatStore from "../../../../Zustand/chatStore";

const textModes = ["text", "note", "command", "sketch"];
const otherModes = ["emoji", "voice", "attachment"];

const ChatInput = ({ updateMsg }) => {
  const { register, handleSubmit, reset } = useForm();
  const [mode, setMode] = useState("text");
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const containerRef = useRef(null);
  const sketchRef = useRef(null);
  const currentChatId = useChatStore((s) => s.currentChatId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (e) => setInput(e.target.value);

  //Send message and update ui and Database
  const onSubmit = async (data) => {
    if (!input.trim()) return;
    if (!currentChatId) return;

    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) {
      console.error("User not logged in");
      setLoading(false);
      return;
    }

    // Create a temporary optimistic message
    const temp_id = `temp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const optimisticMsg = {
      id: temp_id,
      chat_id: currentChatId,
      sender_id: userId,
      body: input,
      type: "text",
      content: { client_temp_id: temp_id },
      created_at: new Date().toISOString(),
      _status: "sending",
    };

    // Immediately update UI
    updateMsg(optimisticMsg);

    // Insert message into Supabase
    const { data: dbData, error } = await supabase
      .from("messages")
      .insert([
        {
          chat_id: currentChatId,
          sender_id: optimisticMsg.sender_id,
          body: optimisticMsg.body,
          type: "text",
          content: {},
        },
      ])
      .select();

    if (error || !dbData) {
      setError(
        "There is some Malfunction connecting and sending th message! " || error
      );
      return;
    }

    // Reset input
    setInput("");
    reset();
    setLoading(false);
  };

  // Voice recognition
  useEffect(() => {
    if (mode === "voice" && "webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      recognition.start();

      return () => recognition.stop();
    }
  }, [mode]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setExpanded(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setExpanded(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex border-t w-full max-w-full  mx-auto flex-col bg-white"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 px-2 py-2 backdrop-blur-xl shadow-lg transition-all"
      >
        {/* Collapsible Mode Switch */}
        <div className="flex items-center gap-2 pl-2">
          {expanded !== "textModes" && (
            <button
              type="button"
              onClick={() => setExpanded("textModes")}
              className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
            >
              <Pen className="w-4 h-4" />
            </button>
          )}

          <AnimatePresence>
            {expanded === "textModes" && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-2 overflow-hidden"
              >
                {textModes.map((m) => (
                  <IconTooltip
                    key={m}
                    text={
                      m === "text"
                        ? "Text Message"
                        : m === "note"
                        ? "Sticky Note"
                        : m === "command"
                        ? "Command Mode"
                        : "Sketch"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setMode(m);
                        setExpanded(null);
                      }}
                      className={`px-4 rounded-full transition-transform transform ${
                        mode === m
                          ? "border border-gray-400 text-gray-600"
                          : "hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      {m === "text" && <Pen className="w-4 h-4" />}
                      {m === "sketch" && <PenTool className="w-4 h-4" />}
                      {m === "command" && <Command className="w-4 h-4" />}
                      {m === "note" && <StickyNote className="w-4 h-4" />}
                    </button>
                  </IconTooltip>
                ))}

                <button
                  type="button"
                  onClick={() => setExpanded(null)}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  ✖
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="border-r border-gray-300 h-6" />

          {expanded !== "otherModes" && (
            <button
              type="button"
              onClick={() => setExpanded("otherModes")}
              className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
            >
              <Plus className="h-4 w-4" />
            </button>
          )}

          <AnimatePresence>
            {expanded === "otherModes" && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-2 overflow-hidden"
              >
                {otherModes.map((m) => (
                  <IconTooltip
                    key={m}
                    text={
                      m === "emoji"
                        ? "Emojis"
                        : m === "voice"
                        ? "Voice Message"
                        : "Attach File"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setMode(m);
                        setExpanded(null);
                      }}
                      className={`py-1 px-3 rounded-full transition-transform transform ${
                        mode === m
                          ? "border border-gray-400 text-gray-600"
                          : "hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      {m === "emoji" && <Sticker className="w-4 h-4" />}
                      {m === "voice" && <Mic className="w-4 h-4" />}
                      {m === "attachment" && <Paperclip className="w-4 h-4" />}
                    </button>
                  </IconTooltip>
                ))}

                <button
                  type="button"
                  onClick={() => setExpanded(null)}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  ✖
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="border-r border-gray-300 h-6" />
        </div>

        {/* Input + Send Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
          {mode === "text" && (
            <textarea
              {...register("message", { required: true })}
              onChange={handleInput}
              value={input}
              placeholder="Type your futuristic message..."
              rows={1}
              className="flex-1 w-full scrollbar-hide resize-none bg-transparent outline-none placeholder-gray-400 text-gray-900 text-sm border rounded-md px-3 py-2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // call your send message function
                }
                // Shift+Enter naturally adds newline, so no need to handle that
              }}
            />
          )}
          {mode === "command" && (
            <input
              type="text"
              {...register("command")}
              placeholder="/summarize or /giphy cats..."
              className="flex-1 w-full bg-transparent outline-none text-blue-600 text-sm border rounded-md px-3 py-2"
            />
          )}
          {mode === "note" && (
            <textarea
              {...register("note")}
              placeholder="Write your sticky note..."
              className="flex-1 w-full bg-yellow-100 outline-none text-gray-800 text-sm rounded-md px-3 py-2 shadow-inner"
            />
          )}
          {mode === "voice" && (
            <p className="flex-1 text-gray-500 text-sm italic w-full">
              🎤 Listening... (voice-to-text here)
            </p>
          )}
          {mode === "sketch" && (
            <div className="flex-1 h-40 border rounded-md">
              <ReactSketchCanvas
                ref={sketchRef}
                className="w-full h-full"
                strokeWidth={3}
                strokeColor="black"
              />
            </div>
          )}
          {mode === "emoji" && (
            <div>
              <EmojiPicker
                onEmojiClick={(emojiObj) =>
                  setInput((prev) => prev + emojiObj.emoji)
                }
              />
            </div>
          )}
          {mode === "attachment" && (
            <input
              type="file"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                setInput(e.target.files[0]?.name || "");
              }}
              className="p-2 text-sm"
            />
          )}

          {loading ? (
            <>
              <div className="text-xs ml-2 mr-2">Sending...</div>
            </>
          ) : (
            <button
              type="submit"
              className="p-2 mx-2 self-end sm:self-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition shadow-lg"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
