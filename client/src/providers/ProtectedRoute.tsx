"use client";

import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie("user");

  useEffect(() => {
    if (!token) redirect("/login");
  }, [token]);
  return <>{children}</>;
}
