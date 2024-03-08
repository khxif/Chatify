import dynamic from "next/dynamic";

const ChatHeader = dynamic(() => import("@/components/chat/ChatHeader"));
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
      <ChatHeader />
      <main className="w-full">
        <Messages id={id} />
      </main>
      <ChatInput id={id} />
    </>
  );
}
