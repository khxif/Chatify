"use client";

import { useUserStore } from "@/store/userStore";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

interface SocketContext {
    socket: Socket | undefined | any
    onlineUsers: string[]
}

const SocketContext = createContext<SocketContext>({
    socket: undefined,
    onlineUsers: []
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user !== null) {
      const socket = io("http://localhost:4000", {
        query: {
          userId: user._id,
        },
      });
      console.log(socket);
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
        console.log(users);
      });

      //   return () => socket.close()
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
