import React, { useState } from "react";
import useChatStore from "../../../../Zustand/chatStore";

const ChatsList = ({ istoggle }) => {
  const mockChats = [
    {
      id: 1,
      name: "Meme Lord",
      lastMessage: "Bruh, did you just reply to yourself again? 😂",
      time: "09:15 AM",
      unread: 3,
      avatar: "https://i.pravatar.cc/150?img=21",
    },
    {
      id: 3,
      name: "Bug Hunter",
      lastMessage: "Why does my code only work after I add console.log?? 🐛",
      time: "08:45 AM",
      unread: 2,
      avatar: "https://i.pravatar.cc/150?img=23",
    },
    {
      id: 4,
      name: "Coffee Addict",
      lastMessage: "3 cups down, productivity still at 0 ☕",
      time: "Tue",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?img=24",
    },
    {
      id: 5,
      name: "404 Username Not Found",
      lastMessage: "Beep boop. Error in human.exe",
      time: "Mon",
      unread: 5,
      avatar: "https://i.pravatar.cc/150?img=25",
    },
    {
      id: 6,
      name: "Sleepy Head",
      lastMessage: "zzz... wait, what day is it again? 😴",
      time: "09:00 AM",
      unread: 1,
      avatar: "https://i.pravatar.cc/150?img=26",
    },
    {
      id: 7,
      name: "Dad Joke Dealer",
      lastMessage: "I only know 25 letters of the alphabet... I don’t know y.",
      time: "Yesterday",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?img=27",
    },
    {
      id: 8,
      name: "Wifi Ghost",
      lastMessage: "Sorry I disappeared, router was exorcised 👻",
      time: "Wed",
      unread: 2,
      avatar: "https://i.pravatar.cc/150?img=28",
    },
    {
      id: 9,
      name: "Overthinker",
      lastMessage: "What if dogs see us as their wifi providers? 🤯",
      time: "Thu",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?img=29",
    },
    {
      id: 10,
      name: "Emoji Hoarder",
      lastMessage: "🔥🤣💀✨🦖🍕🚀🛠️",
      time: "Fri",
      unread: 4,
      avatar: "https://i.pravatar.cc/150?img=30",
    },
    {
      id: 11,
      name: "Kevin Scott",
      lastMessage: "GG on that match 🎮",
      time: "11:40 AM",
      unread: 4,
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 12,
      name: "Laura Kim",
      lastMessage: "Sent the designs over email.",
      time: "10:20 AM",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 13,
      name: "Michael Chen",
      lastMessage: "Let’s catch up soon 🍻",
      time: "Sat",
      unread: 1,
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    {
      id: 14,
      name: "Nina Torres",
      lastMessage: "That movie was insane 🤯",
      time: "Sun",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?img=14",
    },
    {
      id: 15,
      name: "Oscar Wilde",
      lastMessage: "Working late again?",
      time: "07:50 AM",
      unread: 2,
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    {
      id: 16,
      name: "Priya Sharma",
      lastMessage: "Happy Birthday 🎂🥳",
      time: "Yesterday",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?img=16",
    },
    {
      id: 17,
      name: "Quentin Blake",
      lastMessage: "Check out this link 👉",
      time: "Mon",
      unread: 6,
      avatar: "https://i.pravatar.cc/150?img=17",
    },
    {
      id: 18,
      name: "Rachel Adams",
      lastMessage: "Yes, I got the tickets!",
      time: "Tue",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?img=18",
    },
    {
      id: 19,
      name: "Sam Wilson",
      lastMessage: "Meet at the cafe?",
      time: "Yesterday",
      unread: 2,
      avatar: "https://i.pravatar.cc/150?img=19",
    },
    {
      id: 20,
      name: "Tina Brooks",
      lastMessage: "Ok, see you tomorrow 👋",
      time: "09:10 AM",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?img=20",
    },
  ];

  const setCurrentChatId = useChatStore((s) => s.setCurrentChatId);

  return (
    <div className="flex srollbar-hidden flex-col border lg:ml-[86px] pt-2 lg:w-[500px] sm:w-[100vh] bg-white shadow-sm">
      <div className="divide-y">
        {mockChats.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between px-4 py-5 hover:bg-gray-50 cursor-pointer transition"
            //main work
            onClick={() => setCurrentChatId(c.id)}
          >
            {/* Avatar + name + last message */}
            <div className="flex items-center gap-3 ">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-gray-900">{c.name}</div>
                <div className="text-sm mt-1 text-gray-500 truncate max-w-[300px]">
                  {c.lastMessage}
                </div>
              </div>
            </div>

            {/* Time + unread badge */}
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">{c.time}</span>
              {c.unread > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 mt-2">
                  {c.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatsList;
