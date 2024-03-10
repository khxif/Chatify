import ChatNavItems from "./ChatNavItems";

export default function ChatHeader({ id }: { id: string }) {
  return (
    <header className="py-4 px-6 md:px-10">
      <nav className="flex items-center space-x-3">
        <ChatNavItems id={id} />
      </nav>
    </header>
  );
}
