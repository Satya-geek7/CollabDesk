import React from "react";
import MainChat from "../../components/Chat/MainChat";
import ChatsList from "./ChatsList";

const MessagePage = () => {
  return (
    <>
      <div className="mt-[51px] sm:w-full flex flex-row">
        <ChatsList />
      </div>
      <MainChat />
    </>
  );
};

export default MessagePage;
