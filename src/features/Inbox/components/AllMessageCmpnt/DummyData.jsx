// DummyData.jsx
export const dummyMessages = [
  { id: 1, sender: "Alice", text: "Hey, did you check Jira?", time: "10:45 AM" },
  { id: 2, sender: "Bob", text: "Yes, fix is on the way.", time: "11:00 AM" },
];

export const dummyChannels = [
  { id: 1, name: "general", type: "public", unread: 3, lastMessage: "Welcome 🎉", updatedAt: "09:30 AM" },
  { id: 2, name: "project-alpha", type: "public", unread: 7, lastMessage: "Frontend PR needs review.", updatedAt: "10:05 AM" },
];

export const dummyTeams = [
  { id: 1, name: "Frontend Team", members: 8, unread: 4, lastMessage: "UI fixes pushed ✅", updatedAt: "09:10 AM" },
  { id: 2, name: "Backend Squad", members: 6, unread: 2, lastMessage: "Migration scheduled.", updatedAt: "10:20 AM" },
];
