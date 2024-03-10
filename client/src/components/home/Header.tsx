import UserButton from "./UserButton";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="px-5 md:px-14 mx-auto py-6 flex items-center justify-between">
      <Logo />
      <UserButton />
    </header>
  );
}
