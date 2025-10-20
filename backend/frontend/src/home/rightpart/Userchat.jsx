import React from 'react';
import useConversation from '../../zusand/useConversation';
import Loading from '../../compo/Loading';
import { useSocketContext } from '../../context/SocketContext.jsx';
const Userchat = () => {
  const { selectedConversation } = useConversation();
  const {socket,onlineUsers}=useSocketContext();
  const onlineUserStatus=(userId)=>{
    return onlineUsers.includes(userId)?"Online":"Offline";
  }
  const isOnline=(userId)=>{
     return onlineUsers.includes(userId)?"online":""
  }
  return (
    <>
      {selectedConversation ? (
        <div className="items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-b-md transition-all duration-200 p-3">
          <div className="flex space-x-3 items-center justify-center">
            <div className={`avatar ${isOnline(selectedConversation._id)}`}>
              <div className="w-12 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" alt="User avatar" />
              </div>
            </div>
            <div>
              <h1 className="text-[20px] font-bold">{selectedConversation.name}</h1>
              <span>{onlineUserStatus(selectedConversation._id)}</span>
            </div>
          </div>
        </div>
      ) : (""
      )}
    </>
  );
};

export default Userchat;
