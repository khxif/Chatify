import SearchBar from "../SearchBar";

export default function ChatNav() {
  return (
    <header className="flex items-center justify-end w-full  p-4">
      <SearchBar className="max-w-fit" />
    </header>
  );
}
