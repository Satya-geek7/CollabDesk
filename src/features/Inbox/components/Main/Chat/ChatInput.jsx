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
import { supabase } from "../../../../../lib/supabaseClient";
import IconTooltip from "../../../../../Components/ui/CmnCmpnts/Tooltip";

const textModes = ["text", "note", "command", "sketch"];
const otherModes = ["fonts", "emoji", "voice", "attachment"];

const ChatInput = ({ updateMsg, channelId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [mode, setMode] = useState("text");
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const containerRef = useRef(null);
  const sketchRef = useRef(null);

  const handleInput = (e) => setInput(e.target.value);

  const onSubmit = async (data) => {
    let text = "";
    let content = {};

    if (mode === "text") text = input;
    else if (mode === "command") text = data.command || "";
    else if (mode === "note") text = data.note || "";
    else text = input || data.message || data.command || data.note || "";

    // Handle Sketch export
    if (mode === "sketch" && sketchRef.current) {
      const sketchData = await sketchRef.current.exportImage("png");
      content.sketchData = sketchData;
      text = "[Sketch]";
    }

    // Handle File Upload
    if (mode === "attachment" && selectedFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("chat-files")
        .upload(`attachments/${Date.now()}_${selectedFile.name}`, selectedFile);

      if (uploadError) {
        console.error("File upload error:", uploadError);
        return;
      }
      const fileUrl = supabase.storage
        .from("chat-files")
        .getPublicUrl(uploadData.path).data.publicUrl;
      content.fileUrl = fileUrl;
      text = `[File] ${selectedFile.name}`;
    }

    if (!text.trim()) return;

    // Build message payload for Supabase
    const newMessage = {
      channel_id: channelId, // ✅ comes from props
      sender_id: (await supabase.auth.getUser()).data.user.id, // ✅ replace with logged-in user id
      body: text.trim(),
      type: mode,
      content: Object.keys(content).length ? content : { extra: null },
    };

    // Insert into DB
    const { data: inserted, error } = await supabase
      .from("messages")
      .insert([newMessage])
      .select();
    if (error) {
      console.error("Insert error:", error);
      return;
    }

    // Update UI with DB message (includes id + created_at)
    updateMsg(inserted[0]);
    reset();
    setInput("");
    setSelectedFile(null);
    setMode("text");
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
      className="flex border-t w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex-col bg-white"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 px-4 py-2 backdrop-blur-xl shadow-lg transition-all"
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
                        : m === "fonts"
                        ? "Fonts"
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
                      {m === "fonts" && <Type className="w-4 h-4" />}
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
            <input
              type="text"
              {...register("message", { required: true })}
              onChange={handleInput}
              value={input}
              placeholder="Type your futuristic message..."
              className="flex-1 w-full bg-transparent outline-none placeholder-gray-400 text-gray-900 text-sm border rounded-md px-3 py-2"
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
          {mode === "fonts" && (
            <select
              onChange={(e) => setInput(`[font:${e.target.value}] ` + input)}
              className="p-2 border rounded-md text-sm"
            >
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans</option>
              <option value="monospace">Monospace</option>
            </select>
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
