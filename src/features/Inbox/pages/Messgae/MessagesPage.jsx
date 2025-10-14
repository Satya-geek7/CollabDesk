import React, { useState } from "react";
import MainChat from "../../components/Chat/MainChat";
import ChatsList from "./ChatsList";
import useResoponsive from "../../../../Zustand/useResoponsive";
import FlyoutMore from "../../components/Chat/FlyoutMore";
import AddFriend from "../../components/Chat/AddFriend";

const MessagePage = () => {
  const istoggled = useResoponsive((s) => s.istoggled);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addFrndModal, setAddFrndModal] = useState(false);

  return (
    <>
      <div
        className={`${
          istoggled === true ? "lg:ml-[86px]" : "lg:ml-[365px] md:ml-[300px]"
        } mt-[51px] sm:w-full flex flex-row`}
      >
        <ChatsList setIsModalOpen={setIsModalOpen} />
        <span>
          {isModalOpen && (
            <FlyoutMore
              setIsModalOpen={setIsModalOpen}
              setAddFrndModal={setAddFrndModal}
            />
          )}
        </span>
      </div>

      <MainChat />

      {addFrndModal && <AddFriend onClose={() => setAddFrndModal(false)} />}
    </>
  );
};

export default MessagePage;
