"use client";

import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import { FormEvent, useState } from "react";
import { useQueryClient } from "react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Emoji = dynamic(() => import("./Emoji"));

interface ChatInputProps {
  id: string;
}

export default function ChatInput({ id }: ChatInputProps) {
  const token = getCookie("user");
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!input || !token) return;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/message/send/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ message: input }),
        }
      );
      const data = await res.json();
      console.log(data);

      queryClient.invalidateQueries("chats");
    } catch (error) {
      console.log(error);
    } finally {
      setInput("");
    }
  };
  return (
    <div
      className="bottom-0 -left-1/2 -right-1/2 mx-auto w-full bg-black
     py-4 px-6 flex fixed items-center"
    >
      <form
        onSubmit={handleSubmit}
        className="space-x-2 flex items-center w-full"
      >
        <Emoji setInput={setInput} />
        <Input
          type="text"
          className="w-full py-1 rounded-md px-4 text-white border-0"
          placeholder="Enter your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          type="submit"
          disabled={!input}
          className="p-4 rounded-md bg-green-600 text-white hover:bg-green-600
          hover:brightness-90"
        >
          <PaperPlaneIcon className="w-4 h-4 -rotate-45" />
        </Button>
      </form>
    </div>
  );
}
