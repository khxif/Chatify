import Hydrations from "@/providers/Hydration";
import ProtectedRoute from "@/providers/ProtectedRoute";
import { ReactNode } from "react";

export default function chatLayout({ children }: { children: ReactNode }) {
  return (
    <Hydrations>
      <ProtectedRoute>{children}</ProtectedRoute>
    </Hydrations>
  );
}
