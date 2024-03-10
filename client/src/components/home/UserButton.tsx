"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser } from "@/lib/getUser";
import { useUserStore } from "@/store/userStore";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import UserAvatar from "./UserAvatar";

export default function UserButton() {
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const token = getCookie("user");

  useEffect(() => {
    token ? getUser(token, setUser) : setUser(null);
  }, [token, setUser]);

  const handleLogout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) setUser(null);
  };
  return (
    <>
      {user?.username ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar name={user.username} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{user?.username}</DropdownMenuItem>
            <DropdownMenuItem>{user?.email}</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  );
}
