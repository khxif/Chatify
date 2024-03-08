"use client";

import { getUsers } from "@/lib/getUsers";
import { CookieValueTypes } from "cookies-next";
import { useQuery } from "react-query";

export default function useUsers(token: CookieValueTypes) {
  const { data, isLoading, isError } = useQuery(["users", token], () =>
    getUsers(token)
  );

  return {
    users: data,
    isLoading: isLoading,
    isError: isError,
  };
}
