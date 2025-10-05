import { create } from "zustand";

const useChatStore = create((set) => ({
  currentChatId: null,
  setCurrentChatId: (id) => set({ currentChatId: id }),

  messages: {}, // { ChatId: [msg1, msg2, ...] }
  setMessages: (ChatId, msgs) =>
    set((state) => ({
      messages: { ...state.messages, [ChatId]: msgs },
    })),
  addMessage: (ChatId, msg) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [ChatId]: [...(state.messages[ChatId] || []), msg],
      },
    })),

  // Add these:
  channels: [],
  setChannels: (channels) => set({ channels }),

  teams: [],
  setTeams: (teams) => set({ teams }),
}));

export default useChatStore;
