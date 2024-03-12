import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full h-screen px-4 md:px-0 flex items-center justify-center">
      {children}
    </main>
  );
}
