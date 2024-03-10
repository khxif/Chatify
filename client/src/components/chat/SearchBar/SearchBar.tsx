"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import useUsers from "@/hooks/useUsers";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { useState } from "react";
import SearchLists from "./SearchLists";

export default function SearchBar({ className }: { className?: string }) {
  const token = getCookie("user");
  const { users, isLoading, isError } = useUsers(token);
  const [input, setInput] = useState<string>("");
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
            <SearchLists key={user._id} user={user} />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
