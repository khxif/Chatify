"use client";

import Loading from "@/components/Loading";
import { useUserStore } from "@/store/userStore";
import { ReactNode, useEffect, useState } from "react";

export default function Hydrations({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    useUserStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <>{children}</> : <Loading />}</>;
}
