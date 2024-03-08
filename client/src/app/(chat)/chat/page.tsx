import ChatNav from "@/components/chat/ChatNav";
import SideBar from "@/components/chat/Sidebar/Sidebar";

export default function ChatPage() {
  return (
    <main className="flex">
      <SideBar />
      <section className="md:flex-1 w-full hidden md:flex flex-col">
        <ChatNav />
        <section className="flex flex-col space-y-4 h-full w-full items-center justify-center">
          <h1 className="font-bold text-2xl">Welcome to Chatify!</h1>
          <p className="text-base">Click on a user to start a conversation</p>
        </section>
      </section>
    </main>
  );
}
