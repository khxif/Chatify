"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useUsers from "@/hooks/useUsers";
import { cn } from "@/lib/utils";
import { useSocketContext } from "@/providers/SocketContext";
import { useSelectedUserStore } from "@/store/selectedUserStore";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import Link from "next/link";

const UserAvatar = dynamic(() => import("@/components/UserAvatar"), {
  ssr: false,
  loading: () => (
    <Skeleton className="rounded-full w-12 h-12 bg-slate-400/40" />
  ),
});

export default function UserLists() {
  const token = getCookie("user");
  const setSelectedUser = useSelectedUserStore(
    (state) => state.setSelectedUser
  );
  const { onlineUsers } = useSocketContext();
  const { users, isLoading, isError } = useUsers(token);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!users || (users.length === 0 && <p>No users...</p>)}
      {users?.map((user: User) => (
        <Link
          href={`/chat/${user._id}`}
          key={user?._id}
          onClick={() => setSelectedUser(user)}
          className="w-full rounded-md hover:bg-gray-600/80 px-4 py-2
          "
        >
          <div className=" flex items-center space-x-6 md:space-x-4">
            <div className="relative">
              <UserAvatar name={user?.username} />
              <div
                className={cn(
                  onlineUsers.includes(user?._id as string)
                    ? "bg-green-400 rounded-full w-3 h-3 absolute top-1 right-0"
                    : "hidden"
                )}
              />
            </div>
            <span>{user?.username}</span>
          </div>
        </Link>
      ))}
    </>
  );
}
