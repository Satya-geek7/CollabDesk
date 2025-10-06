import React from "react";
import MainChat from "../../components/Chat/MainChat";
import ChatsList from "./ChatsList";
import useResoponsive from "../../../../Zustand/useResoponsive";

const MessagePage = () => {
  const istoggled = useResoponsive((s) => s.istoggled);

  return (
    <>
      <div
        className={`${
          istoggled === true ? "lg:ml-[86px]" : "lg:ml-[365px] md:ml-[300px]"
        } mt-[51px] sm:w-full flex flex-row`}
      >
        <ChatsList />
      </div>
      <MainChat />
    </>
  );
};

export default MessagePage;
