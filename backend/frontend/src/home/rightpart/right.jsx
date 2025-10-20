import React from "react";
import Userchat from "./Userchat";
import Messages from "./Messages";
import Messagecontent from "./Messagecontent";
import useConversation from "../../zusand/useConversation";
import { useAuth } from "../../context/Authenticate";
const Right = () => {
  const { selectedConversation } = useConversation();
  const [auth]=useAuth();
  
  return (
    <div className="flex flex-col text-white bg-slate-900 w-[70%] h-screen">
      {/* Chat Header */}
      <Userchat />

      {/* Chat Body */}
      <div className="flex-grow overflow-hidden">
        {selectedConversation ? (
          <Messages />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>welcome Select a conversation to start chatting 💬</p>
          </div>
        )}
      </div>

      {/* Chat Input */}
      {selectedConversation && <Messagecontent />}
    </div>
  );
};

export default Right;
