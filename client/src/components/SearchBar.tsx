"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useUsers from "@/hooks/useUsers";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useState } from "react";

export default function SearchBar({ className }: { className?: string }) {
  const token = getCookie("user");
  const { users, isLoading, isError } = useUsers(token);

  const [input, setInput] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Command className={cn("h-fit relative", className)}>
      <CommandInput
        placeholder="Search a user.."
        value={input}
        onValueChange={setInput}
      />
      <CommandList className={cn(input === "" && "hidden")}>
        <CommandEmpty>No results found..</CommandEmpty>
        <CommandGroup>
          {users?.map((user: User) => (
            <CommandItem key={user._id}>
              {/* <Link href={`/chat/${user._id}`}> */}
                {user.username}
                {/* </Link> */}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
