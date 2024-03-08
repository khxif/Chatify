import dynamic from "next/dynamic";
import Logo from "../../home/Logo";
import SearchBar from "@/components/SearchBar";

const UserLists = dynamic(() => import("./UserLists"));

export default function SideBar() {
  return (
    <section
      className="flex flex-col space-y-10 w-full md:max-w-sm px-6 py-4 h-screen
       md:w-full bg-black"
    >
      <div className="flex flex-col items-start space-y-6 w-full">
        <Logo />
        <SearchBar className="md:hidden w-full" />
      </div>
      <div className="flex flex-col space-y-6 py-2 w-full">
        <UserLists />
      </div>
    </section>
  );
}
