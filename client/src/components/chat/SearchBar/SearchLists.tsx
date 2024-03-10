"use client";

import UserAvatar from "@/components/home/UserAvatar";
import { CommandItem } from "@/components/ui/command";
import { useSelectedUserStore } from "@/store/selectedUserStore";
import Link from "next/link";

export default function SearchLists({ user }: { user: User }) {
  const setSelectedUser = useSelectedUserStore(
    (state) => state.setSelectedUser
  );
  return (
    <CommandItem className="p-0 space-y-6">
      <Link
        href={`/chat/${user._id}`}
        className="w-full p-2 rounded-lg bg-transparent hover:bg-stone-300/40 flex space-x-4"
        onClick={() => setSelectedUser(user)}
      >
        <UserAvatar name={user?.username} size="25" />
        <h4> {user.username}</h4>
      </Link>
    </CommandItem>
  );
}
