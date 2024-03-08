"use client";

import { getMessages } from "@/lib/getMessages";
import { CookieValueTypes } from "cookies-next";
import { useQuery } from "react-query";

export default function useMessages(token: CookieValueTypes, id: string) {
  const query = useQuery(["chats", token, id], () => getMessages(token, id));

  return {
    messages: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
