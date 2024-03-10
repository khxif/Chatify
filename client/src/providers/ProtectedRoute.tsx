"use client";

import { useUserStore } from "@/store/userStore";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { ReactNode, useLayoutEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const token = getCookie("user");
  const user = useUserStore((state) => state.user);

  useLayoutEffect(() => {
    if (!token || !user) router.push("/login");

    try {
      const decoded: User = jwtDecode(token as string);

      if (user?.username !== decoded.username) router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }, [router, token, user]);

  return <>{children}</>;
}
