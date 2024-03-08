import ProtectedRoute from "@/providers/ProtectedRoute";
import { ReactNode } from "react";

export default function chatLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
