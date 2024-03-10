"use client";

import { ArrowLeft } from "lucide-react";
import UserAvatar from "../home/UserAvatar";
import { useRouter } from "next/navigation";
import { useSelectedUserStore } from "@/store/selectedUserStore";
import { useSocketContext } from "@/providers/SocketContext";

export default function ChatNavItems({ id }: { id: string }) {
  const router = useRouter();
  const { onlineUsers } = useSocketContext();
  const [selectedUser, setSelectedUser] = useSelectedUserStore((state) => [
    state.selectedUser,
    state.setSelectedUser,
  ]);

  const handleBack = () => {
    setSelectedUser(null);
    router.back();
  };
  return (
    <>
      <div className="flex items-center space-x-4">
        <ArrowLeft onClick={handleBack} className="w-6 h-6 cursor-pointer" />
        <UserAvatar name={selectedUser?.username!} />
      </div>
      <div className="flex flex-col space-y-1">
        <p>{selectedUser?.username}</p>

        <p className="text-sm text-gray-400 font-medium">
          {onlineUsers.includes(id) ? <p className="text-green-600">Online</p> : <>Offline</>}
        </p>
      </div>
    </>
  );
}
