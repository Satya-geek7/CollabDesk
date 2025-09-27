import { create } from "zustand";

const useChatStore = create((set) => ({
  currentChannelId: null,
  setCurrentChannel: (id) => set({ currentChannelId: id }),

  messages: {}, // { channelId: [msg1, msg2, ...] }
  setMessages: (channelId, msgs) =>
    set((state) => ({
      messages: { ...state.messages, [channelId]: msgs },
    })),
  addMessage: (channelId, msg) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: [...(state.messages[channelId] || []), msg],
      },
    })),

  // Add these:
  channels: [],
  setChannels: (channels) => set({ channels }),

  teams: [],
  setTeams: (teams) => set({ teams }),
}));

export default useChatStore;
