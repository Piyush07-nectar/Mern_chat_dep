import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Authenticate"; // your custom auth hook
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => useContext(socketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [auth] = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (auth && auth.user) {
      const userId = auth.user.userid || auth.user.id;
      console.log("🔍 Connecting socket for userId:", userId, "auth.user:", auth.user);
      if (!userId) {
        console.error("❌ No user ID found in auth:", auth);
        return;
      }

      console.log("🔌 Connecting socket for user:", userId);

      // Create a new socket connection
     const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
  query: { userId: userId },
});


      // Listen for updates from the server
      newSocket.on("getOnlineUser", (users) => {
        console.log("📡 Online Users:", users);
        setOnlineUsers(users);
      });

      setSocket(newSocket);

      // Cleanup on logout/unmount
      return () => {
        console.log("🛑 Disconnecting socket...");
        newSocket.disconnect();
        setSocket(null);
      };
    } else {
      // If user logs out, disconnect socket
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [auth]); // rerun only when auth changes

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};

// Optional shorthand hook
export const useSocket = () => useContext(socketContext);
