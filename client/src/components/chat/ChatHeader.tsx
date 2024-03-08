"use client";

import { useSelectedUserStore } from "@/store/selectedUserStore";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import UserAvatar from "../UserAvatar";

export default function ChatHeader() {
  const router = useRouter();
  const selectedUser = useSelectedUserStore((state) => state.selectedUser);
  return (
    <header className="py-4 px-6 md:px-10">
      <nav className="flex items-center space-x-2">
        <div className="flex items-center space-x-4">
          <ArrowLeft
            onClick={() => router.back()}
            className="w-6 h-6 cursor-pointer"
          />
          <UserAvatar name={selectedUser?.username!} />
        </div>
        <div>
          <p>{selectedUser?.username}</p>
        </div>
      </nav>
    </header>
  );
}
