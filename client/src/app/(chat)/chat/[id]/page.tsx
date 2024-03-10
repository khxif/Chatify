import ChatHeader from "@/components/chat/ChatHeader";
import dynamic from "next/dynamic";

const Messages = dynamic(() => import("@/components/chat/Messages"));
const ChatInput = dynamic(() => import("@/components/chat/ChatInput"));

interface Props {
  params: {
    id: string;
  };
}

export default function UserChatPage({ params: { id } }: Props) {
  return (
    <>
      <ChatHeader id={id} />
      <main className="w-full">
        <Messages id={id} />
      </main>
      <ChatInput id={id} />
    </>
  );
}
