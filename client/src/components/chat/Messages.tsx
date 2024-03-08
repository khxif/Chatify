"use client";

import useMessages from "@/hooks/useMessages";
import { useSocketContext } from "@/providers/SocketContext";
import { useUserStore } from "@/store/userStore";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Message from "./Message";

interface MessagesProps {
  id: string;
}

export default function Messages({ id }: MessagesProps) {
  const user = useUserStore((state) => state.user);
  const token = getCookie("user");
  const [messages, setMessage] = useState<Message[]>([]);
  const { messages: data, isLoading, isError } = useMessages(token, id);
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("newMessage", (message: Message) => {
      setMessage((prev) => [...prev!, message]);
    });
  }, [socket]);

  useEffect(() => {
    setMessage(data);
  }, [data]);

  return (
    <div
      className="space-y-5 max-h-screen py-8 px-6 pb-60 w-full flex flex-col 
    flex-1 overflow-y-scroll scrollbar-hide md:px-12"
    >
      {isLoading && <p>Loading....</p>}
      {messages &&
        messages?.map((message: Message) => (
          <Message
            key={message?._id}
            isUser={message?.senderId === user?._id}
            message={message}
          />
        ))}
    </div>
  );
}
